import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect, notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getCurrentSession } from "@/lib/auth";
import { getProjectById } from "@/lib/projects";
import { ProjectActions } from "./ProjectActions";
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  new: "bg-slate-500/15 text-slate-600 dark:text-slate-300 border-slate-500/20",
  assigned: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
  quoted: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",
  in_progress: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/20",
  review: "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  delivered: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/20",
};
const STATUS_LABEL: Record<string, string> = {
  new: "New",
  assigned: "Assigned",
  quoted: "Quote received",
  in_progress: "In progress",
  review: "In review",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function BuyerProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);

  const result = await getProjectById(id);
  if (!result.ok) {
    if (result.reason === "not_found") notFound();
    if (result.reason === "forbidden")
      redirect(`/${locale}/buyer/dashboard`);
    if (result.reason === "anon") redirect(`/${locale}/auth/login`);
    // db_off or generic error — show inline message below
  }

  const project = result.ok ? result.project : null;
  const statusStyle = project
    ? (STATUS_STYLE[project.status] ?? STATUS_STYLE.new)
    : "";
  const statusLabel = project
    ? (STATUS_LABEL[project.status] ?? project.status)
    : "";
  const showQuoteActions =
    project &&
    project.status === "quoted" &&
    project.quoteAmount != null &&
    project.buyerId === session.id;

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/buyer/dashboard"
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-hover))] transition-colors"
          >
            <ArrowLeft size={16} aria-hidden /> <span>Back</span>
          </Link>
          <Link
            href="/"
            className="flex items-center font-extrabold text-xl tracking-tight"
            aria-label="myweb home"
          >
            <span className="gradient-text">myweb</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        {!project && (
          <div className="rounded-2xl border border-red-300/40 bg-red-50 dark:bg-red-950/30 dark:border-red-800/30 px-6 py-8 text-center">
            <AlertCircle
              size={28}
              className="mx-auto mb-3 text-red-500"
              aria-hidden
            />
            <h1 className="text-lg font-bold mb-2">Project unavailable</h1>
            <p className="text-sm text-[rgb(var(--text-muted))]">
              {result.ok
                ? "Loading…"
                : result.reason === "db_off"
                  ? "The backend is not configured. Sign in / submit a brief in production."
                  : result.message || "Something went wrong."}
            </p>
          </div>
        )}

        {project && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {project.brief.businessName || "Untitled project"}
                </h1>
                <p className="text-sm text-[rgb(var(--text-muted))] mt-1">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                  {project.brief.demoSlug && (
                    <>
                      {" · "}
                      <span className="capitalize">
                        {project.brief.demoSlug.replace(/-/g, " ")}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <span
                className={`self-start text-xs font-semibold px-3 py-1 rounded-full border ${statusStyle}`}
              >
                {statusLabel}
              </span>
            </div>

            {/* Brief */}
            <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
              <h2 className="text-base font-bold mb-4">
                {t("buyer.project.brief")}
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                {[
                  {
                    label: t("buyer.request.businessName"),
                    value: project.brief.businessName,
                  },
                  {
                    label: t("buyer.request.budget"),
                    value: project.brief.budget
                      ? `$${project.brief.budget}`
                      : "—",
                  },
                  {
                    label: t("buyer.request.deadline"),
                    value: project.brief.deadline || "—",
                  },
                  {
                    label: t("buyer.request.pagesNeeded"),
                    value: project.brief.pagesNeeded
                      ? String(project.brief.pagesNeeded)
                      : "—",
                  },
                  {
                    label: t("buyer.request.colorPref"),
                    value: project.brief.colorPref || "—",
                  },
                ].map((f) => (
                  <div key={f.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-1">
                      {f.label}
                    </dt>
                    <dd className="font-medium tabular-nums">{f.value}</dd>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-1">
                    {t("buyer.request.description")}
                  </dt>
                  <dd className="leading-relaxed">
                    {project.brief.description}
                  </dd>
                </div>
                {project.brief.notes && (
                  <div className="sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-1">
                      {t("buyer.request.notes")}
                    </dt>
                    <dd className="text-[rgb(var(--text-muted))] leading-relaxed">
                      {project.brief.notes}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            {/* Quote */}
            {project.quoteAmount != null && (
              <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
                <h2 className="text-base font-bold mb-4">
                  {t("buyer.project.acceptQuote").replace("Accept ", "")}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-1">
                      {t("buyer.project.quoteAmount")}
                    </p>
                    <p className="text-3xl font-extrabold text-emerald-500 tabular-nums">
                      ${project.quoteAmount}
                    </p>
                  </div>
                  {showQuoteActions && (
                    <ProjectActions projectId={project.id} />
                  )}
                  {project.status === "in_progress" && (
                    <span className="self-start text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
                      <CheckCircle2 size={12} aria-hidden /> Accepted
                    </span>
                  )}
                </div>
              </section>
            )}

            {/* Empty state for milestones until that schema is wired */}
            <section className="rounded-2xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] p-8 text-center">
              <p className="text-sm font-medium text-[rgb(var(--text-muted))]">
                {t("buyer.project.noMilestones")}
              </p>
              <p className="text-xs text-[rgb(var(--text-subtle))] mt-1">
                Milestones will appear here once your consultant breaks down the work.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
