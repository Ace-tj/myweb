import { setRequestLocale } from "next-intl/server";
import { redirect, notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getCurrentSession } from "@/lib/auth";
import { getProjectForConsultant } from "@/lib/projects";
import {
  ClaimButton,
  QuoteForm,
  ReleaseButton,
} from "./ConsultantActions";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Briefcase,
} from "lucide-react";

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
  new: "Open brief",
  assigned: "Assigned to you",
  quoted: "Quote sent",
  in_progress: "In progress",
  review: "In review",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function ConsultantProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);
  if (session.role !== "consultant" && session.role !== "admin") {
    redirect(`/${locale}/buyer/dashboard`);
  }

  const result = await getProjectForConsultant(id);
  if (!result.ok) {
    if (result.reason === "not_found") notFound();
    if (result.reason === "forbidden") redirect(`/${locale}/consultant/dashboard`);
    if (result.reason === "anon") redirect(`/${locale}/auth/login`);
  }

  const project = result.ok ? result.project : null;
  const isMine = project?.consultantId === session.id;
  const isOpen = project?.consultantId === null;
  const statusStyle = project
    ? (STATUS_STYLE[project.status] ?? STATUS_STYLE.new)
    : "";
  const statusLabel = project
    ? (STATUS_LABEL[project.status] ?? project.status)
    : "";

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/consultant/dashboard"
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
                  ? "The backend is not configured."
                  : (result.message ?? "Something went wrong.")}
            </p>
          </div>
        )}

        {project && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {project.brief.businessName || "Untitled brief"}
                </h1>
                <p className="text-sm text-[rgb(var(--text-muted))] mt-1">
                  Submitted {new Date(project.createdAt).toLocaleDateString()}
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

            <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
              <h2 className="text-base font-bold mb-4">Brief details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                {[
                  { label: "Business name", value: project.brief.businessName },
                  {
                    label: "Budget",
                    value: project.brief.budget
                      ? `$${project.brief.budget}`
                      : "—",
                  },
                  { label: "Deadline", value: project.brief.deadline || "—" },
                  {
                    label: "Pages",
                    value: project.brief.pagesNeeded
                      ? String(project.brief.pagesNeeded)
                      : "—",
                  },
                  {
                    label: "Color preference",
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
                    Description
                  </dt>
                  <dd className="leading-relaxed">
                    {project.brief.description}
                  </dd>
                </div>
                {project.brief.notes && (
                  <div className="sm:col-span-2">
                    <dt className="text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-1">
                      Additional notes
                    </dt>
                    <dd className="text-[rgb(var(--text-muted))] leading-relaxed">
                      {project.brief.notes}
                    </dd>
                  </div>
                )}
              </dl>
            </section>

            <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
              {isOpen && (
                <>
                  <div className="flex items-start gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] flex items-center justify-center flex-shrink-0">
                      <Briefcase size={18} aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-base font-bold">
                        Open brief — ready to claim
                      </h2>
                      <p className="text-sm text-[rgb(var(--text-muted))] mt-0.5">
                        Once you claim it, you can send the buyer a quote and
                        start a conversation.
                      </p>
                    </div>
                  </div>
                  <ClaimButton projectId={project.id} />
                </>
              )}

              {isMine && project.status === "assigned" && (
                <>
                  <h2 className="text-base font-bold mb-1">Send your quote</h2>
                  <p className="text-sm text-[rgb(var(--text-muted))] mb-5">
                    Once the buyer accepts, the project moves into the build
                    phase.
                  </p>
                  <QuoteForm projectId={project.id} />
                  <div className="mt-5 pt-5 border-t border-[rgb(var(--border))]">
                    <ReleaseButton projectId={project.id} />
                  </div>
                </>
              )}

              {isMine && project.status === "quoted" && (
                <>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={18} aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-base font-bold">Quote sent</h2>
                      <p className="text-sm text-[rgb(var(--text-muted))] mt-0.5">
                        Waiting for the buyer to accept or decline.
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold tabular-nums">
                    ${project.quoteAmount}
                  </p>
                  <div className="mt-5 pt-5 border-t border-[rgb(var(--border))]">
                    <ReleaseButton projectId={project.id} />
                  </div>
                </>
              )}

              {isMine && project.status === "in_progress" && (
                <>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={18} aria-hidden />
                    </div>
                    <div>
                      <h2 className="text-base font-bold">
                        Quote accepted — get building
                      </h2>
                      <p className="text-sm text-[rgb(var(--text-muted))] mt-0.5">
                        Use Messages to keep the buyer updated on progress.
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-extrabold tabular-nums">
                    ${project.quoteAmount}
                  </p>
                </>
              )}

              {isMine && project.status === "delivered" && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={18} aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Project delivered</h2>
                    <p className="text-sm text-[rgb(var(--text-muted))] mt-0.5">
                      Nice work.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
