"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

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
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <h1 className="text-2xl font-bold tracking-tight">{t("auth.login.title")}</h1>
          <p className="mt-1 text-sm text-neutral-500">{t("auth.login.subtitle")}</p>

          {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
            <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
              {t("auth.login.demoBanner")}
            </div>
          )}

          <form action={formAction} className="mt-6 space-y-4">
            <input type="hidden" name="locale" value={locale} />

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

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">{t("common.password")}</Label>
                <a
                  href="#"
                  className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline"
                >
                  {t("common.forgotPassword")}
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>

            {state.status === "error" && (
              <p className="text-sm text-red-600 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                {t(`auth.login.errors.${state.errorKey}`)}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? t("auth.login.submitting") : t("auth.login.submit")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            {t("auth.login.noAccount")}{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-neutral-900 hover:underline"
            >
              {t("auth.login.signUpLink")}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
