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
  const tBrand = await getTranslations("brand");

  const all = localizedDemos(
    tData as unknown as Parameters<typeof localizedDemos>[0],
  );
  const featured = all.slice(0, 6);
  const heroTiles = all.slice(0, 4);

  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden border-b border-border">
        {/* lime accent corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl"
        />
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Top spec strip */}
          <div className="border-b border-border py-3">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span className="text-primary">●</span>
              <span>v0.1.0</span>
              <span className="opacity-50">/</span>
              <span>{tBrand("name")} · Web Studio</span>
              <span className="opacity-50">/</span>
              <span className="hidden sm:inline">{t("trust")}</span>
            </div>
          </div>

          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
            <div className="lg:col-span-8">
              <div className="spec-line flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-primary" />
                {t("eyebrow")}
                <span aria-hidden className="font-mono text-fg">[10]</span>
              </div>
              <h1 className="mt-7 text-balance font-display text-[44px] font-bold leading-[0.95] tracking-tighter text-fg sm:text-7xl lg:text-[96px]">
                {t("hero.title")}
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/demos"
                  className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_24px_rgb(197_255_63_/_0.35)]"
                >
                  {t("hero.primaryCta")}
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-sm border border-border-strong bg-transparent px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition hover:border-fg hover:bg-surface"
                >
                  <MessageCircle className="size-4" />
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </div>

            {/* Stacked hero tiles — visible grid */}
            <div className="relative lg:col-span-4">
              <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
                {heroTiles.map((d) => (
                  <div
                    key={d.slug}
                    className="group relative aspect-square overflow-hidden bg-surface p-4 transition hover:bg-surface-2"
                    style={{
                      background: `linear-gradient(135deg, ${d.thumbnail_color}1a, transparent 60%), rgb(var(--surface))`,
                    }}
                  >
                    <div
                      aria-hidden
                      className="size-6 rounded-sm"
                      style={{ background: d.thumbnail_color }}
                    />
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-muted">
                        {d.category}
                      </div>
                      <div className="mt-0.5 font-display text-sm font-semibold text-fg">
                        {d.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== DEMOS GRID ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="spec-line flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-primary" />
                {tDemos("title")}
              </div>
              <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-6xl">
                {t("demosTitle")}
              </h2>
            </div>
            <p className="text-pretty text-muted lg:col-span-4">
              {t("demosLede")}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d) => (
              <DemoCard key={d.slug} demo={d} previewLabel={tDemos("preview")} />
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/demos"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg transition hover:text-primary"
            >
              {t("viewAll")}
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("process.title")}
            </div>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-6xl">
              {t("process.title")}
            </h2>
            <p className="mt-6 text-pretty text-lg text-muted">{t("process.lede")}</p>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="bg-bg p-8 transition hover:bg-surface">
                <div className="flex items-center gap-3">
                  <span className="brut-number-badge">{String(i + 1).padStart(2, "0")}</span>
                  <span aria-hidden className="h-px flex-1 bg-border-strong" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-fg">
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
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("features.title")}
            </div>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-6xl">
              {t("features.title")}
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <article
                key={i}
                className="group bg-bg p-8 transition hover:bg-surface"
              >
                <div className="flex items-center gap-3">
                  <div className="grid size-8 place-items-center rounded-sm bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-fg">
                    <Check className="size-4" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-fg">
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
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("pricing.title")}
            </div>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-6xl">
              {t("pricing.title")}
            </h2>
            <p className="mt-6 text-pretty text-lg text-muted">{t("pricing.lede")}</p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const highlight = i === 1;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-sm p-8 transition ${
                    highlight
                      ? "border-2 border-primary bg-bg shadow-[0_0_40px_rgb(197_255_63_/_0.15)]"
                      : "border border-border bg-bg hover:border-border-strong"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-8 rounded-sm bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-fg">
                      {t("popularBadge")}
                    </span>
                  )}
                  <div className="spec-line">{t(`pricing.tiers.${i}.name`)}</div>
                  <div className="mt-5 font-display text-5xl font-bold tracking-tighter text-fg">
                    {t(`pricing.tiers.${i}.price`)}
                  </div>
                  <p className="mt-3 text-sm text-muted">{t(`pricing.tiers.${i}.blurb`)}</p>
                  <ul className="mt-7 flex-1 space-y-3 text-sm text-fg">
                    {[0, 1, 2, 3].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{t(`pricing.tiers.${i}.bullets.${b}`)}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest transition ${
                      highlight
                        ? "bg-primary text-primary-fg hover:bg-primary-hover"
                        : "border border-border-strong bg-bg text-fg hover:border-fg hover:bg-surface"
                    }`}
                  >
                    {t(`pricing.tiers.${i}.cta`)} →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgb(197_255_63_/_0.12),transparent_70%)]"
        />
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h2 className="text-balance font-display text-5xl font-bold leading-[0.95] tracking-tighter text-fg sm:text-7xl lg:text-[96px]">
              {t("finalCta.title")}
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-lg text-muted">
              {t("finalCta.subtitle")}
            </p>
            <div className="mt-10 flex justify-center gap-3">
              <Link
                href="/demos"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_24px_rgb(197_255_63_/_0.35)]"
              >
                {t("finalCta.primary")}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition hover:border-fg hover:bg-surface"
              >
                {t("finalCta.secondary")} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
