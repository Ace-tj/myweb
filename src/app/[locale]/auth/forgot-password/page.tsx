import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
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
        <div className="w-full max-w-md animate-fade-up text-center">
          <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-[rgb(var(--accent-subtle))] flex items-center justify-center">
            <KeyRound size={24} className="text-[rgb(var(--accent))]" aria-hidden />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            Reset your password
          </h1>
          <p className="text-[rgb(var(--text-muted))] mb-8 leading-relaxed">
            Password reset over email isn&apos;t wired up here yet. Send us a
            message and we&apos;ll reset it for you within a few minutes.
          </p>

          <a
            href="mailto:hello@myweb.app?subject=Password%20reset%20request"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 hover:scale-[1.02]"
          >
            <Mail size={15} aria-hidden /> Email support
          </a>

          <Link
            href="/auth/login"
            className="mt-3 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] font-semibold text-sm hover:bg-[rgb(var(--bg-hover))] transition-colors"
          >
            <ArrowLeft size={15} aria-hidden /> Back to sign in
          </Link>

          <p className="mt-8 text-xs text-[rgb(var(--text-subtle))]">
            We typically reply within a few minutes during working hours.
          </p>
        </div>
      </main>
    </div>
  );
}
