import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";

interface DemoMeta {
  slug: string;
  category: string;
  titleKey: string;
  descriptionKey: string;
  basePriceUsd: number;
  accentColor: string;
}

const DEMOS: DemoMeta[] = [
  { slug: "shop",       category: "ecommerce",  titleKey: "demos.shop.title",       descriptionKey: "demos.shop.description",       basePriceUsd: 499, accentColor: "bg-blue-500" },
  { slug: "gym",        category: "fitness",    titleKey: "demos.gym.title",        descriptionKey: "demos.gym.description",        basePriceUsd: 399, accentColor: "bg-green-500" },
  { slug: "accounting", category: "business",   titleKey: "demos.accounting.title", descriptionKey: "demos.accounting.description", basePriceUsd: 599, accentColor: "bg-purple-500" },
  { slug: "china-uni",  category: "education",  titleKey: "demos.china_uni.title",  descriptionKey: "demos.china_uni.description",  basePriceUsd: 799, accentColor: "bg-yellow-500" },
  { slug: "school",     category: "education",  titleKey: "demos.school.title",     descriptionKey: "demos.school.description",     basePriceUsd: 699, accentColor: "bg-amber-500" },
  { slug: "university", category: "education",  titleKey: "demos.university.title", descriptionKey: "demos.university.description", basePriceUsd: 899, accentColor: "bg-orange-500" },
  { slug: "restaurant", category: "food",       titleKey: "demos.restaurant.title", descriptionKey: "demos.restaurant.description", basePriceUsd: 449, accentColor: "bg-red-500" },
  { slug: "personal",   category: "personal",   titleKey: "demos.pim.title",        descriptionKey: "demos.pim.description",        basePriceUsd: 199, accentColor: "bg-pink-500" },
  { slug: "clinic",     category: "health",     titleKey: "demos.clinic.title",     descriptionKey: "demos.clinic.description",     basePriceUsd: 549, accentColor: "bg-teal-500" },
  { slug: "logistics",  category: "logistics",  titleKey: "demos.logistics.title",  descriptionKey: "demos.logistics.description",  basePriceUsd: 649, accentColor: "bg-gray-600" },
];

export function generateStaticParams() {
  const locales = ["en", "ru", "tg"];
  const slugs = ["shop", "gym", "accounting", "china-uni", "school", "university", "restaurant", "personal", "clinic", "logistics"];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function DemoSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const demoOrUndef = DEMOS.find((d) => d.slug === slug);
  if (!demoOrUndef) notFound();
  const demo = demoOrUndef!;

  const title = t(demo.titleKey as Parameters<typeof t>[0]);
  const description = t(demo.descriptionKey as Parameters<typeof t>[0]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/demos" className="text-neutral-500 hover:text-neutral-700">
              ← {t("demosPage.backToDemos")}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-4xl w-full px-6 py-12">
        {/* Demo preview placeholder */}
        <div
          className={`w-full h-72 rounded-2xl flex items-center justify-center text-white text-2xl font-bold ${demo.accentColor}`}
        >
          {title}
        </div>

        {/* Info */}
        <div className="mt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
              {demo.category}
            </span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-3 text-neutral-600 max-w-xl leading-relaxed">{description}</p>
          </div>

          <div className="shrink-0 bg-white border border-neutral-200 rounded-2xl p-6 text-center min-w-48">
            <p className="text-sm text-neutral-500">{t("demosPage.from")}</p>
            <p className="text-3xl font-bold mt-1">${demo.basePriceUsd}</p>
            <Link
              href={`/auth/signup?demo=${slug}` as `/auth/signup`}
              className="mt-4 inline-block w-full rounded-lg bg-neutral-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors"
            >
              {t("demosPage.wantThis")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
