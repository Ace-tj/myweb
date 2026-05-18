-- Fix infinite recursion in RLS policies (run 2026-05-18)
--
-- The original 0001_init policies did `EXISTS (SELECT 1 FROM profiles ...)`
-- inside RLS on profiles itself, which Postgres rejected with
-- ERROR 42P17 (infinite recursion). Every authenticated read of profiles
-- failed, which made getCurrentProfile() return null and the UI behave
-- as if no one was logged in. Same pattern fanned out to conversations,
-- messages, and demos.
--
-- Fix: SECURITY DEFINER helpers that bypass RLS for the role check.

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(select 1 from public.profiles where id = uid and role = 'admin');
$$;

create or replace function public.is_approved_consultant(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists(
    select 1 from public.profiles
    where id = uid
      and role = 'consultant'
      and consultant_status = 'approved'
  );
$$;

drop policy if exists profiles_admin_read    on public.profiles;
drop policy if exists profiles_admin_update  on public.profiles;
drop policy if exists demos_public_read      on public.demos;
drop policy if exists demos_admin_write      on public.demos;
drop policy if exists conv_admin_read        on public.conversations;
drop policy if exists conv_admin_all         on public.conversations;
drop policy if exists conv_consultant_read   on public.conversations;
drop policy if exists conv_consultant_update on public.conversations;
drop policy if exists msg_participant_read   on public.messages;
drop policy if exists msg_participant_insert on public.messages;

create policy profiles_admin_read on public.profiles
  for select using (public.is_admin(auth.uid()));
create policy profiles_admin_update on public.profiles
  for update using (public.is_admin(auth.uid()));

create policy demos_public_read on public.demos
  for select using (enabled = true or public.is_admin(auth.uid()));
create policy demos_admin_write on public.demos
  for all using (public.is_admin(auth.uid()));

create policy conv_admin_read on public.conversations
  for select using (public.is_admin(auth.uid()));
create policy conv_admin_all on public.conversations
  for all using (public.is_admin(auth.uid()));

create policy conv_consultant_read on public.conversations
  for select using (
    public.is_approved_consultant(auth.uid())
    and (consultant_id = auth.uid() or consultant_id is null)
  );
create policy conv_consultant_update on public.conversations
  for update using (public.is_approved_consultant(auth.uid()));

create policy msg_participant_read on public.messages
  for select using (
    exists(
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.customer_id = auth.uid() or c.consultant_id = auth.uid())
    )
    or public.is_admin(auth.uid())
  );

create policy msg_participant_insert on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists(
      select 1 from public.conversations c
      where c.id = conversation_id
        and (
          c.customer_id = auth.uid()
          or c.consultant_id = auth.uid()
          or public.is_approved_consultant(auth.uid())
        )
    )
  );
