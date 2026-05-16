"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight, LayoutDashboard, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Role } from "@/lib/auth";

export interface PublicHeaderSession {
  name: string;
  role: Role;
}

interface Props {
  session: PublicHeaderSession | null;
}

function dashPath(role: Role): string {
  if (role === "admin") return "/admin/dashboard";
  if (role === "consultant") return "/consultant/dashboard";
  return "/buyer/dashboard";
}

export function PublicHeaderNav({ session }: Props) {
  const t = useTranslations();

  if (session) {
    const path = dashPath(session.role);
    const firstName = session.name.split(" ")[0] || session.name;
    return (
      <>
        <Link
          href={path as "/"}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
          style={{ color: "rgb(var(--text-muted))" }}
        >
          <span className="hidden md:inline">{firstName}</span>
        </Link>
        <Link
          href={path as "/"}
          className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors shadow-lg shadow-[rgb(var(--accent))]/20"
        >
          <LayoutDashboard size={14} /> {t("nav.dashboard")}
        </Link>
        <Link
          href="/auth/logout"
          className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors"
          style={{ color: "rgb(var(--text-muted))" }}
          title={t("nav.logout")}
        >
          <LogOut size={15} />
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/auth/login" className="hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-lg hover:bg-[rgb(var(--bg-hover))] transition-colors" style={{ color: "rgb(var(--text-muted))" }}>
        {t("landing.signIn")}
      </Link>
      <Link href="/auth/signup" className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg bg-[rgb(var(--accent))] text-white hover:bg-[rgb(var(--accent-hover))] transition-colors shadow-lg shadow-[rgb(var(--accent))]/20">
        {t("landing.getStarted")} <ArrowRight size={14} />
      </Link>
    </>
  );
}
