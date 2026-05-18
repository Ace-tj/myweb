import { Sparkles, Mail, MessageSquare, Send, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tBrand = useTranslations("brand");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-16">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-display text-base font-bold">
            <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-fg">
              <Sparkles className="size-4" />
            </span>
            {tBrand("name")}
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{t("tagline")}</p>
          <form className="mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              required
              placeholder="you@company.com"
              aria-label={t("newsletter")}
              className="min-w-0 flex-1 rounded-full border border-border bg-bg px-4 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
            >
              {t("newsletterCta")}
            </button>
          </form>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg">{t("product")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/demos" className="hover:text-fg">{tNav("demos")}</Link></li>
            <li><Link href="/pricing" className="hover:text-fg">{tNav("pricing")}</Link></li>
            <li><Link href="/services" className="hover:text-fg">{tNav("services")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg">{t("company")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-fg">{tNav("about")}</Link></li>
            <li><Link href="/contact" className="hover:text-fg">{tNav("contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-fg">{t("social")}</h4>
          <ul className="mt-3 flex items-center gap-3 text-muted">
            <li><a href="#" aria-label="Code" className="hover:text-fg"><Link2 className="size-5" /></a></li>
            <li><a href="#" aria-label="Updates" className="hover:text-fg"><Send className="size-5" /></a></li>
            <li><a href="#" aria-label="Network" className="hover:text-fg"><MessageSquare className="size-5" /></a></li>
            <li><a href="mailto:hello@pixelforge.dev" aria-label="Email" className="hover:text-fg"><Mail className="size-5" /></a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p>© {year} {tBrand("name")}. {t("rights")}</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-fg">{t("privacy")}</Link>
            <Link href="/legal/terms" className="hover:text-fg">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
