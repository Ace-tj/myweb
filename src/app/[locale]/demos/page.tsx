"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { DemoCard } from "@/components/storefront/DemoCard";
import { Search, SlidersHorizontal, ArrowLeft } from "lucide-react";

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

const CATEGORIES = [
  { id: "all",       label: "All Demos" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "education", label: "Education" },
  { id: "business",  label: "Business" },
  { id: "fitness",   label: "Fitness" },
  { id: "food",      label: "Food & POS" },
  { id: "health",    label: "Health" },
  { id: "logistics", label: "Logistics" },
  { id: "personal",  label: "Personal" },
];

const SORT_OPTIONS = [
  { id: "default", label: "Default" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export default function DemosPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = DEMOS.filter((d) => {
    if (activeCategory !== "all" && d.category !== activeCategory) return false;
    if (search && !d.titleKey.toLowerCase().includes(search.toLowerCase()) && !d.slug.includes(search.toLowerCase())) return false;
    return true;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.basePriceUsd - b.basePriceUsd);
  if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.basePriceUsd - a.basePriceUsd);

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors">
            <ArrowLeft size={14} />
            <span className="font-extrabold text-lg gradient-text">myweb</span>
          </Link>
          <div className="flex-1 max-w-xs hidden sm:block">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-subtle))]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search demos..."
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] focus:outline-none focus:border-[rgb(var(--accent))] transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[rgb(var(--border))] text-xs font-medium hover:bg-[rgb(var(--bg-hover))] transition-colors"
            >
              <SlidersHorizontal size={13} />
              Sort
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/auth/login" className="text-sm font-medium px-3 py-2 rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors">Sign in</Link>
            <Link href="/auth/signup" className="text-sm font-semibold px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors">
              Get Started
            </Link>
          </div>
        </div>

        {/* Sort dropdown */}
        {showFilters && (
          <div className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]">
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center gap-3">
              <span className="text-xs text-[rgb(var(--text-muted))] font-medium">Sort by:</span>
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => { setSort(o.id); setShowFilters(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    sort === o.id
                      ? "bg-[rgb(var(--accent))] text-white"
                      : "border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-hover))]"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden bg-[rgb(var(--bg-subtle))] border-b border-[rgb(var(--border))]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[rgb(var(--accent))]/8 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              Browse All <span className="gradient-text">10 Demos</span>
            </h1>
            <p className="text-[rgb(var(--text-muted))] text-lg max-w-xl mx-auto">
              Every demo is a fully working system with real pages, real data, and real interactions.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 py-8">
          {/* Mobile search */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-subtle))]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search demos..."
                className="w-full pl-8 pr-3 py-2.5 text-sm rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-subtle))] focus:outline-none focus:border-[rgb(var(--accent))] transition-colors"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  activeCategory === cat.id
                    ? "bg-[rgb(var(--accent))] text-white border-transparent shadow-md shadow-[rgb(var(--accent))]/20"
                    : "border-[rgb(var(--border))] text-[rgb(var(--text-muted))] hover:border-[rgb(var(--accent))]/50 hover:text-[rgb(var(--text))] bg-[rgb(var(--bg-card))]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[rgb(var(--text-muted))]">
              <span className="font-bold text-[rgb(var(--text))]">{filtered.length}</span> demos found
            </p>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[rgb(var(--text-muted))]">
              <p className="text-lg font-medium mb-2">No demos found</p>
              <p className="text-sm">Try a different category or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((demo) => (
                <DemoCard key={demo.slug} {...demo} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-[rgb(var(--border))] py-6 px-6 text-center text-sm text-[rgb(var(--text-muted))]">
        © {new Date().getFullYear()} myweb — <Link href="/" className="hover:text-[rgb(var(--text))]">Back to home</Link>
      </footer>
    </div>
  );
}
