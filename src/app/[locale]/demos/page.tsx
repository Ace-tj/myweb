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
      {/* Header band */}
      <section className="border-b border-border py-20 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="spec-line flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-primary" />
              {t("title")}
              <span aria-hidden className="font-mono text-fg">[{String(demos.length).padStart(2, "0")}]</span>
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

      {/* Grid */}
      <section className="py-16">
        <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d) => (
            <DemoCard key={d.slug} demo={d} previewLabel={t("preview")} />
          ))}
        </div>
      </section>
    </div>
  );
}
