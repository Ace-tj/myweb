import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { demoMeta, getDemoMeta, localizedDemo } from "@/lib/demos";
import { DemoRegistry } from "@/demos/registry";

export async function generateStaticParams() {
  return demoMeta.map((d) => ({ slug: d.slug }));
}

export default async function DemoPreviewPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demos.preview_header");
  const tData = await getTranslations("demoData");

  const meta = getDemoMeta(slug);
  const Demo = DemoRegistry[slug];
  if (!meta || !Demo) notFound();

  const demo = localizedDemo(
    meta,
    tData as unknown as Parameters<typeof localizedDemo>[1],
  );

  return (
    <>
      <div
        className="sticky top-0 z-50 flex items-center justify-between border-b px-4 py-2 text-xs"
        style={{
          background: "rgba(255,255,255,0.92)",
          color: "#0a0a0a",
          backdropFilter: "blur(8px)",
          borderColor: "#e5e5e5",
        }}
      >
        <Link
          href={`/${locale}/demos/${slug}`}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#404040" }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} /> {t("backToDetail", { name: demo.title })}
        </Link>
        <span style={{ fontWeight: 600 }}>{t("livePreviewLabel", { name: demo.title })}</span>
        <Link
          href={`/${locale}/contact`}
          style={{
            background: demo.thumbnail_color,
            color: "white",
            padding: "4px 12px",
            borderRadius: 9999,
            fontWeight: 600,
          }}
        >
          {t("getThisOne")}
        </Link>
      </div>
      <Demo />
    </>
  );
}
