"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { DemoCard } from "@/components/storefront/DemoCard";

interface DemoMeta {
  slug: string;
  category: string;
  titleKey: string;
  descriptionKey: string;
  basePriceUsd: number;
  featured?: boolean;
}

const DEMOS: DemoMeta[] = [
  { slug: "shop",       category: "ecommerce",  titleKey: "demos.shop.title",       descriptionKey: "demos.shop.description",       basePriceUsd: 499 },
  { slug: "gym",        category: "fitness",    titleKey: "demos.gym.title",        descriptionKey: "demos.gym.description",        basePriceUsd: 399 },
  { slug: "accounting", category: "business",   titleKey: "demos.accounting.title", descriptionKey: "demos.accounting.description", basePriceUsd: 599 },
  { slug: "china-uni",  category: "education",  titleKey: "demos.china_uni.title",  descriptionKey: "demos.china_uni.description",  basePriceUsd: 799, featured: true },
  { slug: "school",     category: "education",  titleKey: "demos.school.title",     descriptionKey: "demos.school.description",     basePriceUsd: 699 },
  { slug: "university", category: "education",  titleKey: "demos.university.title", descriptionKey: "demos.university.description", basePriceUsd: 899 },
  { slug: "restaurant", category: "food",       titleKey: "demos.restaurant.title", descriptionKey: "demos.restaurant.description", basePriceUsd: 449 },
  { slug: "personal",   category: "personal",   titleKey: "demos.pim.title",        descriptionKey: "demos.pim.description",        basePriceUsd: 199 },
  { slug: "clinic",     category: "health",     titleKey: "demos.clinic.title",     descriptionKey: "demos.clinic.description",     basePriceUsd: 549 },
  { slug: "logistics",  category: "logistics",  titleKey: "demos.logistics.title",  descriptionKey: "demos.logistics.description",  basePriceUsd: 649 },
];

const CATEGORIES = ["all", "ecommerce", "fitness", "business", "education", "food", "personal", "health", "logistics"];

export default function DemosPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? DEMOS
      : DEMOS.filter((d) => d.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/auth/login" className="hover:text-neutral-600">
              {t("common.signIn")}
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700"
            >
              {t("common.signUp")}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">{t("demosPage.heading")}</h1>
          <p className="mt-3 text-neutral-500">{t("demosPage.subheading")}</p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-600 border-neutral-300 hover:border-neutral-500"
              }`}
            >
              {cat === "all" ? t("demosPage.filterAll") : cat}
            </button>
          ))}
        </div>

        {/* Demo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((demo) => (
            <DemoCard
              key={demo.slug}
              slug={demo.slug}
              category={demo.category}
              titleKey={demo.titleKey}
              descriptionKey={demo.descriptionKey}
              basePriceUsd={demo.basePriceUsd}
              featured={demo.featured}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
