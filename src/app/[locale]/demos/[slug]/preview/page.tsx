import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const DEMO_COMPONENTS: Record<string, React.ComponentType> = {
  shop: dynamic(() =>
    import("@/demos/shop/Demo").then((m) => ({ default: m.default }))
  ),
  gym: dynamic(() =>
    import("@/demos/gym/Demo").then((m) => ({ default: m.default }))
  ),
  accounting: dynamic(() =>
    import("@/demos/accounting/Demo").then((m) => ({ default: m.default }))
  ),
  "china-uni": dynamic(() =>
    import("@/demos/china-uni/Demo").then((m) => ({ default: m.default }))
  ),
  school: dynamic(() =>
    import("@/demos/school/Demo").then((m) => ({ default: m.default }))
  ),
  university: dynamic(() =>
    import("@/demos/university/Demo").then((m) => ({ default: m.default }))
  ),
  restaurant: dynamic(() =>
    import("@/demos/restaurant/Demo").then((m) => ({ default: m.default }))
  ),
  personal: dynamic(() =>
    import("@/demos/personal/Demo").then((m) => ({ default: m.default }))
  ),
  clinic: dynamic(() =>
    import("@/demos/clinic/Demo").then((m) => ({ default: m.default }))
  ),
  logistics: dynamic(() =>
    import("@/demos/logistics/Demo").then((m) => ({ default: m.default }))
  ),
};

const VALID_SLUGS = Object.keys(DEMO_COMPONENTS);

export function generateStaticParams() {
  const locales = ["en", "ru", "tg"];
  const slugs = ["shop", "gym", "accounting", "china-uni", "school", "university", "restaurant", "personal", "clinic", "logistics"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function DemoPreviewPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!VALID_SLUGS.includes(slug)) notFound();

  const DemoComponent = DEMO_COMPONENTS[slug];

  return (
    <div className="min-h-screen">
      <DemoComponent />
    </div>
  );
}
