import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Zap, ShoppingBag, ArrowRight, Plus, MessageSquare } from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

const MOCK_PROJECTS = [
  {
    id: "proj-001",
    demoType: "Online Shop",
    businessName: "Acme Online Store",
    status: "in_progress" as const,
    budget: "$1,200",
    createdAt: "2026-04-20",
    consultant: "Elena Petrova",
  },
  {
    id: "proj-002",
    demoType: "Clinic System",
    businessName: "Sunrise Clinic",
    status: "pending" as const,
    budget: "$549",
    createdAt: "2026-05-10",
    consultant: null,
  },
  {
    id: "proj-003",
    demoType: "Restaurant POS",
    businessName: "La Bella Cucina",
    status: "completed" as const,
    budget: "$449",
    createdAt: "2026-03-15",
    consultant: "Ahmad Rahimi",
  },
];

const STATUS_CONFIG = {
  pending: { label: "Pending", cls: "bg-amber-500/15 text-amber-500 border border-amber-500/20" },
  in_progress: { label: "In Progress", cls: "bg-blue-500/15 text-blue-500 border border-blue-500/20" },
  completed: { label: "Completed", cls: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20" },
  cancelled: { label: "Cancelled", cls: "bg-red-500/15 text-red-500 border border-red-500/20" },
};

export default async function BuyerDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);

  const active = MOCK_PROJECTS.filter(p => p.status === "in_progress").length;
  const completed = MOCK_PROJECTS.filter(p => p.status === "completed").length;
  const firstName = session.name.split(" ")[0];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(var(--bg))" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-20 backdrop-blur-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
        <div className="mx-auto max-w-6xl px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-base font-bold" style={{ color: "rgb(var(--text))" }}>MyWeb</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/demos" className="font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Browse Demos</Link>
            <Link href="/buyer/dashboard" className="font-semibold text-indigo-600">Dashboard</Link>
            <Link href={"/messages" as "/"} className="font-medium transition-colors hover:text-indigo-500 flex items-center gap-1" style={{ color: "rgb(var(--text-muted))" }}>
              <MessageSquare size={13} /> Messages
            </Link>
            <div className="h-4 w-px" style={{ background: "rgb(var(--border))" }} />
            <span className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>{session.name}</span>
            <Link href="/auth/logout" className="text-sm transition-colors hover:text-red-500" style={{ color: "rgb(var(--text-subtle))" }}>Logout</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10 space-y-8">
        {/* Welcome */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Welcome back, {firstName}</h1>
            <p className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>Here&apos;s an overview of your projects</p>
          </div>
          <Link
            href="/demos"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 text-sm transition-colors"
          >
            <Plus size={15} /> New Project
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Projects", value: MOCK_PROJECTS.length, color: "text-indigo-500" },
            { label: "In Progress", value: active, color: "text-blue-500" },
            { label: "Completed", value: completed, color: "text-emerald-500" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border p-5" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
              <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: "rgb(var(--text))" }}>My Projects</h2>
          <div className="space-y-3">
            {MOCK_PROJECTS.map(p => {
              const cfg = STATUS_CONFIG[p.status];
              return (
                <Link
                  key={p.id}
                  href={`/buyer/projects/${p.id}` as "/"}
                  className="flex items-center gap-4 rounded-2xl border p-5 transition-all hover:border-indigo-500/30 hover:shadow-sm"
                  style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 flex-shrink-0">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "rgb(var(--text))" }}>{p.businessName}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>
                      {p.demoType} · Created {p.createdAt}
                      {p.consultant && <> · <span className="text-indigo-500 font-medium">{p.consultant}</span></>}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.cls}`}>{cfg.label}</span>
                    <span className="text-sm font-bold" style={{ color: "rgb(var(--text))" }}>{p.budget}</span>
                    <ArrowRight size={14} style={{ color: "rgb(var(--text-subtle))" }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Browse CTA */}
        <div className="rounded-2xl border-2 border-dashed p-8 text-center" style={{ borderColor: "rgb(var(--border))" }}>
          <p className="font-semibold mb-1" style={{ color: "rgb(var(--text))" }}>Need another system?</p>
          <p className="text-sm mb-4" style={{ color: "rgb(var(--text-muted))" }}>Browse our demo catalog to find the right solution for your business</p>
          <Link
            href="/demos"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
          >
            Browse Demos <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
