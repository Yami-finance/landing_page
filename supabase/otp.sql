-- Create otps table to store temporary email verification codes
create table if not exists otps (
  email text primary key,
  otp text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

-- Enable RLS to keep the table secure (only accessible via service_role key)
alter table otps enable row level security;
