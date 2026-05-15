import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

export default async function BuyerDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const sessionOrNull = await getCurrentSession();
  if (!sessionOrNull) redirect(`/${locale}/auth/login`);
  const session = sessionOrNull!;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/demos" className="hover:text-neutral-600">
              {t("nav.demos")}
            </Link>
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
      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("buyer.dashboard.welcome", { name: session.name })}
        </h1>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">{t("buyer.dashboard.myProjects")}</h2>
          <div className="mt-6 rounded-2xl border-2 border-dashed border-neutral-200 bg-white px-8 py-16 text-center">
            <p className="text-neutral-500 text-sm">{t("buyer.dashboard.emptyProjects")}</p>
            <Button asChild className="mt-6">
              <Link href="/demos">{t("buyer.dashboard.browseDemos")}</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
