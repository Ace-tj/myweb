import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getCurrentSession } from "@/lib/auth";
import { listAllProjects } from "@/lib/projects";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  new: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  assigned: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  quoted: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  in_progress: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  review: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  delivered: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default async function AdminProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session || session.role !== "admin")
    redirect(`/${locale}/auth/login`);

  const projects = await listAllProjects();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {projects.length} total · From <code>projects</code> table
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Business</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Demo</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Status</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Quote</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Buyer</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Consultant</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Created</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center text-slate-500 py-12">
                    No projects yet — buyers will appear here once they submit briefs.
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 text-white font-medium">
                      {p.brief.businessName || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-400 capitalize whitespace-nowrap">
                      {p.brief.demoSlug ? p.brief.demoSlug.replace(/-/g, " ") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLE[p.status] ?? STATUS_STYLE.new}`}
                      >
                        {p.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white tabular-nums whitespace-nowrap">
                      {p.quoteAmount != null ? `$${p.quoteAmount}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                      {p.buyerId.slice(0, 8)}…
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                      {p.consultantId
                        ? p.consultantId.slice(0, 8) + "…"
                        : "unassigned"}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap tabular-nums">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/buyer/projects/${p.id}` as "/"}
                        className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-xs font-semibold"
                      >
                        View <ArrowRight size={11} className="ml-0.5" aria-hidden />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
