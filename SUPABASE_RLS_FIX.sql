-- Bundle Builder Supabase RLS hardening
-- Run this in Supabase SQL Editor for the project backing DATABASE_URL.
-- These tables are server-owned caches/snapshots. The public browser app should
-- never read or write them directly through Supabase anon/authenticated roles.

alter table if exists public.pulse_snapshots enable row level security;
alter table if exists public.chart_cache enable row level security;

revoke all on table public.pulse_snapshots from anon;
revoke all on table public.pulse_snapshots from authenticated;
revoke all on table public.pulse_snapshots from public;

revoke all on table public.chart_cache from anon;
revoke all on table public.chart_cache from authenticated;
revoke all on table public.chart_cache from public;

-- Intentionally do not add permissive RLS policies.
-- The Render server connects with DATABASE_URL and should continue to access
-- these tables through the server-side Postgres connection.
