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
  Sparkles,
} from "lucide-react";
import { localizedDemos } from "@/lib/demos";
import { demoThumb } from "@/lib/demo-images";
import { DemoCard } from "@/components/demo-card";
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
      {/* ============== GRADIENT HERO ============== */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "linear-gradient(135deg, #F76D3C 0%, #E04E2C 45%, #B33C1F 100%)",
        }}
      >
        {/* Depth vignette — adds richness so the hero doesn't feel flat */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 110%, rgba(35, 23, 18, 0.55) 0%, transparent 55%), radial-gradient(80% 60% at 10% -20%, rgba(255, 200, 130, 0.30) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* Decorative orbs (forge embers) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -right-32 -top-40 size-[520px] rounded-full opacity-30 anim-float"
            style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }}
          />
          <div
            className="absolute -bottom-48 -left-40 size-[560px] rounded-full opacity-25 anim-float"
            style={{
              background: "radial-gradient(circle, #FFD9A8 0%, transparent 60%)",
              animationDelay: "1.2s",
            }}
          />
          <div
            className="absolute left-1/2 top-1/3 size-[340px] -translate-x-1/2 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, white 0%, transparent 70%)" }}
          />
        </div>

        {/* Spark particles */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[
            [12, 18], [85, 22], [25, 65], [78, 70], [50, 14],
            [38, 80], [65, 88], [8, 50], [92, 45], [55, 55],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute size-1.5 rounded-full bg-white/80 anim-twinkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>

        <div className="relative mx-auto max-w-[1400px] px-4 pb-28 pt-24 sm:px-6 lg:px-8 lg:pb-36 lg:pt-32">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              {/* Brand chip */}
              <div className="anim-pop inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
                <Sparkles className="size-3.5" />
                {t("eyebrow")}
              </div>

              <h1 className="anim-fade-up delay-1 mt-7 text-balance font-display text-[44px] font-extrabold leading-[0.96] tracking-tight text-white sm:text-7xl lg:text-[96px]">
                {t("hero.title")}
              </h1>

              <p className="anim-fade-up delay-2 mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/90">
                {t("hero.subtitle")}
              </p>

              <div className="anim-fade-up delay-3 mt-10 flex flex-wrap items-center gap-3">
                <Link
                  href="/demos"
                  className="press inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-primary shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)] transition hover:shadow-[0_18px_40px_-8px_rgba(0,0,0,0.35)]"
                >
                  {t("hero.primaryCta")}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="press inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <MessageCircle className="size-4" />
                  {t("hero.secondaryCta")}
                </Link>
              </div>

              <p className="anim-fade-up delay-4 mt-6 text-sm text-white/80">{t("trust")}</p>
            </div>

            {/* Floating demo collage — real themed photos with brand tint */}
            <div className="anim-fade-up delay-3 relative lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {featured.slice(0, 4).map((d, i) => {
                  const thumb = demoThumb(d.slug);
                  return (
                    <div
                      key={d.slug}
                      className={`glass group relative overflow-hidden rounded-2xl ${
                        i % 2 === 1 ? "mt-8" : ""
                      }`}
                    >
                      {/* Themed photo */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        {thumb && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={thumb}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-110"
                          />
                        )}
                        {/* Brand tint */}
                        <div
                          aria-hidden
                          className="absolute inset-0 mix-blend-multiply"
                          style={{
                            background: `linear-gradient(160deg, ${d.thumbnail_color}cc 0%, ${d.thumbnail_color}66 60%, transparent 100%)`,
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.65)_100%)]"
                        />
                        <div className="absolute inset-x-4 bottom-4">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-white/85">
                            {d.category}
                          </div>
                          <div className="mt-1 font-display text-base font-extrabold leading-tight text-white drop-shadow-sm">
                            {d.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============== INDUSTRIES MARQUEE ============== */}
      <section className="border-b border-border bg-surface/60 py-8">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <div className="eyebrow shrink-0 hidden sm:flex">{t("marquee.label")}</div>
            <Marquee speedSec={42} className="flex-1">
              {marqueeItems.map((m, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 font-display text-2xl font-extrabold text-muted sm:text-3xl"
                >
                  {m}
                  <span aria-hidden className="size-2 rounded-full bg-primary" />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* ============== STATS ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow">{t("statsStrip.title")}</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-5xl">
              {t("statsStrip.title")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsItems.map((s, i) => {
              const numeric = parseFloat(s.value);
              const decimals = s.value.includes(".") ? 1 : 0;
              return (
                <div key={i} className="card p-7 transition hover:-translate-y-1 hover:shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="eyebrow">{s.label}</div>
                    <div className="text-primary">
                      <Sparkline data={SPARKLINES[i] ?? [1, 2, 3]} width={64} height={26} />
                    </div>
                  </div>
                  <div className="mt-5 font-display text-5xl font-extrabold tracking-tight text-fg">
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
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow">{t("bento.title")}</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-6xl">
              {t("bento.title")}
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {BENTO_LAYOUT.map(({ key, span, Icon }, i) => {
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
                  className={`card group lift relative flex flex-col justify-between overflow-hidden p-7 ${span} min-h-[220px]`}
                >
                  {/* corner gradient swatch */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 size-32 rounded-full opacity-30 blur-2xl transition group-hover:opacity-60"
                    style={{
                      background:
                        i % 2 === 0
                          ? "radial-gradient(circle, #F76D3C, transparent 70%)"
                          : "radial-gradient(circle, #C18931, transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                        <Icon className="size-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-xl font-extrabold text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                      {item.body}
                    </p>
                  </div>
                  {(item.stat || item.chip) && (
                    <div className="relative mt-6 flex items-center gap-3">
                      {item.stat && (
                        <span className="grad-text-ember font-display text-4xl font-extrabold tracking-tight">
                          {item.stat}
                        </span>
                      )}
                      {item.chip && (
                        <span className="chip">{item.chip}</span>
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
              <div className="eyebrow">{tDemos("title")}</div>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-6xl">
                {t("demosTitle")}
              </h2>
            </div>
            <p className="text-pretty text-muted lg:col-span-4">{t("demosLede")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d) => (
              <DemoCard key={d.slug} demo={d} previewLabel={tDemos("preview")} />
            ))}
          </div>

          <div className="mt-12">
            <Link href="/demos" className="btn-ghost group">
              {t("viewAll")}
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== PROCESS ============== */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="eyebrow">{t("process.title")}</div>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-5xl">
                {t("process.title")}
              </h2>
              <p className="mt-6 text-pretty text-muted">{t("process.lede")}</p>
            </div>

            <ol className="space-y-4 lg:col-span-8">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="card lift group flex gap-5 p-6">
                  <span className="grad-ember relative grid size-12 shrink-0 place-items-center rounded-2xl font-display text-base font-extrabold text-white shadow-[0_8px_20px_-6px_rgb(224_78_44_/_0.5)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-extrabold text-fg">
                      {t(`process.steps.${i}.title`)}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                      {t(`process.steps.${i}.body`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============== PRICING ============== */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow">{t("pricing.title")}</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-6xl">
              {t("pricing.title")}
            </h2>
            <p className="mt-6 text-pretty text-lg text-muted">{t("pricing.lede")}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[0, 1, 2].map((i) => {
              const highlight = i === 1;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-3xl p-8 transition ${
                    highlight
                      ? "grad-forge text-white shadow-pop"
                      : "card lift"
                  }`}
                >
                  {highlight && (
                    <span className="absolute -top-3 left-8 grad-ember rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      {t("popularBadge")}
                    </span>
                  )}
                  <div className={highlight ? "eyebrow text-white/80" : "eyebrow"} style={highlight ? { color: "rgba(255,255,255,0.7)" } : undefined}>
                    {t(`pricing.tiers.${i}.name`)}
                  </div>
                  <div className={`mt-5 font-display text-6xl font-extrabold tracking-tight ${highlight ? "text-white" : "grad-text-ember"}`}>
                    {t(`pricing.tiers.${i}.price`)}
                  </div>
                  <p className={`mt-4 text-sm ${highlight ? "text-white/80" : "text-muted"}`}>
                    {t(`pricing.tiers.${i}.blurb`)}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-sm">
                    {[0, 1, 2, 3].map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check className={`mt-0.5 size-4 shrink-0 ${highlight ? "text-primary-hover" : "text-primary"}`} />
                        <span className={highlight ? "text-white/90" : "text-fg"}>
                          {t(`pricing.tiers.${i}.bullets.${b}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`mt-10 press inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                      highlight
                        ? "bg-white text-primary hover:bg-white/90"
                        : "btn-primary"
                    }`}
                  >
                    {t(`pricing.tiers.${i}.cta`)} <ArrowRight className="size-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow">{t("testimonials.label")}</div>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-6xl">
              {t("testimonials.title")}
            </h2>
          </div>

          <Marquee speedSec={60} className="-mx-4 sm:-mx-6 lg:-mx-8">
            {testimonialItems.map((q, i) => (
              <figure
                key={i}
                className="card flex w-[420px] shrink-0 flex-col p-7 sm:w-[460px]"
              >
                <span aria-hidden className="grad-text-ember font-display text-5xl leading-none font-extrabold">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-fg">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="avatar-ring size-12">
                    <div className="grid size-full place-items-center font-display text-base font-extrabold text-primary">
                      {q.name.slice(0, 1)}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-bold text-fg">{q.name}</div>
                    <div className="truncate text-xs text-muted">{q.role} · {q.company}</div>
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
              <div className="eyebrow">{t("faq.label")}</div>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-5xl">
                {t("faq.title")}
              </h2>
              <div className="card mt-8 p-6">
                <div className="eyebrow">{tBrand("name")}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{t("hero.subtitle")}</p>
                <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  {t("hero.secondaryCta")} <ArrowUpRight className="size-3.5" />
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
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grad-ember relative overflow-hidden rounded-[2.5rem] px-8 py-20 text-center text-white shadow-pop sm:px-16 lg:py-28">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/15 blur-3xl anim-float"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-white/15 blur-3xl"
              style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1.2s" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
                <Sparkles className="size-3.5" /> READY
              </div>
              <h2 className="mt-6 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-[96px]">
                {t("finalCta.title")}
              </h2>
              <p className="mx-auto mt-7 max-w-xl text-pretty text-lg text-white/90">
                {t("finalCta.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="/demos"
                  className="press inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-4 text-sm font-bold text-primary shadow-[0_12px_32px_-8px_rgba(0,0,0,0.3)]"
                >
                  {t("finalCta.primary")} <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/auth/signup"
                  className="press inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  {t("finalCta.secondary")} <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
