"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ShoppingBag, Dumbbell, Calculator, GraduationCap, School,
  UtensilsCrossed, User, Stethoscope, Truck, Eye, ArrowRight, Sparkles,
} from "lucide-react";

export interface DemoCardProps {
  slug: string;
  category: string;
  titleKey: string;
  descriptionKey: string;
  basePriceUsd: number;
  featured?: boolean;
}

const DEMO_META: Record<string, {
  icon: React.ElementType;
  gradient: string;
  tags: string[];
}> = {
  shop:       { icon: ShoppingBag,     gradient: "from-orange-500 to-red-500",       tags: ["E-commerce", "Inventory", "Orders"] },
  gym:        { icon: Dumbbell,        gradient: "from-emerald-400 to-green-600",     tags: ["Members", "Schedule", "Billing"] },
  accounting: { icon: Calculator,      gradient: "from-blue-500 to-indigo-600",       tags: ["Invoices", "Reports", "Tax"] },
  "china-uni":{ icon: GraduationCap,   gradient: "from-red-700 to-red-900",           tags: ["Universities", "Apply", "Agent"] },
  school:     { icon: School,          gradient: "from-sky-400 to-blue-500",          tags: ["Students", "Gradebook", "Parents"] },
  university: { icon: GraduationCap,   gradient: "from-purple-600 to-violet-700",     tags: ["Courses", "Faculty", "Transcripts"] },
  restaurant: { icon: UtensilsCrossed, gradient: "from-amber-500 to-orange-600",      tags: ["POS", "Kitchen", "Tables"] },
  personal:   { icon: User,            gradient: "from-slate-600 to-slate-800",       tags: ["Contacts", "Tasks", "Calendar"] },
  clinic:     { icon: Stethoscope,     gradient: "from-teal-400 to-cyan-600",         tags: ["Appointments", "Patients", "Rx"] },
  logistics:  { icon: Truck,           gradient: "from-orange-400 to-amber-500",      tags: ["Shipments", "Drivers", "Map"] },
};

const CATEGORY_BADGE: Record<string, string> = {
  ecommerce:  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  fitness:    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  business:   "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  education:  "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  food:       "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  personal:   "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  health:     "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  logistics:  "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
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
  const meta = DEMO_META[slug] ?? { icon: ShoppingBag, gradient: "from-neutral-400 to-neutral-600", tags: [] };
  const Icon = meta.icon;
  const badgeClass = CATEGORY_BADGE[category] ?? "bg-neutral-100 text-neutral-600";

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border bg-[rgb(var(--bg-card))] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
        featured
          ? "border-[rgb(var(--accent))]/60 shadow-lg shadow-[rgb(var(--accent))]/10"
          : "border-[rgb(var(--border))] hover:border-[rgb(var(--accent))]/40"
      }`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-[rgb(var(--accent))] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
          <Sparkles size={9} />
          Featured
        </div>
      )}

      {/* Visual header */}
      <div className={`relative h-40 bg-gradient-to-br ${meta.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-white/30" />
          <div className="absolute bottom-2 right-2 w-24 h-24 rounded-full bg-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10" />
        </div>
        <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30">
          <Icon size={28} className="text-white" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            href={`/demos/${slug}/preview`}
            className="flex items-center gap-1.5 bg-white text-neutral-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Eye size={12} /> Live Preview
          </Link>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Category & price */}
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${badgeClass}`}>
            {category}
          </span>
          <span className="text-xs text-[rgb(var(--text-subtle))]">
            from <span className="text-base font-extrabold text-[rgb(var(--text))]">${basePriceUsd}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-[rgb(var(--text))] leading-snug mb-1.5">
          {t(titleKey as Parameters<typeof t>[0])}
        </h3>

        {/* Description */}
        <p className="text-xs text-[rgb(var(--text-muted))] flex-1 leading-relaxed mb-4">
          {t(descriptionKey as Parameters<typeof t>[0])}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {meta.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[rgb(var(--bg-hover))] text-[rgb(var(--text-muted))] border border-[rgb(var(--border))]">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/demos/${slug}/preview`}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg border border-[rgb(var(--border))] px-3 py-2 text-xs font-semibold text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--bg-hover))] hover:text-[rgb(var(--text))] transition-colors"
          >
            <Eye size={12} /> Preview
          </Link>
          <Link
            href={`/auth/signup?demo=${slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-[rgb(var(--accent))] text-white px-3 py-2 text-xs font-semibold hover:bg-[rgb(var(--accent-hover))] transition-colors shadow-md shadow-[rgb(var(--accent))]/20"
          >
            I want this <ArrowRight size={11} />
          </Link>
        </div>
      </div>
    </div>
  );
}
