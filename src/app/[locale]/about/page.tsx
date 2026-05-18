import { getTranslations, setRequestLocale } from "next-intl/server";
import { Target, Users, Zap } from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const cards = [
    { Icon: Target, key: "goal" as const },
    { Icon: Users, key: "team" as const },
    { Icon: Zap, key: "speed" as const },
  ];

  return (
    <article className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <section className="border-b border-border py-20 lg:py-28">
        <div className="max-w-4xl">
          <div className="spec-line flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-primary" />
            {t("eyebrow")}
          </div>
          <h1 className="mt-7 text-balance font-display text-5xl font-bold leading-[0.95] tracking-tighter text-fg sm:text-7xl lg:text-[88px]">
            {t("title")}
          </h1>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="text-pretty text-lg leading-relaxed text-fg lg:col-span-7">{t("p1")}</p>
          <p className="text-pretty leading-relaxed text-muted lg:col-span-5">{t("p2")}</p>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3">
          {cards.map(({ Icon, key }) => (
            <div key={key} className="group bg-bg p-8 transition hover:bg-surface">
              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-sm bg-primary/15 text-primary transition group-hover:bg-primary group-hover:text-primary-fg">
                  <Icon className="size-4" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {key.toUpperCase()}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-fg">
                {t(`cards.${key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(`cards.${key}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <h2 className="font-display text-4xl font-bold tracking-tighter text-fg sm:text-5xl">
          {t("howWeWorkTitle")}
        </h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="bg-bg p-8">
              <span className="brut-number-badge">{String(i + 1).padStart(2, "0")}</span>
              <div className="mt-6">
                <strong className="block font-display text-lg font-bold text-fg">
                  {t(`steps.${i}.label`)}
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`steps.${i}.body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
