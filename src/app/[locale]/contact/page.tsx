import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./contact-form";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <div className="editorial-eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-primary" />
            {t("title")}
          </div>
          <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-fg sm:text-6xl">
            {t("title")}
          </h1>
        </div>
        <p className="text-pretty text-lg leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
          {t("lede")}
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <aside className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface/60 p-7">
            <div className="editorial-eyebrow">{t("directTitle")}</div>
            <ul className="mt-5 space-y-4 text-sm text-fg">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a href="mailto:hello@pixelforge.dev" className="hover:text-primary">
                  hello@pixelforge.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a href="tel:+992900112233" className="hover:text-primary">
                  +992 90 011 22 33
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <MapPin className="size-4 text-primary" />
                {t("location")}
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock className="size-4 text-primary" />
                {t("hours")}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-bg p-7">
            <div className="editorial-eyebrow">{t("hurryTitle")}</div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("hurryBody")}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
