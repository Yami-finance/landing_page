-- Yami rate limiter — Supabase table + atomic counter.
-- Paste this into the Supabase dashboard → SQL Editor → Run.
--
-- Why a function rather than a select-then-update from the app: two serverless
-- instances checking the same key at the same moment would both read the old
-- count and both allow the request. Doing the whole thing in one statement inside
-- Postgres closes that gap.

create table if not exists public.rate_limit (
  -- SHA-256 of (IP + server-side salt). Never a raw IP: an IP is personal data
  -- under NDPA, and the limiter works identically on a hash.
  key      text primary key,
  count    int not null default 0,
  reset_at timestamptz not null
);

-- Service-role only. Enabling RLS with no policies blocks the public anon key.
alter table public.rate_limit enable row level security;

-- Lets the sweep below find expired rows without a full scan.
create index if not exists rate_limit_reset_at_idx on public.rate_limit (reset_at);

create or replace function public.hit_rate_limit(
  p_key            text,
  p_limit          int,
  p_window_seconds int
)
returns table (allowed boolean, retry_after int)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_now    timestamptz := now();
  v_count  int;
  v_reset  timestamptz;
begin
  -- One atomic statement: insert the key, or bump it. If the previous window has
  -- already expired, start a fresh one at 1 instead of incrementing.
  insert into public.rate_limit as rl (key, count, reset_at)
  values (p_key, 1, v_now + make_interval(secs => p_window_seconds))
  on conflict (key) do update
    set count = case
                  when rl.reset_at <= v_now then 1
                  else rl.count + 1
                end,
        reset_at = case
                     when rl.reset_at <= v_now
                       then v_now + make_interval(secs => p_window_seconds)
                     else rl.reset_at
                   end
  returning rl.count, rl.reset_at into v_count, v_reset;

  -- Opportunistic cleanup so the table doesn't grow without bound. Cheap: the
  -- index makes this a range scan, and it only ever touches long-dead rows.
  delete from public.rate_limit
  where reset_at < v_now - interval '1 hour';

  if v_count > p_limit then
    return query
      select false,
             greatest(1, ceil(extract(epoch from (v_reset - v_now))))::int;
  else
    return query select true, 0;
  end if;
end;
$$;
