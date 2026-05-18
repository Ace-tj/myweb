import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, Sparkles, MessageSquare, LogOut } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCurrentProfile } from "@/lib/auth";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin");
  const tBrand = await getTranslations("brand");

  const profile = await getCurrentProfile();
  if (!profile)
    redirect(`/${locale}/auth/login?next=/${locale}/admin/dashboard`);
  if (profile.role !== "admin") redirect(`/${locale}/account`);

  const NAV = [
    { href: "/admin/dashboard", label: t("nav.dashboard"), Icon: LayoutDashboard },
    { href: "/admin/users", label: t("nav.users"), Icon: Users },
    { href: "/admin/demos", label: t("nav.demos"), Icon: Sparkles },
    { href: "/admin/chats", label: t("nav.chats"), Icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-950 p-5">
          <div className="mb-8 flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-indigo-500 text-white">
              <Sparkles className="size-4" />
            </div>
            <div>
              <div className="font-bold leading-tight">{tBrand("name")}</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400">
                {t("sectionLabel")}
              </div>
            </div>
          </div>
          <nav className="space-y-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <n.Icon className="size-4" />
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 border-t border-slate-800 pt-4">
            <div className="px-3 text-xs text-slate-400">{profile.email}</div>
            <form action={`/${locale}/auth/logout`} method="post" className="mt-2">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
              >
                <LogOut className="size-4" />
                {t("nav.logout")}
              </button>
            </form>
          </div>
        </aside>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
