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
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/demos"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-primary"
      >
        <ArrowLeft className="size-4" /> {t("back")}
      </Link>

      <div className="mt-10 grid gap-12 lg:grid-cols-12">
        {/* LEFT — editorial spread */}
        <div className="lg:col-span-7">
          <div className="editorial-eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-primary" />
            {demo.category}
          </div>
          <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {demo.title}
          </h1>
          <p className="mt-6 text-pretty text-xl leading-relaxed text-fg">{demo.tagline}</p>
          <p className="mt-5 text-pretty leading-relaxed text-muted">{demo.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/demos/${demo.slug}/preview`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-fg shadow-sm transition hover:bg-primary-hover"
            >
              {t("openPreview")}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-6 py-3.5 text-sm font-medium text-fg hover:bg-surface"
            >
              {t("talkToConsultant")}
            </Link>
          </div>

          {/* WHAT'S INCLUDED */}
          <section className="mt-16">
            <h2 className="font-display text-3xl font-medium tracking-tight text-fg">
              {t("youGet")}
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {demo.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 border-t border-border-strong pt-4 text-sm text-fg"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* RIGHT — visual + price */}
        <aside className="lg:col-span-5">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border"
            style={{
              background: `linear-gradient(165deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}cc 60%, ${demo.thumbnail_color}80 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_25%,rgba(255,255,255,0.28),transparent_70%)]" />
            <div className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
              <span aria-hidden className="size-1.5 rounded-full bg-white" />
              {demo.category}
            </div>
            <div className="absolute bottom-7 left-7 right-7">
              <div className="font-display text-3xl font-medium text-white">
                {demo.title}
              </div>
              <div className="mt-2 text-sm text-white/85">{demo.tagline}</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-6">
            <div className="editorial-eyebrow">{t("startingFrom")}</div>
            <div className="mt-2 font-display text-5xl font-medium text-primary">
              ${demo.price_usd.toLocaleString()}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("includesNote")}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
