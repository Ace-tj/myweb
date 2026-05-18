import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { demoMeta, getDemoMeta, localizedDemo } from "@/lib/demos";

export async function generateStaticParams() {
  return demoMeta.map((d) => ({ slug: d.slug }));
}

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demos");
  const tData = await getTranslations("demoData");

  const meta = getDemoMeta(slug);
  if (!meta) notFound();

  const demo = localizedDemo(
    meta,
    tData as unknown as Parameters<typeof localizedDemo>[1],
  );

  return (
    <article className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* Top spec strip */}
      <div className="flex items-center justify-between border-b border-border py-4 font-mono text-[10px] uppercase tracking-widest text-muted">
        <Link href="/demos" className="inline-flex items-center gap-2 transition hover:text-fg">
          <ArrowLeft className="size-3.5" /> {t("back")}
        </Link>
        <span>
          <span className="text-primary">●</span> {demo.slug}
        </span>
      </div>

      <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <div className="spec-line flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-primary" />
            {demo.category}
          </div>
          <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tighter text-fg sm:text-7xl lg:text-[80px]">
            {demo.title}
          </h1>
          <p className="mt-7 text-pretty text-xl leading-relaxed text-fg">{demo.tagline}</p>
          <p className="mt-5 text-pretty leading-relaxed text-muted">{demo.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/demos/${demo.slug}/preview`}
              className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_24px_rgb(197_255_63_/_0.35)]"
            >
              {t("openPreview")}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition hover:border-fg hover:bg-surface"
            >
              {t("talkToConsultant")}
            </Link>
          </div>

          {/* Feature checklist */}
          <section className="mt-16">
            <h2 className="font-display text-3xl font-bold tracking-tighter text-fg">
              {t("youGet")}
            </h2>
            <ul className="mt-7 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
              {demo.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-3 bg-bg p-4 text-sm text-fg"
                >
                  <span className="brut-number-badge text-[10px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column — visual + price */}
        <aside className="lg:col-span-5">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border"
            style={{
              background: `linear-gradient(155deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}aa 50%, ${demo.thumbnail_color}55 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_25%,rgba(255,255,255,0.22),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.4)_100%)]" />

            <div className="absolute left-7 top-7 inline-flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-sm bg-white" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                {demo.category}
              </span>
            </div>

            <div className="absolute bottom-7 left-7 right-7">
              <div className="font-display text-3xl font-bold text-white">
                {demo.title}
              </div>
              <div className="mt-2 text-sm text-white/85">{demo.tagline}</div>
            </div>
          </div>

          <div className="mt-5 rounded-sm border border-border bg-bg p-6">
            <div className="spec-line">{t("startingFrom")}</div>
            <div className="mt-3 font-display text-5xl font-bold tracking-tighter text-primary">
              ${demo.price_usd.toLocaleString()}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("includesNote")}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
