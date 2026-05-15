import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

interface ProjectRow {
  id: string;
  buyerName: string;
  consultantName: string | null;
  demoType: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
}

const MOCK_PROJECTS: ProjectRow[] = [
  {
    id: "proj-001",
    buyerName: "Sarah Johnson",
    consultantName: "Elena Petrova",
    demoType: "Online Shop",
    status: "in_progress",
    createdAt: "2026-04-20",
  },
  {
    id: "proj-002",
    buyerName: "Mark Williams",
    consultantName: null,
    demoType: "Clinic Appointments",
    status: "pending",
    createdAt: "2026-05-01",
  },
  {
    id: "proj-003",
    buyerName: "Green Basket Market",
    consultantName: "Ahmad Rahimi",
    demoType: "Restaurant POS",
    status: "completed",
    createdAt: "2026-03-10",
  },
  {
    id: "proj-004",
    buyerName: "Sunrise School",
    consultantName: "Elena Petrova",
    demoType: "School System",
    status: "in_progress",
    createdAt: "2026-04-05",
  },
];

export default async function AdminProjectsPage({
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
            <Link href="/admin/dashboard" className="text-neutral-500 hover:text-neutral-700">
              {t("admin.dashboard.title")}
            </Link>
            <Link href="/auth/logout" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.logout")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-6xl w-full px-6 py-10">
        <h1 className="text-2xl font-bold mb-8">{t("admin.projects.heading")}</h1>

        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.projects.id")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.projects.buyer")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.projects.consultant")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.projects.demoType")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.projects.status")}</th>
                  <th className="text-left px-4 py-3 font-medium text-neutral-500">{t("admin.projects.created")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {MOCK_PROJECTS.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/projects/${project.id}` as "/"}
                        className="font-mono text-xs text-blue-600 hover:underline"
                      >
                        {project.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium">{project.buyerName}</td>
                    <td className="px-4 py-3 text-neutral-600">
                      {project.consultantName ?? (
                        <span className="text-neutral-400 italic">{t("admin.projects.unassigned")}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                        {project.demoType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={project.status}
                        label={t(`status.${project.status}` as "status.pending")}
                      />
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{project.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
