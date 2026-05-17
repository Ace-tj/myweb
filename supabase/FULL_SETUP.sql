-- ============================================================
-- myweb — Complete Supabase Setup
-- Run this entire file in the Supabase SQL Editor.
-- Order matters: run top to bottom, do NOT skip sections.
-- ============================================================

-- ============================================================
-- SECTION 1: EXTENSIONS
-- ============================================================
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for fast text search


-- ============================================================
-- SECTION 2: TABLES
-- ============================================================

-- ---- profiles ----
-- One row per auth.users row. Created automatically via trigger.
create table if not exists public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  email              text,
  role               text not null default 'buyer'
                       check (role in ('admin', 'buyer', 'consultant')),
  is_agent           boolean not null default false,
  -- `name` is the legacy column shared with another app; `full_name` is what
  -- this app reads/writes. A BEFORE trigger keeps them in sync (see below).
  name               text not null default '',
  full_name          text not null default '',
  phone              text not null default '',
  avatar_url         text,
  bio                text,
  preferred_language text not null default 'en'
                       check (preferred_language in ('en', 'ru', 'tg')),
  approved           boolean not null default false,
  banned             boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Keep `name` and `full_name` in lockstep regardless of which one a writer fills.
create or replace function public.profiles_sync_name()
returns trigger
language plpgsql
as $$
begin
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
comment on table public.profiles is
  'Extended user profile. Mirrors auth.users; role drives access control.';

create index if not exists profiles_email_idx
  on public.profiles (lower(email));

-- ---- demos ----
create table if not exists public.demos (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  category      text not null,
  title_key     text not null,
  description_key text not null,
  thumbnail_url text,
  preview_url   text,
  base_price_usd numeric(10,2) not null default 0,
  tech_tags     text[] not null default '{}',
  featured      boolean not null default false,
  display_order int not null default 0,
  created_at    timestamptz not null default now()
);
comment on table public.demos is
  'The 10 demo templates shown in the storefront gallery.';

-- ---- projects ----
create table if not exists public.projects (
  id             uuid primary key default gen_random_uuid(),
  buyer_id       uuid not null references public.profiles(id) on delete cascade,
  consultant_id  uuid references public.profiles(id) on delete set null,
  demo_id        uuid not null references public.demos(id),
  brief          jsonb not null default '{}',
  status         text not null default 'new'
                   check (status in (
                     'new', 'assigned', 'quoted',
                     'in_progress', 'review', 'delivered', 'cancelled'
                   )),
  quote_amount   numeric(10,2),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
comment on table public.projects is
  'A buyer''s request for a custom build, linked to a demo template.';

-- ---- quotes ----
create table if not exists public.quotes (
  id             uuid primary key default gen_random_uuid(),
  project_id     uuid not null references public.projects(id) on delete cascade,
  consultant_id  uuid not null references public.profiles(id),
  amount_usd     numeric(10,2) not null,
  scope_notes    text,
  status         text not null default 'pending'
                   check (status in ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at     timestamptz not null default now()
);

-- ---- milestones ----
create table if not exists public.milestones (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  title       text not null,
  description text,
  amount_usd  numeric(10,2),
  status      text not null default 'pending'
                check (status in ('pending', 'in_progress', 'done', 'approved', 'rejected')),
  due_date    date,
  created_at  timestamptz not null default now()
);

-- ---- messages ----
create table if not exists public.messages (
  id                   uuid primary key default gen_random_uuid(),
  project_id           uuid not null references public.projects(id) on delete cascade,
  sender_id            uuid not null references public.profiles(id),
  body                 text,
  attachment_url       text,
  attachment_type      text check (attachment_type in ('image', 'file', 'voice')),
  attachment_filename  text,
  attachment_size_bytes int,
  reply_to_id          uuid references public.messages(id) on delete set null,
  reactions            jsonb not null default '{}',
  read_by              uuid[] not null default '{}',
  created_at           timestamptz not null default now()
);
comment on column public.messages.reactions is
  'Map of emoji → array of user IDs. e.g. {"👍": ["uuid1","uuid2"]}';

create index if not exists messages_project_created_idx
  on public.messages(project_id, created_at);
create index if not exists messages_sender_idx
  on public.messages(sender_id);

-- ---- reviews ----
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id),
  rating      int not null check (rating between 1 and 5),
  body        text,
  created_at  timestamptz not null default now(),
  unique(project_id, reviewer_id)
);

