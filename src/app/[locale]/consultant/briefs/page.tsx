import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getCurrentSession } from "@/lib/auth";
import { listOpenBriefs } from "@/lib/projects";
import { ArrowLeft, ArrowRight, Inbox } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function OpenBriefsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);
  if (session.role !== "consultant" && session.role !== "admin") {
    redirect(`/${locale}/buyer/dashboard`);
  }

  const briefs = await listOpenBriefs();

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
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

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Open briefs
          </h1>
          <p className="text-[rgb(var(--text-muted))]">
            Briefs from buyers waiting for a consultant to claim and quote.
          </p>
        </div>

        {briefs.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-6 py-16 text-center">
            <Inbox
              size={32}
              className="mx-auto mb-4 text-[rgb(var(--text-muted))]"
              aria-hidden
            />
            <h2 className="text-lg font-bold mb-1">No open briefs right now</h2>
            <p className="text-sm text-[rgb(var(--text-muted))] max-w-md mx-auto">
              When a buyer submits a new brief it appears here for any
              consultant to claim. Check back later.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {briefs.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/consultant/projects/${p.id}` as "/"}
                  className="block rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-5 sm:p-6 transition-all hover:border-[rgb(var(--accent))]/40 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-base sm:text-lg truncate">
                        {p.brief.businessName || "Untitled brief"}
                      </p>
                      <p className="text-xs text-[rgb(var(--text-muted))] mt-1">
                        Submitted {new Date(p.createdAt).toLocaleDateString()}
                        {p.brief.demoSlug && (
                          <>
                            {" · "}
                            <span className="capitalize">
                              {p.brief.demoSlug.replace(/-/g, " ")}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[rgb(var(--text-subtle))] flex-shrink-0 mt-1"
                      aria-hidden
                    />
                  </div>

                  <p className="text-sm text-[rgb(var(--text-muted))] line-clamp-3 leading-relaxed mb-4">
                    {p.brief.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-[rgb(var(--text-subtle))]">
                    {p.brief.budget != null && (
                      <span>
                        <span className="font-semibold">Budget:</span>{" "}
                        <span className="text-[rgb(var(--text))] tabular-nums">
                          ${p.brief.budget}
                        </span>
                      </span>
                    )}
                    {p.brief.deadline && (
                      <span>
                        <span className="font-semibold">Deadline:</span>{" "}
                        <span className="text-[rgb(var(--text))]">
                          {p.brief.deadline}
                        </span>
                      </span>
                    )}
                    {p.brief.pagesNeeded != null && (
                      <span>
                        <span className="font-semibold">Pages:</span>{" "}
                        <span className="text-[rgb(var(--text))] tabular-nums">
                          {p.brief.pagesNeeded}
                        </span>
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
