-- Yami waitlist — Supabase table setup.
-- Paste this into the Supabase dashboard → SQL Editor → Run.

create table if not exists public.waitlist (
  id           bigint generated always as identity primary key,
  created_at   timestamptz not null default now(),
  name         text not null,
  email        text not null,
  phone        text not null unique,   -- E.164, also the dedupe key
  intent       text not null,          -- borrow | lend | both
  amount_range text not null,
  where_at     text not null,
  source       text,
  ua           text,
  email_verified boolean not null default false  -- true once the OTP is confirmed
);

-- Existing tables: add the email column (idempotent — safe to re-run).
alter table public.waitlist add column if not exists email text;

-- Email-verified flag for the OTP flow (idempotent — safe to re-run).
alter table public.waitlist add column if not exists email_verified boolean not null default false;

-- Keep the table private. The app writes with the service-role key (server-only),
-- which bypasses RLS; enabling RLS with no policies blocks the public anon key.
alter table public.waitlist enable row level security;

-- Handy view for the numbers you'll actually want.
create or replace view public.waitlist_stats as
select
  count(*)                                              as total,
  count(*) filter (where intent = 'borrow')            as borrowers,
  count(*) filter (where intent = 'lend')              as lenders,
  count(*) filter (where intent = 'both')              as both,
  count(*) filter (where where_at ilike '%babcock%')   as babcock
from public.waitlist;
