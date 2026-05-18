import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight, MessageCircle, Check } from "lucide-react";
import { localizedDemos } from "@/lib/demos";
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
  const tData = await getTranslations("demoData");

  const all = localizedDemos(
    tData as unknown as Parameters<typeof localizedDemos>[0],
  );
  const featured = all.slice(0, 6);
  const heroDemos = all.slice(0, 4);

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-20 -z-10 h-[640px]"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, rgb(var(--primary) / 0.10), transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-28 lg:pt-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="editorial-eyebrow flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-primary" />
                {t("eyebrow")}
              </div>
              <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
                {t("hero.title")}
              </h1>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {t("hero.subtitle")}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/demos"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-fg shadow-sm transition active:scale-[0.98] hover:bg-primary-hover"
                >
                  {t("hero.primaryCta")}
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-6 py-3.5 text-sm font-medium text-fg transition hover:bg-surface"
                >
                  <MessageCircle className="size-4" />
                  {t("hero.secondaryCta")}
                </Link>
              </div>
              <p className="mt-6 text-xs text-subtle">{t("trust")}</p>
            </div>

            {/* Stacked demo collage — asymmetric, editorial */}
            <div className="relative lg:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {heroDemos.map((d, i) => (
                  <div
                    key={d.slug}
                    className={`group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition hover:-translate-y-1 hover:border-border-strong hover:shadow-md ${
                      i % 2 === 1 ? "sm:mt-8" : ""
                    }`}
                    style={{
                      background: `linear-gradient(160deg, ${d.thumbnail_color}1a, transparent 65%), rgb(var(--surface))`,
                    }}
                  >
                    <div
                      aria-hidden
                      className="size-8 rounded-full"
                      style={{ background: d.thumbnail_color }}
                    />
                    <div className="editorial-eyebrow mt-5">{d.category}</div>
                    <div className="mt-1 font-display text-base font-medium text-fg">
                      {d.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== DEMOS TEASER ============== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="editorial-eyebrow">{tDemos("title")}</div>
              <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
                {t("demosTitle")}
              </h2>
            </div>
            <p className="text-pretty text-muted lg:col-span-4 lg:col-start-9">
              {t("demosLede")}
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d) => (
              <DemoCard key={d.slug} demo={d} previewLabel={tDemos("preview")} />
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/demos"
              className="group inline-flex items-center gap-2 text-sm font-medium text-fg transition hover:text-primary"
            >
              {t("viewAll")}
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="editorial-eyebrow">{t("process.title")}</div>
            <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
              {t("process.title")}
            </h2>
            <p className="mt-5 text-pretty text-lg text-muted">{t("process.lede")}</p>
          </div>

          <ol className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="border-t border-border-strong pt-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="editorial-rule flex-1" />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-fg">
                  {t(`process.steps.${i}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`process.steps.${i}.body`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="editorial-eyebrow">{t("features.title")}</div>
            <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
              {t("features.title")}
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <article
                key={i}
                className="bg-bg p-8 transition hover:bg-surface/60"
              >
                <div className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-4" />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-fg">
                  {t(`features.items.${i}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t(`features.items.${i}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="editorial-eyebrow">{t("pricing.title")}</div>
            <h2 className="mt-4 text-balance font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl">
              {t("pricing.title")}
            </h2>
            <p className="mt-5 text-pretty text-lg text-muted">{t("pricing.lede")}</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const highlight = i === 1;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl p-8 transition ${
                    highlight
                      ? "border-2 border-primary bg-bg shadow-lg"
                      : "border border-border bg-bg hover:border-border-strong"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary-fg">
                      {t("popularBadge")}
                    </span>
                  )}
                  <div className="editorial-eyebrow">{t(`pricing.tiers.${i}.name`)}</div>
                  <div className="mt-4 font-display text-4xl font-medium text-fg">
                    {t(`pricing.tiers.${i}.price`)}
                  </div>
                  <p className="mt-3 text-sm text-muted">{t(`pricing.tiers.${i}.blurb`)}</p>
                  <ul className="mt-6 space-y-3 text-sm text-fg">
                    {[0, 1, 2, 3].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{t(`pricing.tiers.${i}.bullets.${b}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
                      highlight
                        ? "bg-primary text-primary-fg hover:bg-primary-hover"
                        : "border border-border bg-bg text-fg hover:bg-surface"
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

      {/* ============== FINAL CTA ============== */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <h2 className="text-balance font-display text-4xl font-medium tracking-tight text-fg sm:text-6xl">
            {t("finalCta.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted">
            {t("finalCta.subtitle")}
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link
              href="/demos"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-fg shadow-sm transition hover:bg-primary-hover"
            >
              {t("finalCta.primary")}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-6 py-3.5 text-sm font-medium text-fg hover:bg-surface"
            >
              {t("finalCta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
