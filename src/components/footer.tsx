import { Mail, MessageSquare, Send, Link2, Sparkles, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Newsletter card — gradient panel */}
        <div className="-mt-12 mb-16">
          <div className="grad-ember relative overflow-hidden rounded-3xl p-8 sm:p-12 shadow-pop">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/15 blur-3xl anim-float"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-white/10 blur-3xl"
              style={{ animation: "float 5s ease-in-out infinite", animationDelay: "1.5s" }}
            />
            <div className="relative grid gap-6 sm:grid-cols-2 sm:items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest backdrop-blur">
                  <Sparkles className="size-3.5" />
                  {t("newsletter")}
                </div>
                <h3 className="mt-4 font-display text-3xl font-extrabold leading-[1] sm:text-4xl">
                  {tBrand("tagline")}
                </h3>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletter")}
                  className="min-w-0 flex-1 rounded-2xl border-0 bg-white/15 px-5 py-3.5 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur transition focus:bg-white/25"
                />
                <button
                  type="submit"
                  className="press inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-primary shadow-[0_8px_24px_-4px_rgba(0,0,0,0.2)] transition hover:shadow-[0_14px_32px_-4px_rgba(0,0,0,0.25)]"
                >
                  {t("newsletterCta")} <ArrowRight className="size-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 pb-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="grad-ember grid size-10 place-items-center rounded-xl shadow-[0_8px_20px_-6px_rgb(224_78_44_/_0.5)]"
              >
                <Sparkles className="size-5 text-white" />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight">
                {tBrand("name")}
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-muted">{t("tagline")}</p>
          </div>

          <div>
            <div className="eyebrow">{t("product")}</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/demos" className="text-muted transition hover:text-primary">{tNav("demos")}</Link></li>
              <li><Link href="/pricing" className="text-muted transition hover:text-primary">{tNav("pricing")}</Link></li>
              <li><Link href="/services" className="text-muted transition hover:text-primary">{tNav("services")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow">{t("company")}</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link href="/about" className="text-muted transition hover:text-primary">{tNav("about")}</Link></li>
              <li><Link href="/contact" className="text-muted transition hover:text-primary">{tNav("contact")}</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow">{t("social")}</div>
            <ul className="mt-5 flex items-center gap-2 text-muted">
              <li><a href="#" aria-label={t("socialAria.code")} className="grid size-10 place-items-center rounded-xl border border-border bg-surface transition hover:border-primary hover:text-primary lift"><Link2 className="size-4" /></a></li>
              <li><a href="#" aria-label={t("socialAria.updates")} className="grid size-10 place-items-center rounded-xl border border-border bg-surface transition hover:border-primary hover:text-primary lift"><Send className="size-4" /></a></li>
              <li><a href="#" aria-label={t("socialAria.network")} className="grid size-10 place-items-center rounded-xl border border-border bg-surface transition hover:border-primary hover:text-primary lift"><MessageSquare className="size-4" /></a></li>
              <li><a href="mailto:hello@pixelforge.dev" aria-label={t("socialAria.email")} className="grid size-10 place-items-center rounded-xl border border-border bg-surface transition hover:border-primary hover:text-primary lift"><Mail className="size-4" /></a></li>
            </ul>
          </div>
        </div>

        {/* Massive gradient watermark */}
        <div className="border-t border-border py-10">
          <div className="grad-text-ember select-none font-display text-[22vw] font-extrabold leading-none tracking-tighter opacity-60">
            {tBrand("name")}
          </div>
        </div>

        <div className="border-t border-border py-6">
          <div className="flex flex-col items-start justify-between gap-2 text-xs text-muted sm:flex-row sm:items-center">
            <p>© {year} {tBrand("name")}. {t("rights")}</p>
            <div className="flex gap-5">
              <Link href="/legal/privacy" className="transition hover:text-fg">{t("privacy")}</Link>
              <Link href="/legal/terms" className="transition hover:text-fg">{t("terms")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
