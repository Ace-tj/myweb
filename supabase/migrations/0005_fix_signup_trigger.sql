-- ============================================================
-- Migration 0005 — Fix signup: schema + trigger + RLS
-- ============================================================
-- Symptoms this fixes:
--   1. "If I create an account, the user isn't saved in the database."
--   2. "If I create a user in Supabase, I can't sign in to myweb."
--
-- Root cause: the original trigger inserted into a `name` column, but
-- the app code uses `full_name` and a NOT NULL `phone`. The trigger
-- therefore raised an error, which rolled back the auth.users insert,
-- so signup silently failed end-to-end.
--
-- This migration:
--   1. Brings the profiles table in line with what the code uses
--      (full_name + phone nullable-with-default).
--   2. Rewrites handle_new_user to insert the right columns and wraps
--      it in EXCEPTION so a profile failure never blocks auth signup.
--   3. Re-asserts RLS policies so authenticated users can both INSERT
--      their own profile (self-heal path) and SELECT/UPDATE it.
--
-- Safe to re-run.
-- ============================================================

-- ── 1. Schema alignment ──────────────────────────────────────

-- Make sure the columns the code reads/writes exist.
alter table public.profiles
  add column if not exists full_name text;

alter table public.profiles
  add column if not exists email text;

alter table public.profiles
  add column if not exists phone text;

-- If a legacy `name` column exists, backfill full_name from it.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'profiles'
      and column_name = 'name'
  ) then
    update public.profiles
       set full_name = coalesce(full_name, name)
     where full_name is null or full_name = '';
  end if;
end$$;

-- Give phone a safe default so NOT NULL (if set) never blocks inserts.
alter table public.profiles
  alter column phone set default '';

update public.profiles set phone = '' where phone is null;

-- Backfill email from auth.users for any rows missing it.
update public.profiles p
   set email = u.email
  from auth.users u
 where u.id = p.id
   and (p.email is null or p.email = '');

create index if not exists profiles_email_idx
  on public.profiles (lower(email));


-- ── 2. Rewrite the signup trigger ────────────────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  begin
    insert into public.profiles (id, email, full_name, role, phone)
    values (
      new.id,
      new.email,
      coalesce(
        new.raw_user_meta_data->>'name',
        new.raw_user_meta_data->>'full_name',
        split_part(new.email, '@', 1)
      ),
      coalesce(new.raw_user_meta_data->>'role', 'buyer'),
      ''
    )
    on conflict (id) do update
      set email     = excluded.email,
          full_name = coalesce(public.profiles.full_name, excluded.full_name);
  exception when others then
    -- Never block auth.users insert because of a profile-side error.
    -- The app's getCurrentSession() will self-heal on next request.
    raise log 'handle_new_user: profile insert failed for %: %', new.id, sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── 3. RLS policies on profiles ──────────────────────────────

alter table public.profiles enable row level security;

-- Anyone authenticated can read profiles (needed for chat names, admin lists, etc.)
drop policy if exists "profiles: anyone can read"      on public.profiles;
drop policy if exists "profiles_select_all"            on public.profiles;
create policy "profiles: anyone can read"
  on public.profiles for select
  using (true);

-- A user can INSERT their own profile row (self-heal path in lib/auth.ts).
drop policy if exists "profiles: user inserts own"     on public.profiles;
create policy "profiles: user inserts own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- A user can UPDATE their own profile.
drop policy if exists "profiles: user updates own"     on public.profiles;
drop policy if exists "profiles_update_own"            on public.profiles;
create policy "profiles: user updates own"
  on public.profiles for update
  using (auth.uid() = id);

-- Admin full access (uses is_admin() if it exists, otherwise inline check).
drop policy if exists "profiles: admin full access" on public.profiles;
drop policy if exists "profiles_admin_all"           on public.profiles;

do $$
begin
  if exists (
    select 1 from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'is_admin'
  ) then
    execute $sql$
      create policy "profiles: admin full access"
        on public.profiles for all
        using (public.is_admin())
    $sql$;
  else
    execute $sql$
      create policy "profiles: admin full access"
        on public.profiles for all
        using (
          exists (
            select 1 from public.profiles me
            where me.id = auth.uid() and me.role = 'admin'
          )
        )
    $sql$;
  end if;
end$$;


-- ── 4. Fix notify_on_message which also reads the old `name` column ─

create or replace function public.notify_on_message()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_buyer_id      uuid;
  v_consultant_id uuid;
  v_sender_name   text;
  v_recipient_id  uuid;
begin
  select buyer_id, consultant_id
    into v_buyer_id, v_consultant_id
    from public.projects
   where id = new.project_id;

  select full_name into v_sender_name
    from public.profiles
   where id = new.sender_id;

  if new.sender_id = v_buyer_id then
    v_recipient_id := v_consultant_id;
  else
    v_recipient_id := v_buyer_id;
  end if;

  if v_recipient_id is not null then
    insert into public.notifications(user_id, type, title, body, link)
    values (
      v_recipient_id,
      'new_message',
      coalesce(v_sender_name, 'Someone') || ' sent you a message',
      left(coalesce(new.body, '[attachment]'), 100),
      '/buyer/projects/' || new.project_id::text
    );
  end if;

  return new;
end;
$$;


-- ── 5. Backfill profiles for any existing auth.users without one ─

insert into public.profiles (id, email, full_name, role, phone)
select
  u.id,
  u.email,
  coalesce(
    u.raw_user_meta_data->>'name',
    u.raw_user_meta_data->>'full_name',
    split_part(u.email, '@', 1)
  ),
  coalesce(u.raw_user_meta_data->>'role', 'buyer'),
  ''
from auth.users u
left join public.profiles p on p.id = u.id
where p.id is null
on conflict (id) do nothing;
