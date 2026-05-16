import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { listAdminUsers } from "@/lib/admin";
import { UserRoleControl } from "./UserRoleControl";

export const dynamic = "force-dynamic";

const ROLE_STYLE: Record<string, string> = {
  buyer: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  consultant: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  admin: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export default async function AdminUsersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session || session.role !== "admin")
    redirect(`/${locale}/auth/login`);

  const users = await listAdminUsers();

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Users
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {users.length} total · From <code>profiles</code> table
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-950 text-slate-400">
              <tr>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Name</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Email</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Role</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Joined</th>
                <th className="text-left font-semibold px-4 py-3 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-slate-500 py-12"
                  >
                    No users yet.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {(u.fullName || u.email || "?").slice(0, 1).toUpperCase()}
                        </div>
                        <span className="text-white font-medium">
                          {u.fullName || "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                      {u.email || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${ROLE_STYLE[u.role] ?? ROLE_STYLE.buyer}`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap tabular-nums">
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <UserRoleControl
                        userId={u.id}
                        currentRole={u.role}
                        disabled={u.id === session.id}
                      />
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
