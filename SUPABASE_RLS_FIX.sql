-- Bundle Builder Supabase RLS hardening
-- Run in Supabase SQL Editor for the project used by Render DATABASE_URL.
--
-- These tables are server-owned operational storage:
-- - pulse_snapshots: machine snapshot/backtest history
-- - chart_cache: reusable chart cache
-- - profiles: email profile snapshots
-- - profiles_login_codes: one-time email login codes
-- - profiles_sessions: signed-in profile sessions
--
-- The public browser app should never access these tables directly through
-- Supabase anon/authenticated keys. The Render server accesses them through
-- the pooled Postgres DATABASE_URL.

create table if not exists public.pulse_snapshots (
  id text primary key,
  created_at timestamptz not null,
  source text,
  network text,
  selected_window text,
  selected_read_window text,
  fingerprint text,
  payload jsonb not null
);

create index if not exists pulse_snapshots_created_at_idx on public.pulse_snapshots (created_at);
create index if not exists pulse_snapshots_fingerprint_idx on public.pulse_snapshots (fingerprint);

create table if not exists public.chart_cache (
  cache_key text primary key,
  updated_at timestamptz not null default now(),
  payload jsonb not null
);

create index if not exists chart_cache_updated_at_idx on public.chart_cache (updated_at);

create table if not exists public.profiles (
  id text primary key,
  email text not null unique,
  display_name text not null default '',
  created_at timestamptz not null,
  updated_at timestamptz not null,
  last_login_at timestamptz,
  snapshot jsonb not null
);

create index if not exists profiles_email_idx on public.profiles (email);

create table if not exists public.profiles_login_codes (
  id text primary key,
  email text not null,
  profile_id text not null references public.profiles(id) on delete cascade,
  code_hash text not null,
  created_at timestamptz not null,
  expires_at timestamptz not null,
  used_at timestamptz
);

create index if not exists profiles_login_codes_email_idx on public.profiles_login_codes (email);
create index if not exists profiles_login_codes_expires_at_idx on public.profiles_login_codes (expires_at);

create table if not exists public.profiles_sessions (
  token_hash text primary key,
  profile_id text not null references public.profiles(id) on delete cascade,
  email text not null,
  created_at timestamptz not null,
  expires_at timestamptz not null
);

create index if not exists profiles_sessions_profile_id_idx on public.profiles_sessions (profile_id);
create index if not exists profiles_sessions_expires_at_idx on public.profiles_sessions (expires_at);

alter table public.pulse_snapshots enable row level security;
alter table public.chart_cache enable row level security;
alter table public.profiles enable row level security;
alter table public.profiles_login_codes enable row level security;
alter table public.profiles_sessions enable row level security;

revoke all on table public.pulse_snapshots from anon;
revoke all on table public.pulse_snapshots from authenticated;
revoke all on table public.pulse_snapshots from public;

revoke all on table public.chart_cache from anon;
revoke all on table public.chart_cache from authenticated;
revoke all on table public.chart_cache from public;

revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;
revoke all on table public.profiles from public;

revoke all on table public.profiles_login_codes from anon;
revoke all on table public.profiles_login_codes from authenticated;
revoke all on table public.profiles_login_codes from public;

revoke all on table public.profiles_sessions from anon;
revoke all on table public.profiles_sessions from authenticated;
revoke all on table public.profiles_sessions from public;

-- No permissive RLS policies are intentionally added.
-- Expected result:
-- 1. Supabase security advisor should stop warning about public access.
-- 2. Render should still work because the server uses DATABASE_URL directly.
-- 3. /health should still show pulseSnapshotStorage.mode = "postgres"
--    chartCacheStorage.mode = "postgres", and profileStorage.mode = "postgres".

select
  schemaname,
  tablename,
  rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('pulse_snapshots', 'chart_cache', 'profiles', 'profiles_login_codes', 'profiles_sessions')
order by tablename;
