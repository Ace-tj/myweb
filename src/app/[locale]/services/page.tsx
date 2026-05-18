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
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div className="editorial-eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-primary" />
            {t("title")}
          </div>
          <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {t("title")}
          </h1>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
          {t("lede")}
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
        {ITEM_KEYS.map(({ key, Icon }) => (
          <article key={key} className="bg-bg p-8 transition hover:bg-surface/60">
            <div className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <h2 className="mt-5 font-display text-lg font-medium text-fg">
              {t(`items.${key}.title`)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`items.${key}.body`)}</p>
          </article>
        ))}
      </div>

      <div className="mt-20 rounded-3xl border border-border bg-surface/60 p-12 text-center sm:p-16">
        <h2 className="font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted">{t("ctaLede")}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/demos"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-fg transition hover:bg-primary-hover"
          >
            {t("ctaPrimary")} <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-6 py-3.5 text-sm font-medium text-fg hover:bg-surface"
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </div>
  );
}
