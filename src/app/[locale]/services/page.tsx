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
      <section className="relative my-8 overflow-hidden rounded-3xl">
        <div className="grad-ember relative px-8 py-16 text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/15 blur-3xl anim-float" />
          <div className="relative grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur">
                {t("title")} · [06]
              </div>
              <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-pretty text-lg leading-relaxed text-white/90 lg:col-span-4">
              {t("lede")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEM_KEYS.map(({ key, Icon }) => (
            <article key={key} className="card lift group p-7">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-6 font-display text-xl font-extrabold text-fg">
                {t(`items.${key}.title`)}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`items.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="grad-forge relative overflow-hidden rounded-3xl p-12 text-center text-white sm:p-16">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/8 blur-3xl" />
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-white/85">{t("ctaLede")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/demos"
              className="press inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-lg"
            >
              {t("ctaPrimary")} <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="press inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-bold backdrop-blur transition hover:bg-white/20"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
