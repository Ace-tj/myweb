"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Edit2, Check, X, Star, StarOff, Eye, TrendingUp,
  DollarSign, BarChart2, ArrowUpRight, Search, Filter
} from "lucide-react";

interface DemoRow {
  slug: string;
  title: string;
  category: string;
  basePrice: number;
  featured: boolean;
  order: number;
  views: number;
  requests: number;
  revenue: number;
}

const INITIAL_DEMOS: DemoRow[] = [
  { slug: "shop",       title: "Online Shop",              category: "E-commerce",  basePrice: 499, featured: false, order: 1,  views: 578, requests: 22, revenue: 10978 },
  { slug: "gym",        title: "Gym Management",           category: "Fitness",     basePrice: 399, featured: false, order: 2,  views: 412, requests: 18, revenue: 7182  },
  { slug: "accounting", title: "Accounting Suite",         category: "Business",    basePrice: 599, featured: false, order: 3,  views: 578, requests: 22, revenue: 13178 },
  { slug: "china-uni",  title: "China University Agent",   category: "Education",   basePrice: 799, featured: true,  order: 4,  views: 892, requests: 43, revenue: 34357 },
  { slug: "school",     title: "School System K-12",       category: "Education",   basePrice: 699, featured: false, order: 5,  views: 490, requests: 19, revenue: 13281 },
  { slug: "university", title: "University Portal",        category: "Education",   basePrice: 899, featured: false, order: 6,  views: 612, requests: 24, revenue: 21576 },
  { slug: "restaurant", title: "Restaurant POS",           category: "Food & Bev",  basePrice: 449, featured: false, order: 7,  views: 534, requests: 20, revenue: 8980  },
  { slug: "personal",   title: "Personal CRM",             category: "Personal",    basePrice: 199, featured: false, order: 8,  views: 310, requests: 12, revenue: 2388  },
  { slug: "clinic",     title: "Clinic System",            category: "Healthcare",  basePrice: 549, featured: false, order: 9,  views: 684, requests: 28, revenue: 15372 },
  { slug: "logistics",  title: "Logistics Platform",       category: "Logistics",   basePrice: 649, featured: false, order: 10, views: 741, requests: 31, revenue: 20119 },
];

const categoryColors: Record<string, string> = {
  "E-commerce": "bg-orange-500/20 text-orange-400",
  "Fitness": "bg-green-500/20 text-green-400",
  "Business": "bg-blue-500/20 text-blue-400",
  "Education": "bg-violet-500/20 text-violet-400",
  "Food & Bev": "bg-red-500/20 text-red-400",
  "Personal": "bg-pink-500/20 text-pink-400",
  "Healthcare": "bg-teal-500/20 text-teal-400",
  "Logistics": "bg-slate-400/20 text-slate-400",
};

export default function AdminDemosPage() {
  const [demos, setDemos] = useState<DemoRow[]>(INITIAL_DEMOS);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ basePrice: number; featured: boolean }>({ basePrice: 0, featured: false });
  const [search, setSearch] = useState("");

  const filtered = demos.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  function startEdit(demo: DemoRow) {
    setEditingSlug(demo.slug);
    setEditValues({ basePrice: demo.basePrice, featured: demo.featured });
  }

  function cancelEdit() { setEditingSlug(null); }

  function saveEdit(slug: string) {
    setDemos(prev => prev.map(d => d.slug === slug ? { ...d, ...editValues } : d));
    setEditingSlug(null);
  }

  function toggleFeatured(slug: string) {
    setDemos(prev => prev.map(d => d.slug === slug ? { ...d, featured: !d.featured } : d));
  }

  const totalRevenue = demos.reduce((s, d) => s + d.revenue, 0);
  const totalRequests = demos.reduce((s, d) => s + d.requests, 0);
  const totalViews = demos.reduce((s, d) => s + d.views, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Demo Catalog</h1>
          <p className="text-slate-400 text-sm mt-1">Manage prices, visibility, and featured status for all demos</p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "emerald" },
          { label: "Total Requests", value: totalRequests, icon: TrendingUp, color: "indigo" },
          { label: "Total Views (7d)", value: totalViews.toLocaleString(), icon: Eye, color: "sky" },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              s.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
              s.color === "indigo" ? "bg-indigo-500/20 text-indigo-400" :
              "bg-sky-500/20 text-sky-400"
            }`}>
              <s.icon size={18} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 w-80">
        <Search size={15} className="text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search demos..."
          className="bg-transparent text-sm text-white placeholder:text-slate-500 outline-none flex-1"
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">#</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Demo</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Category</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Views</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requests</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Revenue</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Featured</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((demo) => {
              const isEditing = editingSlug === demo.slug;
              return (
                <tr key={demo.slug} className={`transition-colors ${isEditing ? "bg-slate-800/60" : "hover:bg-slate-800/40"}`}>
                  <td className="px-5 py-4 text-slate-600 font-mono text-xs">{demo.order}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{demo.title}</div>
                        <div className="text-xs text-slate-500 font-mono">{demo.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${categoryColors[demo.category] ?? "bg-slate-700 text-slate-300"}`}>
                      {demo.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">$</span>
                        <input
                          type="number"
                          value={editValues.basePrice}
                          onChange={e => setEditValues(p => ({ ...p, basePrice: Number(e.target.value) }))}
                          className="w-24 bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-1.5 text-sm text-white outline-none focus:border-indigo-500"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-white">${demo.basePrice}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-300">{demo.views.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm text-slate-300">{demo.requests}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-emerald-400">${demo.revenue.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <button
                        onClick={() => setEditValues(p => ({ ...p, featured: !p.featured }))}
                        className={`w-11 h-6 rounded-full transition-colors ${editValues.featured ? "bg-indigo-600" : "bg-slate-700"}`}
                      >
                        <span className={`block w-4 h-4 rounded-full bg-white transition-transform mx-auto ${editValues.featured ? "translate-x-2.5" : "-translate-x-2"}`} />
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleFeatured(demo.slug)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${demo.featured ? "text-amber-400" : "text-slate-600 hover:text-slate-400"}`}
                      >
                        {demo.featured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
                        {demo.featured ? "Featured" : "Off"}
                      </button>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEdit(demo.slug)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                        >
                          <Check size={12} /> Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 transition-colors"
                        >
                          <X size={12} /> Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(demo)}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                        >
                          <Edit2 size={12} /> Edit
                        </button>
                        <Link
                          href={`/demos/${demo.slug}` as "/"}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:border-sky-500 hover:text-sky-400 transition-colors"
                        >
                          <Eye size={12} /> View
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
