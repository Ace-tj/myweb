-- ============================================================
-- Migration 0006 — Reconcile legacy `name` with `full_name`
-- ============================================================
-- After 0005 the profiles table has BOTH columns:
--   name      text NOT NULL  (legacy, used by another app)
--   full_name text           (added in 0005, used by myweb)
--
-- An INSERT or UPSERT that only supplies `full_name` will fail
-- because `name` is NOT NULL without a usable default. We:
--   1. Give `name` a default of '' so missing values never block.
--   2. Add a BEFORE INSERT/UPDATE trigger that keeps the two
--      columns in sync (whichever one the caller wrote, the other
--      mirrors it). Other apps that still read `name` keep working.
--   3. Backfill existing rows so both columns are populated.
--   4. Update handle_new_user to populate `name` as well.
--
-- Safe to re-run.
-- ============================================================

-- ── 1. Default for legacy column ─────────────────────────────
alter table public.profiles
  alter column name set default '';


-- ── 2. Sync trigger ──────────────────────────────────────────
create or replace function public.profiles_sync_name()
returns trigger
language plpgsql
as $$
begin
  -- Prefer the value the caller actually supplied; fall back the other way.
  if new.full_name is null or new.full_name = '' then
    new.full_name := coalesce(new.name, '');
  end if;
  if new.name is null or new.name = '' then
    new.name := coalesce(new.full_name, '');
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_sync_name_trigger on public.profiles;
create trigger profiles_sync_name_trigger
  before insert or update on public.profiles
  for each row execute procedure public.profiles_sync_name();


-- ── 3. Backfill existing rows ────────────────────────────────
update public.profiles
   set full_name = name
 where (full_name is null or full_name = '')
   and name is not null
   and name <> '';

update public.profiles
   set name = full_name
 where (name is null or name = '')
   and full_name is not null
   and full_name <> '';


-- ── 4. Update handle_new_user to write both columns ──────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_name text;
  v_role text;
begin
  begin
    v_name := coalesce(
      new.raw_user_meta_data->>'name',
      new.raw_user_meta_data->>'full_name',
      split_part(new.email, '@', 1)
    );
    v_role := coalesce(new.raw_user_meta_data->>'role', 'buyer');

    insert into public.profiles (id, email, name, full_name, role, phone, approved)
    values (
      new.id,
      new.email,
      v_name,
      v_name,
      v_role,
      '',
      case when v_role = 'buyer' then true else false end
    )
    on conflict (id) do update
      set email     = excluded.email,
          full_name = coalesce(public.profiles.full_name, excluded.full_name),
          name      = coalesce(nullif(public.profiles.name, ''), excluded.name);
  exception when others then
    raise log 'handle_new_user: profile insert failed for %: %', new.id, sqlerrm;
  end;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
