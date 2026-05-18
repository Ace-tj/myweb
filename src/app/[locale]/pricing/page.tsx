import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";

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
      <section className="border-b border-border py-20 lg:py-28">
        <div className="max-w-4xl">
          <div className="spec-line flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-primary" />
            {t("title")}
          </div>
          <h1 className="mt-7 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tighter text-fg sm:text-7xl lg:text-[88px]">
            {t("title")}
          </h1>
          <p className="mt-7 text-pretty text-lg leading-relaxed text-muted">{t("lede")}</p>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="grid gap-6 lg:grid-cols-3">
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
                <div className="spec-line">{t(`tiers.${i}.name`)}</div>
                <div className="mt-5 font-display text-6xl font-bold tracking-tighter text-fg">
                  {t(`tiers.${i}.price`)}
                </div>
                <p className="mt-4 text-sm text-muted">{t(`tiers.${i}.blurb`)}</p>
                <ul className="mt-8 flex-1 space-y-3 text-sm text-fg">
                  {[0, 1, 2, 3].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{t(`tiers.${i}.bullets.${b}`)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-10 inline-flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest transition ${
                    highlight
                      ? "bg-primary text-primary-fg hover:bg-primary-hover"
                      : "border border-border-strong bg-bg text-fg hover:border-fg hover:bg-surface"
                  }`}
                >
                  {t(`tiers.${i}.cta`)} →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="font-display text-4xl font-bold leading-[1] tracking-tighter text-fg sm:text-5xl lg:col-span-4">
            {tPricing("includedTitle")}
          </h2>
          <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:col-span-8">
            {included.map((item, i) => (
              <li key={item} className="flex items-start gap-3 bg-bg p-4 text-sm text-fg">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
