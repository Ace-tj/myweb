-- ============================================================
-- Migration 0002 — Add email column to profiles
-- ============================================================
-- The signup server action upserts an `email` value into profiles
-- so admin queries can show user emails without joining auth.users
-- on every page. This migration:
--   1. Adds the column (nullable for safe backfill)
--   2. Backfills from auth.users for existing rows
--   3. Updates the handle_new_user trigger to populate it on signup
-- Safe to re-run.
-- ============================================================

-- 1. Add column (nullable, no default — backfilled below)
alter table public.profiles
  add column if not exists email text;

-- 2. Backfill from auth.users
update public.profiles p
   set email = u.email
  from auth.users u
 where u.id = p.id
   and p.email is null;

-- 3. Index for admin search-by-email
create index if not exists profiles_email_idx
  on public.profiles (lower(email));

-- 4. Rebuild the new-user trigger to include email
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, role, approved)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'buyer'),
    case
      when coalesce(new.raw_user_meta_data->>'role', 'buyer') = 'buyer' then true
      else false
    end
  )
  on conflict (id) do update
    set email = excluded.email,
        name  = excluded.name;
  return new;
end;
$$;

-- Trigger itself is unchanged; the recreated function above is sufficient.
