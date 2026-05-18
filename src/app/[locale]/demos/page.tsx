import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoCard } from "@/components/demo-card";
import { fallbackDemos } from "@/lib/demos";

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demos");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">{t("lede")}</p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fallbackDemos.map((d) => (
          <DemoCard key={d.slug} demo={d} previewLabel={t("preview")} />
        ))}
      </div>
    </div>
  );
}
