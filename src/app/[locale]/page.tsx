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
  { slug: "shop",       icon: ShoppingBag,    label: "Online Shop",          price: 499,  color: "from-orange-500 to-red-500",    bg: "bg-orange-50 dark:bg-orange-950/20",  tag: "ecommerce" },
  { slug: "gym",        icon: Dumbbell,       label: "Gym Management",        price: 399,  color: "from-green-400 to-emerald-600", bg: "bg-green-50 dark:bg-green-950/20",    tag: "fitness" },
  { slug: "accounting", icon: Calculator,     label: "Accounting Suite",      price: 599,  color: "from-blue-500 to-indigo-600",   bg: "bg-blue-50 dark:bg-blue-950/20",      tag: "business" },
  { slug: "china-uni",  icon: GraduationCap,  label: "China University",      price: 799,  color: "from-red-700 to-red-900",       bg: "bg-red-50 dark:bg-red-950/20",        tag: "education" },
  { slug: "school",     icon: School,         label: "School System",         price: 699,  color: "from-sky-400 to-blue-500",      bg: "bg-sky-50 dark:bg-sky-950/20",        tag: "education" },
  { slug: "university", icon: GraduationCap,  label: "University Portal",     price: 899,  color: "from-purple-600 to-violet-700", bg: "bg-purple-50 dark:bg-purple-950/20",  tag: "education" },
  { slug: "restaurant", icon: UtensilsCrossed,label: "Restaurant POS",        price: 449,  color: "from-amber-500 to-orange-600",  bg: "bg-amber-50 dark:bg-amber-950/20",    tag: "food" },
  { slug: "personal",   icon: User,           label: "Personal CRM",          price: 199,  color: "from-slate-600 to-slate-800",   bg: "bg-slate-50 dark:bg-slate-950/20",    tag: "personal" },
  { slug: "clinic",     icon: Stethoscope,    label: "Clinic System",         price: 549,  color: "from-teal-400 to-cyan-600",     bg: "bg-teal-50 dark:bg-teal-950/20",      tag: "health" },
  { slug: "logistics",  icon: Truck,          label: "Logistics Platform",    price: 649,  color: "from-orange-400 to-amber-500",  bg: "bg-orange-50 dark:bg-orange-950/20",  tag: "logistics" },
];

const STATS = [
  { value: "10", label: "Ready-made demos" },
  { value: "3",  label: "Languages" },
  { value: "200+", label: "Businesses served" },
  { value: "4.9★", label: "Avg. rating" },
];

const STEPS = [
  { n: "01", icon: Globe2,     title: "Browse Demos",        desc: "Explore 10 fully working demo platforms with real data." },
  { n: "02", icon: Layers,     title: "Request Your Build",  desc: "Fill a short brief about your business needs and preferences." },
  { n: "03", icon: Headphones, title: "Chat with Consultant", desc: "Discuss requirements live with an assigned expert." },
  { n: "04", icon: Zap,        title: "Receive & Launch",    desc: "Get your custom platform delivered and deployed." },
];

const FEATURES = [
  { icon: Shield,      title: "Production-Ready",   desc: "Full authentication, roles, RLS, and Supabase backend." },
  { icon: Smartphone,  title: "Mobile Responsive",  desc: "Every demo works beautifully on phone, tablet, and desktop." },
  { icon: Globe2,      title: "3 Languages",         desc: "Russian, Tajik, and English out of the box." },
  { icon: BarChart3,   title: "Rich Dashboards",     desc: "Charts, tables, calendars — real interactive data." },
  { icon: Zap,         title: "Fast Delivery",       desc: "Typical custom build delivered in 1–2 weeks." },
  { icon: CheckCircle2,"title": "Consultant Support", desc: "Dedicated expert for each project from brief to launch." },
];

