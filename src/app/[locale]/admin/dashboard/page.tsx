import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { getAdminStats, listAdminUsers } from "@/lib/admin";
import { listAllProjects } from "@/lib/projects";
import {
  Users,
  ShoppingBag,
  Briefcase,
  Inbox,
  ArrowRight,
  Activity,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  new: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  assigned: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  quoted: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  in_progress: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  review: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  delivered: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session || session.role !== "admin")
    redirect(`/${locale}/auth/login`);

  const [stats, recentUsers, recentProjects] = await Promise.all([
    getAdminStats(),
    listAdminUsers().then((u) => u.slice(0, 5)),
    listAllProjects().then((p) => p.slice(0, 5)),
  ]);

  return (
    <div className="p-6 sm:p-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Admin overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Live counts from your Supabase database.
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Stat label="Users" value={stats.totalUsers} Icon={Users} accent="indigo" />
        <Stat
          label="Active projects"
          value={stats.activeProjects}
          Icon={Briefcase}
          accent="emerald"
        />
        <Stat
          label="Open briefs"
          value={stats.newBriefs}
          Icon={Inbox}
          accent="amber"
        />
        <Stat
          label="Total projects"
          value={stats.totalProjects}
          Icon={Activity}
          accent="violet"
        />
      </div>

      {/* Role breakdown */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Stat
          label="Buyers"
          value={stats.totalBuyers}
          Icon={ShoppingBag}
          accent="blue"
          small
        />
        <Stat
          label="Consultants"
          value={stats.totalConsultants}
          Icon={Briefcase}
          accent="purple"
          small
        />
        <Stat
          label="Admins"
          value={stats.totalAdmins}
          Icon={TrendingUp}
          accent="rose"
          small
        />
      </div>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent users */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent signups</h2>
            <Link
              href={"/admin/users" as "/"}
              className="text-xs font-semibold text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight size={11} aria-hidden />
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              No users yet.
            </p>
          ) : (
            <ul className="divide-y divide-slate-800">
              {recentUsers.map((u) => (
                <li key={u.id} className="py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {(u.fullName || u.email || "?").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {u.fullName || "—"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {u.email || u.id.slice(0, 8)}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${ROLE_STYLE[u.role] ?? ROLE_STYLE.buyer}`}
                  >
                    {u.role}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent projects */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">Recent projects</h2>
            <Link
              href={"/admin/projects" as "/"}
              className="text-xs font-semibold text-indigo-400 hover:underline inline-flex items-center gap-1"
            >
              View all <ArrowRight size={11} aria-hidden />
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">
              No projects yet.
            </p>
          ) : (
            <ul className="divide-y divide-slate-800">
              {recentProjects.map((p) => (
                <li key={p.id} className="py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center flex-shrink-0">
                    <Briefcase size={14} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {p.brief.businessName || "Untitled project"}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {new Date(p.createdAt).toLocaleDateString()}
                      {p.quoteAmount != null && (
                        <span className="ml-2 tabular-nums">
                          · ${p.quoteAmount}
                        </span>
                      )}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLE[p.status] ?? STATUS_STYLE.new}`}
                  >
                    {p.status.replace("_", " ")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

const ROLE_STYLE: Record<string, string> = {
  buyer: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  consultant: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  admin: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const ACCENT_STYLE: Record<string, string> = {
  indigo: "bg-indigo-500/20 text-indigo-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  amber: "bg-amber-500/20 text-amber-300",
  violet: "bg-violet-500/20 text-violet-300",
  blue: "bg-blue-500/20 text-blue-300",
  purple: "bg-purple-500/20 text-purple-300",
  rose: "bg-rose-500/20 text-rose-300",
};

function Stat({
  label,
  value,
  Icon,
  accent,
  small,
}: {
  label: string;
  value: number;
  Icon: typeof Users;
  accent: keyof typeof ACCENT_STYLE;
  small?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400`}
        >
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${ACCENT_STYLE[accent]}`}
        >
          <Icon size={14} aria-hidden />
        </div>
      </div>
      <p
        className={`font-extrabold text-white mt-2 tabular-nums ${small ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}`}
      >
        {value}
      </p>
    </div>
  );
}
