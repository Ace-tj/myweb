import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sessionOrNull = await getCurrentSession();
  if (!sessionOrNull || sessionOrNull.role !== "admin") redirect(`/${locale}/auth/login`);
  const session = sessionOrNull!;

  const stats = [
    { labelKey: "admin.dashboard.users", value: 0 },
    { labelKey: "admin.dashboard.projects", value: 0 },
    { labelKey: "admin.dashboard.demos", value: 0 },
  ] as const;

  const quickLinks = [
    { labelKey: "admin.dashboard.manageUsers", href: "/admin/users" },
    { labelKey: "admin.dashboard.manageDemos", href: "/admin/demos" },
    { labelKey: "admin.dashboard.viewProjects", href: "/admin/projects" },
  ] as const;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold tracking-tight">
              {t("common.appName")}
            </Link>
            <span className="text-neutral-300">|</span>
            <span className="text-sm font-medium text-neutral-500">
              {t("admin.dashboard.title")}
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <span className="text-neutral-500">{session.name}</span>
            <Link
              href="/auth/logout"
              className="text-neutral-500 hover:text-neutral-700 hover:underline"
            >
              {t("nav.logout")}
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10 space-y-10">
        <h1 className="text-3xl font-bold tracking-tight">{t("admin.dashboard.title")}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map(({ labelKey, value }) => (
            <div
              key={labelKey}
              className="bg-white rounded-2xl border border-neutral-200 px-6 py-8 text-center shadow-sm"
            >
              <p className="text-4xl font-bold">{value}</p>
              <p className="mt-2 text-sm text-neutral-500">{t(labelKey)}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickLinks.map(({ labelKey, href }) => (
            <Link
              key={labelKey}
              href={href as "/admin/users" | "/admin/demos" | "/admin/projects"}
              className="bg-white rounded-xl border border-neutral-200 px-6 py-5 font-medium text-sm hover:bg-neutral-50 hover:shadow transition-shadow text-center"
            >
              {t(labelKey)}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
