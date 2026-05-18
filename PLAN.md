# WebAgency — Build Plan

A web-development company's storefront. Showcases 10 ready-made demo systems, lets visitors sign up, chat in realtime with a consultant, and lets admins manage everything.

## Stack

- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS 4
- Supabase (Auth + Postgres + Realtime + RLS)
- next-intl (en / ru / tg) — locale in URL prefix
- lucide-react (icons), zod (validation)

## Roles

| Role       | Signup           | Can do                                   |
|------------|------------------|------------------------------------------|
| Visitor    | —                | Browse marketing + demo previews         |
| Customer   | Open             | Browse, chat with a consultant           |
| Consultant | Admin-approved   | Reply to customer chats, see inbox       |
| Admin      | Seeded           | Approve consultants, manage everything   |

## Project Location

`C:\Users\ASUS\Desktop\webagency`

## 10 Demos

1. **china-agency** — Send students to China (study-abroad)
2. **university** — University management
3. **school** — K-12 school portal
4. **restaurant** — Restaurant ordering + tables
5. **accounting** — Bookkeeping dashboard
6. **hospital** — Clinic/hospital ops
7. **gym** — Gym membership + classes
8. **shopping** — E-commerce
9. **travel-agency** — Tours + bookings
10. **beauty-salon** — Appointments + services

Each demo lives at `src/demos/{slug}/Demo.tsx`, rendered inside an isolated preview shell at `/[locale]/demos/{slug}/preview` with its own palette and icons.

## Phases

1. **Scaffold** — Next.js init, deps, env, folder layout, Supabase client, i18n
2. **DB schema** — profiles, demos, conversations, messages + RLS policies
3. **Design system** — CSS tokens (light/dark), Tailwind, layout primitives, ThemeToggle, LanguageSwitcher
4. **Auth** — signup/login + role-based proxy
5. **Marketing site** — home, about, services, pricing, contact
6. **Demo gallery + preview shell** — `/demos`, `/demos/[slug]`, `/demos/[slug]/preview`
7. **Build 10 demos** — each with unique palette/icons
8. **Realtime messenger** — Supabase Realtime, floating widget, consultant inbox
9. **Admin panel** — users, demos, chat moderation, analytics
10. **i18n translations** — en/ru/tg keys
11. **QA** — typecheck, build, browser walkthrough

## Folder Layout (target)

```
webagency/
├── src/
│   ├── app/[locale]/
│   │   ├── (marketing)/{page,about,services,pricing,contact}.tsx
│   │   ├── auth/{signup,login}/page.tsx
│   │   ├── demos/page.tsx
│   │   ├── demos/[slug]/{page,preview}/page.tsx
│   │   ├── account/page.tsx
│   │   ├── consultant/{inbox,thread/[id]}/page.tsx
│   │   ├── admin/{dashboard,users,demos,chats}/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── demos/{slug}/Demo.tsx        # 10 demo components
│   ├── components/                  # shared UI
│   ├── lib/supabase/{server,client}.ts
│   ├── i18n/{en,ru,tg}.json
│   └── proxy.ts                     # auth + locale middleware
├── supabase/migrations/             # SQL migrations
├── .env.local.example
└── PLAN.md
```
