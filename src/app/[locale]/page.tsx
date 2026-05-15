import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import {
  Zap, ShoppingBag, Dumbbell, Calculator, GraduationCap,
  School, UtensilsCrossed, User, Stethoscope, Truck,
  ArrowRight, CheckCircle2, Star, Globe2, Shield, Headphones,
  BarChart3, Layers, Smartphone,
} from "lucide-react";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

const DEMOS = [
  { slug: "shop",       icon: ShoppingBag,    titleKey: "demos.shop.title",       price: 499,  color: "from-orange-500 to-red-500",    tag: "ecommerce" },
  { slug: "gym",        icon: Dumbbell,       titleKey: "demos.gym.title",        price: 399,  color: "from-green-400 to-emerald-600", tag: "fitness" },
  { slug: "accounting", icon: Calculator,     titleKey: "demos.accounting.title", price: 599,  color: "from-blue-500 to-indigo-600",   tag: "business" },
  { slug: "china-uni",  icon: GraduationCap,  titleKey: "demos.china_uni.title",  price: 799,  color: "from-red-700 to-red-900",       tag: "education" },
  { slug: "school",     icon: School,         titleKey: "demos.school.title",     price: 699,  color: "from-sky-400 to-blue-500",      tag: "education" },
  { slug: "university", icon: GraduationCap,  titleKey: "demos.university.title", price: 899,  color: "from-purple-600 to-violet-700", tag: "education" },
  { slug: "restaurant", icon: UtensilsCrossed,titleKey: "demos.restaurant.title", price: 449,  color: "from-amber-500 to-orange-600",  tag: "food" },
  { slug: "personal",   icon: User,           titleKey: "demos.pim.title",        price: 199,  color: "from-slate-600 to-slate-800",   tag: "personal" },
  { slug: "clinic",     icon: Stethoscope,    titleKey: "demos.clinic.title",     price: 549,  color: "from-teal-400 to-cyan-600",     tag: "health" },
  { slug: "logistics",  icon: Truck,          titleKey: "demos.logistics.title",  price: 649,  color: "from-orange-400 to-amber-500",  tag: "logistics" },
] as const;

const STATS_KEYS = [
  { value: "10",   key: "demos" },
  { value: "3",    key: "languages" },
  { value: "200+", key: "businesses" },
  { value: "4.9★", key: "rating" },
] as const;

const STEPS = [
  { n: "01", icon: Globe2,     titleKey: "browse",  descKey: "browseDesc" },
  { n: "02", icon: Layers,     titleKey: "request", descKey: "requestDesc" },
  { n: "03", icon: Headphones, titleKey: "chat",    descKey: "chatDesc" },
  { n: "04", icon: Zap,        titleKey: "receive", descKey: "receiveDesc" },
] as const;

const FEATURES = [
  { icon: Shield,       titleKey: "ready",   descKey: "readyDesc" },
  { icon: Smartphone,   titleKey: "mobile",  descKey: "mobileDesc" },
  { icon: Globe2,       titleKey: "langs",   descKey: "langsDesc" },
  { icon: BarChart3,    titleKey: "dash",    descKey: "dashDesc" },
  { icon: Zap,          titleKey: "fast",    descKey: "fastDesc" },
  { icon: CheckCircle2, titleKey: "consult", descKey: "consultDesc" },
] as const;

