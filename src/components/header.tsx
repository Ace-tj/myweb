"use client";

import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import type { Profile } from "@/lib/types";

const NAV: {
  href: string;
  key: "demos" | "services" | "pricing" | "about" | "contact";
}[] = [
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const accountHref =
    profile?.role === "admin"
      ? "/admin/dashboard"
      : profile?.role === "consultant"
        ? "/consultant/inbox"
        : "/account";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-bg/75 backdrop-blur-xl"
          : "border-b border-transparent bg-bg/30 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Wordmark — editorial serif + tiny dot accent */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
        >
          <span
            aria-hidden
            className="size-2 rounded-full bg-primary transition group-hover:scale-150"
          />
          <span className="text-fg">{tBrand("name")}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-sm transition-colors ${
                  active
                    ? "text-fg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {t(n.key)}
                <span
                  aria-hidden
                  className={`absolute -bottom-px left-0 right-0 h-px origin-left transition-transform duration-300 ${
                    active ? "scale-x-100 bg-primary" : "scale-x-0 bg-fg/30 group-hover:scale-x-100"
                  }`}
                />
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
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition hover:bg-fg/85"
            >
              {t(
                profile.role === "admin"
                  ? "admin"
                  : profile.role === "consultant"
                    ? "consultant"
                    : "account",
              )}
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="rounded-full px-3 py-2 text-sm font-medium text-fg transition hover:text-primary"
              >
                {t("login")}
              </Link>
              <Link
                href="/auth/signup"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-fg shadow-sm transition hover:bg-primary-hover"
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
          aria-expanded={open}
          className="grid size-9 place-items-center rounded-lg border border-border bg-surface text-fg transition hover:bg-surface-2 lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute inset-x-0 top-16 z-50 border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-6">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-display text-xl text-fg transition hover:bg-surface-2"
              >
                {t(n.key)}
              </Link>
            ))}
            <div className="my-4 h-px bg-border" />
            <div className="flex items-center gap-2 px-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-4 space-y-2">
              {profile ? (
                <Link
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-fg px-4 py-3 text-center text-sm font-medium text-bg"
                >
                  {t(
                    profile.role === "admin"
                      ? "admin"
                      : profile.role === "consultant"
                        ? "consultant"
                        : "account",
                  )}
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="block rounded-full border border-border px-4 py-3 text-center text-sm font-medium text-fg"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-primary-fg"
                  >
                    {t("signup")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
