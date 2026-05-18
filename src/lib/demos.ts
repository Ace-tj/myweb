import type { Demo } from "./types";

export interface DemoMeta {
  slug: string;
  price_usd: number;
  preview_path: string;
  thumbnail_color: string;
  icon: string;
  enabled: boolean;
  display_order: number;
  created_at: string;
}

export const demoMeta: DemoMeta[] = [
  { slug: "china-agency",   price_usd: 1200, preview_path: "/demos/china-agency/preview",  thumbnail_color: "#b91c1c", icon: "graduation-cap", enabled: true, display_order: 1,  created_at: new Date().toISOString() },
  { slug: "university",     price_usd: 2400, preview_path: "/demos/university/preview",    thumbnail_color: "#7c2d12", icon: "school",         enabled: true, display_order: 2,  created_at: new Date().toISOString() },
  { slug: "school",         price_usd: 1800, preview_path: "/demos/school/preview",        thumbnail_color: "#0284c7", icon: "backpack",       enabled: true, display_order: 3,  created_at: new Date().toISOString() },
  { slug: "restaurant",     price_usd: 1500, preview_path: "/demos/restaurant/preview",    thumbnail_color: "#c2410c", icon: "utensils",       enabled: true, display_order: 4,  created_at: new Date().toISOString() },
  { slug: "accounting",     price_usd: 2200, preview_path: "/demos/accounting/preview",    thumbnail_color: "#1e3a8a", icon: "calculator",     enabled: true, display_order: 5,  created_at: new Date().toISOString() },
  { slug: "hospital",       price_usd: 2800, preview_path: "/demos/hospital/preview",      thumbnail_color: "#0d9488", icon: "stethoscope",    enabled: true, display_order: 6,  created_at: new Date().toISOString() },
  { slug: "gym",            price_usd: 1100, preview_path: "/demos/gym/preview",           thumbnail_color: "#16a34a", icon: "dumbbell",       enabled: true, display_order: 7,  created_at: new Date().toISOString() },
  { slug: "shopping",       price_usd: 1900, preview_path: "/demos/shopping/preview",      thumbnail_color: "#db2777", icon: "shopping-bag",   enabled: true, display_order: 8,  created_at: new Date().toISOString() },
  { slug: "travel-agency",  price_usd: 1700, preview_path: "/demos/travel-agency/preview", thumbnail_color: "#0891b2", icon: "plane",          enabled: true, display_order: 9,  created_at: new Date().toISOString() },
  { slug: "beauty-salon",   price_usd: 900,  preview_path: "/demos/beauty-salon/preview",  thumbnail_color: "#a21caf", icon: "scissors",       enabled: true, display_order: 10, created_at: new Date().toISOString() },
];

type Translator = {
  (key: string): string;
  raw: (key: string) => unknown;
};

/**
 * Combine static meta + i18n translatable fields into a complete Demo.
 * Pass a translator scoped to "demoData" (e.g. from getTranslations("demoData")).
 */
export function localizedDemo(meta: DemoMeta, t: Translator): Demo {
  return {
    ...meta,
    title: t(`${meta.slug}.title`),
    tagline: t(`${meta.slug}.tagline`),
    category: t(`${meta.slug}.category`),
    description: t(`${meta.slug}.description`),
    features: t.raw(`${meta.slug}.features`) as string[],
  };
}

export function localizedDemos(t: Translator): Demo[] {
  return demoMeta.map((m) => localizedDemo(m, t));
}

export function getDemoMeta(slug: string): DemoMeta | undefined {
  return demoMeta.find((m) => m.slug === slug);
}

/**
 * Kept for back-compat / static export contexts where t() isn't available.
 * Returns the English fallback content so generateStaticParams etc still work.
 */
export const fallbackDemos: Demo[] = demoMeta.map((m) => ({
  ...m,
  title: m.slug,
  tagline: "",
  category: "",
  description: "",
  features: [],
}));

export function getFallbackDemo(slug: string): Demo | undefined {
  return fallbackDemos.find((d) => d.slug === slug);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
