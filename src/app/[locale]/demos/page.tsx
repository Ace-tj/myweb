import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoCard } from "@/components/demo-card";
import { localizedDemos } from "@/lib/demos";

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demos");
  const tData = await getTranslations("demoData");

  const demos = localizedDemos(tData as unknown as Parameters<typeof localizedDemos>[0]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      {/* Hero band — warm gradient strip */}
      <section className="relative my-8 overflow-hidden rounded-3xl">
        <div className="grad-ember relative px-8 py-16 text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/15 blur-3xl anim-float" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-12 size-64 rounded-full bg-white/10 blur-3xl" style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1.2s" }} />
          <div className="relative grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur">
                {t("title")} · [{String(demos.length).padStart(2, "0")}]
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

      <section className="pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d) => (
            <DemoCard key={d.slug} demo={d} previewLabel={t("preview")} />
          ))}
        </div>
      </section>
    </div>
  );
}
