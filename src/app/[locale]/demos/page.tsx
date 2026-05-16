import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { PublicHeaderNav } from "@/components/shared/PublicHeaderNav";
import { ArrowLeft } from "lucide-react";
import { getCurrentSession } from "@/lib/auth";
import { DemosGrid } from "./DemosGrid";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const session = await getCurrentSession();

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm transition-colors" style={{ color: "rgb(var(--text-muted))" }}>
            <ArrowLeft size={14} />
            <span className="font-extrabold text-lg gradient-text">myweb</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <PublicHeaderNav session={session ? { name: session.name, role: session.role } : null} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden bg-[rgb(var(--bg-subtle))] border-b border-[rgb(var(--border))]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[rgb(var(--accent))]/8 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              {t("demosPage.heroTitle", { count: 10 })}
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{ color: "rgb(var(--text-muted))" }}>
              {t("demosPage.heroSubtitle")}
            </p>
          </div>
        </div>

        <DemosGrid />
      </main>

      <footer className="border-t border-[rgb(var(--border))] py-6 px-6 text-center text-sm" style={{ color: "rgb(var(--text-muted))" }}>
        © {new Date().getFullYear()} myweb — <Link href="/" className="hover:text-[rgb(var(--text))]">{t("demosPage.backToHome")}</Link>
      </footer>
    </div>
  );
}
