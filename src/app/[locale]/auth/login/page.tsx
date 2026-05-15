"use client";

import { useActionState, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { loginAction, type LoginState } from "./actions";
import { Zap, Eye, EyeOff, ArrowRight } from "lucide-react";

const initialState: LoginState = { status: "idle" };

const ERROR_MESSAGES: Record<string, string> = {
  emailInvalid: "Please enter a valid email address.",
  emailRequired: "Email is required.",
  passwordShort: "Password must be at least 8 characters.",
  passwordRequired: "Password is required.",
  invalid: "Incorrect email or password.",
  notApproved: "Your consultant account is pending admin approval.",
  generic: "Something went wrong. Please try again.",
};

export default function LoginPage() {
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(var(--bg))" }}>
      {/* Navbar */}
      <header className="border-b sticky top-0 z-20 backdrop-blur-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
        <div className="mx-auto max-w-6xl px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-base font-bold" style={{ color: "rgb(var(--text))" }}>MyWeb</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border p-8 shadow-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Zap size={22} className="text-white" fill="white" />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Welcome back</h1>
              <p className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>Sign in to your account to continue</p>
            </div>

            <form action={formAction} className="space-y-5">
              <input type="hidden" name="locale" value={locale} />

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium" style={{ color: "rgb(var(--text))" }}>Password</label>
                  <a href="#" className="text-xs font-medium text-indigo-500 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded-xl border px-4 py-2.5 pr-11 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgb(var(--text-muted))" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {state.status === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400">
                  {ERROR_MESSAGES[state.errorKey] ?? ERROR_MESSAGES.generic}
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Signing in…" : <><span>Sign In</span><ArrowRight size={15} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-semibold text-indigo-600 hover:underline">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Trust note */}
          <p className="text-center text-xs mt-4" style={{ color: "rgb(var(--text-subtle))" }}>
            Secure login · No spam · Your data stays private
          </p>
        </div>
      </main>
    </div>
  );
}
