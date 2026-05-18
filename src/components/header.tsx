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
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-bg/90 backdrop-blur-xl"
          : "border-transparent bg-bg/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brutalist square wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-tight"
        >
          <span
            aria-hidden
            className="grid size-6 place-items-center rounded-sm bg-primary text-primary-fg transition group-hover:rotate-90"
          >
            <span className="block size-2 rounded-[1px] bg-primary-fg" />
          </span>
          <span className="text-fg">{tBrand("name")}</span>
        </Link>

        {/* Desktop nav — mono */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`relative inline-flex items-center gap-2 rounded-sm px-3 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                  active
                    ? "text-fg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {active && (
                  <span aria-hidden className="size-1 rounded-full bg-primary" />
                )}
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
              className="ml-1 inline-flex items-center gap-2 rounded-sm bg-fg px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-bg transition hover:bg-muted"
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
                className="rounded-sm px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-muted transition hover:text-fg"
              >
                {t("login")}
              </Link>
              <Link
                href="/auth/signup"
                className="ml-1 inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_24px_rgb(197_255_63_/_0.35)]"
              >
                {t("signup")} <span aria-hidden>→</span>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
          aria-expanded={open}
          className="grid size-9 place-items-center rounded-sm border border-border-strong bg-surface text-fg transition hover:bg-surface-2 lg:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="absolute inset-x-0 top-14 z-50 border-y border-border bg-bg/97 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-[1400px] space-y-1 px-4 py-6">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-sm border-b border-border px-3 py-4 font-display text-2xl font-bold uppercase text-fg transition hover:bg-surface"
              >
                {t(n.key)}
                <span aria-hidden className="font-mono text-xs text-muted">
                  →
                </span>
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-2 px-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-4 space-y-2">
              {profile ? (
                <Link
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm bg-fg px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-bg"
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
                    className="block rounded-sm border border-border-strong px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-fg"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="block rounded-sm bg-primary px-4 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest text-primary-fg"
                  >
                    {t("signup")} →
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
