# myweb

A storefront for ready-made websites and apps. Buyers browse 10 fully-working demo systems, request a customized build, and work with a consultant through a real-time messenger.

See [`PLAN.md`](./PLAN.md) for the full build plan.

## Stack

- Next.js 16 (App Router, TypeScript) + Turbopack
- Tailwind CSS 4 + shadcn/ui (neutral base)
- next-intl 4 — locales: `en`, `ru`, `tg` (default `en`)
- Supabase (auth + Postgres + Storage + Realtime)
- react-hook-form + zod, recharts, emoji-picker-react, leaflet

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in Supabase keys
cp .env.local.example .env.local
# Edit .env.local with values from your Supabase project dashboard.

# 3. Run migrations against your Supabase project
#    (Paste supabase/migrations/0001_init.sql + supabase/seed.sql
#     into the Supabase SQL editor.)

# 4. Run the dev server
npm run dev
# Open http://localhost:3000 (auto-redirects to /en)
```

## Project layout

```
myweb/
├── PLAN.md                       Full build plan (read this first)
├── supabase/
│   ├── migrations/0001_init.sql  Initial schema + RLS
│   └── seed.sql                  Inserts 10 demo rows
├── src/
│   ├── app/[locale]/             Locale-prefixed routes
│   ├── components/
│   │   ├── ui/                   shadcn primitives
│   │   ├── storefront/           Hero, DemoCard, etc.
│   │   ├── chat/                 Messenger components (Phase 7)
│   │   └── shared/               LanguageSwitcher, etc.
│   ├── demos/                    One folder per demo (Phase 4)
│   ├── i18n/                     routing.ts, request.ts, navigation.ts
│   ├── lib/
│   │   ├── supabase/             Browser/server/admin clients
│   │   └── utils.ts              cn() helper
│   ├── messages/                 en.json, ru.json, tg.json
│   └── middleware.ts             next-intl middleware (locale routing)
```

## Phase status

- [x] Phase 0 — Setup (scaffold, deps, shadcn, i18n base)
- [ ] Phase 1 — Auth + roles
- [ ] Phase 2 — i18n + storefront skeleton (partial — landing page done)
- [ ] Phase 3 — Demo gallery
- [ ] Phase 4 — Build the 10 demos
- [ ] Phase 5 — Buyer flow
- [ ] Phase 6 — Consultant dashboard
- [ ] Phase 7 — Messenger
- [ ] Phase 8 — Admin panel
- [ ] Phase 9 — Polish & deploy
- [ ] Phase 10 — Payments (optional)

## Scripts

| Command            | What it does                       |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Dev server with Turbopack on :3000 |
| `npm run build`    | Production build                   |
| `npm start`        | Run production build               |
| `npm run lint`     | ESLint                             |
| `npx tsc --noEmit` | TypeScript typecheck               |
