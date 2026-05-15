"use client";

import { useState, use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ChatPanel } from "@/components/chat/ChatPanel";

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
  description:
    "Online store for organic products with cart, checkout, and order tracking. Must support mobile and have an admin panel.",
  colorPref: "Green and white, natural feel",
  pagesNeeded: "7",
  budget: "1500",
  deadline: "2026-07-01",
  notes: "Need it done before summer harvest season.",
  status: "pending",
  quoteSent: false,
  quoteAccepted: false,
};

export default function ConsultantProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations();

  const project = { ...MOCK_PROJECT, id };
  const [quoteSent, setQuoteSent] = useState(project.quoteSent);
  const [quoteForm, setQuoteForm] = useState({ amount: "", scope: "" });
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "m1",
      title: "UI Design Mockups",
      amount: 300,
      dueDate: "2026-05-20",
      done: true,
    },
  ]);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    amount: "",
    dueDate: "",
  });

  function handleSendQuote(e: React.FormEvent) {
    e.preventDefault();
    setQuoteSent(true);
  }

  function handleAddMilestone(e: React.FormEvent) {
    e.preventDefault();
    if (!newMilestone.title) return;
    setMilestones((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        title: newMilestone.title,
        amount: Number(newMilestone.amount) || 0,
        dueDate: newMilestone.dueDate,
        done: false,
      },
    ]);
    setNewMilestone({ title: "", amount: "", dueDate: "" });
  }

  function toggleMilestoneDone(mId: string) {
    setMilestones((prev) =>
      prev.map((m) => (m.id === mId ? { ...m, done: !m.done } : m))
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/consultant/briefs" className="text-neutral-500 hover:text-neutral-700">
              {t("consultant.briefs.heading")}
            </Link>
            <Link href="/auth/logout" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.logout")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10 space-y-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{project.businessName}</h1>
          <StatusBadge status={project.status} label={t(`status.${project.status}` as "status.pending")} />
        </div>

        {/* Buyer Brief */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">
            {t("consultant.project.buyerBrief")}
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-neutral-500 font-medium">{t("buyer.request.businessName")}</dt>
              <dd className="mt-1">{project.businessName}</dd>
            </div>
            <div>
              <dt className="text-neutral-500 font-medium">{t("buyer.request.budget")}</dt>
              <dd className="mt-1">${project.budget}</dd>
            </div>
            <div>
              <dt className="text-neutral-500 font-medium">{t("buyer.request.deadline")}</dt>
              <dd className="mt-1">{project.deadline}</dd>
            </div>
            <div>
              <dt className="text-neutral-500 font-medium">{t("buyer.request.colorPref")}</dt>
              <dd className="mt-1">{project.colorPref}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-neutral-500 font-medium">{t("buyer.request.description")}</dt>
              <dd className="mt-1">{project.description}</dd>
            </div>
          </dl>
        </section>

        {/* Quote Section */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">{t("consultant.quote.heading")}</h2>
          {quoteSent ? (
            <div className="flex items-center gap-3">
              <StatusBadge status="active" label={t("consultant.quote.sent")} />
              <span className="text-sm text-neutral-500">
                ${quoteForm.amount} — {quoteForm.scope}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSendQuote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t("consultant.quote.amount")}
                </label>
                <input
                  type="number"
                  value={quoteForm.amount}
                  onChange={(e) =>
                    setQuoteForm((p) => ({ ...p, amount: e.target.value }))
                  }
                  required
                  min={1}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="1200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t("consultant.quote.scope")}
                </label>
                <textarea
                  value={quoteForm.scope}
                  onChange={(e) =>
                    setQuoteForm((p) => ({ ...p, scope: e.target.value }))
                  }
                  required
                  rows={3}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                  placeholder="Describe what is included…"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-neutral-900 text-white px-6 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors"
              >
                {t("consultant.quote.send")}
              </button>
            </form>
          )}
        </section>

        {/* Milestones */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">{t("consultant.milestones.heading")}</h2>

          {/* Existing Milestones */}
          {milestones.length > 0 && (
            <ul className="divide-y divide-neutral-100 mb-6">
              {milestones.map((m) => (
                <li key={m.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleMilestoneDone(m.id)}
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${
                        m.done
                          ? "bg-green-500 border-green-500"
                          : "border-neutral-300 hover:border-neutral-500"
                      }`}
                    />
                    <div>
                      <p className={`text-sm font-medium ${m.done ? "line-through text-neutral-400" : ""}`}>
                        {m.title}
                      </p>
                      <p className="text-xs text-neutral-400">{m.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">${m.amount}</span>
                    {m.done ? (
                      <StatusBadge status="done" label={t("consultant.milestones.done")} />
                    ) : (
                      <button
                        onClick={() => toggleMilestoneDone(m.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {t("consultant.milestones.markDone")}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Add Milestone Form */}
          <form onSubmit={handleAddMilestone} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              value={newMilestone.title}
              onChange={(e) =>
                setNewMilestone((p) => ({ ...p, title: e.target.value }))
              }
              placeholder={t("consultant.milestones.addTitle")}
              className="sm:col-span-2 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <input
              type="number"
              value={newMilestone.amount}
              onChange={(e) =>
                setNewMilestone((p) => ({ ...p, amount: e.target.value }))
              }
              placeholder={t("consultant.milestones.addAmount")}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <input
              type="date"
              value={newMilestone.dueDate}
              onChange={(e) =>
                setNewMilestone((p) => ({ ...p, dueDate: e.target.value }))
              }
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
            <button
              type="submit"
              className="sm:col-start-4 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {t("consultant.milestones.add")}
            </button>
          </form>
        </section>

        {/* Chat */}
        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
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
