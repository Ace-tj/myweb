"use client";

import { useState, use } from "react";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { Zap, CheckCircle2, Circle, Plus, Send } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  done: boolean;
}

const MOCK_PROJECT = {
  id: "proj-101",
  demoSlug: "shop",
  demoLabel: "Online Shop",
  businessName: "Green Basket Market",
  description: "Online store for organic products with cart, checkout, and order tracking. Must support mobile and have an admin panel.",
  colorPref: "Green and white, natural feel",
  pagesNeeded: "7",
  budget: "1500",
  deadline: "2026-07-01",
  notes: "Need it done before summer harvest season.",
  status: "pending",
};

const INPUT_CLASS = "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";
const inputStyle = {
  background: "rgb(var(--bg))",
  borderColor: "rgb(var(--border))",
  color: "rgb(var(--text))",
};

export default function ConsultantProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = use(params);
  const project = { ...MOCK_PROJECT, id };

  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ amount: "", scope: "" });
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "m1", title: "UI Design Mockups", amount: 300, dueDate: "2026-05-20", done: true },
  ]);
  const [newMilestone, setNewMilestone] = useState({ title: "", amount: "", dueDate: "" });

  function handleSendQuote(e: React.FormEvent) {
    e.preventDefault();
    setQuoteSent(true);
  }

  function handleAddMilestone(e: React.FormEvent) {
    e.preventDefault();
    if (!newMilestone.title) return;
    setMilestones(prev => [...prev, {
      id: `m-${Date.now()}`,
      title: newMilestone.title,
      amount: Number(newMilestone.amount) || 0,
      dueDate: newMilestone.dueDate,
      done: false,
    }]);
    setNewMilestone({ title: "", amount: "", dueDate: "" });
  }

  function toggleDone(mId: string) {
    setMilestones(prev => prev.map(m => m.id === mId ? { ...m, done: !m.done } : m));
  }

  const cardStyle = {
    background: "rgb(var(--bg-card))",
    borderColor: "rgb(var(--border))",
  };

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
            <Link href="/consultant/briefs" className="font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Browse Briefs</Link>
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

      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10 space-y-6">
        {/* Page title */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>{project.businessName}</h1>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/20">Pending</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-500">{project.demoLabel}</span>
        </div>

        {/* Buyer Brief */}
        <section className="rounded-2xl border p-6" style={cardStyle}>
          <h2 className="text-base font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Buyer Brief</h2>
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
        <section className="rounded-2xl border p-6" style={cardStyle}>
          <h2 className="text-base font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Send Quote</h2>
          {quoteSent ? (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-emerald-500">Quote sent</p>
                <p className="text-xs" style={{ color: "rgb(var(--text-muted))" }}>${quoteForm.amount} · {quoteForm.scope}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendQuote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Quote Amount (USD)</label>
                <input
                  type="number"
                  value={quoteForm.amount}
                  onChange={e => setQuoteForm(p => ({ ...p, amount: e.target.value }))}
                  required
                  min={1}
                  className={INPUT_CLASS}
                  style={inputStyle}
                  placeholder="1200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Scope of Work</label>
                <textarea
                  value={quoteForm.scope}
                  onChange={e => setQuoteForm(p => ({ ...p, scope: e.target.value }))}
                  required
                  rows={3}
                  className={INPUT_CLASS + " resize-none"}
                  style={inputStyle}
                  placeholder="Describe what is included in this quote…"
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 text-sm transition-colors"
              >
                <Send size={14} /> Send Quote
              </button>
            </form>
          )}
        </section>

        {/* Milestones */}
        <section className="rounded-2xl border p-6" style={cardStyle}>
          <h2 className="text-base font-bold mb-4" style={{ color: "rgb(var(--text))" }}>Milestones</h2>

          {milestones.length > 0 && (
            <ul className="divide-y mb-5" style={{ borderColor: "rgb(var(--border))" }}>
              {milestones.map(m => (
                <li key={m.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => toggleDone(m.id)} className="flex-shrink-0">
                      {m.done
                        ? <CheckCircle2 size={18} className="text-emerald-500" />
                        : <Circle size={18} style={{ color: "rgb(var(--border))" }} className="hover:text-indigo-500 transition-colors" />
                      }
                    </button>
                    <div>
                      <p className={`text-sm font-medium ${m.done ? "line-through" : ""}`} style={{ color: m.done ? "rgb(var(--text-subtle))" : "rgb(var(--text))" }}>
                        {m.title}
                      </p>
                      <p className="text-xs" style={{ color: "rgb(var(--text-subtle))" }}>Due {m.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: "rgb(var(--text))" }}>${m.amount}</span>
                    {m.done
                      ? <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">Done</span>
                      : <button onClick={() => toggleDone(m.id)} className="text-xs font-medium text-indigo-500 hover:underline">Mark done</button>
                    }
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Add milestone */}
          <form onSubmit={handleAddMilestone} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              value={newMilestone.title}
              onChange={e => setNewMilestone(p => ({ ...p, title: e.target.value }))}
              placeholder="Milestone title"
              className={INPUT_CLASS + " sm:col-span-2"}
              style={inputStyle}
            />
            <input
              type="number"
              value={newMilestone.amount}
              onChange={e => setNewMilestone(p => ({ ...p, amount: e.target.value }))}
              placeholder="Amount"
              className={INPUT_CLASS}
              style={inputStyle}
            />
            <input
              type="date"
              value={newMilestone.dueDate}
              onChange={e => setNewMilestone(p => ({ ...p, dueDate: e.target.value }))}
              className={INPUT_CLASS}
              style={inputStyle}
            />
            <button
              type="submit"
              className="sm:col-start-4 flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2.5 text-sm transition-colors"
            >
              <Plus size={14} /> Add
            </button>
          </form>
        </section>

        {/* Chat */}
        <section className="rounded-2xl border overflow-hidden" style={cardStyle}>
          <ChatPanel
            projectId={project.id}
            currentUserId="consultant-001"
            currentUserName="You (Consultant)"
          />
        </section>
      </main>
    </div>
  );
}
