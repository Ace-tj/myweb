import { Mail, MessageSquare, Send, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-bg">
      {/* Top spec bar */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted sm:px-6 lg:px-8">
          <span>v0.1.0 / build live</span>
          <span className="hidden sm:inline">Dushanbe · GMT+5</span>
          <span className="text-primary">● online</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 py-20 lg:grid-cols-5 lg:py-28">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-lg font-bold uppercase tracking-tight"
            >
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-sm bg-primary text-primary-fg"
              >
                <span className="block size-2.5 rounded-[1px] bg-primary-fg" />
              </span>
              {tBrand("name")}
            </Link>
            <p className="mt-5 max-w-sm text-pretty text-muted">{t("tagline")}</p>

            <form className="mt-10 max-w-sm">
              <label className="spec-line block mb-2">{t("newsletter")}</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletter")}
                  className="min-w-0 flex-1 rounded-sm border border-border-strong bg-bg px-4 py-2.5 font-mono text-xs text-fg placeholder:text-subtle transition focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-sm bg-primary px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover"
                >
                  {t("newsletterCta")}
                </button>
              </div>
            </form>
          </div>

          <div>
            <div className="spec-line">{t("product")}</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/demos" className="text-muted transition hover:text-primary">
                  {tNav("demos")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted transition hover:text-primary">
                  {tNav("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted transition hover:text-primary">
                  {tNav("services")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="spec-line">{t("company")}</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted transition hover:text-primary">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted transition hover:text-primary">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="spec-line">{t("social")}</div>
            <ul className="mt-5 flex items-center gap-2 text-muted">
              <li>
                <a href="#" aria-label={t("socialAria.code")} className="grid size-9 place-items-center rounded-sm border border-border-strong transition hover:border-primary hover:text-primary">
                  <Link2 className="size-4" />
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("socialAria.updates")} className="grid size-9 place-items-center rounded-sm border border-border-strong transition hover:border-primary hover:text-primary">
                  <Send className="size-4" />
                </a>
              </li>
              <li>
                <a href="#" aria-label={t("socialAria.network")} className="grid size-9 place-items-center rounded-sm border border-border-strong transition hover:border-primary hover:text-primary">
                  <MessageSquare className="size-4" />
                </a>
              </li>
              <li>
                <a href="mailto:hello@pixelforge.dev" aria-label={t("socialAria.email")} className="grid size-9 place-items-center rounded-sm border border-border-strong transition hover:border-primary hover:text-primary">
                  <Mail className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive wordmark */}
        <div className="-mx-2 border-t border-border py-12">
          <div className="select-none font-display text-[18vw] font-black uppercase leading-none tracking-tighter text-fg/[0.04]">
            {tBrand("name")}
          </div>
        </div>

        <div className="border-t border-border py-5">
          <div className="flex flex-col items-start justify-between gap-2 font-mono text-[11px] uppercase tracking-widest text-muted sm:flex-row sm:items-center">
            <p>
              © {year} {tBrand("name")} · {t("rights")}
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
