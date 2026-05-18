import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { fallbackDemos, getFallbackDemo } from "@/lib/demos";

export async function generateStaticParams() {
  return fallbackDemos.map((d) => ({ slug: d.slug }));
}

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demos");

  const demo = getFallbackDemo(slug);
  if (!demo) notFound();

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/demos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" /> {t("back")}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted">
            {demo.category}
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {demo.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{demo.tagline}</p>
          <p className="mt-6 text-pretty text-muted">{demo.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/demos/${demo.slug}/preview`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
            >
              <Sparkles className="size-4" />
              {t("openPreview")}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg hover:bg-surface-2"
            >
              Talk to a consultant
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-2">
          <div
            className="aspect-[4/5] rounded-2xl border border-border p-6"
            style={{
              background: `linear-gradient(160deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}80 100%)`,
            }}
          >
            <div className="grid size-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Sparkles className="size-6 text-white" />
            </div>
            <div className="mt-6 font-display text-2xl font-bold text-white">
              {demo.title}
            </div>
            <div className="mt-2 text-sm text-white/80">{demo.tagline}</div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted">
              {t("startingFrom")}
            </div>
            <div className="mt-1 font-display text-3xl font-bold text-primary">
              ${demo.price_usd.toLocaleString()}
            </div>
            <p className="mt-2 text-xs text-muted">
              Includes re-skin, your domain, one integration, 30 days support.
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-fg">{t("youGet")}</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {demo.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2 rounded-xl border border-border bg-surface p-4 text-sm text-fg"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
