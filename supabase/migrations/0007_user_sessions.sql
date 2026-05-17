-- ============================================================
-- Migration 0007 — Self-managed session table
-- ============================================================
-- Replaces @supabase/ssr's cookie-stored sessions (unreliable on
-- this Next.js 16 + Vercel deployment) with a proper DB-backed
-- session model. The browser carries only a tiny opaque session ID
-- in a `mw_session` cookie; the server looks the row up via service
-- role on each request.
--
-- Safe to re-run.
-- ============================================================

create table if not exists public.user_sessions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  expires_at  timestamptz not null default (now() + interval '7 days'),
  created_at  timestamptz not null default now(),
  user_agent  text,
  ip          text
);

create index if not exists user_sessions_user_idx
  on public.user_sessions(user_id);
create index if not exists user_sessions_expires_idx
  on public.user_sessions(expires_at);

-- Service role bypasses RLS so it can read/write any row.
-- We deliberately do NOT expose this table to anon/authenticated;
-- only server-side service-role lookups touch it.
alter table public.user_sessions enable row level security;

drop policy if exists "user_sessions: no client access" on public.user_sessions;
create policy "user_sessions: no client access"
  on public.user_sessions for all
  using (false)
  with check (false);
