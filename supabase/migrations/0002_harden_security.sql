-- Harden security advisors (run 2026-05-18)
-- Pins search_path on trigger function, removes handle_new_user from public RPC
-- surface, and drops broad listing policies on public storage buckets.

alter function public.bump_conversation_timestamp() set search_path = public, pg_temp;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

drop policy if exists "avatars: public read"         on storage.objects;
drop policy if exists "demo-thumbnails: public read" on storage.objects;
