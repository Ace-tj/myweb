import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Palette,
  Server,
  Plug,
  Database,
  Globe,
  ShieldCheck,
} from "lucide-react";

const ITEM_KEYS = [
  { key: "branding", Icon: Palette },
  { key: "hosting", Icon: Server },
  { key: "integrations", Icon: Plug },
  { key: "data", Icon: Database },
  { key: "i18n", Icon: Globe },
  { key: "compliance", Icon: ShieldCheck },
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <section className="border-b border-border py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("title")}
              <span aria-hidden className="font-mono text-fg">[06]</span>
            </div>
            <h1 className="mt-6 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tighter text-fg sm:text-7xl lg:text-[88px]">
              {t("title")}
            </h1>
          </div>
          <p className="text-pretty text-lg leading-relaxed text-muted lg:col-span-4">
            {t("lede")}
          </p>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ITEM_KEYS.map(({ key, Icon }, i) => (
            <article key={key} className="group bg-bg p-8 transition hover:bg-surface">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-sm bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-fg">
                  <Icon className="size-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-6 font-display text-lg font-bold text-fg">
                {t(`items.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`items.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="relative overflow-hidden rounded-sm border border-border bg-bg p-12 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgb(197_255_63_/_0.10),transparent_70%)]"
          />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold tracking-tighter text-fg sm:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-muted">{t("ctaLede")}</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                href="/demos"
                className="group inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_24px_rgb(197_255_63_/_0.35)]"
              >
                {t("ctaPrimary")}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-sm border border-border-strong px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-fg transition hover:border-fg hover:bg-surface"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
