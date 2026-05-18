-- WebAgency schema v0.1

-- Roles
create type public.app_role as enum ('customer', 'consultant', 'admin');
create type public.consultant_status as enum ('pending', 'approved', 'rejected');

-- Profiles (one per auth.user)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.app_role not null default 'customer',
  consultant_status public.consultant_status,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Demos (10 seeded rows; admin can edit metadata)
create table public.demos (
  slug text primary key,
  title text not null,
  tagline text not null,
  category text not null,
  description text not null,
  features text[] not null default '{}',
  price_usd integer not null default 0,
  preview_path text not null,
  thumbnail_color text not null default '#6366f1',
  icon text not null default 'sparkles',
  enabled boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Conversations (one per customer; latest one is "active")
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  consultant_id uuid references public.profiles(id) on delete set null,
  subject text,
  status text not null default 'open' check (status in ('open','closed','archived')),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index conversations_customer_idx on public.conversations(customer_id);
create index conversations_consultant_idx on public.conversations(consultant_id);
create index conversations_last_message_idx on public.conversations(last_message_at desc);

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (length(body) between 1 and 4000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index messages_conversation_idx on public.messages(conversation_id, created_at);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role, consultant_status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce((new.raw_user_meta_data->>'role')::app_role, 'customer'),
    case
      when (new.raw_user_meta_data->>'role') = 'consultant' then 'pending'::consultant_status
      else null
    end
  );
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Bump conversation last_message_at on new message
create or replace function public.bump_conversation_timestamp()
returns trigger language plpgsql as $$
begin
  update public.conversations
    set last_message_at = new.created_at
    where id = new.conversation_id;
  return new;
end $$;

create trigger on_message_created
  after insert on public.messages
  for each row execute function public.bump_conversation_timestamp();

-- RLS
alter table public.profiles enable row level security;
alter table public.demos enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- profiles: self-read; admin-read-all; user-update-self
create policy profiles_self_read on public.profiles
  for select using (auth.uid() = id);
create policy profiles_admin_read on public.profiles
  for select using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id);
create policy profiles_admin_update on public.profiles
  for update using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- demos: public read of enabled; admin full
create policy demos_public_read on public.demos
  for select using (enabled = true or exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy demos_admin_write on public.demos
  for all using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- conversations: customer sees own; consultant sees assigned or unassigned-open; admin sees all
create policy conv_customer_read on public.conversations
  for select using (customer_id = auth.uid());
create policy conv_consultant_read on public.conversations
  for select using (
    exists(select 1 from public.profiles p
           where p.id = auth.uid()
             and p.role = 'consultant'
             and p.consultant_status = 'approved')
    and (consultant_id = auth.uid() or consultant_id is null)
  );
create policy conv_admin_read on public.conversations
  for select using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy conv_customer_insert on public.conversations
  for insert with check (customer_id = auth.uid());
create policy conv_consultant_update on public.conversations
  for update using (
    exists(select 1 from public.profiles p
           where p.id = auth.uid() and p.role = 'consultant' and p.consultant_status = 'approved')
  );
create policy conv_admin_all on public.conversations
  for all using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- messages: participants can read+write their conversation
create policy msg_participant_read on public.messages
  for select using (
    exists(select 1 from public.conversations c
           where c.id = conversation_id
             and (c.customer_id = auth.uid() or c.consultant_id = auth.uid()))
    or exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin')
  );
create policy msg_participant_insert on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists(select 1 from public.conversations c
               where c.id = conversation_id
                 and (c.customer_id = auth.uid() or c.consultant_id = auth.uid()
                      or exists(select 1 from public.profiles p
                                where p.id = auth.uid()
                                  and p.role = 'consultant'
                                  and p.consultant_status = 'approved')))
  );

-- Realtime publication
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.conversations;

-- Seed 10 demos
insert into public.demos (slug, title, tagline, category, description, features, price_usd, preview_path, thumbnail_color, icon, display_order) values
('china-agency',  'Study-in-China Agency',  'Send students to top Chinese universities', 'Education',  'End-to-end CRM for agencies that place students at Chinese universities — applications, document tracking, visa workflow, commission reports.', array['Application pipeline','Document vault','Visa tracker','Partner universities','Commission reports'], 1200, '/demos/china-agency/preview',  '#b91c1c', 'graduation-cap',  1),
('university',    'University Portal',      'Student information system for higher ed', 'Education',   'Course catalog, enrollment, gradebook, faculty hub, and student self-service for universities.', array['Course catalog','Enrollment','Gradebook','Faculty portal','Self-service'], 2400, '/demos/university/preview',    '#7c2d12', 'school',           2),
('school',        'K-12 School Portal',     'School management for parents, teachers, students', 'Education', 'Attendance, gradebook, homework, parent messaging, and bus tracking for primary and secondary schools.', array['Attendance','Gradebook','Homework','Parent chat','Reports'], 1800, '/demos/school/preview',         '#0284c7', 'backpack',         3),
('restaurant',    'Restaurant Operating System', 'Tables, orders, kitchen display, reservations', 'Hospitality', 'Floor plan, table-side ordering, KDS, reservation book, and end-of-day reports for full-service restaurants.', array['Tables','Orders','KDS','Reservations','Reports'], 1500, '/demos/restaurant/preview',  '#c2410c', 'utensils',         4),
('accounting',    'Accounting Suite',       'Bookkeeping, invoices, reports', 'Finance',          'Double-entry bookkeeping, invoicing, expense tracking, and audit-ready financial reports.', array['Ledger','Invoices','Expenses','VAT','Reports'], 2200, '/demos/accounting/preview',     '#1e3a8a', 'calculator',       5),
('hospital',      'Clinic & Hospital Ops',  'Patients, appointments, EMR-lite', 'Healthcare',     'Patient registry, appointments, prescriptions, lab results, and billing for clinics and small hospitals.', array['Patients','Appointments','Prescriptions','Lab','Billing'], 2800, '/demos/hospital/preview',     '#0d9488', 'stethoscope',      6),
('gym',           'Gym Membership Hub',     'Memberships, classes, trainers', 'Fitness',          'Member CRM, class scheduling, trainer assignments, and check-in kiosk for gyms and studios.', array['Members','Classes','Trainers','Check-in','Payments'], 1100, '/demos/gym/preview',                  '#16a34a', 'dumbbell',         7),
('shopping',      'Storefront',             'Modern e-commerce front + admin', 'Commerce',        'Product catalog, cart, checkout, order management, and inventory for online stores.', array['Catalog','Cart','Checkout','Orders','Inventory'], 1900, '/demos/shopping/preview',           '#db2777', 'shopping-bag',     8),
('travel-agency', 'Travel Agency Platform', 'Tours, bookings, itineraries', 'Travel',             'Tour catalog, multi-room bookings, itinerary builder, and traveler CRM for agencies.', array['Tours','Bookings','Itinerary','CRM','Payments'], 1700, '/demos/travel-agency/preview',  '#0891b2', 'plane',            9),
('beauty-salon',  'Beauty & Spa Booking',   'Appointments, services, stylists', 'Beauty',         'Service menu, stylist calendars, online booking, and client history for salons and spas.', array['Services','Calendar','Stylists','Clients','SMS'], 900,  '/demos/beauty-salon/preview',  '#a21caf', 'scissors',         10);
