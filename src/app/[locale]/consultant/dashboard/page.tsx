import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getCurrentSession } from "@/lib/auth";
import {
  listMyProjectsAsConsultant,
  listOpenBriefs,
} from "@/lib/projects";
import { ArrowRight, Briefcase, Inbox, MessageSquare } from "lucide-react";

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
  quoted: "Quoted",
  in_progress: "In progress",
  review: "In review",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function ConsultantDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);
  if (session.role !== "consultant" && session.role !== "admin") {
    redirect(`/${locale}/buyer/dashboard`);
  }

  const [mine, open] = await Promise.all([
    listMyProjectsAsConsultant(),
    listOpenBriefs(),
  ]);
  const firstName = session.name.split(" ")[0];

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center font-extrabold text-xl tracking-tight"
            aria-label="myweb home"
          >
            <span className="gradient-text">myweb</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[rgb(var(--text-muted))]">
            <Link
              href="/consultant/dashboard"
              className="text-[rgb(var(--accent))] font-semibold"
              aria-current="page"
            >
              {t("nav.dashboard")}
            </Link>
            <Link
              href={"/consultant/briefs" as "/"}
              className="hover:text-[rgb(var(--text))] transition-colors"
            >
              Open briefs
            </Link>
            <Link
              href={"/messages" as "/"}
              className="hover:text-[rgb(var(--text))] transition-colors inline-flex items-center gap-1.5"
            >
              <MessageSquare size={13} aria-hidden /> Messages
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm text-[rgb(var(--text-muted))] mr-1">
              {session.name}
            </span>
            <Link
              href="/auth/logout"
              className="hidden sm:inline text-sm text-[rgb(var(--text-subtle))] hover:text-red-500 transition-colors px-2"
            >
              {t("common.signOut")}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        <section>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-[rgb(var(--text-muted))] mt-2">
            {mine.length === 0
              ? "Pick up an open brief below to start your first project."
              : `${mine.length} active project${mine.length === 1 ? "" : "s"}.`}
          </p>
        </section>

        <section className="grid grid-cols-3 gap-3 sm:gap-4">
          <Stat label="Active projects" value={mine.length} Icon={Briefcase} />
          <Stat label="Open briefs" value={open.length} Icon={Inbox} />
          <Stat
            label="Quotes sent"
            value={mine.filter((p) => p.quoteAmount != null).length}
          />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Your active projects</h2>
          {mine.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-6 py-12 text-center">
              <Briefcase
                size={28}
                className="mx-auto mb-3 text-[rgb(var(--text-muted))]"
                aria-hidden
              />
              <p className="text-sm text-[rgb(var(--text-muted))] mb-4">
                You haven&apos;t claimed any briefs yet.
              </p>
              <Link
                href={"/consultant/briefs" as "/"}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25"
              >
                Browse open briefs <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {mine.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/consultant/projects/${p.id}` as "/"}
                    className="flex items-center gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-4 sm:p-5 transition-all hover:border-[rgb(var(--accent))]/40 hover:shadow-sm"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] flex items-center justify-center flex-shrink-0">
                      <Briefcase size={18} aria-hidden />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base truncate">
                        {p.brief.businessName || "Untitled project"}
                      </p>
                      <p className="text-xs text-[rgb(var(--text-muted))] mt-0.5 truncate">
                        {p.brief.demoSlug && (
                          <span className="capitalize">
                            {p.brief.demoSlug.replace(/-/g, " ")}
                          </span>
                        )}
                        {p.brief.demoSlug && " · "}
                        Updated {new Date(p.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border ${STATUS_STYLE[p.status] ?? STATUS_STYLE.assigned}`}
                      >
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                      {p.quoteAmount != null && (
                        <span className="hidden sm:inline text-sm font-bold tabular-nums">
                          ${p.quoteAmount}
                        </span>
                      )}
                      <ArrowRight
                        size={14}
                        className="text-[rgb(var(--text-subtle))]"
                        aria-hidden
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {open.length > 0 && (
          <section>
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Open briefs</h2>
                <p className="text-sm text-[rgb(var(--text-muted))] mt-1">
                  Briefs waiting for a consultant to claim
                </p>
              </div>
              <Link
                href={"/consultant/briefs" as "/"}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--accent))] hover:underline shrink-0"
              >
                View all ({open.length}) <ArrowRight size={13} aria-hidden />
              </Link>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {open.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/consultant/projects/${p.id}` as "/"}
                    className="block rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-4 transition-all hover:border-[rgb(var(--accent))]/40 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-semibold text-sm truncate">
                        {p.brief.businessName || "Untitled project"}
                      </p>
                      {p.brief.budget != null && (
                        <span className="text-xs font-bold tabular-nums shrink-0">
                          ${p.brief.budget}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[rgb(var(--text-muted))] line-clamp-2 leading-relaxed">
                      {p.brief.description || "No description provided."}
                    </p>
                    <p className="text-[11px] text-[rgb(var(--text-subtle))] mt-2">
                      {new Date(p.createdAt).toLocaleDateString()}
                      {p.brief.demoSlug && (
                        <>
                          {" · "}
                          <span className="capitalize">
                            {p.brief.demoSlug.replace(/-/g, " ")}
                          </span>
                        </>
                      )}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  Icon,
}: {
  label: string;
  value: number;
  Icon?: typeof Briefcase;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))]">
          {label}
        </span>
        {Icon && (
          <Icon size={14} className="text-[rgb(var(--text-subtle))]" aria-hidden />
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-extrabold mt-2 tabular-nums">
        {value}
      </p>
    </div>
  );
}
