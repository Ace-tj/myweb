import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { PublicHeaderNav } from "@/components/shared/PublicHeaderNav";
import { getCurrentSession } from "@/lib/auth";
import {
  ArrowLeft, ExternalLink, ArrowRight, CheckCircle2,
  ShoppingBag, Dumbbell, Calculator, GraduationCap,
  School, UtensilsCrossed, User, Stethoscope, Truck,
  Monitor, Smartphone, Globe2,
} from "lucide-react";
import { DEMO_PHOTO_CATEGORY, photoForSlug } from "@/lib/photos";

interface DemoMeta {
  slug: string;
  category: string;
  titleKey: string;
  descriptionKey: string;
  basePriceUsd: number;
  gradient: string;
  icon: string;
  pages: string[];
  features: string[];
  tech: string[];
}

const DEMOS: DemoMeta[] = [
  {
    slug: "shop", category: "ecommerce", titleKey: "demos.shop.title", descriptionKey: "demos.shop.description",
    basePriceUsd: 499, gradient: "from-orange-500 to-red-500", icon: "🛍️",
    pages: ["Home & Hero", "Product Catalog", "Product Detail", "Shopping Cart", "Checkout", "Order Tracking", "Admin Panel"],
    features: ["Product search & filters", "Cart with persistence", "Fake checkout flow", "Order status tracking", "Admin product CRUD", "Sales analytics"],
    tech: ["Next.js", "Supabase", "Phosphor Icons", "Recharts"],
  },
  {
    slug: "gym", category: "fitness", titleKey: "demos.gym.title", descriptionKey: "demos.gym.description",
    basePriceUsd: 399, gradient: "from-emerald-400 to-green-700", icon: "💪",
    pages: ["Dashboard", "Members List", "Member Profile", "Class Schedule", "Trainers", "Billing", "Check-in Kiosk"],
    features: ["Member management", "Weekly class calendar", "Trainer profiles & ratings", "Plan billing", "Check-in kiosk UI", "Revenue tracking"],
    tech: ["Next.js", "Supabase", "Tabler Icons", "Recharts"],
  },
  {
    slug: "accounting", category: "business", titleKey: "demos.accounting.title", descriptionKey: "demos.accounting.description",
    basePriceUsd: 599, gradient: "from-blue-500 to-indigo-700", icon: "📊",
    pages: ["Dashboard & KPIs", "Invoice List", "Create Invoice", "Expenses", "Clients", "P&L Reports", "Tax Summary"],
    features: ["Revenue vs expense charts", "Invoice builder", "Client management", "P&L statement", "Export CSV/PDF", "Tax summary"],
    tech: ["Next.js", "Supabase", "Lucide Icons", "Recharts"],
  },
  {
    slug: "china-uni", category: "education", titleKey: "demos.china_uni.title", descriptionKey: "demos.china_uni.description",
    basePriceUsd: 799, gradient: "from-red-700 to-red-950", icon: "🏛️",
    pages: ["University Catalog", "University Detail", "Apply (Multi-step)", "My Applications", "Agent Dashboard", "Post University", "Review Applications"],
    features: ["University search & filters", "Multi-step application", "Document upload flow", "Application status tracker", "Agent review portal", "Internal messaging"],
    tech: ["Next.js", "Supabase", "Tabler Icons", "Leaflet Maps"],
  },
  {
    slug: "school", category: "education", titleKey: "demos.school.title", descriptionKey: "demos.school.description",
    basePriceUsd: 699, gradient: "from-sky-400 to-blue-600", icon: "🏫",
    pages: ["Dashboard", "Student Roster", "Student Profile", "Classes", "Gradebook", "Attendance", "Announcements", "Parent Portal"],
    features: ["Student management", "Gradebook with averages", "Attendance heatmap", "Parent portal view", "Class scheduling", "Announcement board"],
    tech: ["Next.js", "Supabase", "Tabler Icons", "Recharts"],
  },
  {
    slug: "university", category: "education", titleKey: "demos.university.title", descriptionKey: "demos.university.description",
    basePriceUsd: 899, gradient: "from-purple-600 to-violet-800", icon: "🎓",
    pages: ["Course Catalog", "My Enrollment", "Student Records", "Faculty Directory", "Class Schedule", "Transcript", "Billing"],
    features: ["Course registration", "Credit tracking", "Faculty profiles", "GPA calculation", "Transcript view", "Tuition billing"],
    tech: ["Next.js", "Supabase", "Lucide Icons", "Recharts"],
  },
  {
    slug: "restaurant", category: "food", titleKey: "demos.restaurant.title", descriptionKey: "demos.restaurant.description",
    basePriceUsd: 449, gradient: "from-amber-500 to-orange-700", icon: "🍽️",
    pages: ["Dashboard", "Menu Management", "Table Floor Plan", "Active Orders", "Kitchen Display", "Sales Reports", "Staff Schedule", "Online Menu"],
    features: ["Table floor plan", "Kitchen ticket view", "Order status flow", "Menu CRUD", "Daily sales charts", "Staff scheduling"],
    tech: ["Next.js", "Supabase", "Phosphor Icons", "Recharts"],
  },
  {
    slug: "personal", category: "personal", titleKey: "demos.pim.title", descriptionKey: "demos.pim.description",
    basePriceUsd: 199, gradient: "from-slate-600 to-slate-900", icon: "👤",
    pages: ["Dashboard", "Contacts", "Contact Detail", "Tasks (Kanban)", "Calendar", "Documents", "Search"],
    features: ["Contact management", "Kanban task board", "Month calendar", "Document vault", "Full-text search", "Tag filtering"],
    tech: ["Next.js", "Supabase", "Lucide Icons", "date-fns"],
  },
  {
    slug: "clinic", category: "health", titleKey: "demos.clinic.title", descriptionKey: "demos.clinic.description",
    basePriceUsd: 549, gradient: "from-teal-400 to-cyan-600", icon: "🏥",
    pages: ["Dashboard", "Appointments", "Book Appointment", "Patients", "Patient Detail", "Doctors", "Prescriptions", "Billing", "Patient Portal"],
    features: ["Appointment calendar", "Patient history timeline", "Doctor availability", "Prescription writer", "Insurance billing", "Patient portal"],
    tech: ["Next.js", "Supabase", "Tabler Icons", "Recharts"],
  },
  {
    slug: "logistics", category: "logistics", titleKey: "demos.logistics.title", descriptionKey: "demos.logistics.description",
    basePriceUsd: 649, gradient: "from-orange-400 to-amber-600", icon: "🚚",
    pages: ["Dashboard", "Shipments", "New Shipment", "Drivers", "Live Map", "Package Tracker", "Fleet Management", "Reports"],
    features: ["Live map with Leaflet", "Driver assignment", "Package tracking by ID", "Fleet management", "Route visualization", "Delivery analytics"],
    tech: ["Next.js", "Supabase", "Phosphor Icons", "Leaflet Maps"],
  },
];

