"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { DemoCard } from "@/components/storefront/DemoCard";
import { Search, SlidersHorizontal } from "lucide-react";

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

const CATEGORY_IDS = ["all", "ecommerce", "education", "business", "fitness", "food", "health", "logistics", "personal"] as const;

export function DemosGrid() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = DEMOS.filter((d) => {
    if (activeCategory !== "all" && d.category !== activeCategory) return false;
    if (search) {
      const translatedTitle = t(d.titleKey as Parameters<typeof t>[0]).toLowerCase();
      const q = search.toLowerCase();
      if (!translatedTitle.includes(q) && !d.slug.includes(q)) return false;
    }
    return true;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.basePriceUsd - b.basePriceUsd);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.basePriceUsd - a.basePriceUsd);

  const SORT_OPTIONS = [
    { id: "default",    label: t("demosPage.sortDefault") },
    { id: "price-asc",  label: t("demosPage.sortPriceAsc") },
    { id: "price-desc", label: t("demosPage.sortPriceDesc") },
  ];

  return (
    <>
      {/* Search/sort row */}
      <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]/50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-3">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-subtle))]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("demosPage.searchPlaceholder")}
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] focus:outline-none focus:border-[rgb(var(--accent))] transition-colors"
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[rgb(var(--border))] text-xs font-medium hover:bg-[rgb(var(--bg-hover))] transition-colors"
            style={{ color: "rgb(var(--text-muted))" }}
          >
            <SlidersHorizontal size={13} />
            {t("demosPage.sort")}
          </button>
        </div>
        {showFilters && (
          <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]">
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-3">
              <span className="text-xs text-[rgb(var(--text-muted))] font-medium">{t("demosPage.sortBy")}</span>
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => { setSort(o.id); setShowFilters(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    sort === o.id
                      ? "bg-[rgb(var(--accent))] text-white"
                      : "border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-hover))]"
                  }`}
                  style={sort === o.id ? undefined : { color: "rgb(var(--text-muted))" }}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Category tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORY_IDS.map((id) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === id
                  ? "bg-[rgb(var(--accent))] text-white border-transparent shadow-md shadow-[rgb(var(--accent))]/20"
                  : "border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/50 bg-[rgb(var(--bg-card))]"
              }`}
              style={activeCategory === id ? undefined : { color: "rgb(var(--text-muted))" }}
            >
              {t(`demosPage.categories.${id}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>
            {t("demosPage.demosFound", { count: filtered.length })}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "rgb(var(--text-muted))" }}>
            <p className="text-lg font-medium mb-2">{t("demosPage.noFound")}</p>
            <p className="text-sm">{t("demosPage.tryDifferent")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((demo) => (
              <DemoCard key={demo.slug} {...demo} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
