# Pixelforge — WebAgency

A storefront for a web-development studio that sells 10 ready-made demo systems, with realtime customer ↔ consultant chat and an admin panel.

## Stack

- **Next.js 16** (App Router, TypeScript strict)
- **Tailwind CSS 4** (CSS-custom-property tokens, dark mode)
- **Supabase** — auth, Postgres, RLS, Realtime
- **next-intl** — `en` / `ru` / `tg`, locale in URL prefix
- **lucide-react**, **zod**

## Roles

| Role       | Signup           | Surface                       |
|------------|------------------|-------------------------------|
| Visitor    | —                | Marketing + demo previews     |
| Customer   | Open             | Account + chat widget         |
| Consultant | Admin-approved   | Inbox + thread reply          |
| Admin      | Seeded manually  | Dashboard, users, demos, chats|

## 10 demos

`china-agency`, `university`, `school`, `restaurant`, `accounting`, `hospital`, `gym`, `shopping`, `travel-agency`, `beauty-salon` — each with its own palette, icons, and layout, isolated from the marketing theme via inline styles.

## Quick start (local)

```bash
npm install
cp .env.local.example .env.local   # fill Supabase URL + anon key
npm run dev
```

Without Supabase env vars the site still runs: marketing + demo previews work, auth + chat show a graceful "offline" state.

## Supabase setup

1. Create a project at <https://supabase.com>.
2. In the SQL editor, run [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) — it creates the schema, RLS policies, and seeds 10 demos.
3. From **Project settings → API**, copy the URL + anon key into `.env.local`.
4. To make yourself admin, run in SQL editor:

   ```sql
   update public.profiles set role = 'admin' where email = 'you@example.com';
   ```

## Deploy

Push to GitHub, then import the repo into Vercel and add the same env vars in **Project settings → Environment variables**.

## File layout

```
src/
├── app/
│   ├── [locale]/           # all locale-prefixed pages
│   │   ├── (marketing)     # home, about, services, pricing, contact
│   │   ├── auth/           # signup, login, logout
│   │   ├── account/        # customer dashboard + chat
│   │   ├── demos/          # gallery + detail + preview shell
│   │   ├── consultant/     # inbox + thread
│   │   └── admin/          # dashboard, users, demos, chats
│   ├── actions/            # server actions (chat, admin)
│   ├── layout.tsx          # passthrough root
│   └── globals.css         # design tokens
├── components/             # shared UI (header, footer, chat-widget, …)
├── demos/                  # 10 demo apps + registry
├── i18n/                   # next-intl routing + messages
├── lib/                    # supabase, auth, chat, types
└── proxy.ts                # combined intl + auth middleware
```

## Commands

```bash
npm run dev      # next dev (Turbopack)
npm run build    # production build + typecheck
npm run start    # serve the build
npx tsc --noEmit # type check only
```

---

Built 2026-05-17 using Claude Code.
