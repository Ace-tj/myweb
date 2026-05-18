import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { setConsultantStatus } from "@/app/actions/admin";
import type { Profile } from "@/lib/types";

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.users");

  let users: Profile[] = [];
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    users = (data as Profile[]) ?? [];
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-slate-400">{t("lede")}</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-xs uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-5 py-3 text-left">{t("columns.user")}</th>
              <th className="px-5 py-3 text-left">{t("columns.role")}</th>
              <th className="px-5 py-3 text-left">{t("columns.status")}</th>
              <th className="px-5 py-3 text-left">{t("columns.joined")}</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-slate-400">
                  {t("empty")}
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-800">
                <td className="px-5 py-4">
                  <div className="font-semibold text-white">
                    {u.full_name || u.email.split("@")[0]}
                  </div>
                  <div className="text-xs text-slate-400">{u.email}</div>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium">
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {u.role === "consultant" ? (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.consultant_status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : u.consultant_status === "rejected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-amber-500/20 text-amber-300"
                      }`}
                    >
                      {u.consultant_status ?? t("statusPending")}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500">—</span>
                  )}
                </td>
                <td className="px-5 py-4 text-xs text-slate-400">
                  {new Date(u.created_at).toLocaleDateString(locale)}
                </td>
                <td className="px-5 py-4 text-right">
                  {u.role === "consultant" && u.consultant_status !== "approved" && (
                    <form action={setConsultantStatus} className="inline">
                      <input type="hidden" name="userId" value={u.id} />
                      <input type="hidden" name="decision" value="approved" />
                      <button
                        type="submit"
                        className="mr-2 rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-400"
                      >
                        {t("approve")}
                      </button>
                    </form>
                  )}
                  {u.role === "consultant" && u.consultant_status !== "rejected" && (
                    <form action={setConsultantStatus} className="inline">
                      <input type="hidden" name="userId" value={u.id} />
                      <input type="hidden" name="decision" value="rejected" />
                      <button
                        type="submit"
                        className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
                      >
                        {t("reject")}
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
