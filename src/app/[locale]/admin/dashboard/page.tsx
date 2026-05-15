import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Users, BarChart2, FolderKanban, TrendingUp,
  ArrowUpRight, Clock, CheckCircle2, AlertCircle,
  DollarSign, ShoppingBag, Star, Activity
} from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

const STATS = [
  { label: "Total Users", value: "847", delta: "+12 this week", up: true, icon: Users, color: "indigo" },
  { label: "Active Projects", value: "134", delta: "+8 this week", up: true, icon: FolderKanban, color: "violet" },
  { label: "Demo Views (7d)", value: "4,291", delta: "+19% vs last week", up: true, icon: BarChart2, color: "sky" },
  { label: "Revenue (MTD)", value: "$28,460", delta: "+$4,200 vs last month", up: true, icon: DollarSign, color: "emerald" },
];

const RECENT_PROJECTS = [
  { id: "proj-041", buyer: "TechNova Corp", demo: "Logistics Platform", consultant: "Elena Petrova", status: "in_progress", date: "May 15" },
  { id: "proj-042", buyer: "City Medical Group", demo: "Clinic System", consultant: null, status: "pending", date: "May 15" },
  { id: "proj-043", buyer: "Sunrise Academy", demo: "School System", consultant: "Ahmad Rahimi", status: "in_progress", date: "May 14" },
  { id: "proj-044", buyer: "GreenEats Co.", demo: "Restaurant POS", consultant: "Wei Zhang", status: "completed", date: "May 13" },
  { id: "proj-045", buyer: "Apex Fitness", demo: "Gym Management", consultant: "Elena Petrova", status: "completed", date: "May 12" },
];

const RECENT_USERS = [
  { name: "Sofia Lindqvist", email: "sofia@studio.se", role: "consultant", status: "pending", joined: "May 15" },
  { name: "David Osei-Mensah", email: "d.osei@techgh.com", role: "buyer", status: "approved", joined: "May 14" },
  { name: "Yuki Tanaka", email: "yuki.t@agency.jp", role: "consultant", status: "approved", joined: "May 13" },
  { name: "Priya Nair", email: "priya@bloom.in", role: "buyer", status: "approved", joined: "May 12" },
];

const TOP_DEMOS = [
  { name: "China University Agent", views: 892, requests: 43, revenue: "$34,357" },
  { name: "Logistics Platform", views: 741, requests: 31, revenue: "$20,319" },
  { name: "Clinic System", views: 684, requests: 28, revenue: "$15,372" },
  { name: "University Portal", views: 612, requests: 24, revenue: "$21,576" },
  { name: "Accounting Suite", views: 578, requests: 22, revenue: "$13,178" },
];

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400",
  in_progress: "bg-blue-500/20 text-blue-400",
  completed: "bg-emerald-500/20 text-emerald-400",
  approved: "bg-emerald-500/20 text-emerald-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-500/20 text-indigo-400",
  violet: "bg-violet-500/20 text-violet-400",
  sky: "bg-sky-500/20 text-sky-400",
  emerald: "bg-emerald-500/20 text-emerald-400",
};

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sessionOrNull = await getCurrentSession();
  if (!sessionOrNull || sessionOrNull.role !== "admin") redirect(`/${locale}/auth/login`);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back — here's what's happening today</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[s.color]}`}>
                <s.icon size={18} />
              </div>
              <ArrowUpRight size={14} className="text-slate-600" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
            <div className={`text-xs mt-2 flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-red-400"}`}>
              <TrendingUp size={11} />{s.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Recent projects */}
        <div className="col-span-2 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Recent Projects</h2>
            <Link href="/admin/projects" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-800">
            {RECENT_PROJECTS.map((p) => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{p.buyer}</div>
                  <div className="text-xs text-slate-500">{p.demo} · {p.consultant ?? <span className="text-amber-500">Unassigned</span>}</div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusColors[p.status]}`}>
                    {p.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-600">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top demos */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Top Demos</h2>
            <Star size={14} className="text-slate-600" />
          </div>
          <div className="divide-y divide-slate-800">
            {TOP_DEMOS.map((d, i) => (
              <div key={d.name} className="px-5 py-3">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-bold text-slate-600 w-4 mt-0.5">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{d.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{d.views} views · {d.requests} requests</div>
                    <div className="text-xs text-emerald-400 mt-0.5">{d.revenue}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent users */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
          <h2 className="text-sm font-semibold text-white">Recently Joined Users</h2>
          <Link href="/admin/users" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            Manage users →
          </Link>
        </div>
        <div className="grid grid-cols-4 divide-x divide-slate-800">
          {RECENT_USERS.map((u) => (
            <div key={u.email} className="px-5 py-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xs font-bold">
                  {u.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{u.name}</div>
                  <div className="text-xs text-slate-500 truncate">{u.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                  u.role === "consultant" ? "bg-violet-500/20 text-violet-400" : "bg-sky-500/20 text-sky-400"
                }`}>{u.role}</span>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusColors[u.status]}`}>{u.status}</span>
              </div>
              <div className="text-xs text-slate-600 mt-2">Joined {u.joined}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
