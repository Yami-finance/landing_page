import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  PostgrestSingleResponse,
  SupabaseClient,
} from "@supabase/supabase-js";
import type { WaitlistInputParsed } from "./schema";

export type WaitlistEntry = WaitlistInputParsed & {
  ua?: string;
  email_verified?: boolean;
};
export type AddResult = { position: number; already: boolean };

const DB_URL = process.env.WAITLIST_DATABASE_URL;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// ─────────────────────────────────────────────────────────────────────────────
// Supabase (Postgres) backend. Used when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
// are set. The service-role key is server-only and bypasses RLS, so the table
// stays private. See docs/waitlist-supabase.md for the one-time table setup.
// ─────────────────────────────────────────────────────────────────────────────
async function supabaseClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: { persistSession: false },
  });
}

type SupabaseRow = {
  name: string;
  email: string;
  phone: string;
  intent: string;
  amount_range: string;
  where_at: string;
  source: string | null;
  ua: string | null;
  email_verified?: boolean;
};

async function insertWaitlist(
  supabase: SupabaseClient,
  row: SupabaseRow
): Promise<PostgrestSingleResponse<{ created_at: string } | null>> {
  const attempt = await supabase
    .from("waitlist")
    .insert(row)
    .select("created_at")
    .maybeSingle();
  // email_verified column not migrated yet (42703 or PostgREST's PGRST204
  // schema-cache miss) — retry without the flag so an un-run migration can
  // never take the join flow down.
  if (
    attempt.error?.code === "42703" ||
    /could not find the .* column/i.test(attempt.error?.message ?? "")
  ) {
    const base = { ...row };
    delete base.email_verified;
    return supabase
      .from("waitlist")
      .insert(base)
      .select("created_at")
      .maybeSingle();
  }
  return attempt;
}

async function addSupabase(entry: WaitlistEntry): Promise<AddResult> {
  const supabase = await supabaseClient();

  const { data: inserted, error } = await insertWaitlist(supabase, {
    name: entry.name,
    email: entry.email,
    phone: entry.phone,
    intent: entry.intent,
    amount_range: entry.amount_range,
    where_at: entry.where,
    source: entry.source ?? null,
    ua: entry.ua ?? null,
    email_verified: entry.email_verified ?? false,
  });

  // 23505 = unique_violation on phone → already on the list.
  if (error && error.code !== "23505") {
    throw new Error(`supabase insert: ${error.message}`);
  }

  if (inserted) {
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    return { position: count ?? 0, already: false };
  }

  // Duplicate phone — return the existing place in line (rows at or before it).
  const { data: existing } = await supabase
    .from("waitlist")
    .select("created_at")
    .eq("phone", entry.phone)
    .maybeSingle();

  const { count } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .lte("created_at", existing?.created_at ?? new Date().toISOString());

  return { position: count ?? 0, already: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Neon Postgres backend (used when WAITLIST_DATABASE_URL is set).
// ─────────────────────────────────────────────────────────────────────────────
let schemaReady: Promise<void> | null = null;

async function neonSql() {
  const { neon } = await import("@neondatabase/serverless");
  return neon(DB_URL as string);
}

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = await neonSql();
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id           bigserial PRIMARY KEY,
          created_at   timestamptz NOT NULL DEFAULT now(),
          name         text NOT NULL,
          email        text NOT NULL,
          phone        text NOT NULL UNIQUE,
          intent       text NOT NULL,
          amount_range text NOT NULL,
          where_at     text NOT NULL,
          source       text,
          ua           text,
          email_verified boolean NOT NULL DEFAULT false
        )`;
    })().catch((e) => {
      schemaReady = null;
      throw e;
    });
  }
  return schemaReady;
}

async function addNeon(entry: WaitlistEntry): Promise<AddResult> {
  await ensureSchema();
  const sql = await neonSql();
  const inserted = await sql`
    INSERT INTO waitlist (name, email, phone, intent, amount_range, where_at, source, ua, email_verified)
    VALUES (${entry.name}, ${entry.email}, ${entry.phone}, ${entry.intent}, ${entry.amount_range},
            ${entry.where}, ${entry.source ?? null}, ${entry.ua ?? null}, ${entry.email_verified ?? false})
    ON CONFLICT (phone) DO NOTHING
    RETURNING created_at`;

  if (inserted.length > 0) {
    const total = await sql`SELECT COUNT(*)::int AS c FROM waitlist`;
    return { position: total[0].c as number, already: false };
  }

  // Duplicate phone — return the existing place in line.
  const pos = await sql`
    SELECT COUNT(*)::int AS c FROM waitlist
    WHERE created_at <= (SELECT created_at FROM waitlist WHERE phone = ${entry.phone})`;
  return { position: pos[0].c as number, already: true };
}

// ─────────────────────────────────────────────────────────────────────────────
// Local JSON-file fallback (dev). Genuinely persistent + live, no DSN needed.
// Writes are serialized through a promise chain to avoid interleaving.
// ─────────────────────────────────────────────────────────────────────────────
type FileRow = WaitlistEntry & { created_at: string };
const FILE = path.join(process.cwd(), ".data", "waitlist.json");
let writeChain: Promise<AddResult> = Promise.resolve({
  position: 0,
  already: false,
});

async function readFile(): Promise<FileRow[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as FileRow[];
  } catch {
    return [];
  }
}

async function addFile(entry: WaitlistEntry): Promise<AddResult> {
  const run = writeChain.then(async () => {
    const rows = await readFile();
    const existing = rows.findIndex((r) => r.phone === entry.phone);
    if (existing >= 0) return { position: existing + 1, already: true };

    rows.push({ ...entry, created_at: new Date().toISOString() });
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(rows, null, 2), "utf8");
    return { position: rows.length, already: false };
  });
  // Keep the chain alive even if this write throws.
  writeChain = run.catch(() => ({ position: 0, already: false }));
  return run;
}

export async function addToWaitlist(entry: WaitlistEntry): Promise<AddResult> {
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) return addSupabase(entry);
  if (DB_URL) return addNeon(entry);
  return addFile(entry);
}

export const storageBackend =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? "supabase"
    : DB_URL
      ? "neon"
      : "file";
