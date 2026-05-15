"use client";

import { useActionState, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { signupAction, type SignupState } from "./actions";
import { Zap, ShoppingBag, Briefcase, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

const initialState: SignupState = { status: "idle" };

const ERROR_MESSAGES: Record<string, string> = {
  emailInvalid: "Please enter a valid email address.",
  emailRequired: "Email is required.",
  emailTaken: "An account with this email already exists.",
  passwordShort: "Password must be at least 8 characters.",
  nameRequired: "Full name is required.",
  roleRequired: "Please select a role.",
  generic: "Something went wrong. Please try again.",
};

export default function SignupPage() {
  const locale = useLocale();
  const [role, setRole] = useState<"buyer" | "consultant">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signupAction, initialState);

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
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="rounded-2xl border p-8 shadow-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Zap size={22} className="text-white" fill="white" />
              </div>
              <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Create your account</h1>
              <p className="text-sm mt-1" style={{ color: "rgb(var(--text-muted))" }}>No verification needed — get started instantly</p>
            </div>

            <form action={formAction} className="space-y-5">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="role" value={role} />

              {/* Role selector */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "rgb(var(--text-muted))" }}>I want to</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "buyer" as const, icon: <ShoppingBag size={18} />, label: "Buy a System", desc: "I need a web system built" },
                    { value: "consultant" as const, icon: <Briefcase size={18} />, label: "Build Systems", desc: "I'm a developer / agency" },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={`relative rounded-xl border-2 p-4 text-left transition-all ${role === opt.value ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" : "border-[rgb(var(--border))] hover:border-[rgb(var(--border-strong))]"}`}
                    >
                      {role === opt.value && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </div>
                      )}
                      <div className={`mb-2 ${role === opt.value ? "text-indigo-600" : ""}`} style={{ color: role === opt.value ? undefined : "rgb(var(--text-muted))" }}>
                        {opt.icon}
                      </div>
                      <p className="font-semibold text-sm" style={{ color: "rgb(var(--text))" }}>{opt.label}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgb(var(--text-muted))" }}>{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Full name */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Full Name</label>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
                />
              </div>

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
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Min. 8 characters"
                    className="w-full rounded-xl border px-4 py-2.5 pr-11 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    style={{ background: "rgb(var(--bg))", borderColor: "rgb(var(--border))", color: "rgb(var(--text))" }}
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "rgb(var(--text-muted))" }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Consultant note */}
              {role === "consultant" && (
                <div className="rounded-xl border px-4 py-3 text-sm" style={{ background: "rgb(var(--accent-subtle))", borderColor: "rgb(var(--accent))", color: "rgb(var(--accent))" }}>
                  Your account will need admin approval before you can accept projects.
                </div>
              )}

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
                {isPending ? "Creating account…" : <><span>Create Account</span><ArrowRight size={15} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm" style={{ color: "rgb(var(--text-muted))" }}>
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Trust note */}
          <p className="text-center text-xs mt-4" style={{ color: "rgb(var(--text-subtle))" }}>
            No spam. No credit card. No email verification required.
          </p>
        </div>
      </main>
    </div>
  );
}
