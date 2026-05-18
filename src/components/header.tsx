"use client";

import { useTranslations } from "next-intl";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import type { Profile } from "@/lib/types";

const NAV: { href: string; key: "demos" | "services" | "pricing" | "about" | "contact" }[] = [
  { href: "/demos", key: "demos" },
  { href: "/services", key: "services" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export function Header({ profile }: { profile: Profile | null }) {
  const t = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const accountHref =
    profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "consultant"
        ? "/consultant/inbox"
        : "/account";

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-base font-bold tracking-tight"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-fg">
            <Sparkles className="size-4" />
          </span>
          {tBrand("name")}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  active
                    ? "bg-surface-2 text-fg"
                    : "text-muted hover:bg-surface-2 hover:text-fg"
                }`}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          {profile ? (
            <Link
              href={accountHref}
              className="ml-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover"
            >
              {t(profile.role === "admin" ? "admin" : profile.role === "consultant" ? "consultant" : "account")}
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-fg transition hover:bg-surface-2"
              >
                {t("login")}
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover"
              >
                {t("signup")}
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          className="grid size-9 place-items-center rounded-lg border border-border bg-surface lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-bg lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base text-fg hover:bg-surface-2"
              >
                {t(n.key)}
              </Link>
            ))}
            <div className="my-3 flex items-center gap-2 border-t border-border pt-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            {profile ? (
              <Link
                href={accountHref}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-fg"
              >
                {t(profile.role === "admin" ? "admin" : profile.role === "consultant" ? "consultant" : "account")}
              </Link>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-border px-4 py-2 text-center text-sm font-medium text-fg"
                >
                  {t("login")}
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-fg"
                >
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
