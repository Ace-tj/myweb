# myweb — Full Build Plan

> **Project name:** myweb
> **Project root:** /home/asus/myweb
> **Status:** Phase 0 in progress (2026-05-15)
>
> **Locked decisions for the 5 open questions in §13:**
> 1. Languages: **Russian (`ru`), Tajik (`tg`), English (`en`)** — default `en` for development
> 2. Demos 9 & 10: **Clinic + Logistics** as drafted
> 3. Project name: **myweb**
> 4. Domain: deferred to deploy time
> 5. Stripe: deferred to Phase 10

This is a self-contained brief. Read it top to bottom before writing any code. If something here conflicts with a later instruction from the user, ask the user to resolve.

---

## 1. Mission (one paragraph)

Build a web platform that **looks and feels like a store selling ready-made websites and apps**. The storefront displays 10 fully-functional **demo systems** (each with seeded sample data, unique design, unique icon set, and 3-language UI). When a buyer likes a demo, they click "I want this" → fill a short brief → get matched with a consultant → chat with the consultant (rich messenger: text + emoji + images + photos + files) → receive a quote → approve milestones → receive the customized build. Three account types — **admin**, **buyer**, **consultant** — with one special sub-role: **agent** (a consultant flagged for the Chinese-university demo who can post universities and submit student applications).

---

## 2. Roles & permissions

