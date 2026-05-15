"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

interface DemoRow {
  slug: string;
  title: string;
  category: string;
  basePrice: number;
  featured: boolean;
  order: number;
}

const INITIAL_DEMOS: DemoRow[] = [
  { slug: "shop",       title: "Online Shop",                 category: "ecommerce",  basePrice: 499, featured: false, order: 1 },
  { slug: "gym",        title: "Gym Management",              category: "fitness",    basePrice: 399, featured: false, order: 2 },
  { slug: "accounting", title: "Accounting Suite",            category: "business",   basePrice: 599, featured: false, order: 3 },
  { slug: "china-uni",  title: "Chinese University Agent",    category: "education",  basePrice: 799, featured: true,  order: 4 },
  { slug: "school",     title: "School System (K-12)",        category: "education",  basePrice: 699, featured: false, order: 5 },
  { slug: "university", title: "University System",           category: "education",  basePrice: 899, featured: false, order: 6 },
  { slug: "restaurant", title: "Restaurant POS",              category: "food",       basePrice: 449, featured: false, order: 7 },
  { slug: "personal",   title: "Personal Info System",        category: "personal",   basePrice: 199, featured: false, order: 8 },
  { slug: "clinic",     title: "Clinic Appointments",         category: "health",     basePrice: 549, featured: false, order: 9 },
  { slug: "logistics",  title: "Logistics & Delivery",        category: "logistics",  basePrice: 649, featured: false, order: 10 },
];

export default function AdminDemosPage() {
  const t = useTranslations();
  const [demos, setDemos] = useState<DemoRow[]>(INITIAL_DEMOS);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ basePrice: number; featured: boolean }>({
    basePrice: 0,
    featured: false,
  });

  function startEdit(demo: DemoRow) {
    setEditingSlug(demo.slug);
    setEditValues({ basePrice: demo.basePrice, featured: demo.featured });
  }

  function cancelEdit() {
    setEditingSlug(null);
  }

  function saveEdit(slug: string) {
    setDemos((prev) =>
      prev.map((d) =>
        d.slug === slug
          ? { ...d, basePrice: editValues.basePrice, featured: editValues.featured }
          : d
      )
    );
    setEditingSlug(null);
  }

  function toggleFeatured(slug: string) {
    setDemos((prev) =>
      prev.map((d) => (d.slug === slug ? { ...d, featured: !d.featured } : d))
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin/dashboard" className="text-neutral-500 hover:text-neutral-700">
              {t("admin.dashboard.title")}
            </Link>
            <Link href="/auth/logout" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.logout")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
        <h1 className="text-2xl font-bold mb-8">{t("admin.demos.heading")}</h1>

        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.order")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.slug")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.title")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.category")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.basePrice")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.featured")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.demos.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {demos.map((demo, idx) => (
                  <tr
                    key={demo.slug}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-neutral-50/50"} hover:bg-blue-50/30 transition-colors`}
                  >
                    <td className="px-4 py-3 text-neutral-400 font-mono text-xs">{demo.order}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-600">{demo.slug}</td>
                    <td className="px-4 py-3 font-medium">{demo.title}</td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {demo.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {editingSlug === demo.slug ? (
                        <input
                          type="number"
                          value={editValues.basePrice}
                          onChange={(e) =>
                            setEditValues((p) => ({ ...p, basePrice: Number(e.target.value) }))
                          }
                          className="w-24 rounded border border-neutral-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ) : (
                        <span className="font-medium">${demo.basePrice}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingSlug === demo.slug ? (
                        <button
                          onClick={() =>
                            setEditValues((p) => ({ ...p, featured: !p.featured }))
                          }
                          className={`w-10 h-6 rounded-full border-2 transition-colors ${
                            editValues.featured
                              ? "bg-blue-600 border-blue-600"
                              : "bg-neutral-200 border-neutral-300"
                          }`}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-white mx-auto transition-transform ${
                              editValues.featured ? "translate-x-2" : "-translate-x-1"
                            }`}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleFeatured(demo.slug)}
                          className={`w-10 h-6 rounded-full border-2 transition-colors ${
                            demo.featured
                              ? "bg-blue-600 border-blue-600"
                              : "bg-neutral-200 border-neutral-300"
                          }`}
                        >
                          <span
                            className={`block w-4 h-4 rounded-full bg-white mx-auto transition-transform ${
                              demo.featured ? "translate-x-2" : "-translate-x-1"
                            }`}
                          />
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingSlug === demo.slug ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(demo.slug)}
                            className="text-xs px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                          >
                            {t("admin.demos.save")}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-xs px-3 py-1 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          >
                            {t("admin.demos.cancel")}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(demo)}
                          className="text-xs px-3 py-1 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                          {t("admin.demos.edit")}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
