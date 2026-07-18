import { promises as fs } from "node:fs";
import path from "node:path";
import type { WaitlistInputParsed } from "./schema";

export type WaitlistEntry = WaitlistInputParsed & { ua?: string };
export type AddResult = { position: number; already: boolean };

const DB_URL = process.env.WAITLIST_DATABASE_URL;

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
          id          bigserial PRIMARY KEY,
          created_at  timestamptz NOT NULL DEFAULT now(),
          name        text NOT NULL,
          phone       text NOT NULL UNIQUE,
          intent      text NOT NULL,
          amount_range text NOT NULL,
          where_at    text NOT NULL,
          source      text,
          ua          text
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
    INSERT INTO waitlist (name, phone, intent, amount_range, where_at, source, ua)
    VALUES (${entry.name}, ${entry.phone}, ${entry.intent}, ${entry.amount_range},
            ${entry.where}, ${entry.source ?? null}, ${entry.ua ?? null})
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
  return DB_URL ? addNeon(entry) : addFile(entry);
}

export const storageBackend = DB_URL ? "neon" : "file";
