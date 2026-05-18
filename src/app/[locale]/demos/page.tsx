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

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((d) => (
          <DemoCard key={d.slug} demo={d} previewLabel={t("preview")} />
        ))}
      </div>
    </div>
  );
}
