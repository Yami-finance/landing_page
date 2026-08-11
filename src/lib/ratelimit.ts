import { createHash } from "node:crypto";

// Fixed-window rate limiter (§3: 10/min).
//
// Two backends, selected the same way src/lib/waitlist/store.ts picks its storage:
// Supabase when its env vars are set, otherwise an in-memory Map. The Map is
// correct but per-instance — on serverless every instance keeps its own counter
// and each deploy resets them, so it under-enforces in production. The Supabase
// path holds the limit across instances.
export type RateLimitResult = { ok: boolean; retryAfter: number };

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SALT = process.env.RATE_LIMIT_SALT ?? "yami-waitlist";

/**
 * Hash the identifier before it leaves the process. An IP address is personal
 * data under NDPA, and the limiter only needs a stable key — not a readable one.
 * This is why the privacy policy can say we don't store IPs.
 */
export function hashKey(key: string): string {
  return createHash("sha256").update(`${SALT}:${key}`).digest("hex");
}

// ─────────────────────────────────────────────────────────────────────────────
// In-memory backend (dev, and the fallback when Supabase isn't configured).
// ─────────────────────────────────────────────────────────────────────────────
type Hit = { count: number; resetAt: number };
const hits = new Map<string, Hit>();

// A key is only ever overwritten when that same client comes back, so without a
// sweep the Map grows once per distinct IP and never shrinks. Cheap to do here:
// the whole point of a fixed window is that expired entries are dead weight.
const SWEEP_THRESHOLD = 10_000;

function sweepExpired(now: number) {
  for (const [k, v] of hits) {
    if (now >= v.resetAt) hits.delete(k);
  }
}

function limitInMemory(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  if (hits.size >= SWEEP_THRESHOLD) sweepExpired(now);

  const existing = hits.get(key);

  if (!existing || now >= existing.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, retryAfter: 0 };
}

// ─────────────────────────────────────────────────────────────────────────────
// Supabase backend. All the work happens in the hit_rate_limit() function so the
// check-and-increment is atomic — see supabase/rate-limit.sql.
// ─────────────────────────────────────────────────────────────────────────────
async function limitSupabase(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(
    SUPABASE_URL as string,
    SUPABASE_SERVICE_ROLE_KEY as string,
    { auth: { persistSession: false } }
  );

  const { data, error } = await supabase
    .rpc("hit_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: Math.ceil(windowMs / 1000),
    })
    .maybeSingle<{ allowed: boolean; retry_after: number }>();

  if (error || !data) {
    throw new Error(`hit_rate_limit: ${error?.message ?? "no row returned"}`);
  }

  return { ok: data.allowed, retryAfter: data.retry_after };
}

/**
 * Consume one unit against `key`. Returns `ok: false` with a `retryAfter` in
 * seconds once the caller is over the limit for the current window.
 *
 * Fails OPEN. If the limiter's backend is unreachable, the waitlist insert is
 * almost certainly failing too — turning that into a blocked signup would be the
 * worse outcome, so we log and allow.
 */
export async function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): Promise<RateLimitResult> {
  const hashed = hashKey(key);

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    try {
      return await limitSupabase(hashed, limit, windowMs);
    } catch (err) {
      console.error("rate limit backend unavailable, allowing request", err);
      return { ok: true, retryAfter: 0 };
    }
  }

  return limitInMemory(hashed, limit, windowMs);
}

export const rateLimitBackend =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY ? "supabase" : "memory";
