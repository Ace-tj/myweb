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

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">{t("lede")}</p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {[0, 1, 2].map((i) => {
          const highlight = i === 1;
          return (
            <div
              key={i}
              className={`relative rounded-3xl border p-8 ${
                highlight
                  ? "border-primary bg-primary/5 lg:scale-[1.03]"
                  : "border-border bg-surface"
              }`}
            >
              {highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-fg">
                  Most picked
                </span>
              )}
              <div className="font-display text-xl font-bold text-fg">
                {t(`tiers.${i}.name`)}
              </div>
              <div className="mt-2 text-4xl font-bold text-primary">
                {t(`tiers.${i}.price`)}
              </div>
              <p className="mt-3 text-sm text-muted">{t(`tiers.${i}.blurb`)}</p>
              <ul className="mt-6 space-y-3 text-sm text-fg">
                {[0, 1, 2, 3].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{t(`tiers.${i}.bullets.${b}`)}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                  highlight
                    ? "bg-primary text-primary-fg hover:bg-primary-hover"
                    : "border border-border bg-bg text-fg hover:bg-surface-2"
                }`}
              >
                {t(`tiers.${i}.cta`)}
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-20 rounded-3xl border border-border bg-surface p-10">
        <h2 className="font-display text-2xl font-bold text-fg">What's included on every tier</h2>
        <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm text-muted sm:grid-cols-2">
          {[
            "Source code ownership",
            "Postgres database",
            "Daily backups",
            "Free SSL + domain pointing",
            "60-day post-launch support",
            "Mobile-first responsive design",
            "WCAG AA accessibility pass",
            "Lighthouse 90+ performance",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
