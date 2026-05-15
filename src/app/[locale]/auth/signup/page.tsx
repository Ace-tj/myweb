"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { signupAction, type SignupState } from "./actions";

const initialState: SignupState = { status: "idle" };

export default function SignupPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [role, setRole] = useState<"buyer" | "consultant">("buyer");
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Top bar */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Centered card */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h1 className="text-2xl font-bold tracking-tight">{t("auth.signup.title")}</h1>
          <p className="mt-1 text-sm text-neutral-500">{t("auth.signup.subtitle")}</p>

          <form action={formAction} className="mt-6 space-y-5">
            <input type="hidden" name="locale" value={locale} />
            <input type="hidden" name="role" value={role} />

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`rounded-xl border-2 p-4 text-left transition-colors ${
                  role === "buyer"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <div className="text-lg mb-1">🛒</div>
                <p className="font-semibold text-sm">{t("auth.signup.roleBuyer")}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{t("auth.signup.roleBuyerDesc")}</p>
              </button>
              <button
                type="button"
                onClick={() => setRole("consultant")}
                className={`rounded-xl border-2 p-4 text-left transition-colors ${
                  role === "consultant"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-400"
                }`}
              >
                <div className="text-lg mb-1">💼</div>
                <p className="font-semibold text-sm">{t("auth.signup.roleConsultant")}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{t("auth.signup.roleConsultantDesc")}</p>
              </button>
            </div>

            {/* Full name */}
            <div className="space-y-1.5">
              <Label htmlFor="name">{t("auth.signup.nameLabel")}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder={t("auth.signup.nameLabel")}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">{t("common.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password">{t("common.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>

            {/* Consultant note */}
            {role === "consultant" && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                {t("auth.signup.consultantNote")}
              </p>
            )}

            {/* Error */}
            {state.status === "error" && (
              <p className="text-sm text-red-600 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                {t(`auth.signup.errors.${state.errorKey}`)}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? t("auth.signup.submitting") : t("auth.signup.submit")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            {t("auth.signup.haveAccount")}{" "}
            <Link
              href="/auth/login"
              className="font-medium text-neutral-900 hover:underline"
            >
              {t("auth.signup.signInLink")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
