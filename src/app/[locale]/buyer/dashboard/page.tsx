import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { getCurrentSession } from "@/lib/auth";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Stethoscope,
  Dumbbell,
  Globe2,
  Layers,
  Zap,
  MessageSquare,
} from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

const FEATURED_DEMOS = [
  { slug: "shop",       Icon: ShoppingBag,    gradient: "from-orange-500 to-red-500",    titleKey: "demos.shop.title",       price: 499 },
  { slug: "restaurant", Icon: UtensilsCrossed, gradient: "from-amber-500 to-orange-600", titleKey: "demos.restaurant.title", price: 449 },
  { slug: "clinic",     Icon: Stethoscope,    gradient: "from-teal-400 to-cyan-600",     titleKey: "demos.clinic.title",     price: 549 },
  { slug: "gym",        Icon: Dumbbell,       gradient: "from-emerald-400 to-green-600", titleKey: "demos.gym.title",        price: 399 },
] as const;

const STEPS = [
  { Icon: Globe2, titleKey: "stepPickTitle",      descKey: "stepPickDesc" },
  { Icon: Layers, titleKey: "stepCustomizeTitle", descKey: "stepCustomizeDesc" },
  { Icon: Zap,    titleKey: "stepLaunchTitle",    descKey: "stepLaunchDesc" },
] as const;

export default async function BuyerDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);
  if (session.role !== "buyer" && session.role !== "admin") {
    redirect(`/${locale}/consultant/dashboard`);
  }

  // No projects table yet — the dashboard treats every buyer as a fresh signup
  // and shows the empty-state onboarding. Wire this to real data when the
  // /buyer/request flow persists briefs.
  const projects: never[] = [];
  const firstName = session.name.split(" ")[0];

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center font-extrabold text-xl tracking-tight" aria-label="myweb home">
            <span className="gradient-text">myweb</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[rgb(var(--text-muted))]">
            <Link href="/demos" className="hover:text-[rgb(var(--text))] transition-colors">
              {t("nav.demos")}
            </Link>
            <Link href="/buyer/dashboard" className="text-[rgb(var(--accent))] font-semibold" aria-current="page">
              {t("nav.dashboard")}
            </Link>
            <Link href={"/messages" as "/"} className="hover:text-[rgb(var(--text))] transition-colors inline-flex items-center gap-1.5">
              <MessageSquare size={13} aria-hidden /> {t("buyer.dashboard.messages")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm text-[rgb(var(--text-muted))] mr-1">{session.name}</span>
            <Link href="/auth/logout" className="hidden sm:inline text-sm text-[rgb(var(--text-subtle))] hover:text-red-500 transition-colors px-2">
              {t("common.signOut")}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Welcome */}
        <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--accent-subtle))] text-[rgb(var(--accent))] text-xs font-semibold mb-3">
              <Sparkles size={12} aria-hidden /> {t("buyer.dashboard.welcomeBadge")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {t("buyer.dashboard.welcome", { name: firstName })}
            </h1>
            <p className="text-[rgb(var(--text-muted))] mt-2 text-base sm:text-lg">
              {t("buyer.dashboard.subtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <Link
              href="/demos"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 hover:scale-[1.02]"
            >
              {t("buyer.dashboard.browseDemos")} <ArrowRight size={14} aria-hidden />
            </Link>
            <Link
              href={"/buyer/request" as "/"}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] font-semibold text-sm hover:bg-[rgb(var(--bg-hover))] transition-colors"
            >
              {t("buyer.dashboard.requestCustom")}
            </Link>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold mb-4">{t("buyer.dashboard.myProjects")}</h2>

          {projects.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-6 py-14 sm:py-16 text-center">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[200px] rounded-full bg-[rgb(var(--accent))]/10 blur-3xl" />
              </div>
              <div className="relative">
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
                  <Sparkles size={24} className="text-[rgb(var(--accent))]" aria-hidden />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  {t("buyer.dashboard.emptyTitle")}
                </h3>
                <p className="text-[rgb(var(--text-muted))] max-w-md mx-auto mb-6 leading-relaxed">
                  {t("buyer.dashboard.emptyDesc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/demos"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 hover:scale-[1.02]"
                  >
                    {t("buyer.dashboard.browseAllDemos")} <ArrowRight size={14} aria-hidden />
                  </Link>
                  <Link
                    href={"/buyer/request" as "/"}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] font-semibold text-sm hover:bg-[rgb(var(--bg-hover))] transition-colors"
                  >
                    {t("buyer.dashboard.requestCustom")}
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {/* Popular demos */}
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold">{t("buyer.dashboard.popularSystems")}</h2>
              <p className="text-sm text-[rgb(var(--text-muted))] mt-1">
                {t("buyer.dashboard.popularSystemsDesc")}
              </p>
            </div>
            <Link
              href="/demos"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--accent))] hover:underline shrink-0"
            >
              {t("buyer.dashboard.viewAll")} <ArrowRight size={13} aria-hidden />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {FEATURED_DEMOS.map((d) => (
              <Link
                key={d.slug}
                href={`/demos/${d.slug}` as "/"}
                className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[rgb(var(--accent))]/40 transition-all"
              >
                <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${d.gradient}`}>
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <d.Icon size={18} className="text-neutral-800" aria-hidden />
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-sm leading-tight">
                    {t(d.titleKey as Parameters<typeof t>[0])}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-[rgb(var(--text-subtle))]">
                      {t("demosPage.from")}{" "}
                      <span className="font-bold text-[rgb(var(--text))]">${d.price}</span>
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-[rgb(var(--text-subtle))] group-hover:text-[rgb(var(--accent))] group-hover:translate-x-1 transition-all"
                      aria-hidden
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/demos"
            className="sm:hidden mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--accent))]"
          >
            {t("buyer.dashboard.viewAll")} <ArrowRight size={13} aria-hidden />
          </Link>
        </section>

        {/* How it works */}
        <section>
          <h2 className="text-xl font-bold mb-5">{t("buyer.dashboard.howItWorks")}</h2>
          <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
            {STEPS.map((step, i) => (
              <div
                key={step.titleKey}
                className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-5"
              >
                <div className="text-xs font-bold text-[rgb(var(--accent))] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center mb-3">
                  <step.Icon size={18} className="text-[rgb(var(--accent))]" aria-hidden />
                </div>
                <h3 className="font-bold mb-1">
                  {t(`buyer.dashboard.steps.${step.titleKey}` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">
                  {t(`buyer.dashboard.steps.${step.descKey}` as Parameters<typeof t>[0])}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
