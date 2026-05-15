import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

interface Brief {
  id: string;
  demoSlug: string;
  demoLabel: string;
  businessName: string;
  budget: number;
  deadline: string;
  description: string;
}

const MOCK_BRIEFS: Brief[] = [
  {
    id: "proj-101",
    demoSlug: "shop",
    demoLabel: "Online Shop",
    businessName: "Green Basket Market",
    budget: 1500,
    deadline: "2026-07-01",
    description: "Online store for organic products with cart and checkout.",
  },
  {
    id: "proj-102",
    demoSlug: "clinic",
    demoLabel: "Clinic Appointments",
    businessName: "CityMed Clinic",
    budget: 2000,
    deadline: "2026-08-15",
    description:
      "Appointment booking system for a 5-doctor private clinic with patient portal.",
  },
  {
    id: "proj-103",
    demoSlug: "restaurant",
    demoLabel: "Restaurant POS",
    businessName: "Spice Garden",
    budget: 900,
    deadline: "2026-06-20",
    description:
      "POS system for a mid-size restaurant with table management and kitchen tickets.",
  },
];

export default async function ConsultantBriefsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/consultant/dashboard" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.dashboard")}
            </Link>
            <Link href="/auth/logout" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.logout")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-5xl w-full px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight mb-8">
          {t("consultant.briefs.heading")}
        </h1>

        {MOCK_BRIEFS.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-neutral-200 bg-white px-8 py-16 text-center">
            <p className="text-neutral-500 text-sm">{t("consultant.briefs.empty")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_BRIEFS.map((brief) => (
              <div
                key={brief.id}
                className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-semibold text-lg">{brief.businessName}</h2>
                    <StatusBadge status="pending" label={brief.demoLabel} />
                  </div>
                  <p className="text-sm text-neutral-500 line-clamp-2">{brief.description}</p>
                  <div className="flex gap-4 text-sm text-neutral-600">
                    <span>
                      <span className="text-neutral-400">{t("consultant.briefs.budget")}: </span>
                      <span className="font-medium">${brief.budget}</span>
                    </span>
                    <span>
                      <span className="text-neutral-400">{t("consultant.briefs.deadline")}: </span>
                      <span className="font-medium">{brief.deadline}</span>
                    </span>
                  </div>
                </div>
                <Link
                  href={`/consultant/projects/${brief.id}` as "/"}
                  className="shrink-0 rounded-lg bg-neutral-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-700 transition-colors text-center"
                >
                  {t("consultant.briefs.viewBrief")}
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
