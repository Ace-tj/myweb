"use client";

import { Suspense, useActionState, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AuthAside } from "@/components/auth/AuthAside";
import { signupAction, type SignupState } from "./actions";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  Briefcase,
  Check,
  AlertCircle,
  Sparkles,
  Info,
} from "lucide-react";

type SignupErrorKey =
  | "emailRequired"
  | "emailInvalid"
  | "emailTaken"
  | "passwordShort"
  | "nameRequired"
  | "roleRequired"
  | "generic";

type StrengthLabel = "weak" | "fair" | "good" | "strong";

function calcStrength(pwd: string): { score: 0 | 1 | 2 | 3 | 4; label: StrengthLabel } {
  let s = 0;
  if (pwd.length >= 8) s++;
  if (pwd.length >= 12) s++;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  const score = Math.min(4, s) as 0 | 1 | 2 | 3 | 4;
  const label: StrengthLabel =
    score <= 1 ? "weak" : score === 2 ? "fair" : score === 3 ? "good" : "strong";
  return { score, label };
}

const initialState: SignupState = { status: "idle" };

export function SignupPageClient() {
  return (
    <Suspense fallback={<AuthShellSkeleton />}>
      <SignupContent />
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
            <div className="h-20 w-full rounded-xl shimmer" />
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

function SignupContent() {
  const locale = useLocale();
  const t = useTranslations("auth");
  const params = useSearchParams();
  const demoSlug = params.get("demo");

  const [role, setRole] = useState<"buyer" | "consultant">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const strength = useMemo(() => calcStrength(password), [password]);

  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  const errorKey =
    state.status === "error" ? (state.errorKey as SignupErrorKey) : null;
  const errorMessage = errorKey ? t(`signup.errors.${errorKey}`) : null;

  const nameInvalid = errorKey === "nameRequired";
  const emailInvalid =
    errorKey === "emailRequired" ||
    errorKey === "emailInvalid" ||
    errorKey === "emailTaken";
  const passwordInvalid = errorKey === "passwordShort";

  const roleOptions = [
    {
      value: "buyer" as const,
      Icon: ShoppingBag,
      label: t("signup.roleBuyer"),
      desc: t("signup.roleBuyerDesc"),
    },
    {
      value: "consultant" as const,
      Icon: Briefcase,
      label: t("signup.roleConsultant"),
      desc: t("signup.roleConsultantDesc"),
    },
  ];

  const strengthColor = (i: number) => {
    if (i >= strength.score) return "bg-[rgb(var(--border))]";
    if (strength.score === 1) return "bg-red-400";
    if (strength.score === 2) return "bg-amber-400";
    if (strength.score === 3) return "bg-blue-400";
    return "bg-emerald-500";
  };

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
                {t("signup.title")}
              </h1>
              <p className="text-[rgb(var(--text-muted))]">
                {t("signup.subtitle")}
              </p>
            </div>

            {demoSlug && (
              <div
                role="status"
                className="mb-5 rounded-xl border border-[rgb(var(--accent))]/30 bg-[rgb(var(--accent-subtle))] px-4 py-3 text-sm text-[rgb(var(--accent-hover))] dark:text-[rgb(var(--accent))] flex items-start gap-2"
              >
                <Sparkles size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  {t("signup.notices.demoHint", { demo: demoSlug })}
                </span>
              </div>
            )}

            <form
              action={formAction}
              aria-busy={isPending}
              className="space-y-5"
              noValidate
            >
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="role" value={role} />
              {demoSlug && (
                <input type="hidden" name="demo" value={demoSlug} />
              )}

              {/* Role selector */}
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))] mb-2">
                  {t("signup.iWantTo")}
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {roleOptions.map((opt) => {
                    const isActive = role === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRole(opt.value)}
                        aria-pressed={isActive}
                        className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                          isActive
                            ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))]"
                            : "border-[rgb(var(--border))] hover:border-[rgb(var(--border-strong))]"
                        }`}
                      >
                        {isActive && (
                          <div
                            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[rgb(var(--accent))] flex items-center justify-center"
                            aria-hidden
                          >
                            <Check size={10} className="text-white" />
                          </div>
                        )}
                        <opt.Icon
                          size={18}
                          className={`mb-2 ${
                            isActive
                              ? "text-[rgb(var(--accent))]"
                              : "text-[rgb(var(--text-muted))]"
                          }`}
                          aria-hidden
                        />
                        <p className="font-semibold text-sm">{opt.label}</p>
                        <p className="text-xs mt-0.5 text-[rgb(var(--text-muted))] leading-snug">
                          {opt.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Name */}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={passwordInvalid || undefined}
                    aria-describedby="password-strength"
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
                <div
                  id="password-strength"
                  className="mt-2 flex items-center gap-2 min-h-[14px]"
                  aria-live="polite"
                >
                  {password.length > 0 && (
                    <>
                      <div className="flex gap-1 flex-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${strengthColor(i)}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[rgb(var(--text-muted))] tabular-nums">
                        {t(`signup.passwordStrength.${strength.label}`)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Consultant note */}
              {role === "consultant" && (
                <div
                  role="status"
                  className="rounded-xl border border-amber-300/40 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2"
                >
                  <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{t("signup.consultantNote")}</span>
                </div>
              )}

              {/* Error */}
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
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold py-3 text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isPending ? (
                  <>{t("signup.submitting")}</>
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
