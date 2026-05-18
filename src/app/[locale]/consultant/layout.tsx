import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Inbox, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCurrentProfile } from "@/lib/auth";

export default async function ConsultantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("consultant");

  const profile = await getCurrentProfile();
  if (!profile)
    redirect(`/${locale}/auth/login?next=/${locale}/consultant/inbox`);
  if (profile.role === "admin") redirect(`/${locale}/admin/dashboard`);
  if (profile.role === "customer") redirect(`/${locale}/account`);

  if (profile.consultant_status === "pending") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-warning/30 bg-warning/10 p-6 text-center">
          <Sparkles className="mx-auto size-8 text-warning" />
          <h1 className="mt-3 font-display text-lg font-bold text-fg">
            Awaiting approval
          </h1>
          <p className="mt-2 text-sm text-muted">{t("pendingApproval")}</p>
        </div>
      </div>
    );
  }
  if (profile.consultant_status === "rejected") {
    return (
      <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-danger/30 bg-danger/10 p-6 text-center">
          <h1 className="font-display text-lg font-bold text-fg">
            Application declined
          </h1>
          <p className="mt-2 text-sm text-muted">{t("rejected")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
      <aside className="space-y-2 self-start rounded-2xl border border-border bg-surface p-4">
        <div className="px-2 py-2 text-xs font-semibold uppercase tracking-widest text-muted">
          Consultant
        </div>
        <Link
          href="/consultant/inbox"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-fg hover:bg-surface-2"
        >
          <Inbox className="size-4" />
          {t("inboxTitle")}
        </Link>
      </aside>
      <div>{children}</div>
    </div>
  );
}