const TESTIMONIALS = [
  { name: "Sardor Karimov", role: "Restaurant Owner, Dushanbe", body: "We launched our restaurant POS in 12 days. The consultant understood exactly what we needed.", rating: 5 },
  { name: "Nilufar Rashidova", role: "School Principal, Khujand", body: "BrightAcademy demo matched our school perfectly. Customization was seamless.", rating: 5 },
  { name: "Timur Yuldashev", role: "Logistics Manager, Tashkent", body: "The logistics platform with live map tracking completely transformed our operations.", rating: 5 },
];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const PRICING = [
    { id: "basic",      price: "$199",                                 features: ["f1","f2","f3","f4"],         highlight: false },
    { id: "pro",        price: "$599",                                 features: ["p1","p2","p3","p4","p5"],    highlight: true },
    { id: "enterprise", price: t("landing.pricing.enterprisePrice"),   features: ["e1","e2","e3","e4","e5"],    highlight: false },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="gradient-text text-xl font-extrabold">myweb</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[rgb(var(--text-muted))]">
            <Link href="/demos" className="hover:text-[rgb(var(--text))] transition-colors">{t("landing.navDemos")}</Link>
            <a href="#how-it-works" className="hover:text-[rgb(var(--text))] transition-colors">{t("landing.navHowItWorks")}</a>
            <a href="#pricing" className="hover:text-[rgb(var(--text))] transition-colors">{t("landing.navPricing")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/auth/login" className="hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors">
              {t("landing.signIn")}
            </Link>
            <Link href="/auth/signup" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors shadow-lg shadow-[rgb(var(--accent))]/20">
              {t("landing.getStarted")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20 pb-28 px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[rgb(var(--accent))]/10 blur-3xl" />
            <div className="absolute top-32 left-1/4 w-[400px] h-[300px] rounded-full bg-violet-500/8 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] text-xs font-semibold text-[rgb(var(--text-muted))] mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t("landing.heroBadge")}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              {t("landing.heroTitle1")}<br />
              <span className="gradient-text">{t("landing.heroTitle2")}</span>
            </h1>

            <p className="text-lg md:text-xl text-[rgb(var(--text-muted))] max-w-2xl mx-auto leading-relaxed mb-10">
              {t("landing.heroDesc")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-base hover:bg-[rgb(var(--accent-hover))] transition-all shadow-xl shadow-[rgb(var(--accent))]/30 hover:scale-105"
              >
                {t("landing.browseAllDemos")} <ArrowRight size={16} />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] font-semibold text-base hover:bg-[rgb(var(--bg-hover))] transition-all"
              >
                {t("landing.talkConsultant")}
              </Link>
            </div>
          </div>

          {/* Demo preview grid */}
          <div className="relative mx-auto max-w-6xl mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DEMOS.map((d) => {
              const Icon = d.icon;
              return (
                <Link
                  key={d.slug}
                  href={`/demos/${d.slug}` as "/"}
                  className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-4 flex flex-col items-center gap-2 hover:border-[rgb(var(--accent))]/50 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center shadow-md`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-center text-[rgb(var(--text-muted))] group-hover:text-[rgb(var(--text))] transition-colors leading-tight">
                    {t(d.titleKey as Parameters<typeof t>[0])}
                  </span>
                  <span className="text-[10px] text-[rgb(var(--text-subtle))]">{t("demosPage.from")} ${d.price}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── STATS BAR ───────────────────────────────────────────── */}
        <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))]">
          <div className="mx-auto max-w-4xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS_KEYS.map((s) => (
              <div key={s.key}>
                <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-sm text-[rgb(var(--text-muted))] mt-1">{t(`landing.stats.${s.key}` as Parameters<typeof t>[0])}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────────── */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t("landing.howItWorks")}</h2>
              <p className="text-[rgb(var(--text-muted))] text-lg max-w-xl mx-auto">
                {t("landing.howItWorksSub")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
                    <div className="text-xs font-bold text-[rgb(var(--accent))] mb-4">{step.n}</div>
                    <div className="w-11 h-11 rounded-xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center mb-4">
                      <Icon size={20} className="text-[rgb(var(--accent))]" />
                    </div>
                    <h3 className="font-bold text-[rgb(var(--text))] mb-2">{t(`landing.steps.${step.titleKey}` as Parameters<typeof t>[0])}</h3>
                    <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">{t(`landing.steps.${step.descKey}` as Parameters<typeof t>[0])}</p>
                    {i < STEPS.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                        <ArrowRight size={16} className="text-[rgb(var(--text-subtle))]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FEATURED DEMOS ──────────────────────────────────────── */}
        <section className="py-20 px-6 bg-[rgb(var(--bg-subtle))]">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-2">{t("landing.featuredDemos")}</h2>
                <p className="text-[rgb(var(--text-muted))]">{t("landing.featuredSub")}</p>
              </div>
              <Link href="/demos" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[rgb(var(--accent))] hover:underline">
                {t("landing.viewAll")} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {DEMOS.slice(0, 3).map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.slug} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group">
                    <div className={`h-36 bg-gradient-to-br ${d.color} flex items-center justify-center`}>
                      <Icon size={52} className="text-white/80" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[rgb(var(--text-subtle))] font-semibold">{t(`demosPage.categories.${d.tag}` as Parameters<typeof t>[0])}</span>
                          <h3 className="font-bold text-lg leading-tight mt-0.5">{t(d.titleKey as Parameters<typeof t>[0])}</h3>
                        </div>
                        <span className="text-lg font-extrabold text-[rgb(var(--accent))]">${d.price}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Link
                          href={`/demos/${d.slug}/preview` as "/"}
                          className="flex-1 text-center text-sm font-semibold py-2 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-hover))] transition-colors"
                        >
                          {t("landing.livePreview")}
                        </Link>
                        <Link
                          href={`/auth/signup?demo=${d.slug}` as "/"}
                          className="flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors"
                        >
                          {t("landing.iWantThis")}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t("landing.featuresHeading")}</h2>
              <p className="text-[rgb(var(--text-muted))] text-lg max-w-xl mx-auto">
                {t("landing.featuresSub")}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6 hover:border-[rgb(var(--accent))]/40 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center mb-4">
                      <Icon size={18} className="text-[rgb(var(--accent))]" />
                    </div>
                    <h3 className="font-bold mb-2">{t(`landing.features.${f.titleKey}` as Parameters<typeof t>[0])}</h3>
                    <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">{t(`landing.features.${f.descKey}` as Parameters<typeof t>[0])}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PRICING ─────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 px-6 bg-[rgb(var(--bg-subtle))]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t("landing.pricingHeading")}</h2>
              <p className="text-[rgb(var(--text-muted))] text-lg">{t("landing.pricingSub")}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {PRICING.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-2xl border p-6 flex flex-col ${
                    p.highlight
                      ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] shadow-xl shadow-[rgb(var(--accent))]/20"
                      : "border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]"
                  }`}
                >
                  {p.highlight && (
                    <div className="text-[10px] font-bold text-[rgb(var(--accent))] uppercase tracking-widest mb-3">{t("landing.mostPopular")}</div>
                  )}
                  <div className="text-xl font-bold mb-1">{t(`landing.pricing.${p.id}` as Parameters<typeof t>[0])}</div>
                  <div className="text-3xl font-extrabold mb-1">{p.price}</div>
                  <div className="text-sm text-[rgb(var(--text-muted))] mb-6">{t(`landing.pricing.${p.id}Desc` as Parameters<typeof t>[0])}</div>
                  <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                    {p.features.map((fKey) => (
                      <li key={fKey} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                        {t(`landing.pricing.${fKey}` as Parameters<typeof t>[0])}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/auth/signup"
                    className={`text-center py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      p.highlight
                        ? "bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))]"
                        : "border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-hover))]"
                    }`}
                  >
                    {t(`landing.pricing.${p.id}Cta` as Parameters<typeof t>[0])}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t("landing.testimonialsHeading")}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((tm) => (
                <div key={tm.name} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: tm.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed mb-4">&ldquo;{tm.body}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-sm">{tm.name}</div>
                    <div className="text-xs text-[rgb(var(--text-subtle))]">{tm.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl text-center rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-br from-[rgb(var(--accent-subtle))] to-[rgb(var(--bg-card))] p-12">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">{t("landing.finalCta")}</h2>
            <p className="text-[rgb(var(--text-muted))] text-lg mb-8">
              {t("landing.finalCtaSub")}
            </p>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[rgb(var(--accent))] text-white font-bold text-lg hover:bg-[rgb(var(--accent-hover))] transition-all shadow-xl shadow-[rgb(var(--accent))]/30 hover:scale-105"
            >
              {t("landing.browseAllDemos")} <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))]">
        <div className="mx-auto max-w-6xl px-6 py-10 grid sm:grid-cols-4 gap-8">
          <div className="sm:col-span-2">
            <div className="font-extrabold text-lg gradient-text mb-2">myweb</div>
            <p className="text-sm text-[rgb(var(--text-muted))] max-w-xs leading-relaxed">
              {t("landing.footerTagline")}
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-3">{t("landing.footerPlatform")}</div>
            <ul className="flex flex-col gap-2 text-sm text-[rgb(var(--text-muted))]">
              <li><Link href="/demos" className="hover:text-[rgb(var(--text))] transition-colors">{t("landing.navDemos")}</Link></li>
              <li><a href="#pricing" className="hover:text-[rgb(var(--text))] transition-colors">{t("landing.navPricing")}</a></li>
              <li><a href="#how-it-works" className="hover:text-[rgb(var(--text))] transition-colors">{t("landing.navHowItWorks")}</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-3">{t("landing.footerAccount")}</div>
            <ul className="flex flex-col gap-2 text-sm text-[rgb(var(--text-muted))]">
              <li><Link href="/auth/login" className="hover:text-[rgb(var(--text))] transition-colors">{t("common.signIn")}</Link></li>
              <li><Link href="/auth/signup" className="hover:text-[rgb(var(--text))] transition-colors">{t("common.signUp")}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[rgb(var(--border))] mx-auto max-w-6xl px-6 py-4 flex items-center justify-between text-xs text-[rgb(var(--text-subtle))]">
          <span>© {new Date().getFullYear()} myweb. {t("landing.footerRights")}</span>
          <LanguageSwitcher />
        </div>
      </footer>
    </div>
  );
}
