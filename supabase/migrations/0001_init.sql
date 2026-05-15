-- myweb initial schema
-- Phase 1 of build plan; see /home/asus/myweb/PLAN.md §7

-- ===== profiles =====
-- Mirrors auth.users; one row per user with role + metadata.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','buyer','consultant')),
  is_agent boolean not null default false,
  name text not null,
  avatar_url text,
  bio text,
  preferred_language text not null default 'en' check (preferred_language in ('ru','tg','en')),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ===== demos =====
create table if not exists public.demos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null,
  title_key text not null,
  description_key text not null,
  thumbnail_url text,
  preview_url text,
  base_price_usd numeric(10,2) not null,
  tech_tags text[] not null default '{}',
  featured boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ===== projects =====
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  consultant_id uuid references public.profiles(id) on delete set null,
  demo_id uuid not null references public.demos(id),
  brief jsonb not null,
  status text not null default 'new' check (status in ('new','assigned','quoted','in_progress','review','delivered','cancelled')),
  quote_amount numeric(10,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ===== messages (project chat) =====
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text,
  attachment_url text,
  attachment_type text check (attachment_type in ('image','file','voice')),
  attachment_filename text,
  attachment_size_bytes int,
  reply_to_id uuid references public.messages(id),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists messages_project_created_idx
  on public.messages (project_id, created_at);

-- ===== message_reactions =====
create table if not exists public.message_reactions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.messages(id) on delete cascade,
  user_id uuid not null references public.profiles(id),
  emoji text not null,
  created_at timestamptz not null default now(),
  unique(message_id, user_id, emoji)
);

-- ===== milestones =====
create table if not exists public.milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  amount_usd numeric(10,2),
  status text not null default 'pending' check (status in ('pending','in_progress','done','approved','rejected')),
  due_date date,
  created_at timestamptz not null default now()
);

-- ===== quotes =====
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  consultant_id uuid not null references public.profiles(id),
  amount_usd numeric(10,2) not null,
  scope_notes text,
  status text not null default 'pending' check (status in ('pending','accepted','rejected','withdrawn')),
  created_at timestamptz not null default now()
);

-- ===== reviews =====
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now()
);

-- ===== RLS =====
alter table public.profiles enable row level security;
alter table public.demos enable row level security;
alter table public.projects enable row level security;
alter table public.messages enable row level security;
alter table public.message_reactions enable row level security;
alter table public.milestones enable row level security;
alter table public.quotes enable row level security;
alter table public.reviews enable row level security;

-- profiles: anyone reads; user updates own; admin updates any
create policy profiles_select_all on public.profiles for select using (true);
create policy profiles_update_own on public.profiles for update using (auth.uid() = id);
create policy profiles_admin_all on public.profiles for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- demos: anyone reads; admin writes
create policy demos_select_all on public.demos for select using (true);
create policy demos_admin_write on public.demos for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- projects: buyer sees own; consultant sees assigned; admin sees all
create policy projects_visibility on public.projects for select using (
  buyer_id = auth.uid()
  or consultant_id = auth.uid()
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy projects_buyer_insert on public.projects for insert with check (buyer_id = auth.uid());
create policy projects_buyer_update on public.projects for update using (buyer_id = auth.uid());
create policy projects_consultant_update on public.projects for update using (consultant_id = auth.uid());
create policy projects_admin_all on public.projects for all using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);

-- messages: only buyer+consultant of project; admin sees all
create policy messages_visibility on public.messages for select using (
  exists (
    select 1 from public.projects pr
    where pr.id = messages.project_id
      and (pr.buyer_id = auth.uid() or pr.consultant_id = auth.uid())
  )
  or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy messages_insert on public.messages for insert with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.projects pr
    where pr.id = project_id
      and (pr.buyer_id = auth.uid() or pr.consultant_id = auth.uid())
  )
);

-- reactions, milestones, quotes, reviews: scoped through parent project
create policy reactions_scoped on public.message_reactions for all using (
  exists (
    select 1 from public.messages m
    join public.projects pr on pr.id = m.project_id
    where m.id = message_reactions.message_id
      and (pr.buyer_id = auth.uid() or pr.consultant_id = auth.uid())
  )
);

create policy milestones_scoped on public.milestones for all using (
  exists (
    select 1 from public.projects pr
    where pr.id = milestones.project_id
      and (pr.buyer_id = auth.uid() or pr.consultant_id = auth.uid()
           or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  )
);

create policy quotes_scoped on public.quotes for all using (
  exists (
    select 1 from public.projects pr
    where pr.id = quotes.project_id
      and (pr.buyer_id = auth.uid() or pr.consultant_id = auth.uid()
           or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'))
  )
);

create policy reviews_scoped on public.reviews for all using (
  exists (
    select 1 from public.projects pr
    where pr.id = reviews.project_id
      and pr.buyer_id = auth.uid()
  )
);
