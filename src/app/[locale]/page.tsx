import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, MessageCircle, Sparkles, Check } from "lucide-react";
import { fallbackDemos } from "@/lib/demos";
import { DemoCard } from "@/components/demo-card";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tDemos = await getTranslations("demos");

  const featured = fallbackDemos.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgb(var(--primary)/0.18),transparent_60%)]"
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="size-3.5" /> {t("eyebrow")}
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg text-muted">
              {t("hero.subtitle")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg shadow-md transition active:scale-[0.98] hover:bg-primary-hover"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg transition hover:bg-surface-2"
              >
                <MessageCircle className="size-4" />
                {t("hero.secondaryCta")}
              </Link>
            </div>
            <p className="mt-4 text-xs text-subtle">{t("trust")}</p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              {featured.slice(0, 4).map((d) => (
                <div
                  key={d.slug}
                  className="aspect-[5/4] overflow-hidden rounded-2xl border border-border bg-surface p-5"
                  style={{
                    background: `linear-gradient(135deg, ${d.thumbnail_color}26, transparent 70%)`,
                  }}
                >
                  <div
                    className="grid size-9 place-items-center rounded-lg text-white"
                    style={{ background: d.thumbnail_color }}
                  >
                    <Sparkles className="size-4" />
                  </div>
                  <div className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                    {d.category}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-fg">{d.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEMOS GALLERY TEASER */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {t("demosTitle")}
            </h2>
            <p className="mt-3 text-pretty text-muted">{t("demosLede")}</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d) => (
              <DemoCard key={d.slug} demo={d} previewLabel={tDemos("preview")} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-3 text-sm font-semibold text-fg transition hover:bg-surface-2"
            >
              {t("viewAll")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {t("process.title")}
            </h2>
            <p className="mt-3 text-muted">{t("process.lede")}</p>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="relative rounded-2xl border border-border bg-surface p-6"
              >
                <span className="absolute -top-3 left-5 grid size-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-fg">
                  {i + 1}
                </span>
                <h3 className="text-base font-semibold text-fg">
                  {t(`process.steps.${i}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`process.steps.${i}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {t("features.title")}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <article
                key={i}
                className="rounded-2xl border border-border bg-bg p-6 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Check className="size-5" />
                </div>
                <h3 className="mt-4 font-semibold text-fg">
                  {t(`features.items.${i}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {t(`features.items.${i}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              {t("pricing.title")}
            </h2>
            <p className="mt-3 text-muted">{t("pricing.lede")}</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const highlight = i === 1;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl border p-6 ${
                    highlight
                      ? "border-primary bg-primary/5 lg:scale-[1.03]"
                      : "border-border bg-surface"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 right-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-fg">
                      Popular
                    </span>
                  )}
                  <div className="font-display text-xl font-bold text-fg">
                    {t(`pricing.tiers.${i}.name`)}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-primary">
                    {t(`pricing.tiers.${i}.price`)}
                  </div>
                  <p className="mt-3 text-sm text-muted">
                    {t(`pricing.tiers.${i}.blurb`)}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-fg">
                    {[0, 1, 2, 3].map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{t(`pricing.tiers.${i}.bullets.${b}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      highlight
                        ? "bg-primary text-primary-fg hover:bg-primary-hover"
                        : "border border-border bg-bg text-fg hover:bg-surface-2"
                    }`}
                  >
                    {t(`pricing.tiers.${i}.cta`)}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            {t("finalCta.title")}
          </h2>
          <p className="mt-3 text-muted">{t("finalCta.subtitle")}</p>
          <div className="mt-7 flex justify-center gap-3">
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
            >
              {t("finalCta.primary")} <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-5 py-3 text-sm font-semibold text-fg hover:bg-surface-2"
            >
              {t("finalCta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
