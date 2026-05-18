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
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="editorial-eyebrow flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-primary" />
        {t("eyebrow")}
      </div>
      <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-8 text-pretty text-lg leading-relaxed text-muted">{t("p1")}</p>
      <p className="mt-5 text-pretty leading-relaxed text-muted">{t("p2")}</p>

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-3">
        {cards.map(({ Icon, key }) => (
          <div key={key} className="bg-bg p-6 transition hover:bg-surface/60">
            <div className="grid size-9 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-4" />
            </div>
            <h3 className="mt-5 font-display text-lg font-medium text-fg">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t(`cards.${key}.body`)}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-20 font-display text-3xl font-medium tracking-tight text-fg">
        {t("howWeWorkTitle")}
      </h2>
      <ol className="mt-6 space-y-6">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="border-t border-border-strong pt-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="editorial-rule flex-1" />
            </div>
            <div className="mt-4 text-base leading-relaxed text-muted">
              <strong className="font-display text-lg font-medium text-fg">
                {t(`steps.${i}.label`)}
              </strong>
              {t(`steps.${i}.body`)}
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