const PRICING = [
  {
    name: "Basic",
    price: "$199",
    desc: "Perfect for solo founders",
    features: ["1 demo customized", "3 language support", "6 months support", "Source code included"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$599",
    desc: "For growing businesses",
    features: ["Up to 3 demos", "Custom branding & domain", "Priority consultant", "12 months support", "Mobile app add-on"],
    cta: "Most Popular",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full-scale deployments",
    features: ["Unlimited demos", "Dedicated team", "SLA guarantee", "Training & onboarding", "Custom integrations"],
    cta: "Contact Us",
    highlight: false,
  },
];

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

  return (
    <div className="flex flex-col min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="gradient-text text-xl font-extrabold">myweb</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[rgb(var(--text-muted))]">
            <Link href="/demos" className="hover:text-[rgb(var(--text))] transition-colors">Demos</Link>
            <Link href="#how-it-works" className="hover:text-[rgb(var(--text))] transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-[rgb(var(--text))] transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Link href="/auth/login" className="hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors shadow-lg shadow-[rgb(var(--accent))]/20">
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20 pb-28 px-6">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[rgb(var(--accent))]/10 blur-3xl" />
            <div className="absolute top-32 left-1/4 w-[400px] h-[300px] rounded-full bg-violet-500/8 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] text-xs font-semibold text-[rgb(var(--text-muted))] mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              10 live demos available now
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Professional web<br />
              <span className="gradient-text">platforms, delivered</span>
            </h1>

            <p className="text-lg md:text-xl text-[rgb(var(--text-muted))] max-w-2xl mx-auto leading-relaxed mb-10">
              Browse 10 fully-functional demo systems — from e-commerce to clinic management.
              Find your match, fill a brief, and get a custom build in days.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-base hover:bg-[rgb(var(--accent-hover))] transition-all shadow-xl shadow-[rgb(var(--accent))]/30 hover:scale-105"
              >
                Browse All Demos <ArrowRight size={16} />
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] font-semibold text-base hover:bg-[rgb(var(--bg-hover))] transition-all"
              >
                Talk to a consultant
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
                  href={`/demos/${d.slug}`}
                  className="group rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-4 flex flex-col items-center gap-2 hover:border-[rgb(var(--accent))]/50 hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${d.color} flex items-center justify-center shadow-md`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-semibold text-center text-[rgb(var(--text-muted))] group-hover:text-[rgb(var(--text))] transition-colors leading-tight">
                    {d.label}
                  </span>
                  <span className="text-[10px] text-[rgb(var(--text-subtle))]">from ${d.price}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── STATS BAR ───────────────────────────────────────────── */}
        <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))]">
          <div className="mx-auto max-w-4xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold gradient-text">{s.value}</div>
                <div className="text-sm text-[rgb(var(--text-muted))] mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────────── */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">How it works</h2>
              <p className="text-[rgb(var(--text-muted))] text-lg max-w-xl mx-auto">
                From browsing to launch in four simple steps.
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
                    <h3 className="font-bold text-[rgb(var(--text))] mb-2">{step.title}</h3>
                    <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">{step.desc}</p>
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
                <h2 className="text-4xl font-extrabold tracking-tight mb-2">Featured Demos</h2>
                <p className="text-[rgb(var(--text-muted))]">Click "Preview" to see the live working system</p>
              </div>
              <Link href="/demos" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[rgb(var(--accent))] hover:underline">
                View all 10 <ArrowRight size={14} />
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
                          <span className="text-[10px] uppercase tracking-widest text-[rgb(var(--text-subtle))] font-semibold">{d.tag}</span>
                          <h3 className="font-bold text-lg leading-tight mt-0.5">{d.label}</h3>
                        </div>
                        <span className="text-lg font-extrabold text-[rgb(var(--accent))]">${d.price}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Link
                          href={`/demos/${d.slug}/preview`}
                          className="flex-1 text-center text-sm font-semibold py-2 rounded-lg border border-[rgb(var(--border))] hover:bg-[rgb(var(--bg-hover))] transition-colors"
                        >
                          Live Preview
                        </Link>
                        <Link
                          href={`/auth/signup?demo=${d.slug}`}
                          className="flex-1 text-center text-sm font-semibold py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors"
                        >
                          I want this
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
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">Everything included</h2>
              <p className="text-[rgb(var(--text-muted))] text-lg max-w-xl mx-auto">
                Every demo is production-grade, not a mockup.
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
                    <h3 className="font-bold mb-2">{f.title}</h3>
                    <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed">{f.desc}</p>
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
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">Simple pricing</h2>
              <p className="text-[rgb(var(--text-muted))] text-lg">No hidden fees. Pay once, own it forever.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {PRICING.map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl border p-6 flex flex-col ${
                    p.highlight
                      ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))] shadow-xl shadow-[rgb(var(--accent))]/20"
                      : "border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]"
                  }`}
                >
                  {p.highlight && (
                    <div className="text-[10px] font-bold text-[rgb(var(--accent))] uppercase tracking-widest mb-3">Most Popular</div>
                  )}
                  <div className="text-xl font-bold mb-1">{p.name}</div>
                  <div className="text-3xl font-extrabold mb-1">{p.price}</div>
                  <div className="text-sm text-[rgb(var(--text-muted))] mb-6">{p.desc}</div>
                  <ul className="flex flex-col gap-2.5 flex-1 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 shrink-0" />
                        {f}
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
                    {p.cta}
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
              <h2 className="text-4xl font-extrabold tracking-tight mb-4">Trusted by businesses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[rgb(var(--text-muted))] leading-relaxed mb-4">"{t.body}"</p>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-[rgb(var(--text-subtle))]">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl text-center rounded-3xl border border-[rgb(var(--border))] bg-gradient-to-br from-[rgb(var(--accent-subtle))] to-[rgb(var(--bg-card))] p-12">
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Ready to launch your platform?</h2>
            <p className="text-[rgb(var(--text-muted))] text-lg mb-8">
              Pick a demo, fill a brief, and have a running system in days — not months.
            </p>
            <Link
              href="/demos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[rgb(var(--accent))] text-white font-bold text-lg hover:bg-[rgb(var(--accent-hover))] transition-all shadow-xl shadow-[rgb(var(--accent))]/30 hover:scale-105"
            >
              Browse All 10 Demos <ArrowRight size={18} />
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
              A marketplace of ready-made web systems. Browse, request, and launch.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-3">Platform</div>
            <ul className="flex flex-col gap-2 text-sm text-[rgb(var(--text-muted))]">
              <li><Link href="/demos" className="hover:text-[rgb(var(--text))] transition-colors">Demos</Link></li>
              <li><Link href="#pricing" className="hover:text-[rgb(var(--text))] transition-colors">Pricing</Link></li>
              <li><Link href="#how-it-works" className="hover:text-[rgb(var(--text))] transition-colors">How it works</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-3">Account</div>
            <ul className="flex flex-col gap-2 text-sm text-[rgb(var(--text-muted))]">
              <li><Link href="/auth/login" className="hover:text-[rgb(var(--text))] transition-colors">Sign in</Link></li>
              <li><Link href="/auth/signup" className="hover:text-[rgb(var(--text))] transition-colors">Sign up</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[rgb(var(--border))] mx-auto max-w-6xl px-6 py-4 flex items-center justify-between text-xs text-[rgb(var(--text-subtle))]">
          <span>© {new Date().getFullYear()} myweb. All rights reserved.</span>
          <LanguageSwitcher />
        </div>
      </footer>
    </div>
  );
}