-- ---- notifications ----
create table if not exists public.notifications (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  type        text not null,
  title       text not null,
  body        text,
  link        text,
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists notifications_user_read_idx
  on public.notifications(user_id, read, created_at desc);

-- ---- support_threads ----
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


-- ============================================================
-- SECTION 3: TRIGGERS & FUNCTIONS
-- ============================================================

-- 3a. Auto-create profile when a new user signs up.
-- IMPORTANT: wrapped in EXCEPTION so a profile-side failure never
-- rolls back the auth.users insert (signup must always succeed at the
-- auth layer; the app self-heals the profile on next request).
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
      -- buyers are auto-approved; consultants need admin approval
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

-- 3b. Auto-update `updated_at` on projects
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute procedure public.touch_updated_at();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.touch_updated_at();

-- 3c. When a quote is accepted → update project status + quote_amount
create or replace function public.handle_quote_accepted()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.status = 'accepted' and old.status != 'accepted' then
    update public.projects
    set
      status         = 'in_progress',
      quote_amount   = new.amount_usd,
      consultant_id  = new.consultant_id
    where id = new.project_id;

    -- reject all other pending quotes for this project
    update public.quotes
    set status = 'rejected'
    where project_id = new.project_id
      and id != new.id
      and status = 'pending';
  end if;
  return new;
end;
$$;

drop trigger if exists quote_accepted_trigger on public.quotes;
create trigger quote_accepted_trigger
  after update on public.quotes
  for each row execute procedure public.handle_quote_accepted();

-- 3d. Create notification when a new message is sent
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

  -- notify the OTHER participant
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
      v_sender_name || ' sent you a message',
      left(coalesce(new.body, '[attachment]'), 100),
      '/buyer/projects/' || new.project_id::text
    );
  end if;

  return new;
end;
$$;

drop trigger if exists message_notify_trigger on public.messages;
create trigger message_notify_trigger
  after insert on public.messages
  for each row execute procedure public.notify_on_message();

-- 3e. Notify buyer when consultant sends a quote
create or replace function public.notify_on_quote()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_buyer_id uuid;
begin
  if new.status = 'pending' and (tg_op = 'INSERT') then
    select buyer_id into v_buyer_id
      from public.projects where id = new.project_id;

    insert into public.notifications(user_id, type, title, body, link)
    values (
      v_buyer_id,
      'new_quote',
      'You received a quote!',
      'A consultant sent a quote of $' || new.amount_usd::text || ' for your project.',
      '/buyer/projects/' || new.project_id::text
    );
  end if;
  return new;
end;
$$;

drop trigger if exists quote_notify_trigger on public.quotes;
create trigger quote_notify_trigger
  after insert on public.quotes
  for each row execute procedure public.notify_on_quote();


-- ============================================================
-- SECTION 4: ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles           enable row level security;
alter table public.demos              enable row level security;
alter table public.projects           enable row level security;
alter table public.quotes             enable row level security;
alter table public.milestones         enable row level security;
alter table public.messages           enable row level security;
alter table public.reviews            enable row level security;
alter table public.notifications      enable row level security;
alter table public.support_threads    enable row level security;
alter table public.support_messages   enable row level security;

-- helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
$$;

-- ---- profiles policies ----
drop policy if exists "profiles: anyone can read" on public.profiles;
create policy "profiles: anyone can read"
  on public.profiles for select
  using (true);

drop policy if exists "profiles: user updates own" on public.profiles;
create policy "profiles: user updates own"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "profiles: user inserts own" on public.profiles;
create policy "profiles: user inserts own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles: admin full access" on public.profiles;
create policy "profiles: admin full access"
  on public.profiles for all
  using (public.is_admin());

-- ---- demos policies ----
drop policy if exists "demos: anyone can read" on public.demos;
create policy "demos: anyone can read"
  on public.demos for select
  using (true);

drop policy if exists "demos: admin can write" on public.demos;
create policy "demos: admin can write"
  on public.demos for all
  using (public.is_admin());

-- ---- projects policies ----
drop policy if exists "projects: participants can read" on public.projects;
create policy "projects: participants can read"
  on public.projects for select
  using (
    buyer_id = auth.uid()
    or consultant_id = auth.uid()
    or public.is_admin()
  );

drop policy if exists "projects: buyer can insert" on public.projects;
create policy "projects: buyer can insert"
  on public.projects for insert
  with check (buyer_id = auth.uid());

drop policy if exists "projects: buyer can update own" on public.projects;
create policy "projects: buyer can update own"
  on public.projects for update
  using (buyer_id = auth.uid());

