# Waitlist → Supabase

Store every waitlist signup in a Supabase (Postgres) table. The Next.js API does
all the validation, phone normalization, and rate-limiting, then inserts the row
with the **service-role key** (server-only) and returns the person's real
position in line.

This is the default backend when its env vars are set — it takes priority over
Neon and the local file.

## One-time setup (~3 minutes)

1. **Create a project** at [supabase.com](https://supabase.com) (free tier is
   plenty for a waitlist).

2. **Create the table:** in the dashboard, **SQL Editor → New query**, paste the
   contents of [`supabase/waitlist.sql`](../supabase/waitlist.sql), and **Run**.
   This creates the `waitlist` table (with a unique `phone` for dedupe), turns on
   Row Level Security, and adds a `waitlist_stats` view.

   Then do the same with [`supabase/rate-limit.sql`](../supabase/rate-limit.sql).
   That adds the `rate_limit` table and the atomic `hit_rate_limit()` function, so
   the 10/min limit holds across serverless instances instead of per-instance. Skip
   it and the app quietly falls back to the in-memory counter.

3. **Grab the keys:** dashboard → **Project Settings → API**:
   - **Project URL** → `SUPABASE_URL`
   - **`service_role` secret key** (under "Project API keys" — *not* the `anon`
     key) → `SUPABASE_SERVICE_ROLE_KEY`

4. **Set the app env** (`.env.local` for dev, Vercel project settings for prod):
   ```
   SUPABASE_URL=https://xxxxxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...        # service_role, keep secret
   ```
   Restart `npm run dev`. The API now uses `storageBackend = "supabase"`.

## Test it

```bash
curl -s -X POST http://localhost:3000/api/waitlist \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada","email":"ada@example.com","phone":"08030000001","intent":"borrow","amount_range":"20-50k","where":"Babcock"}'
# → {"position":1,"already":false}
```

Same phone again → `{"position":1,"already":true}` and no duplicate row. See the
rows live in the dashboard under **Table Editor → waitlist**.

## Notes

- **Security:** the `service_role` key must never reach the browser. It's only
  read server-side in `src/lib/waitlist/store.ts`, and RLS keeps the table
  otherwise private. Never expose it with a `NEXT_PUBLIC_` prefix.
- **Columns:** `created_at, name, email, phone, intent, amount_range, where_at, source, ua`.
  Phone is stored E.164 (`+234…`) and is the unique dedupe key. If you created the
  table before email existed, run the `alter table … add column if not exists email text;`
  line from `supabase/waitlist.sql` to add it.
- **Stats:** run `select * from waitlist_stats;` in the SQL Editor for totals,
  borrow/lend split, and the Babcock count.
- **Switching backends:** the app prefers Supabase whenever its two vars are set.
  Clear them to fall back to Neon → local file with no code change.
- **Rate limiting:** keys in `rate_limit` are a SHA-256 of the IP plus
  `RATE_LIMIT_SALT`, never a raw IP — an IP is personal data under NDPA, and the
  limiter doesn't need a readable key. Expired rows are swept automatically. The
  limiter **fails open**: if Postgres is unreachable it logs and allows the request,
  because a blocked signup is worse than an unenforced limit.
