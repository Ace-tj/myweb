import { setRequestLocale } from "next-intl/server";
import { Sparkles, Target, Users, Zap } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
        <Sparkles className="size-3.5" /> About us
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
        We sold the same starter twice and never wrote the proposal again.
      </h1>
      <p className="mt-6 text-pretty text-lg text-muted">
        Pixelforge is a small studio that ships web systems in two-week
        cycles. We noticed every client kept describing the same software:
        bookings, a CRM, an admin, payments. So we built those once — really
        well — and now we re-skin them.
      </p>
      <p className="mt-4 text-pretty text-muted">
        That means lower price, faster launch, and code that's been
        battle-tested across dozens of projects rather than written from
        zero on yours. We still tailor it: your colors, your data, your
        integrations. Only the boring stuff stays the same.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { Icon: Target, title: "Single goal", body: "Ship a working system, not a deck. Every meeting drives toward a staging link." },
          { Icon: Users, title: "Six people", body: "Two designers, three engineers, one PM. You'll know all six by name." },
          { Icon: Zap, title: "Two weeks", body: "Average from kickoff to launch. Larger scope still ships in 6-8 weeks." },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-surface p-5">
            <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold text-fg">{title}</h3>
            <p className="mt-2 text-sm text-muted">{body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 font-display text-2xl font-bold text-fg">How we work</h2>
      <ol className="mt-4 space-y-4 text-muted">
        <li>
          <strong className="text-fg">Pick a demo.</strong> Browse the gallery,
          open one in your browser, share with stakeholders. If something
          isn't there, tell us and we'll either add it or scope it as
          bespoke.
        </li>
        <li>
          <strong className="text-fg">20-minute brief.</strong> One call,
          one shared doc. We finalize palette, copy, integrations, and the
          first three things we're cutting from your wishlist.
        </li>
        <li>
          <strong className="text-fg">Daily staging.</strong> You get a
          link that updates every day. Comment inline, we ship the same
          afternoon.
        </li>
        <li>
          <strong className="text-fg">Launch + 60 days.</strong> Production
          go-live and bug fixes for free. After that we offer a flat
          monthly retainer.
        </li>
      </ol>
    </article>
  );
}
