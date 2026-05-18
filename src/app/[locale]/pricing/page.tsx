import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Check } from "lucide-react";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.pricing");
  const tPricing = await getTranslations("pricing");
  const included = tPricing.raw("included") as string[];

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <section className="relative my-8 overflow-hidden rounded-3xl">
        <div className="grad-ember relative px-8 py-16 text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/15 blur-3xl anim-float" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur">
              {t("title")}
            </div>
            <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90">{t("lede")}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[0, 1, 2].map((i) => {
            const highlight = i === 1;
            return (
              <div
                key={i}
                className={`relative flex flex-col rounded-3xl p-8 transition ${
                  highlight ? "grad-forge text-white shadow-pop" : "card lift"
                }`}
              >
                {highlight && (
                  <span className="absolute -top-3 left-8 grad-ember rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {t("popularBadge")}
                  </span>
                )}
                <div className="eyebrow" style={highlight ? { color: "rgba(255,255,255,0.7)" } : undefined}>
                  {t(`tiers.${i}.name`)}
                </div>
                <div className={`mt-5 font-display text-6xl font-extrabold tracking-tight ${highlight ? "text-white" : "grad-text-ember"}`}>
                  {t(`tiers.${i}.price`)}
                </div>
                <p className={`mt-4 text-sm ${highlight ? "text-white/85" : "text-muted"}`}>
                  {t(`tiers.${i}.blurb`)}
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {[0, 1, 2, 3].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 size-4 shrink-0 ${highlight ? "text-primary-hover" : "text-primary"}`} />
                      <span className={highlight ? "text-white/90" : "text-fg"}>
                        {t(`tiers.${i}.bullets.${b}`)}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`press mt-10 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-bold transition ${
                    highlight ? "bg-white text-primary hover:bg-white/90" : "btn-primary"
                  }`}
                >
                  {t(`tiers.${i}.cta`)} <ArrowRight className="size-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="font-display text-4xl font-extrabold leading-[1] tracking-tight text-fg sm:text-5xl lg:col-span-4">
            {tPricing("includedTitle")}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {included.map((item, i) => (
              <li key={item} className="card flex items-start gap-3 p-4">
                <span className="grad-ember grid size-8 shrink-0 place-items-center rounded-xl font-mono text-[10px] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed text-fg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
