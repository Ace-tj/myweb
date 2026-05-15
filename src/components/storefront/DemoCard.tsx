"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export interface DemoCardProps {
  slug: string;
  category: string;
  titleKey: string;
  descriptionKey: string;
  basePriceUsd: number;
  featured?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  ecommerce: "bg-blue-100 text-blue-700",
  fitness: "bg-green-100 text-green-700",
  business: "bg-purple-100 text-purple-700",
  education: "bg-yellow-100 text-yellow-700",
  food: "bg-orange-100 text-orange-700",
  personal: "bg-pink-100 text-pink-700",
  health: "bg-teal-100 text-teal-700",
  logistics: "bg-gray-100 text-gray-700",
};

export function DemoCard({
  slug,
  category,
  titleKey,
  descriptionKey,
  basePriceUsd,
  featured = false,
}: DemoCardProps) {
  const t = useTranslations();
  const badgeClass =
    CATEGORY_COLORS[category] ?? "bg-neutral-100 text-neutral-700";

  return (
    <div
      className={`relative flex flex-col bg-white rounded-2xl border transition-shadow hover:shadow-md ${
        featured
          ? "border-neutral-900 shadow-sm"
          : "border-neutral-200"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-4 bg-neutral-900 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
          Featured
        </div>
      )}

      {/* Visual placeholder */}
      <div className="h-36 rounded-t-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
        <span className="text-neutral-400 text-sm font-medium">{titleKey}</span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Badge */}
        <span
          className={`self-start text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`}
        >
          {category}
        </span>

        <h3 className="mt-2 font-semibold text-neutral-900 leading-snug">
          {t(titleKey as Parameters<typeof t>[0])}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 flex-1 leading-relaxed">
          {t(descriptionKey as Parameters<typeof t>[0])}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-neutral-500">
            <span className="text-neutral-400 text-xs">{t("demosPage.from")} </span>
            <span className="font-semibold text-neutral-900">${basePriceUsd}</span>
          </p>
        </div>

        <div className="mt-3 flex gap-2">
          <Link
            href={`/demos/${slug}` as `/demos/${string}`}
            className="flex-1 text-center rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-50 transition-colors"
          >
            {t("demosPage.preview")}
          </Link>
          <Link
            href={`/auth/signup?demo=${slug}` as `/auth/signup`}
            className="flex-1 text-center rounded-lg bg-neutral-900 text-white px-3 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors"
          >
            {t("demosPage.wantThis")}
          </Link>
        </div>
      </div>
    </div>
  );
}