drop policy if exists "projects: consultant can update assigned" on public.projects;
create policy "projects: consultant can update assigned"
  on public.projects for update
  using (consultant_id = auth.uid());

drop policy if exists "projects: admin full access" on public.projects;
create policy "projects: admin full access"
  on public.projects for all
  using (public.is_admin());

-- ---- quotes policies ----
drop policy if exists "quotes: participants can read" on public.quotes;
create policy "quotes: participants can read"
  on public.quotes for select
  using (
    consultant_id = auth.uid()
    or exists (
      select 1 from public.projects p
      where p.id = project_id and p.buyer_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "quotes: consultant can insert" on public.quotes;
create policy "quotes: consultant can insert"
  on public.quotes for insert
  with check (consultant_id = auth.uid());

drop policy if exists "quotes: consultant can update own" on public.quotes;
create policy "quotes: consultant can update own"
  on public.quotes for update
  using (consultant_id = auth.uid());

drop policy if exists "quotes: buyer can update status" on public.quotes;
create policy "quotes: buyer can update status"
  on public.quotes for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.buyer_id = auth.uid()
    )
  );

drop policy if exists "quotes: admin full access" on public.quotes;
create policy "quotes: admin full access"
  on public.quotes for all
  using (public.is_admin());

-- ---- milestones policies ----
drop policy if exists "milestones: participants can read" on public.milestones;
create policy "milestones: participants can read"
  on public.milestones for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and (p.buyer_id = auth.uid() or p.consultant_id = auth.uid())
    )
    or public.is_admin()
  );

drop policy if exists "milestones: consultant can insert" on public.milestones;
create policy "milestones: consultant can insert"
  on public.milestones for insert
  with check (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.consultant_id = auth.uid()
    )
  );

drop policy if exists "milestones: consultant can update" on public.milestones;
create policy "milestones: consultant can update"
  on public.milestones for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.consultant_id = auth.uid()
    )
  );

drop policy if exists "milestones: buyer can approve" on public.milestones;
create policy "milestones: buyer can approve"
  on public.milestones for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.buyer_id = auth.uid()
    )
  );

drop policy if exists "milestones: admin full access" on public.milestones;
create policy "milestones: admin full access"
  on public.milestones for all
  using (public.is_admin());

-- ---- messages policies ----
drop policy if exists "messages: participants can read" on public.messages;
create policy "messages: participants can read"
  on public.messages for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and (p.buyer_id = auth.uid() or p.consultant_id = auth.uid())
    )
    or public.is_admin()
  );

drop policy if exists "messages: participant can insert" on public.messages;
create policy "messages: participant can insert"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.projects p
      where p.id = project_id
        and (p.buyer_id = auth.uid() or p.consultant_id = auth.uid())
    )
  );

drop policy if exists "messages: sender can update own" on public.messages;
create policy "messages: sender can update own"
  on public.messages for update
  using (sender_id = auth.uid());

-- ---- reviews policies ----
drop policy if exists "reviews: participants can read" on public.reviews;
create policy "reviews: participants can read"
  on public.reviews for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id
        and (p.buyer_id = auth.uid() or p.consultant_id = auth.uid())
    )
    or public.is_admin()
  );

drop policy if exists "reviews: buyer can insert" on public.reviews;
create policy "reviews: buyer can insert"
  on public.reviews for insert
  with check (
    reviewer_id = auth.uid()
    and exists (
      select 1 from public.projects p
      where p.id = project_id and p.buyer_id = auth.uid()
        and p.status = 'delivered'
    )
  );

-- ---- notifications policies ----
drop policy if exists "notifications: own only" on public.notifications;
create policy "notifications: own only"
  on public.notifications for all
  using (user_id = auth.uid());

drop policy if exists "notifications: admin read all" on public.notifications;
create policy "notifications: admin read all"
  on public.notifications for select
  using (public.is_admin());

-- ---- support_threads policies ----
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

-- ---- support_messages policies ----
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

-- ---- support: bump last_message_at + unread counters on insert ----
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


-- ============================================================
-- SECTION 5: REALTIME
-- (Enables live chat and live notifications)
-- ============================================================
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.projects;
alter publication supabase_realtime add table public.quotes;
alter publication supabase_realtime add table public.milestones;
alter publication supabase_realtime add table public.support_threads;
alter publication supabase_realtime add table public.support_messages;


-- ============================================================
-- SECTION 6: STORAGE BUCKETS
-- (Run in the SQL editor — bucket creation via API is also fine)
-- ============================================================

