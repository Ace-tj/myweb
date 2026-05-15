"use client";

import { useState, use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ChatPanel } from "@/components/chat/ChatPanel";

const MOCK_PROJECT = {
  id: "proj-001",
  demoSlug: "shop",
  businessName: "Acme Online Store",
  description:
    "We need a modern e-commerce store selling handmade goods. Must support multiple categories and mobile-friendly checkout.",
  colorPref: "Warm orange and white",
  pagesNeeded: "8",
  budget: "1500",
  deadline: "2026-07-01",
  notes: "We want to launch before the summer season.",
  status: "quote_received",
  createdAt: "2026-04-20T10:00:00Z",
  quote: {
    amount: 1200,
    scope:
      "Full e-commerce build: product catalog, cart, checkout, order history, admin panel.",
    status: "pending_acceptance",
  },
  milestones: [
    { id: "m1", title: "UI Design", amount: 300, dueDate: "2026-05-15", done: true },
    { id: "m2", title: "Frontend Build", amount: 500, dueDate: "2026-06-01", done: false },
    { id: "m3", title: "Backend & Deployment", amount: 400, dueDate: "2026-06-20", done: false },
  ],
};

export default function BuyerProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = use(params);
  const t = useTranslations();

  const project = { ...MOCK_PROJECT, id };
  const [status, setStatus] = useState(project.status);
  const [quoteAction, setQuoteAction] = useState<"accepted" | "rejected" | null>(null);

  function handleAccept() {
    setStatus("in_progress");
    setQuoteAction("accepted");
  }

  function handleReject() {
    setStatus("pending");
    setQuoteAction("rejected");
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/buyer/dashboard" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.dashboard")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10 space-y-8">
        {/* Status */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{project.businessName}</h1>
          <StatusBadge status={status} label={t(`status.${status}` as "status.pending")} />
        </div>

        {/* Brief */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">{t("buyer.project.brief")}</h2>
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
            {project.notes && (
              <div className="sm:col-span-2">
                <dt className="text-neutral-500 font-medium">{t("buyer.request.notes")}</dt>
                <dd className="mt-1">{project.notes}</dd>
              </div>
            )}
          </dl>
        </section>

        {/* Quote */}
        {project.quote && (
          <section className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-semibold mb-4">{t("consultant.quote.heading")}</h2>
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-1 space-y-2 text-sm">
                <div>
                  <span className="text-neutral-500">{t("buyer.project.quoteAmount")}: </span>
                  <span className="font-semibold text-lg">${project.quote.amount}</span>
                </div>
                <div>
                  <span className="text-neutral-500">{t("buyer.project.quoteScope")}: </span>
                  <span>{project.quote.scope}</span>
                </div>
              </div>
              {status === "quote_received" && !quoteAction && (
                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    {t("buyer.project.acceptQuote")}
                  </button>
                  <button
                    onClick={handleReject}
                    className="rounded-lg bg-red-100 text-red-700 border border-red-200 px-4 py-2 text-sm font-medium hover:bg-red-200 transition-colors"
                  >
                    {t("buyer.project.rejectQuote")}
                  </button>
                </div>
              )}
              {quoteAction && (
                <StatusBadge
                  status={quoteAction === "accepted" ? "active" : "cancelled"}
                  label={quoteAction === "accepted" ? "Accepted" : "Rejected"}
                />
              )}
            </div>
          </section>
        )}

        {/* Milestones */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold mb-4">{t("buyer.project.milestones")}</h2>
          {project.milestones.length === 0 ? (
            <p className="text-neutral-500 text-sm">{t("buyer.project.noMilestones")}</p>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {project.milestones.map((m) => (
                <li key={m.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        m.done
                          ? "bg-green-500 border-green-500"
                          : "border-neutral-300"
                      }`}
                    />
                    <div>
                      <p className={`text-sm font-medium ${m.done ? "line-through text-neutral-400" : ""}`}>
                        {m.title}
                      </p>
                      <p className="text-xs text-neutral-400">Due: {m.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">${m.amount}</span>
                    {m.done && <StatusBadge status="done" label={t("consultant.milestones.done")} />}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Chat */}
        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
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
