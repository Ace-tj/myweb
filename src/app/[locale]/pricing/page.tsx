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
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="max-w-3xl">
        <div className="editorial-eyebrow flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-primary" />
          {t("title")}
        </div>
        <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">{t("lede")}</p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {[0, 1, 2].map((i) => {
          const highlight = i === 1;
          return (
            <div
              key={i}
              className={`relative rounded-3xl p-8 transition ${
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
              <div className="editorial-eyebrow">{t(`tiers.${i}.name`)}</div>
              <div className="mt-4 font-display text-5xl font-medium text-fg">
                {t(`tiers.${i}.price`)}
              </div>
              <p className="mt-3 text-sm text-muted">{t(`tiers.${i}.blurb`)}</p>
              <ul className="mt-7 space-y-3 text-sm text-fg">
                {[0, 1, 2, 3].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{t(`tiers.${i}.bullets.${b}`)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-medium transition ${
                  highlight
                    ? "bg-primary text-primary-fg hover:bg-primary-hover"
                    : "border border-border bg-bg text-fg hover:bg-surface"
                }`}
              >
                {t(`tiers.${i}.cta`)}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-20 rounded-3xl border border-border bg-surface/60 p-10 sm:p-12">
        <h2 className="font-display text-3xl font-medium tracking-tight text-fg">
          {tPricing("includedTitle")}
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-4 text-sm text-fg sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-2.5 border-b border-border/60 pb-3">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
