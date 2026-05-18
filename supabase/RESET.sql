-- One-time reset script.
-- Wipes the entire `public` schema so webagency's 0001_init.sql can run on a clean DB.
-- Run this in the Supabase SQL Editor BEFORE running migrations/0001_init.sql.

-- 1. Drop everything in public (tables, types, functions, triggers, policies, sequences).
drop schema public cascade;
create schema public;

-- 2. Restore default grants Supabase expects on the public schema.
grant usage on schema public to anon, authenticated, service_role;
grant all on schema public to postgres, anon, authenticated, service_role;

-- 3. Drop the trigger on auth.users that the old project installed
--    (handle_new_user lived in public, so it was removed above, but the trigger
--    reference on auth.users may linger).
drop trigger if exists on_auth_user_created on auth.users;

-- 4. (Optional) Delete all existing auth users — uncomment if you want a totally clean slate.
--    WARNING: this removes every account ever signed up to the old myweb project.
-- delete from auth.users;

-- 5. Realtime publication: webagency's init will re-add the right tables.
--    No action needed here — dropping the tables removed them from supabase_realtime.
