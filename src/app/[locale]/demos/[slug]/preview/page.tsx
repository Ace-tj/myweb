"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

const DEMO_COMPONENTS: Record<string, React.ComponentType> = {
  shop:        dynamic(() => import("@/demos/shop/Demo")),
  gym:         dynamic(() => import("@/demos/gym/Demo")),
  accounting:  dynamic(() => import("@/demos/accounting/Demo")),
  "china-uni": dynamic(() => import("@/demos/china-uni/Demo")),
  school:      dynamic(() => import("@/demos/school/Demo")),
  university:  dynamic(() => import("@/demos/university/Demo")),
  restaurant:  dynamic(() => import("@/demos/restaurant/Demo")),
  personal:    dynamic(() => import("@/demos/personal/Demo")),
  clinic:      dynamic(() => import("@/demos/clinic/Demo")),
  logistics:   dynamic(() => import("@/demos/logistics/Demo")),
};

const TITLE_KEYS: Record<string, string> = {
  shop: "demos.shop.title", gym: "demos.gym.title", accounting: "demos.accounting.title",
  "china-uni": "demos.china_uni.title", school: "demos.school.title", university: "demos.university.title",
  restaurant: "demos.restaurant.title", personal: "demos.pim.title", clinic: "demos.clinic.title",
  logistics: "demos.logistics.title",
};

export default function PreviewPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = use(params);
  const t = useTranslations();
  const Demo = DEMO_COMPONENTS[slug];
  if (!Demo) notFound();
  const label = t(TITLE_KEYS[slug] as Parameters<typeof t>[0]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      {/* Browser chrome toolbar */}
      <div className="sticky top-0 z-50 flex items-center gap-3 px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer transition-colors" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer transition-colors" />
          <span className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 cursor-pointer transition-colors" />
        </div>

        <Link
          href={`/demos/${slug}` as "/"}
          className="flex items-center gap-1.5 text-neutral-500 hover:text-neutral-300 text-xs transition-colors shrink-0"
        >
          <ArrowLeft size={13} /> {t("preview.back")}
        </Link>

        <div className="flex-1 mx-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 max-w-md mx-auto">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-neutral-400 font-mono truncate">
              myweb.app/demos/{slug}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:block text-xs text-neutral-500 font-medium uppercase tracking-wide">
            {label}
          </span>
          <Link
            href={`/auth/signup?demo=${slug}` as "/"}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
          >
            <ExternalLink size={11} /> {t("preview.iWantThis")}
          </Link>
        </div>
      </div>

      {/* The live demo */}
      <div className="flex-1 bg-white">
        <Demo />
      </div>
    </div>
  );
}
