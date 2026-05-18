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
      <section className="relative my-8 overflow-hidden rounded-3xl">
        <div className="grad-ember relative px-8 py-16 text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/15 blur-3xl anim-float" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur">
              {t("eyebrow")}
            </div>
            <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      <section className="grid gap-10 py-12 lg:grid-cols-12">
        <p className="text-pretty text-lg leading-relaxed text-fg lg:col-span-7">{t("p1")}</p>
        <p className="text-pretty leading-relaxed text-muted lg:col-span-5">{t("p2")}</p>
      </section>

      <section className="grid gap-6 py-8 sm:grid-cols-3">
        {cards.map(({ Icon, key }) => (
          <div key={key} className="card lift group p-7">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-6 font-display text-xl font-extrabold text-fg">
              {t(`cards.${key}.title`)}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`cards.${key}.body`)}</p>
          </div>
        ))}
      </section>

      <section className="py-20">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl">
          {t("howWeWorkTitle")}
        </h2>
        <ol className="mt-10 space-y-4">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="card lift flex gap-5 p-6">
              <span className="grad-ember grid size-12 shrink-0 place-items-center rounded-2xl font-display text-base font-extrabold text-white shadow-[0_8px_20px_-6px_rgb(224_78_44_/_0.5)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <strong className="block font-display text-lg font-extrabold text-fg">
                  {t(`steps.${i}.label`)}
                </strong>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`steps.${i}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