-- Chat attachments (images, files)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'attachments',
  'attachments',
  false,
  10485760, -- 10 MB
  array[
    'image/jpeg','image/png','image/gif','image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
)
on conflict (id) do nothing;

-- User avatars (public read)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  2097152, -- 2 MB
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do nothing;

-- Demo thumbnails (public read, admin write)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'demo-thumbnails',
  'demo-thumbnails',
  true,
  5242880, -- 5 MB
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do nothing;

-- Storage RLS policies
create policy "attachments: authenticated can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'attachments'
    and auth.role() = 'authenticated'
  );

create policy "attachments: project participants can read"
  on storage.objects for select
  using (
    bucket_id = 'attachments'
    and auth.role() = 'authenticated'
  );

create policy "avatars: public read"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "avatars: owner can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "demo-thumbnails: public read"
  on storage.objects for select
  using (bucket_id = 'demo-thumbnails');

create policy "demo-thumbnails: admin can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'demo-thumbnails'
    and public.is_admin()
  );


-- ============================================================
-- SECTION 7: SEED DATA — 10 DEMOS
-- ============================================================
insert into public.demos
  (slug, category, title_key, description_key, base_price_usd, tech_tags, featured, display_order)
values
  ('shop',        'ecommerce',  'demos.shop.title',       'demos.shop.description',         499,  array['web','payments','responsive'],                       true,  1),
  ('gym',         'fitness',    'demos.gym.title',         'demos.gym.description',          599,  array['web','scheduling','members'],                        true,  2),
  ('accounting',  'business',   'demos.accounting.title',  'demos.accounting.description',   799,  array['web','reports','invoicing'],                         true,  3),
  ('china-uni',   'education',  'demos.china_uni.title',   'demos.china_uni.description',    999,  array['web','documents','multi-role','applications'],       true,  4),
  ('school',      'education',  'demos.school.title',      'demos.school.description',       699,  array['web','students','grades','attendance'],              false, 5),
  ('university',  'education',  'demos.university.title',  'demos.university.description',   899,  array['web','students','courses','exams'],                  false, 6),
  ('restaurant',  'food',       'demos.restaurant.title',  'demos.restaurant.description',   549,  array['web','orders','kitchen','menu'],                     true,  7),
  ('personal',    'personal',   'demos.personal.title',    'demos.personal.description',     299,  array['web','portfolio','contact'],                         false, 8),
  ('clinic',      'health',     'demos.clinic.title',      'demos.clinic.description',       749,  array['web','appointments','patients','prescriptions'],     false, 9),
  ('logistics',   'logistics',  'demos.logistics.title',   'demos.logistics.description',    649,  array['web','shipments','drivers','tracking'],              false, 10)
on conflict (slug) do update set
  category       = excluded.category,
  title_key      = excluded.title_key,
  description_key = excluded.description_key,
  base_price_usd = excluded.base_price_usd,
  tech_tags      = excluded.tech_tags,
  featured       = excluded.featured,
  display_order  = excluded.display_order;


-- ============================================================
-- SECTION 8: SEED ADMIN USER
-- ============================================================
-- IMPORTANT: First create the admin user via Supabase Dashboard →
-- Authentication → Users → "Add user" with:
--   Email: admin@myweb.app
--   Password: (choose a strong password)
--
-- Then run this to upgrade them to admin role:
--
-- update public.profiles
-- set role = 'admin', approved = true
-- where id = (
--   select id from auth.users where email = 'admin@myweb.app'
-- );
--
-- (Uncomment and run AFTER creating the user above.)


-- ============================================================
-- SECTION 9: USEFUL ADMIN QUERIES (for reference)
-- ============================================================

-- List all users with their roles:
-- select p.id, p.name, p.role, p.approved, p.banned, u.email, p.created_at
-- from public.profiles p
-- join auth.users u on u.id = p.id
-- order by p.created_at desc;

-- Approve a consultant:
-- update public.profiles set approved = true where id = '<consultant-uuid>';

-- Ban a user:
-- update public.profiles set banned = true where id = '<user-uuid>';

-- All projects with buyer and consultant info:
-- select
--   pr.id, pr.status, pr.created_at,
--   b.name as buyer, c.name as consultant,
--   d.slug as demo
-- from public.projects pr
-- join public.profiles b on b.id = pr.buyer_id
-- left join public.profiles c on c.id = pr.consultant_id
-- join public.demos d on d.id = pr.demo_id
-- order by pr.created_at desc;
