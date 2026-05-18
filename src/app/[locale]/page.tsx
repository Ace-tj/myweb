import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Check,
  Zap,
  Globe,
  ShieldCheck,
  Activity,
  Languages,
  Layers,
} from "lucide-react";
import { localizedDemos } from "@/lib/demos";
import { DemoCard } from "@/components/demo-card";
import { ConsoleTicker } from "@/components/marketing/console-ticker";
import { ForgeMark } from "@/components/marketing/forge-mark";
import { Counter } from "@/components/marketing/counter";
import { Sparkline } from "@/components/marketing/sparkline";
import { Marquee } from "@/components/marketing/marquee";
import { FaqAccordion } from "@/components/marketing/faq";

const SPARKLINES: Record<number, number[]> = {
  0: [12, 18, 14, 22, 26, 24, 31, 38, 45, 52, 58, 64],
  1: [21, 19, 22, 18, 17, 16, 16, 15, 14, 14, 14, 14],
  2: [98.1, 98.6, 99.0, 99.2, 99.3, 99.5, 99.4, 99.6, 99.6, 99.7, 99.6, 99.6],
  3: [62, 58, 53, 51, 49, 48, 47, 46, 47, 47, 47, 47],
};

const BENTO_LAYOUT = [
  { key: "domain", span: "lg:col-span-4", Icon: Layers },
  { key: "speed", span: "lg:col-span-4", Icon: Zap },
  { key: "multilang", span: "lg:col-span-4", Icon: Languages },
  { key: "realtime", span: "lg:col-span-6", Icon: MessageCircle },
  { key: "a11y", span: "lg:col-span-3", Icon: ShieldCheck },
  { key: "perf", span: "lg:col-span-3", Icon: Activity },
] as const;

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

  const consoleLines = t.raw("console.lines") as string[];
  const statsItems = t.raw("statsStrip.items") as {
    value: string;
    suffix: string;
    label: string;
    trend: string;
  }[];
  const marqueeItems = t.raw("marquee.items") as string[];
  const testimonialItems = t.raw("testimonials.items") as {
    quote: string;
    name: string;
    role: string;
    company: string;
  }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <>
      {/* ============== TOP SPEC STRIP ============== */}
      <div className="border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-muted sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary">live</span>
            <span className="hidden text-fg/40 sm:inline">/</span>
            <span className="hidden sm:inline">{tBrand("name")} ·  Web Studio</span>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <span>{t("trust")}</span>
          </div>
          <span>{t("console.build")}</span>
        </div>
      </div>

      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-fg/5 blur-3xl"
        />
        <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="spec-line flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-primary" />
                {t("eyebrow")}
                <span aria-hidden className="text-fg">[10]</span>
              </div>
              <h1 className="mt-7 text-balance font-display text-[44px] font-bold leading-[0.92] tracking-tighter text-fg sm:text-7xl lg:text-[104px]">
                <span className="block">{t("hero.title").split(".").slice(0, -1).join(".")}.</span>
                <span className="mt-2 block">
                  <span className="text-primary">{t("hero.title").split(".").slice(-2, -1).join("")}</span>
                </span>
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
                  className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition hover:border-fg hover:bg-surface"
                >
                  <MessageCircle className="size-4" />
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </div>

            {/* Right column: forge mark + console */}
            <div className="relative lg:col-span-5">
              <div className="relative">
                <ForgeMark className="size-72 text-fg lg:size-80" />
                <div className="absolute -right-4 bottom-0 w-[340px] max-w-full sm:right-0 lg:-right-8 lg:w-[400px]">
                  <ConsoleTicker
                    lines={consoleLines}
                    label={t("console.label")}
                    uptime={t("console.uptime")}
                    region={t("console.region")}
                    build={t("console.build")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INDUSTRIES MARQUEE ============== */}
      <section className="border-b border-border bg-surface/40 py-8">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="spec-line shrink-0 hidden sm:block">{t("marquee.label")}</div>
            <Marquee speedSec={42} className="flex-1">
              {marqueeItems.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 font-display text-2xl font-semibold text-fg/70 sm:text-3xl"
                >
                  {m}
                  <span aria-hidden className="text-primary">●</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* ============== STATS WITH SPARKLINES ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("statsStrip.title")}
            </div>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {statsItems.map((s, i) => {
              const numeric = parseFloat(s.value);
              const decimals = s.value.includes(".") ? 1 : 0;
              return (
                <div key={i} className="group bg-bg p-7 transition hover:bg-surface">
                  <div className="flex items-start justify-between gap-3">
                    <div className="spec-line">{s.label}</div>
                    <div className="text-primary">
                      <Sparkline data={SPARKLINES[i] ?? [1, 2, 3]} width={70} height={26} />
                    </div>
                  </div>
                  <div className="mt-5 font-display text-5xl font-bold tracking-tighter text-fg">
                    <Counter value={numeric} decimals={decimals} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs text-muted">{s.trend}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== BENTO FEATURES ============== */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("bento.title")}
            </div>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-6xl">
              {t("bento.title")}
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border lg:grid-cols-12">
            {BENTO_LAYOUT.map(({ key, span, Icon }) => {
              const item = t.raw(`bento.items.${key}`) as {
                title: string;
                body: string;
                tag: string;
                stat?: string;
                chip?: string;
              };
              return (
                <article
                  key={key}
                  className={`group relative flex flex-col justify-between bg-bg p-8 transition hover:bg-surface ${span} min-h-[220px]`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="grid size-10 place-items-center rounded-sm bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-fg">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-xl font-bold text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                  {(item.stat || item.chip) && (
                    <div className="mt-6 flex items-center gap-3">
                      {item.stat && (
                        <span className="font-display text-4xl font-bold tracking-tighter text-primary">
                          {item.stat}
                        </span>
                      )}
                      {item.chip && (
                        <span className="rounded-sm border border-border-strong px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-fg">
                          {item.chip}
                        </span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
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
            <p className="text-pretty text-muted lg:col-span-4">{t("demosLede")}</p>
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

      {/* ============== PROCESS TIMELINE ============== */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="spec-line flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-primary" />
                {t("process.title")}
              </div>
              <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-5xl">
                {t("process.title")}
              </h2>
              <p className="mt-6 text-pretty text-muted">{t("process.lede")}</p>
            </div>

            <ol className="relative space-y-px lg:col-span-8">
              {/* vertical rail */}
              <div
                aria-hidden
                className="absolute left-[20px] top-2 bottom-2 w-px bg-border lg:left-[28px]"
              />
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="group relative flex gap-6 rounded-sm border border-border bg-bg p-6 transition hover:border-border-strong">
                  <div className="relative z-10 flex items-start">
                    <span className="brut-number-badge size-10 text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl font-bold text-fg">
                        {t(`process.steps.${i}.title`)}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        STAGE / {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      {t(`process.steps.${i}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============== PRICING (code-spec style) ============== */}
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
              const tierName = t(`pricing.tiers.${i}.name`).toLowerCase().replace(/\s+/g, "_");
              return (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-sm transition ${
                    highlight
                      ? "border-2 border-primary bg-bg shadow-[0_0_40px_rgb(197_255_63_/_0.15)]"
                      : "border border-border bg-bg hover:border-border-strong"
                  }`}
                >
                  {/* spec header */}
                  <div className="flex items-center justify-between border-b border-border px-6 py-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                    <span>
                      tier_{i + 1}/{tierName}.yaml
                    </span>
                    {highlight && (
                      <span className="rounded-sm bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-fg">
                        {t("popularBadge")}
                      </span>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="spec-line">{t(`pricing.tiers.${i}.name`)}</div>
                    <div className="mt-3 font-display text-5xl font-bold tracking-tighter text-fg">
                      {t(`pricing.tiers.${i}.price`)}
                    </div>
                    <p className="mt-4 text-sm text-muted">{t(`pricing.tiers.${i}.blurb`)}</p>

                    {/* YAML-style includes */}
                    <ul className="mt-6 space-y-2 font-mono text-xs">
                      <li className="text-muted">includes:</li>
                      {[0, 1, 2, 3].map((b) => (
                        <li key={b} className="flex gap-2 text-fg">
                          <span className="text-muted">-</span>
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("testimonials.label")}
            </div>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-6xl">
              {t("testimonials.title")}
            </h2>
          </div>

          <Marquee speedSec={60} className="mt-14 -mx-4 sm:-mx-6 lg:-mx-8">
            {testimonialItems.map((q, i) => (
              <figure
                key={i}
                className="flex w-[420px] shrink-0 flex-col rounded-sm border border-border bg-bg p-7 sm:w-[460px]"
              >
                <span aria-hidden className="font-display text-5xl leading-none text-primary">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-fg">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid size-10 place-items-center rounded-sm bg-primary/15 font-display text-base font-bold text-primary">
                    {q.name.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-fg">{q.name}</div>
                    <div className="truncate font-mono text-[10px] uppercase tracking-widest text-muted">
                      {q.role} · {q.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="spec-line flex items-center gap-3">
                <span aria-hidden className="h-px w-10 bg-primary" />
                {t("faq.label")}
              </div>
              <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-5xl">
                {t("faq.title")}
              </h2>
              <div className="mt-8 rounded-sm border border-border bg-surface/60 p-6">
                <div className="spec-line">{tBrand("name")}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {t("hero.subtitle")}
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:underline"
                >
                  {t("hero.secondaryCta")} <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-8">
              <FaqAccordion items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgb(197_255_63_/_0.18),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />
        <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <div className="spec-line mx-auto inline-flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              <Check className="size-3.5 text-primary" />
              READY
            </div>
            <h2 className="mt-7 text-balance font-display text-5xl font-bold leading-[0.92] tracking-tighter text-fg sm:text-7xl lg:text-[112px]">
              {t("finalCta.title")}
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-lg text-muted">
              {t("finalCta.subtitle")}
            </p>
            <div className="mt-10 flex justify-center gap-3">
              <Link
                href="/demos"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-7 py-4 font-mono text-xs font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_40px_rgb(197_255_63_/_0.45)]"
              >
                {t("finalCta.primary")}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-7 py-4 font-mono text-xs uppercase tracking-widest text-fg transition hover:border-fg hover:bg-surface"
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
