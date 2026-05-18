-- Grant base table privileges (run 2026-05-18)
--
-- 0001_init enabled RLS but never granted base-table privileges to anon /
-- authenticated. Postgres checks GRANTs *before* RLS, so every query from
-- a logged-in user failed with 42501 permission denied — even ones RLS
-- would have allowed. This file fixes that and sets default privileges
-- for future tables.

grant usage on schema public to anon, authenticated;

grant select, update on table public.profiles to authenticated;

grant select on table public.demos to anon, authenticated;
grant insert, update, delete on table public.demos to authenticated;

grant select, insert, update, delete on table public.conversations to authenticated;

grant select, insert on table public.messages to authenticated;

grant usage on all sequences in schema public to authenticated;

alter default privileges in schema public grant select on tables to anon, authenticated;
alter default privileges in schema public grant insert, update, delete on tables to authenticated;
