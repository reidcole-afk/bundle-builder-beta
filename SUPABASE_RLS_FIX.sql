-- Bundle Builder Supabase RLS hardening
-- Run in Supabase SQL Editor for the project used by Render DATABASE_URL.
--
-- These tables are server-owned operational storage:
-- - pulse_snapshots: machine snapshot/backtest history
-- - chart_cache: reusable chart cache
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

alter table public.pulse_snapshots enable row level security;
alter table public.chart_cache enable row level security;

revoke all on table public.pulse_snapshots from anon;
revoke all on table public.pulse_snapshots from authenticated;
revoke all on table public.pulse_snapshots from public;

revoke all on table public.chart_cache from anon;
revoke all on table public.chart_cache from authenticated;
revoke all on table public.chart_cache from public;

-- No permissive RLS policies are intentionally added.
-- Expected result:
-- 1. Supabase security advisor should stop warning about public access.
-- 2. Render should still work because the server uses DATABASE_URL directly.
-- 3. /health should still show pulseSnapshotStorage.mode = "postgres"
--    and chartCacheStorage.mode = "postgres".

select
  schemaname,
  tablename,
  rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('pulse_snapshots', 'chart_cache')
order by tablename;
