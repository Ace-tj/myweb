"use client";

import { Suspense, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AuthAside } from "@/components/auth/AuthAside";
import { loginAction, type LoginState } from "./actions";
import {
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Info,
} from "lucide-react";

const initialState: LoginState = { status: "idle" };
type LoginErrorKey =
  | "invalid"
  | "notApproved"
  | "generic"
  | "emailRequired"
  | "emailInvalid"
  | "passwordRequired"
  | "passwordShort";

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <LoginContent />
    </Suspense>
  );
}

function AuthShellSkeleton() {
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))]">
      <header className="border-b border-[rgb(var(--border))] h-[57px]" />
      <main className="flex-1 grid md:grid-cols-2">
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-5">
            <div className="h-8 w-2/3 rounded-md shimmer" />
            <div className="h-4 w-1/2 rounded-md shimmer" />
            <div className="h-11 w-full rounded-xl shimmer" />
            <div className="h-11 w-full rounded-xl shimmer" />
            <div className="h-11 w-full rounded-xl shimmer" />
          </div>
        </section>
        <aside className="hidden md:block bg-[rgb(var(--bg-subtle))]" />
      </main>
    </div>
  );
}

function LoginContent() {
  const locale = useLocale();
  const t = useTranslations("auth");
  const params = useSearchParams();
  const fromParam = params.get("from") ?? "";
  const pending = params.get("pending") === "1";
  const registered = params.get("registered") === "1";
  const hasFromBanner = Boolean(fromParam) && !pending && !registered;

  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  const errorKey =
    state.status === "error" ? (state.errorKey as LoginErrorKey) : null;
  const errorMessage = errorKey ? t(`login.errors.${errorKey}`) : null;

  const emailInvalid =
    errorKey === "emailRequired" || errorKey === "emailInvalid";
  const passwordInvalid =
    errorKey === "passwordRequired" || errorKey === "passwordShort";

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center font-extrabold text-xl tracking-tight"
            aria-label="myweb home"
          >
            <span className="gradient-text">myweb</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 grid md:grid-cols-2">
        {/* LEFT — form column */}
        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md animate-fade-up">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                {t("login.title")}
              </h1>
              <p className="text-[rgb(var(--text-muted))]">{t("login.subtitle")}</p>
            </div>

            {/* Banners */}
            {pending && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-amber-300/40 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2"
              >
                <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{t("login.notices.pending")}</span>
              </div>
            )}
            {registered && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-emerald-300/40 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-700/30 px-4 py-3 text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-2"
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{t("login.notices.registered")}</span>
              </div>
            )}
            {hasFromBanner && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent-subtle))] px-4 py-3 text-sm text-[rgb(var(--accent-hover))] dark:text-[rgb(var(--accent))] flex items-start gap-2"
              >
                <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{t("login.notices.from")}</span>
              </div>
            )}

            <form
              action={formAction}
              aria-busy={isPending}
              className="space-y-5"
              noValidate
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="from" value={fromParam} />

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                >
                  {t("shared.emailLabel")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  aria-invalid={emailInvalid || undefined}
                  className={`w-full rounded-xl border bg-[rgb(var(--bg))] px-4 py-3 text-sm outline-none transition-all focus:ring-2 placeholder:text-[rgb(var(--text-subtle))] ${
                    emailInvalid
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-[rgb(var(--accent))]/20"
                  }`}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-medium">
                    {t("shared.passwordLabel")}
                  </label>
                  <Link
                    href={"/auth/forgot-password" as "/"}
                    className="text-xs font-medium text-[rgb(var(--accent))] hover:underline"
                  >
                    {t("login.forgotPassword")}
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    aria-invalid={passwordInvalid || undefined}
                    className={`w-full rounded-xl border bg-[rgb(var(--bg))] px-4 py-3 pr-11 text-sm outline-none transition-all focus:ring-2 placeholder:text-[rgb(var(--text-subtle))] ${
                      passwordInvalid
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                        : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-[rgb(var(--accent))]/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword
                        ? t("shared.hidePassword")
                        : t("shared.showPassword")
                    }
                    aria-pressed={showPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors p-1 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-[rgb(var(--accent))]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {errorMessage && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-red-300/40 bg-red-50 dark:bg-red-950/30 dark:border-red-800/30 px-4 py-3 text-sm text-red-700 dark:text-red-300 flex items-start gap-2"
                >
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold py-3 text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isPending ? (
                  <>{t("login.submitting")}</>
                ) : (
                  <>
                    {t("login.submit")} <ArrowRight size={15} aria-hidden />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[rgb(var(--text-muted))]">
              {t("login.noAccount")}{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-[rgb(var(--accent))] hover:underline"
              >
                {t("login.signUpLink")}
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-[rgb(var(--text-subtle))]">
              {t("shared.trustNote")}
            </p>
          </div>
        </section>

        <AuthAside />
      </main>
    </div>
  );
}