| Role | Can do |
|---|---|
| **Visitor** (logged out) | Browse storefront, view all 10 demos, switch language |
| **Buyer** | Everything Visitor can + create project requests, chat with assigned consultant, approve/reject quotes & milestones, upload reference files, leave reviews |
| **Consultant** | View inbox of new requests, claim or be assigned projects, send quotes, chat with buyers (rich messenger), upload work-in-progress files, mark milestones done |
| **Agent** (consultant + agent flag) | Everything Consultant can + post Chinese universities (in Demo 4's seeded backend), review student applications inside Demo 4 |
| **Admin** | Manage all users (approve consultants, ban, promote to agent), manage the 10 demo gallery (titles, thumbnails, base prices, featured order), oversee all projects, resolve disputes, view revenue dashboard |

Auth gates:
- Buyer signup = open (email + password, email verification)
- Consultant signup = requires admin approval before login works
- Admin = seeded manually in the database; no signup form

---

## 3. Storefront design — "the store"

The landing page must feel like a **product store** (think Apple, Linear, or Shopify themes pages), not a generic agency site.

**Landing sections (top to bottom):**
1. Hero — big tagline, language switcher top-right, "Browse demos" CTA
2. Featured demos carousel (3 cards)
3. Full grid of all 10 demos (filter by category)
4. "How it works" — 4 steps (Browse → Request → Chat → Receive)
5. Testimonials (placeholder until real ones)
6. Pricing tiers (Basic / Pro / Enterprise per demo)
7. Footer (3 languages, contact, social)

**Demo cards in the grid must show:**
- Thumbnail screenshot of that demo's home page
- Demo name (translated)
- Short description (translated)
- Base price ("From $X")
- Tech tags (e.g. "Web + Mobile", "Multi-tenant")
- "Preview" button → opens full live demo
- "I want this" button → buyer brief form

Aesthetic = clean, modern, slightly playful. Tailwind + shadcn/ui base. Each demo has its OWN visual identity (see §4) but the storefront itself is one cohesive brand.

---

## 4. The 10 demos (each must be a working clickable mini-app with seeded data)

For each demo: build a fully navigable mini-app under `/demos/<slug>`. Use seeded fake data in Supabase under a separate schema per demo (or use JSON fixtures if no writes are needed for previewing). Each demo MUST have:
- **Unique color palette** (not the storefront's palette)
- **Unique icon set** (use Lucide for storefront, but mix in Phosphor / Tabler / Hugeicons across demos so each feels different)
- **Unique typography pairing** (one serif/sans combo per demo)
- **3-language UI** (ru, tg, en — see §6)
- **Mobile responsive**
- **Seeded sample data** so it feels alive

### Demo 1 — Shopping Program (e-commerce)
- Pages: Storefront, product list, product detail, cart, checkout, order tracking, admin product manager
- Features: filters, search, cart persistence (localStorage in demo), fake checkout, order status
- Vibe: warm, retail-friendly — coral/cream palette, rounded cards
- Icon set: Phosphor (filled)

### Demo 2 — Gym Owner Program
- Pages: Member list, class schedule, trainer roster, attendance tracker, membership plans, billing dashboard, check-in kiosk view
- Features: weekly calendar, member profile with progress photos placeholder, plan comparison
- Vibe: bold, athletic — black/neon-green palette, sharp angles
- Icon set: Tabler

### Demo 3 — Accounting Program
- Pages: Dashboard with KPIs, invoices list + create, expenses, clients, reports (P&L, balance sheet), tax summary
- Features: line-item invoice builder, chart visualizations (recharts), CSV export button
- Vibe: serious, trustworthy — navy/white/gold palette, dense tables
- Icon set: Lucide (thin stroke)

### Demo 4 — Chinese University Program (most complex demo, has its own role split inside)
- Pages:
  - **Public** — University catalog (filterable by city, language of instruction, tuition, grant %), university detail page with photos, programs, grant info, application deadline
  - **Student view** — browse universities, "Apply" button → upload required documents (passport, transcript, language cert, motivation letter), application status tracker, messages with agent
  - **Agent view** (the in-demo agent role) — post new university (form with all fields), list of student applications assigned to them, review documents, mark application as "submitted to university" / "accepted" / "rejected"
- Features: document upload, application status workflow, agent ↔ student messaging (smaller messenger, scoped to this demo's seeded data)
- Vibe: scholarly, international — deep red + cream + gold (nods to Chinese aesthetic without being kitsch)
- Icon set: Hugeicons
- Note: this demo's internal "agent" role is part of the demo's seeded users, separate from the meta-platform's Consultant-with-Agent-flag. Use seed users like `agent1@demo`, `student1@demo`.

### Demo 5 — Schools System (K-12)
- Pages: Student roster, class assignment, teacher dashboard, gradebook, attendance, parent portal view, announcements
- Features: gradebook with averages, attendance heatmap, parent-teacher message thread
- Vibe: friendly, bright — sky-blue/yellow palette, large playful icons
- Icon set: Hugeicons (duotone)

### Demo 6 — University Systems (higher ed admin)
- Pages: Course catalog, enrollment, student records, faculty directory, schedule builder, transcript view, billing
- Features: course conflict checker, GPA calc, transcript PDF preview
- Vibe: institutional, modern — burgundy/grey/white palette
- Icon set: Lucide (thicker stroke)

### Demo 7 — Restaurant System (POS + management)
- Pages: Menu, table layout, order taking, kitchen ticket view, sales reports, staff scheduling, online ordering page
- Features: drag-to-table assignment, real-time order ticket flow (simulated)
- Vibe: appetite-driven, warm — terracotta/cream/olive palette
- Icon set: Phosphor (regular weight)

### Demo 8 — Personal Information System (CRM / records keeper)
- Pages: Contacts list, contact detail (notes, tags, history), tasks, calendar, documents vault, search
- Features: tag filtering, timeline view, file vault with categories
- Vibe: minimalist, focused — black/white/single-accent palette
- Icon set: Lucide (very thin)

### Demo 9 — Clinic / Medical Appointment System (proposed 9th)
- Pages: Patient list, appointment calendar, doctor schedule, prescription writer, billing, patient portal view
- Features: time-slot booking, prescription template, patient history timeline
- Vibe: calm, medical — soft teal/white palette
- Icon set: Tabler (medical icons)

### Demo 10 — Logistics / Delivery Management (proposed 10th)
- Pages: Order intake, driver assignment, route map, package tracking, customer notifications, fleet dashboard
- Features: map view (Leaflet + OpenStreetMap, no API key needed), status timeline per package
- Vibe: industrial, fast — slate/orange palette
- Icon set: Phosphor (bold)

**If the user wants to swap Demo 9 or 10, ask before building them.**

---

## 5. Messenger spec (the "great interaction" heart)

Per-project chat between buyer ↔ consultant, lives at `/projects/[id]/chat`. Must support:

| Feature | Implementation |
|---|---|
| Realtime delivery | Supabase Realtime (postgres_changes on `messages` table) |
| Text messages | Plain text, markdown rendering optional |
| Emoji picker | `emoji-picker-react` (works offline, no API) |
| Image upload | Supabase Storage, image preview inline, lightbox on click |
| Photo upload (camera) | `<input type="file" accept="image/*" capture="environment">` on mobile |
| File attachments | PDF, DOCX, XLSX up to 25 MB; show filename + size + download icon |
| Typing indicator | Broadcast channel on Supabase Realtime, debounced 1s |
| Read receipts | `messages.read_at` timestamp, double-check icon |
| Message reactions | `message_reactions` table; tap any message to add emoji |
| Reply / quote | `messages.reply_to_id` foreign key, show quoted preview above reply |
| Unread badge | Count of unread messages in nav per project |
| Message search | Full-text search on `messages.body` within a project |
| Mentions | `@username` autocomplete (only buyer & consultant of that project) |
| Sound notifications | Optional toggle, play short ping on new message when tab inactive |
| Mobile responsive | Full-screen view on mobile, side-by-side desktop |

**UI layout:** Telegram/Slack-style — left sidebar with project list (unread bold), right pane with chat. Input bar bottom with emoji button, attachment paperclip, send button.

---

## 6. Internationalization (3 languages)

**Languages (locked):** Russian `ru`, Tajik `tg`, English `en`. Default for new visitors: `en` (until language switched).

**Implementation:**
- Library: `next-intl` (App Router compatible)
- Locale prefix in URL: `/en/demos/shop`, `/ru/demos/shop`, `/tg/demos/shop`
- Translation files: `src/messages/en.json`, `ru.json`, `tg.json`
- Language switcher: globe icon top-right of every page, dropdown with the 3 languages (label each in its own script: English / Русский / Тоҷикӣ)
- Auto-detect on first visit via `Accept-Language` header, fall back to `en`, then remember user choice in cookie
- ALL UI strings (storefront + every demo + admin + buyer + consultant dashboards) live in translation files. No hardcoded strings in JSX.
- RTL support: not needed for these 3 languages (Tajik in Cyrillic script is LTR).

**Translation workflow:** write English first; operator fills `ru.json` and `tg.json` (operator speaks Russian and reads Cyrillic Tajik). For initial dev, `ru.json` and `tg.json` can hold `TODO:` placeholders so the UI doesn't crash — fill before deploy.

---

## 7. Database schema (Supabase / Postgres)

```sql
-- Core users (Supabase auth.users handles auth; this is the profile)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','buyer','consultant')),
  is_agent boolean default false, -- only meaningful when role='consultant'
  name text not null,
  avatar_url text,
  bio text,
  preferred_language text default 'en' check (preferred_language in ('ru','tg','en')),
  approved boolean default false, -- consultants need approval; buyers auto-approved
  created_at timestamptz default now()
);

-- The 10 demos shown on storefront
create table demos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null, -- 'shop', 'gym', 'accounting', 'china-uni', ...
  category text not null,
  title_key text not null, -- i18n key
  description_key text not null,
  thumbnail_url text,
  preview_url text, -- internal path to live demo
  base_price_usd numeric(10,2) not null,
  tech_tags text[],
  featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now()
);

-- Buyer requests / projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references profiles(id),
  consultant_id uuid references profiles(id), -- null until assigned
  demo_id uuid not null references demos(id),
  brief jsonb not null, -- {business_name, color_pref, pages_needed, deadline, budget, language, notes}
  status text not null default 'new' check (status in ('new','assigned','quoted','in_progress','review','delivered','cancelled')),
  quote_amount numeric(10,2),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Project messenger
create table messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  body text,
  attachment_url text,
  attachment_type text check (attachment_type in ('image','file','voice')),
  attachment_filename text,
  attachment_size_bytes int,
  reply_to_id uuid references messages(id),
  read_at timestamptz,
  created_at timestamptz default now()
);

create table message_reactions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  user_id uuid not null references profiles(id),
  emoji text not null,
  created_at timestamptz default now(),
  unique(message_id, user_id, emoji)
);

-- Milestones for a project
create table milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  amount_usd numeric(10,2),
  status text not null default 'pending' check (status in ('pending','in_progress','done','approved','rejected')),
  due_date date,
  created_at timestamptz default now()
);

-- Quotes (separate from project for history)
create table quotes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  consultant_id uuid not null references profiles(id),
  amount_usd numeric(10,2) not null,
  scope_notes text,
  status text not null default 'pending' check (status in ('pending','accepted','rejected','withdrawn')),
  created_at timestamptz default now()
);

-- Reviews after delivery
create table reviews (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text,
  created_at timestamptz default now()
);
```

**Row-Level Security (RLS):** enable on every table. Policies:
- `profiles`: anyone can read; user can update their own; admin can update any
- `demos`: anyone can read; only admin can insert/update/delete
- `projects`: buyer sees their own; consultant sees ones assigned to them; admin sees all
- `messages`: only buyer + consultant of the parent project; admin sees all
- `milestones`, `quotes`, `reviews`: same scoping as projects

Demo 4 (Chinese University) needs its own seeded tables under a separate schema `demo_china_uni`:
```sql
create schema demo_china_uni;
-- universities, programs, applications, application_documents, application_messages
-- Use seed data; this is a showcase, not real applications.
```
Other demos can use JSON fixtures (`src/demos/<slug>/seed.json`) since they're read-only previews.

---

## 8. Tech stack (locked unless user overrides)

- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI:** Tailwind CSS 4 + shadcn/ui (storefront baseline)
- **Icons:** Lucide (default), Phosphor / Tabler / Hugeicons (per-demo variety)
- **i18n:** `next-intl`
- **Auth + DB + Storage + Realtime:** Supabase
- **Forms:** `react-hook-form` + `zod`
- **Charts:** `recharts`
- **Maps (Demo 10):** `leaflet` + `react-leaflet` + OpenStreetMap tiles
- **Emoji picker:** `emoji-picker-react`
- **Date utils:** `date-fns`
- **State:** server components first; `zustand` only if a cross-page client store is genuinely needed
- **Email (later):** Resend
- **Payments (Phase 9, optional):** Stripe Connect
- **Hosting:** Vercel (front) + Supabase (back)

---

## 9. Repo layout

```
sitebuilder/
├── PLAN.md  (this file)
├── README.md
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── supabase/
│   ├── migrations/       (numbered SQL migrations)
│   ├── seed.sql          (admin user + 10 demos rows)
│   └── config.toml
├── public/
│   ├── demos/            (per-demo thumbnails, screenshots)
│   └── icons/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx           (storefront chrome + lang switcher)
│   │   │   ├── page.tsx             (landing)
│   │   │   ├── demos/
│   │   │   │   ├── page.tsx         (grid of all 10)
│   │   │   │   └── [slug]/
│   │   │   │       └── ...          (one folder per demo, see below)
│   │   │   ├── auth/                (login, signup)
│   │   │   ├── buyer/               (buyer dashboard)
│   │   │   ├── consultant/          (consultant dashboard)
│   │   │   ├── admin/               (admin panel)
│   │   │   └── projects/[id]/
│   │   │       ├── page.tsx         (project overview)
│   │   │       └── chat/page.tsx    (messenger)
│   │   └── api/                     (API routes if needed beyond server actions)
│   ├── components/
│   │   ├── ui/                      (shadcn primitives)
│   │   ├── storefront/              (DemoCard, LangSwitcher, Hero, ...)
│   │   ├── chat/                    (MessageList, MessageInput, EmojiPicker, ...)
│   │   └── shared/
│   ├── demos/
│   │   ├── shop/                    (Demo 1: own pages, own theme)
│   │   ├── gym/
│   │   ├── accounting/
│   │   ├── china-uni/
│   │   ├── school/
│   │   ├── university/
│   │   ├── restaurant/
│   │   ├── pim/
│   │   ├── clinic/
│   │   └── logistics/
│   ├── lib/
│   │   ├── supabase/                (client, server, admin clients)
│   │   ├── auth/
│   │   └── utils.ts
│   ├── messages/
│   │   ├── en.json
│   │   ├── ru.json
│   │   └── tg.json
│   ├── i18n.ts
│   └── middleware.ts                (locale + auth gating)
└── tests/                           (Playwright E2E)
```

Each `src/demos/<slug>/` exports:
- `theme.ts` — colors, fonts, icon library choice for that demo
- `seed.json` — fake data
- Its own pages (re-used from `/app/[locale]/demos/<slug>/...`)

---

## 10. Build phases (build in this order)

### Phase 0 — Setup (1 hr)
- `npx create-next-app@latest sitebuilder` (TS, Tailwind, App Router, src/)
- Install: `@supabase/supabase-js`, `@supabase/ssr`, `next-intl`, `react-hook-form`, `zod`, `recharts`, `emoji-picker-react`, `date-fns`, `lucide-react`, `@phosphor-icons/react`, `@tabler/icons-react`, `react-leaflet`, `leaflet`
- Install shadcn: `npx shadcn@latest init`
- Create Supabase project, copy keys to `.env.local`
- Commit initial scaffold

### Phase 1 — Auth + roles (1 day)
- Run migrations for `profiles` table
- Build `/auth/signup` (buyer flow open; consultant flow flagged for admin approval)
- Build **`/auth/login`** — MUST render in all 3 languages (ru/tg/en) with the language switcher visible on the page itself. Fields: email, password, "Forgot password?", "Sign up" link. Role-aware redirect after login (admin → /admin, consultant → /consultant, buyer → /buyer). Show clear error messages translated in all 3 languages.
- Middleware: gate `/admin/*`, `/consultant/*`, `/buyer/*`
- Seed one admin user manually via SQL

### Phase 2 — i18n + storefront skeleton (1 day)
- Set up `next-intl` with `[locale]` segment
- Language switcher component
- Storefront landing page (hero, how-it-works, footer) with ALL strings in `messages/*.json`
- English first; leave ru and tg with `TODO:` placeholders for now

### Phase 3 — Demo gallery (1 day)
- Run migration for `demos` table
- Seed all 10 demo rows
- `/demos` grid page with filter + featured carousel
- Each demo gets a placeholder thumbnail (real screenshots come later)

### Phase 4 — Build the 10 demos (8–12 days, the big chunk)
Build in this order (simplest → most complex):
1. Shop (Demo 1) — establishes the demo pattern
2. Personal Info System (Demo 8) — minimal, fast win
3. Restaurant (Demo 7)
4. Gym (Demo 2)
5. Clinic (Demo 9)
6. Accounting (Demo 3)
7. School (Demo 5)
8. University (Demo 6)
9. Logistics (Demo 10) — needs maps
10. Chinese University (Demo 4) — most complex, has internal agent role

Each demo: 1 day max. Use seeded JSON fixtures; only Demo 4 needs real DB tables.

### Phase 5 — Buyer flow (2 days)
- "I want this" CTA on demo cards → opens brief form
- Brief form (multi-step): business name, language pref, pages needed, deadline, budget, notes, color preference
- Submit → creates `project` row with status `new`
- Buyer dashboard: list of their projects + status badges

### Phase 6 — Consultant dashboard (2 days)
- Inbox of unassigned projects
- "Claim" button or admin assignment
- Project detail view with brief
- Send quote form

### Phase 7 — Messenger (3 days, the showpiece)
- Build full messenger per §5 spec
- Realtime channel per project
- Emoji picker + image upload + file attach + reactions + reply
- Typing indicator + read receipts + unread badges

### Phase 8 — Admin panel (2 days)
- Users table (filter by role, approve consultants, promote to agent, ban)
- Demos CRUD (edit title/description/price/featured)
- Projects oversight table
- Basic analytics (project count, revenue)

### Phase 9 — Polish & deploy (2 days)
- Fill in ru and tg translations
- Replace placeholder thumbnails with real screenshots of each demo's home page
- Mobile responsive QA
- Lighthouse pass
- Deploy to Vercel

### Phase 10 (optional) — Payments
- Stripe Connect, milestone-based escrow, consultant payouts

**Total MVP: ~3 weeks of focused work.**

---

## 11. Acceptance criteria (per phase, must pass before moving on)

- **P1 done when:** all 3 roles can sign up + log in; admin can see admin panel, buyer can see buyer dashboard, consultant cannot log in until approved.
- **P2 done when:** switching language updates every visible string on landing page; URL prefix changes.
- **P3 done when:** `/demos` shows all 10 cards with translated titles + working filter.
- **P4 done when:** all 10 demos load, navigate, and feel distinct (different colors, icons, fonts).
- **P5 done when:** buyer can submit a brief, it appears in their dashboard with status "new".
- **P6 done when:** consultant can claim a brief, send a quote; buyer sees the quote.
- **P7 done when:** two users in different browsers chat in realtime with emoji + image + file; reactions work.
- **P8 done when:** admin can change a demo's price live, approve a consultant signup, and see a project list.
- **P9 done when:** site is live on Vercel and all 3 languages render correctly on every page.

---

## 12. Coding rules

- TypeScript strict mode. No `any`.
- Server Components by default. Client Components only when interactive.
- No hardcoded UI strings — everything through `next-intl`.
- Use Supabase server client in Server Components, browser client in Client Components.
- Every form: `react-hook-form` + `zod` schema.
- Every table read: respect RLS; never use service-role key client-side.
- Commit per phase; one feature branch per phase; PR titles `[P3] Demo gallery grid`.
- No `console.log` left in committed code.
- Run `pnpm typecheck && pnpm lint` before every commit.

---

## 13. Open questions to confirm with the operator before starting

1. **Language pick:** ANSWERED — Russian (`ru`), Tajik (`tg`), English (`en`). Default `en`.
2. **Demos 9 & 10:** Clinic + Logistics OK, or different categories?
3. **Project name / brand:** placeholder is "Sitebuilder" — what's the real name?
4. **Domain:** do you have one yet, or pick later before deploy?
5. **Payment:** include Stripe in MVP, or defer to Phase 10?

Ask the operator these five questions and DO NOT start coding until all five are answered.

---

## 14. Hand-off message (paste to next Claude session)

> I'm building the **myweb** marketplace described in `/home/asus/myweb/PLAN.md`. The 5 open questions in §13 are already answered at the top of the plan. Pick up where Phase 0 left off; after each phase, run the acceptance criteria in §11 and stop for my confirmation before starting the next phase.

