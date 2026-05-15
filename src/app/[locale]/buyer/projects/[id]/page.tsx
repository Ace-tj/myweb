"use client";

import { useState, use } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Zap, CheckCircle2, Circle, ThumbsUp, ThumbsDown } from "lucide-react";

const MOCK_PROJECT = {
  id: "proj-001",
  demoSlug: "shop",
  businessName: "Acme Online Store",
  description: "We need a modern e-commerce store selling handmade goods. Must support multiple categories and mobile-friendly checkout.",
  colorPref: "Warm orange and white",
  pagesNeeded: "8",
  budget: "1500",
  deadline: "2026-07-01",
  notes: "We want to launch before the summer season.",
  status: "quote_received",
  quote: {
    amount: 1200,
    scope: "Full e-commerce build: product catalog, cart, checkout, order history, admin panel.",
    status: "pending_acceptance",
  },
  milestones: [
    { id: "m1", title: "UI Design", amount: 300, dueDate: "2026-05-15", done: true },
    { id: "m2", title: "Frontend Build", amount: 500, dueDate: "2026-06-01", done: false },
    { id: "m3", title: "Backend & Deployment", amount: 400, dueDate: "2026-06-20", done: false },
  ],
};

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  pending: { label: "Pending", cls: "bg-amber-500/15 text-amber-500 border border-amber-500/20" },
  quote_received: { label: "Quote Received", cls: "bg-indigo-500/15 text-indigo-500 border border-indigo-500/20" },
  in_progress: { label: "In Progress", cls: "bg-blue-500/15 text-blue-500 border border-blue-500/20" },
  completed: { label: "Completed", cls: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20" },
  cancelled: { label: "Cancelled", cls: "bg-red-500/15 text-red-500 border border-red-500/20" },
};

export default function BuyerProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = use(params);
  const project = { ...MOCK_PROJECT, id };

  const [status, setStatus] = useState(project.status);
  const [quoteAction, setQuoteAction] = useState<"accepted" | "rejected" | null>(null);

  function handleAccept() { setStatus("in_progress"); setQuoteAction("accepted"); }
  function handleReject() { setStatus("pending"); setQuoteAction("rejected"); }

  const cardStyle = {
    background: "rgb(var(--bg-card))",
    borderColor: "rgb(var(--border))",
  };

  const statusCfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const completedMilestones = project.milestones.filter(m => m.done).length;
  const totalMilestones = project.milestones.length;
  const progress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(var(--bg))" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-20 backdrop-blur-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
        <div className="mx-auto max-w-5xl px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-base font-bold" style={{ color: "rgb(var(--text))" }}>MyWeb</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/buyer/dashboard" className="font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Dashboard</Link>
            <Link href="/demos" className="font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Browse Demos</Link>
            <div className="h-4 w-px" style={{ background: "rgb(var(--border))" }} />
            <Link href="/auth/logout" className="text-sm transition-colors hover:text-red-500" style={{ color: "rgb(var(--text-subtle))" }}>Logout</Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10 space-y-6">
        {/* Title + status */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>{project.businessName}</h1>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusCfg.cls}`}>{statusCfg.label}</span>
        </div>

        {/* Progress bar (show when in_progress) */}
        {status === "in_progress" && (
          <div className="rounded-2xl border p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold" style={{ color: "rgb(var(--text))" }}>Project Progress</p>
              <p className="text-sm font-bold text-indigo-500">{progress}%</p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgb(var(--border))" }}>
              <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs mt-2" style={{ color: "rgb(var(--text-muted))" }}>{completedMilestones} of {totalMilestones} milestones done</p>
          </div>
        )}

        {/* Brief */}
        <section className="rounded-2xl border p-6" style={cardStyle}>
          <h2 className="text-base font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Project Brief</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Business Name", value: project.businessName },
              { label: "Budget", value: `$${project.budget}` },
              { label: "Deadline", value: project.deadline },
              { label: "Color Preference", value: project.colorPref },
            ].map(f => (
              <div key={f.label}>
                <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgb(var(--text-subtle))" }}>{f.label}</dt>
                <dd className="font-medium" style={{ color: "rgb(var(--text))" }}>{f.value}</dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgb(var(--text-subtle))" }}>Description</dt>
              <dd className="leading-relaxed" style={{ color: "rgb(var(--text))" }}>{project.description}</dd>
            </div>
            {project.notes && (
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgb(var(--text-subtle))" }}>Notes</dt>
                <dd style={{ color: "rgb(var(--text-muted))" }}>{project.notes}</dd>
              </div>
            )}
          </dl>
        </section>

        {/* Quote */}
        {project.quote && (
          <section className="rounded-2xl border p-6" style={cardStyle}>
            <h2 className="text-base font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Consultant Quote</h2>
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgb(var(--text-subtle))" }}>Amount</p>
                  <p className="text-2xl font-bold text-emerald-500">${project.quote.amount}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: "rgb(var(--text-subtle))" }}>Scope</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgb(var(--text))" }}>{project.quote.scope}</p>
                </div>
              </div>
              {status === "quote_received" && !quoteAction && (
                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 text-sm transition-colors"
                  >
                    <ThumbsUp size={14} /> Accept
                  </button>
                  <button
                    onClick={handleReject}
                    className="flex items-center gap-1.5 rounded-xl border border-red-500/40 text-red-500 hover:bg-red-500/10 font-semibold px-4 py-2.5 text-sm transition-colors"
                  >
                    <ThumbsDown size={14} /> Decline
                  </button>
                </div>
              )}
              {quoteAction && (
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${quoteAction === "accepted" ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/20" : "bg-red-500/15 text-red-500 border-red-500/20"}`}>
                  {quoteAction === "accepted" ? "Accepted" : "Declined"}
                </span>
              )}
            </div>
          </section>
        )}

        {/* Milestones */}
        <section className="rounded-2xl border p-6" style={cardStyle}>
          <h2 className="text-base font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Milestones</h2>
          <ul className="divide-y" style={{ borderColor: "rgb(var(--border))" }}>
            {project.milestones.map(m => (
              <li key={m.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {m.done
                    ? <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    : <Circle size={18} className="flex-shrink-0" style={{ color: "rgb(var(--border))" }} />
                  }
                  <div>
                    <p className={`text-sm font-medium ${m.done ? "line-through" : ""}`} style={{ color: m.done ? "rgb(var(--text-subtle))" : "rgb(var(--text))" }}>
                      {m.title}
                    </p>
                    <p className="text-xs" style={{ color: "rgb(var(--text-subtle))" }}>Due {m.dueDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold" style={{ color: "rgb(var(--text))" }}>${m.amount}</span>
                  {m.done && <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">Done</span>}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Chat */}
        <section className="rounded-2xl border overflow-hidden" style={cardStyle}>
          <ChatPanel
            projectId={project.id}
            currentUserId="buyer-001"
            currentUserName="You (Buyer)"
          />
        </section>
      </main>
    </div>
  );
}
