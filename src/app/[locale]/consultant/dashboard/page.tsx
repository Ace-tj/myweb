import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Zap, Briefcase, ArrowRight, DollarSign, Star, Clock, MessageSquare } from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

const MOCK_BRIEFS = [
  {
    id: "proj-002",
    buyerName: "Priya Nair",
    demoType: "Clinic System",
    budget: "$549",
    createdAt: "2026-05-10",
    desc: "Appointment booking and patient records for a small 3-doctor clinic.",
  },
  {
    id: "proj-006",
    buyerName: "Horizon University",
    demoType: "University Portal",
    budget: "$899",
    createdAt: "2026-05-14",
    desc: "Course enrollment, transcript, and student billing for 3,000 students.",
  },
  {
    id: "proj-007",
    buyerName: "GreenFit Studio",
    demoType: "Gym Management",
    budget: "$399",
    createdAt: "2026-05-15",
    desc: "Membership management and class scheduling for yoga & fitness studio.",
  },
];

const ACTIVE_PROJECTS = [
  {
    id: "proj-001",
    buyerName: "Acme Online Store",
    demoType: "Online Shop",
    budget: "$1,200",
    milestone: "Frontend Build",
    milestoneDeadline: "2026-06-01",
    progress: 45,
  },
  {
    id: "proj-004",
    buyerName: "Sunrise Academy",
    demoType: "School System K-12",
    budget: "$699",
    milestone: "Student Module",
    milestoneDeadline: "2026-06-15",
    progress: 70,
  },
];

export default async function ConsultantDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);

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
            <Link href="/consultant/briefs" className="font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Browse Briefs</Link>
            <Link href="/consultant/dashboard" className="font-semibold text-indigo-600">Dashboard</Link>
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
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Welcome back, {firstName}</h1>
          <p className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>Here&apos;s your consultant overview</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Earned", value: "$3,248", icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Active Projects", value: ACTIVE_PROJECTS.length, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Avg. Rating", value: "4.9", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border p-5 flex items-center gap-4" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg} ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Open Briefs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: "rgb(var(--text))" }}>Open Briefs</h2>
            <Link href="/consultant/briefs" className="text-sm font-medium text-indigo-500 hover:underline flex items-center gap-1">
              See all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="space-y-3">
            {MOCK_BRIEFS.map(b => (
              <div
                key={b.id}
                className="rounded-2xl border p-5 flex items-center gap-4"
                style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 flex-shrink-0">
                  <Briefcase size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm" style={{ color: "rgb(var(--text))" }}>{b.buyerName}</p>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-500">{b.demoType}</span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "rgb(var(--text-muted))" }}>{b.desc}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-sm font-bold text-emerald-500">{b.budget}</span>
                  <Link
                    href={`/consultant/projects/${b.id}` as "/"}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                  >
                    View Brief
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div>
          <h2 className="text-lg font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Active Projects</h2>
          <div className="space-y-3">
            {ACTIVE_PROJECTS.map(p => (
              <Link
                key={p.id}
                href={`/consultant/projects/${p.id}` as "/"}
                className="flex items-center gap-4 rounded-2xl border p-5 transition-all hover:border-indigo-500/30 hover:shadow-sm"
                style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-sm" style={{ color: "rgb(var(--text))" }}>{p.buyerName}</p>
                    <span className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>·</span>
                    <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>{p.demoType}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={11} style={{ color: "rgb(var(--text-subtle))" }} />
                    <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>Current: <span className="font-medium" style={{ color: "rgb(var(--text))" }}>{p.milestone}</span> · Due {p.milestoneDeadline}</p>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgb(var(--border))" }}>
                    <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-sm font-bold" style={{ color: "rgb(var(--text))" }}>{p.budget}</p>
                    <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>{p.progress}% done</p>
                  </div>
                  <ArrowRight size={14} style={{ color: "rgb(var(--text-subtle))" }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
