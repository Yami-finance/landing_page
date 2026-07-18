// Fixed-window IP rate limiter (§3: 10/min). In-memory, so it's per-instance —
// fine for a waitlist; swap for a shared store (Upstash/Redis) if traffic ever
// warrants distributed limiting.
type Hit = { count: number; resetAt: number };
const hits = new Map<string, Hit>();

export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000
): { ok: boolean; retryAfter: number } {
  const now = Date.now();
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
