import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
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
      <div className="py-6">
        <Link
          href="/demos"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft className="size-4" /> {t("back")}
        </Link>
      </div>

      <div className="grid gap-12 pb-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="eyebrow">{demo.category}</div>
          <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-fg sm:text-7xl lg:text-[80px]">
            {demo.title}
          </h1>
          <p className="mt-7 text-pretty text-xl leading-relaxed text-fg">{demo.tagline}</p>
          <p className="mt-5 text-pretty leading-relaxed text-muted">{demo.description}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`/demos/${demo.slug}/preview`}
              className="btn-primary"
            >
              <Sparkles className="size-4" />
              {t("openPreview")}
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className="btn-ghost">
              {t("talkToConsultant")}
            </Link>
          </div>

          <section className="mt-16">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-fg">
              {t("youGet")}
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {demo.features.map((f, i) => (
                <li
                  key={f}
                  className="card flex items-start gap-3 p-5"
                >
                  <span
                    className="grad-ember grid size-9 shrink-0 place-items-center rounded-xl font-mono text-xs font-bold text-white"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <Check className="mb-1 size-4 text-primary" />
                    <span className="text-sm leading-relaxed text-fg">{f}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-5">
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg"
            style={{
              background: `linear-gradient(155deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}cc 50%, ${demo.thumbnail_color}80 100%)`,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_25%,rgba(255,255,255,0.30),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.45)_100%)]" />

            <div className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              <span aria-hidden className="size-1.5 rounded-full bg-white" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white">
                {demo.category}
              </span>
            </div>

            <div className="absolute bottom-7 left-7 right-7">
              <div className="font-display text-3xl font-extrabold text-white drop-shadow">
                {demo.title}
              </div>
              <div className="mt-2 text-sm text-white/85">{demo.tagline}</div>
            </div>
          </div>

          <div className="card mt-5 p-6">
            <div className="eyebrow">{t("startingFrom")}</div>
            <div className="mt-3 grad-text-ember font-display text-5xl font-extrabold tracking-tight">
              ${demo.price_usd.toLocaleString()}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("includesNote")}</p>
          </div>
        </aside>
      </div>
    </article>
  );
}
