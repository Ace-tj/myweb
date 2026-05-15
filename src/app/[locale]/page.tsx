import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="flex-1">
      {/* Top bar */}
      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/demos" className="hover:text-neutral-600">
              {t("nav.demos")}
            </Link>
            <Link href="/auth/login" className="hover:text-neutral-600">
              {t("common.signIn")}
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-700"
            >
              {t("common.signUp")}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          {t("landing.heroHeadline")}
        </h1>
        <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
          {t("landing.heroSub")}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/demos"
            className="rounded-full bg-neutral-900 text-white px-6 py-3 font-medium hover:bg-neutral-700"
          >
            {t("landing.ctaPrimary")}
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-full border border-neutral-300 px-6 py-3 font-medium hover:bg-neutral-50"
          >
            {t("landing.ctaSecondary")}
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-center">
            {t("common.howItWorks")}
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {(["browse", "request", "chat", "receive"] as const).map((step, i) => (
              <div key={step} className="text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold">
                  {t(`landing.steps.${step}`)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {t(`landing.steps.${step}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-6xl px-6 text-sm text-neutral-500 flex items-center justify-between">
          <span>© {new Date().getFullYear()} {t("common.appName")}</span>
          <LanguageSwitcher />
        </div>
      </footer>
    </main>
  );
}
