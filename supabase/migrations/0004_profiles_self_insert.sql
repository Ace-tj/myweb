-- ============================================================
-- Migration 0004 — allow users to INSERT their own profile row
-- ============================================================
-- The original FULL_SETUP.sql had policies for SELECT, UPDATE, and admin
-- "all access" on public.profiles — but no INSERT policy for owners.
-- This blocked the self-heal upsert in getCurrentSession() (used when
-- the signup trigger didn't fire for some reason), leaving the user in
-- a half-authenticated state where Supabase saw them as logged in but
-- the app saw no profile and treated them as anonymous.
--
-- Safe to re-run.
-- ============================================================

drop policy if exists "profiles: user inserts own" on public.profiles;
create policy "profiles: user inserts own"
  on public.profiles for insert
  with check (auth.uid() = id);
