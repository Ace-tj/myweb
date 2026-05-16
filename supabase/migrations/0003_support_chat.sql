-- ============================================================
-- Migration 0003 — Support chat between users and admins
-- ============================================================
-- Adds two tables that back the floating consultant button:
--   support_threads — one per user, holds metadata
--   support_messages — append-only chat log
-- RLS lets users read/write only their own thread; admins read/write all.
-- ============================================================

create table if not exists public.support_threads (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  display_name    text not null default 'User',
  display_email   text,
  last_message_at timestamptz not null default now(),
  unread_for_admin int not null default 0,
  unread_for_user  int not null default 0,
  created_at      timestamptz not null default now()
);
create unique index if not exists support_threads_user_uniq
  on public.support_threads (user_id);

create table if not exists public.support_messages (
  id          uuid primary key default gen_random_uuid(),
  thread_id   uuid not null references public.support_threads(id) on delete cascade,
  from_role   text not null check (from_role in ('user', 'admin')),
  sender_id   uuid references auth.users(id) on delete set null,
  body        text,
  image_url   text,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists support_messages_thread_idx
  on public.support_messages (thread_id, created_at);

-- ── RLS ────────────────────────────────────────────────────────────────────
alter table public.support_threads  enable row level security;
alter table public.support_messages enable row level security;

drop policy if exists "support_threads: owner or admin select" on public.support_threads;
create policy "support_threads: owner or admin select"
  on public.support_threads for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "support_threads: owner insert" on public.support_threads;
create policy "support_threads: owner insert"
  on public.support_threads for insert
  with check (user_id = auth.uid());

drop policy if exists "support_threads: owner or admin update" on public.support_threads;
create policy "support_threads: owner or admin update"
  on public.support_threads for update
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "support_messages: thread participant select" on public.support_messages;
create policy "support_messages: thread participant select"
  on public.support_messages for select
  using (
    public.is_admin()
    or exists (
      select 1 from public.support_threads t
      where t.id = thread_id and t.user_id = auth.uid()
    )
  );

drop policy if exists "support_messages: thread participant insert" on public.support_messages;
create policy "support_messages: thread participant insert"
  on public.support_messages for insert
  with check (
    public.is_admin()
    or exists (
      select 1 from public.support_threads t
      where t.id = thread_id and t.user_id = auth.uid()
    )
  );

drop policy if exists "support_messages: thread participant update" on public.support_messages;
create policy "support_messages: thread participant update"
  on public.support_messages for update
  using (
    public.is_admin()
    or exists (
      select 1 from public.support_threads t
      where t.id = thread_id and t.user_id = auth.uid()
    )
  );

-- ── Trigger: bump last_message_at + unread counters when a message lands ──
create or replace function public.support_after_message_insert()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.from_role = 'user' then
    update public.support_threads
       set last_message_at = new.created_at,
           unread_for_admin = unread_for_admin + 1
     where id = new.thread_id;
  else
    update public.support_threads
       set last_message_at = new.created_at,
           unread_for_user = unread_for_user + 1
     where id = new.thread_id;
  end if;
  return new;
end;
$$;

drop trigger if exists support_message_insert_trigger on public.support_messages;
create trigger support_message_insert_trigger
  after insert on public.support_messages
  for each row execute procedure public.support_after_message_insert();

-- ── Realtime publication ───────────────────────────────────────────────────
do $$
begin
  begin
    execute 'alter publication supabase_realtime add table public.support_messages';
  exception when duplicate_object then null;
  end;
  begin
    execute 'alter publication supabase_realtime add table public.support_threads';
  exception when duplicate_object then null;
  end;
end$$;
