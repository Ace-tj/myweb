"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Eye, EyeOff, ArrowRight, AlertCircle, Info } from "lucide-react";

type SignupErrorKey =
  | "emailRequired"
  | "emailInvalid"
  | "emailTaken"
  | "passwordShort"
  | "nameRequired"
  | "roleRequired"
  | "generic";

const VALID_SIGNUP_ERROR_KEYS = new Set<SignupErrorKey>([
  "emailRequired",
  "emailInvalid",
  "emailTaken",
  "passwordShort",
  "nameRequired",
  "roleRequired",
  "generic",
]);

export function SignupForm() {
  const locale = useLocale();
  const t = useTranslations("auth");
  const params = useSearchParams();
  const errorParam = params.get("error");

  const [role, setSelectedRole] = useState<"buyer" | "consultant">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const errorKey: SignupErrorKey | null =
    errorParam && VALID_SIGNUP_ERROR_KEYS.has(errorParam as SignupErrorKey)
      ? (errorParam as SignupErrorKey)
      : null;
  const errorMessage = errorKey ? t(`signup.errors.${errorKey}`) : null;
  const nameInvalid = errorKey === "nameRequired";
  const emailInvalid =
    errorKey === "emailRequired" ||
    errorKey === "emailInvalid" ||
    errorKey === "emailTaken";
  const passwordInvalid = errorKey === "passwordShort";

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
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

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-7 sm:p-8 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              {t("signup.title")}
            </h1>
            <p className="text-sm text-[rgb(var(--text-muted))] mb-6">
              {t("signup.subtitle")}
            </p>

            <form
              action="/api/auth/signup"
              method="post"
              aria-busy={isPending}
              onSubmit={() => setIsPending(true)}
              className="space-y-4"
              noValidate
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="role" value={role} />

              {/* Role: simple segmented control */}
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))] mb-2">
                  {t("signup.iWantTo")}
                </legend>
                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-hover))]">
                  {(["buyer", "consultant"] as const).map((opt) => {
                    const isActive = role === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setSelectedRole(opt)}
                        aria-pressed={isActive}
                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? "bg-[rgb(var(--bg-card))] text-[rgb(var(--text))] shadow-sm"
                            : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]"
                        }`}
                      >
                        {opt === "buyer"
                          ? t("signup.roleBuyer")
                          : t("signup.roleConsultant")}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[rgb(var(--text-muted))] mt-2 leading-relaxed">
                  {role === "buyer"
                    ? t("signup.roleBuyerDesc")
                    : t("signup.roleConsultantDesc")}
                </p>
              </fieldset>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1.5"
                >
                  {t("signup.nameLabel")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder={t("shared.fullNamePlaceholder")}
                  aria-invalid={nameInvalid || undefined}
                  className={`w-full rounded-xl border bg-[rgb(var(--bg))] px-4 py-3 text-sm outline-none transition-all focus:ring-2 placeholder:text-[rgb(var(--text-subtle))] ${
                    nameInvalid
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[rgb(var(--border))] focus:border-[rgb(var(--accent))] focus:ring-[rgb(var(--accent))]/20"
                  }`}
                />
              </div>

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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1.5"
                >
                  {t("shared.passwordLabel")}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder={t("signup.passwordHint")}
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] transition-colors p-1 rounded-md"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {role === "consultant" && (
                <div
                  role="status"
                  className="rounded-xl border border-amber-300/40 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2"
                >
                  <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{t("signup.consultantNote")}</span>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-red-300/40 bg-red-50 dark:bg-red-950/30 dark:border-red-800/30 px-4 py-3 text-sm text-red-700 dark:text-red-300 flex items-start gap-2"
                >
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0"
                    aria-hidden
                  />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold py-3 text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isPending ? (
                  t("signup.submitting")
                ) : (
                  <>
                    {t("signup.submit")} <ArrowRight size={15} aria-hidden />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[rgb(var(--text-muted))]">
              {t("signup.haveAccount")}{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[rgb(var(--accent))] hover:underline"
              >
                {t("signup.signInLink")}
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-[rgb(var(--text-subtle))]">
            {t("shared.trustNote")}
          </p>
        </div>
      </main>
    </div>
  );
}
