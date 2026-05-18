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
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <section className="relative my-8 overflow-hidden rounded-3xl">
        <div className="grad-ember relative px-8 py-16 text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-white/15 blur-3xl anim-float" />
          <div className="relative grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 font-mono text-xs uppercase tracking-widest backdrop-blur">
                {t("title")}
              </div>
              <h1 className="mt-5 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
                {t("title")}
              </h1>
            </div>
            <p className="text-pretty text-lg leading-relaxed text-white/90 lg:col-span-4">
              {t("lede")}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <aside className="space-y-5 lg:col-span-2">
            <div className="card p-7">
              <div className="eyebrow">{t("directTitle")}</div>
              <ul className="mt-5 space-y-4 text-sm text-fg">
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Mail className="size-4" />
                  </span>
                  <a href="mailto:hello@pixelforge.dev" className="hover:text-primary">
                    hello@pixelforge.dev
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Phone className="size-4" />
                  </span>
                  <a href="tel:+992900112233" className="hover:text-primary">
                    +992 90 011 22 33
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  {t("location")}
                </li>
                <li className="flex items-center gap-3 text-muted">
                  <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Clock className="size-4" />
                  </span>
                  {t("hours")}
                </li>
              </ul>
            </div>

            <div className="grad-brass relative overflow-hidden rounded-3xl p-7 text-white">
              <div className="eyebrow text-white/80" style={{ color: "rgba(255,255,255,0.85)" }}>
                {t("hurryTitle")}
              </div>
              <p className="mt-3 text-sm leading-relaxed">{t("hurryBody")}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
