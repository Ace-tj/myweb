"use client";

import { useTranslations } from "next-intl";
import { Menu, X, Sparkles } from "lucide-react";
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "blur-header border-b border-border/70 py-1" : "py-2"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <span
            aria-hidden
            className="grad-ember relative grid size-10 place-items-center rounded-xl shadow-[0_8px_20px_-6px_rgb(224_78_44_/_0.5)] transition group-hover:scale-105"
          >
            <Sparkles className="size-5 text-white" />
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl anim-pulse-ring"
            />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-fg">
            {tBrand("name")}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-surface-2 text-fg"
                    : "text-muted hover:bg-surface hover:text-fg"
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
            <Link href={accountHref} className="btn-primary ml-1">
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
                className="rounded-full px-4 py-2 text-sm font-semibold text-fg transition hover:text-primary"
              >
                {t("login")}
              </Link>
              <Link href="/auth/signup" className="btn-primary ml-1">
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
          className="grid size-10 place-items-center rounded-xl border border-border-strong bg-surface text-fg transition hover:bg-surface-2 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border blur-header anim-fade-down lg:hidden">
          <div className="mx-auto max-w-[1400px] space-y-1 p-5">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-display text-xl font-bold text-fg transition hover:bg-surface"
              >
                {t(n.key)}
              </Link>
            ))}
            <div className="my-4 flex items-center gap-2 px-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="space-y-2">
              {profile ? (
                <Link
                  href={accountHref}
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
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
                    className="btn-ghost w-full"
                  >
                    {t("login")}
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
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
