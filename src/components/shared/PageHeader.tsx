"use client";

import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

interface NavLink {
  label: string;
  href: string;
}

interface PageHeaderProps {
  logoHref?: string;
  logoText: string;
  navLinks?: NavLink[];
  userName?: string;
  logoutLabel?: string;
  logoutHref?: string;
  locale: string;
}

export function PageHeader({
  logoHref = "/",
  logoText,
  navLinks = [],
  userName,
  logoutLabel,
  logoutHref,
}: PageHeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href={logoHref as "/"} className="text-xl font-bold tracking-tight">
          {logoText}
        </Link>
        <nav className="flex items-center gap-6 text-sm flex-wrap">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href as "/"}
              className="hover:text-neutral-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {userName && (
            <span className="text-neutral-500 font-medium">{userName}</span>
          )}
          {logoutHref && logoutLabel && (
            <Link
              href={logoutHref as "/"}
              className="text-neutral-500 hover:text-neutral-700 hover:underline"
            >
              {logoutLabel}
            </Link>
          )}
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
