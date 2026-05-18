import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Palette, Server, Plug, Database, Globe, ShieldCheck } from "lucide-react";

const SERVICES = [
  {
    Icon: Palette,
    title: "Brand + UI tailoring",
    body: "We re-skin one of our demos to your palette, typography, and tone. Includes a 30-page design review.",
  },
  {
    Icon: Server,
    title: "Hosting + deployment",
    body: "We ship to Vercel, your VPS, or your existing cloud. SSL, domains, backups — handled.",
  },
  {
    Icon: Plug,
    title: "Integrations",
    body: "Stripe, payment.tj, Telegram bot, WhatsApp Business, Twilio, your accounting software, REST/GraphQL APIs.",
  },
  {
    Icon: Database,
    title: "Custom data model",
    body: "Need fields the demo doesn't have? We add them, with admin UI and proper validation, in the first week.",
  },
  {
    Icon: Globe,
    title: "Multi-language",
    body: "Russian and Tajik built in. We can add Uzbek, Arabic, or any RTL language with a day of localization.",
  },
  {
    Icon: ShieldCheck,
    title: "Compliance + audit",
    body: "GDPR-ready data export, role-based access control, audit log, and a security report on launch.",
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          What we actually do
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">
          Every project includes the bullets below. Pick the ones you need
          on the quote; we'll skip the rest.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ Icon, title, body }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-fg">{title}</h2>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-surface p-10 text-center">
        <h2 className="font-display text-2xl font-bold text-fg">
          Not sure which service fits?
        </h2>
        <p className="mt-3 text-muted">
          Open a demo, tell us what's missing. We'll send a quote in 24 hours.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
          >
            Browse demos <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-3 text-sm font-semibold text-fg hover:bg-surface-2"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
