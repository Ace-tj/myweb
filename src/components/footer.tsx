import { Mail, MessageSquare, Send, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-5 lg:py-20">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight"
            >
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              {tBrand("name")}
            </Link>
            <p className="mt-4 max-w-sm text-pretty text-muted">{t("tagline")}</p>

            <form className="mt-8 max-w-sm">
              <label className="editorial-eyebrow block mb-2">{t("newsletter")}</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletter")}
                  className="min-w-0 flex-1 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-subtle transition focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg transition hover:bg-fg/85"
                >
                  {t("newsletterCta")}
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="editorial-eyebrow">{t("product")}</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/demos" className="text-muted transition hover:text-fg">
                  {tNav("demos")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted transition hover:text-fg">
                  {tNav("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted transition hover:text-fg">
                  {tNav("services")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="editorial-eyebrow">{t("company")}</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted transition hover:text-fg">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted transition hover:text-fg">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="editorial-eyebrow">{t("social")}</div>
            <ul className="mt-4 flex items-center gap-3 text-muted">
              <li>
                <a href="#" aria-label={t("socialAria.code")} className="grid size-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary">
                  <Link2 className="size-4" />
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("socialAria.updates")} className="grid size-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary">
                  <Send className="size-4" />
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("socialAria.network")} className="grid size-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary">
                  <MessageSquare className="size-4" />
                </a>
              </li>
              <li>
                <a href="mailto:hello@pixelforge.dev" aria-label={t("socialAria.email")} className="grid size-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary">
                  <Mail className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted sm:flex-row sm:items-center">
            <p>
              © {year} {tBrand("name")}. {t("rights")}
            </p>
            <div className="flex gap-5">
              <Link href="/legal/privacy" className="transition hover:text-fg">
                {t("privacy")}
              </Link>
              <Link href="/legal/terms" className="transition hover:text-fg">
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