export function generateStaticParams() {
  const locales = ["en", "ru", "tg"];
  const slugs = DEMOS.map((d) => d.slug);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export default async function DemoSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const session = await getCurrentSession();

  const demo = DEMOS.find((d) => d.slug === slug);
  if (!demo) notFound();

  const ICON_MAP: Record<string, React.ElementType> = {
    shop: ShoppingBag, gym: Dumbbell, accounting: Calculator,
    "china-uni": GraduationCap, school: School, university: GraduationCap,
    restaurant: UtensilsCrossed, personal: User, clinic: Stethoscope, logistics: Truck,
  };
  const LucideIcon = ICON_MAP[slug] ?? Monitor;
  const title = t(demo.titleKey as Parameters<typeof t>[0]);
  const description = t(demo.descriptionKey as Parameters<typeof t>[0]);
  const categoryLabel = t(`demosPage.categories.${demo.category}` as Parameters<typeof t>[0]);
  const photoCategory = DEMO_PHOTO_CATEGORY[slug];
  const heroPhoto = photoCategory ? photoForSlug(photoCategory, slug) : null;

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
          <Link href="/demos" className="flex items-center gap-2 text-sm text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors">
            <ArrowLeft size={14} /> {t("demoDetail.backToDemos")}
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <PublicHeaderNav session={session ? { name: session.name, role: session.role } : null} />
          </div>
        </div>
      </header>

      {/* Hero with themed photo */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${demo.gradient} text-white`}>
        {heroPhoto && (
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.alt || title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} ${heroPhoto ? "opacity-80" : ""}`} />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-black/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-6 border border-white/20">
              {categoryLabel}
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
              {demo.icon} {title}
            </h1>
            <p className="text-white/90 text-lg max-w-xl mb-4 leading-relaxed drop-shadow">
              {t("demoDetail.heroDesc", { category: categoryLabel, count: demo.pages.length })}
            </p>
            <p className="text-white/80 text-sm max-w-xl mb-8 leading-relaxed">{description}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/demos/${slug}/preview` as "/"}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-neutral-900 font-bold hover:scale-105 transition-transform shadow-xl"
              >
                <ExternalLink size={16} /> {t("demoDetail.openLivePreview")}
              </Link>
              <Link
                href={`/auth/signup?demo=${slug}` as "/"}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 font-semibold hover:bg-white/30 transition-colors"
              >
                {t("demoDetail.iWantThis")} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
          <div className="w-40 h-40 rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-2xl shrink-0">
            <LucideIcon size={64} className="text-white" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-3 gap-10">
        {/* Left: Pages + Features */}
        <div className="lg:col-span-2 space-y-10">

          {/* All Pages */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5">{t("demoDetail.allPages")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {demo.pages.map((page, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]">
                  <div className="w-8 h-8 rounded-lg bg-[rgb(var(--accent-subtle))] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[rgb(var(--accent))]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <span className="text-sm font-medium">{page}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5">{t("demoDetail.keyFeatures")}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {demo.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))]">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-[rgb(var(--text-muted))]">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div>
            <h2 className="text-2xl font-extrabold mb-5">{t("demoDetail.compatibility")}</h2>
            <div className="flex gap-4">
              {[
                { icon: Monitor, label: t("demoDetail.desktop") },
                { icon: Smartphone, label: t("demoDetail.mobile") },
                { icon: Globe2, label: t("demoDetail.browsers") },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex-1 p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] flex flex-col items-center gap-2 text-center">
                  <Icon size={20} className="text-[rgb(var(--accent))]" />
                  <span className="text-xs font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right: Price card */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6 shadow-xl">
            <div className="text-xs text-[rgb(var(--text-subtle))] uppercase tracking-widest mb-1">{t("demoDetail.startingFrom")}</div>
            <div className="text-5xl font-extrabold mb-1">${demo.basePriceUsd}</div>
            <div className="text-sm text-[rgb(var(--text-muted))] mb-6">{t("demoDetail.oneTime")}</div>

            <div className="flex flex-col gap-2.5 mb-6">
              {(["code", "lang", "support", "backend", "consultant"] as const).map((key) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  {t(`demoDetail.features.${key}` as Parameters<typeof t>[0])}
                </div>
              ))}
            </div>

            <Link
              href={`/demos/${slug}/preview` as "/"}
              className="block w-full text-center py-3 rounded-xl border border-[rgb(var(--border))] font-semibold text-sm hover:bg-[rgb(var(--bg-hover))] transition-colors mb-3"
            >
              <ExternalLink size={14} className="inline mr-1.5" />
              {t("demoDetail.openLiveDemo")}
            </Link>
            <Link
              href={`/auth/signup?demo=${slug}` as "/"}
              className="block w-full text-center py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-bold hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25"
            >
              {t("demoDetail.iWantThis")} →
            </Link>

            {/* Tech stack */}
            <div className="mt-6 pt-5 border-t border-[rgb(var(--border))]">
              <div className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-subtle))] mb-3">{t("demoDetail.techStack")}</div>
              <div className="flex flex-wrap gap-1.5">
                {demo.tech.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded-md bg-[rgb(var(--bg-hover))] text-[rgb(var(--text-muted))] text-xs font-medium border border-[rgb(var(--border))]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
