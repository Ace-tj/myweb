"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import {
  LayoutDashboard, Users, BarChart2, FolderKanban,
  Settings, LogOut, ChevronRight, Bell, Zap,
  ShieldCheck, TrendingUp
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", icon: <LayoutDashboard size={17} />, label: "Dashboard" },
    { href: "/admin/demos", icon: <BarChart2 size={17} />, label: "Demo Catalog" },
    { href: "/admin/users", icon: <Users size={17} />, label: "Users" },
    { href: "/admin/projects", icon: <FolderKanban size={17} />, label: "Projects" },
  ];

  const isActive = (href: string) => pathname?.includes(href.replace("/admin/", "")) ?? false;

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <div>
              <div className="text-sm font-800 text-white leading-none">MyWeb</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as "/admin/dashboard"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(item.href)
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Admin badge */}
        <div className="p-3 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-800">
            <div className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <ShieldCheck size={14} className="text-indigo-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Administrator</div>
              <div className="text-[10px] text-slate-500">Full access</div>
            </div>
          </div>
          <Link
            href="/auth/logout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all mt-1"
          >
            <LogOut size={15} />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Admin</span>
            <ChevronRight size={14} className="text-slate-600" />
            <span className="text-white font-medium capitalize">
              {pathname?.split("/").filter(Boolean).slice(-1)[0]?.replace("-", " ") ?? "Dashboard"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
              <Bell size={15} className="text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
            </button>
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              View site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
