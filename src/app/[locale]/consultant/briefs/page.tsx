import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { Zap, Briefcase, ArrowRight, DollarSign, Calendar } from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

interface Brief {
  id: string;
  demoSlug: string;
  demoLabel: string;
  businessName: string;
  budget: number;
  deadline: string;
  description: string;
  category: string;
}

const MOCK_BRIEFS: Brief[] = [
  {
    id: "proj-101",
    demoSlug: "shop",
    demoLabel: "Online Shop",
    businessName: "Green Basket Market",
    budget: 1500,
    deadline: "2026-07-01",
    description: "Online store for organic products with cart, checkout, and order tracking.",
    category: "E-commerce",
  },
  {
    id: "proj-102",
    demoSlug: "clinic",
    demoLabel: "Clinic System",
    businessName: "CityMed Clinic",
    budget: 2000,
    deadline: "2026-08-15",
    description: "Appointment booking system for a 5-doctor private clinic with patient portal.",
    category: "Healthcare",
  },
  {
    id: "proj-103",
    demoSlug: "restaurant",
    demoLabel: "Restaurant POS",
    businessName: "Spice Garden",
    budget: 900,
    deadline: "2026-06-20",
    description: "POS system for a mid-size restaurant with table management and kitchen tickets.",
    category: "Food & Bev",
  },
  {
    id: "proj-104",
    demoSlug: "logistics",
    demoLabel: "Logistics Platform",
    businessName: "FastTrack Delivery",
    budget: 1800,
    deadline: "2026-07-30",
    description: "Fleet tracking and shipment management system for 8-truck regional delivery company.",
    category: "Logistics",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "E-commerce": "bg-orange-500/15 text-orange-500",
  "Healthcare": "bg-teal-500/15 text-teal-500",
  "Food & Bev": "bg-red-500/15 text-red-500",
  "Logistics": "bg-slate-400/20 text-slate-500",
};

export default async function ConsultantBriefsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
            <Link href="/consultant/briefs" className="font-semibold text-indigo-600">Browse Briefs</Link>
            <Link href="/consultant/dashboard" className="font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Dashboard</Link>
            <div className="h-4 w-px" style={{ background: "rgb(var(--border))" }} />
            <Link href="/auth/logout" className="text-sm transition-colors hover:text-red-500" style={{ color: "rgb(var(--text-subtle))" }}>Logout</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Open Project Briefs</h1>
          <p className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>Browse buyer requests and claim projects you&apos;d like to work on</p>
        </div>

        {MOCK_BRIEFS.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed p-16 text-center" style={{ borderColor: "rgb(var(--border))" }}>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>No open briefs at the moment. Check back soon.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_BRIEFS.map(brief => (
              <div
                key={brief.id}
                className="rounded-2xl border p-6 flex flex-col sm:flex-row sm:items-center gap-5 transition-all hover:border-indigo-500/30 hover:shadow-sm"
                style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}
              >
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 flex-shrink-0">
                  <Briefcase size={19} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="font-semibold text-sm" style={{ color: "rgb(var(--text))" }}>{brief.businessName}</h2>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[brief.category] ?? "bg-indigo-500/15 text-indigo-500"}`}>
                      {brief.demoLabel}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-2 mb-3" style={{ color: "rgb(var(--text-muted))" }}>{brief.description}</p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: "rgb(var(--text-subtle))" }}>
                    <span className="flex items-center gap-1">
                      <DollarSign size={12} />
                      <span className="font-semibold text-emerald-500">${brief.budget.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Due {brief.deadline}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/consultant/projects/${brief.id}` as "/"}
                  className="flex-shrink-0 flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 text-sm transition-colors"
                >
                  View Brief <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
