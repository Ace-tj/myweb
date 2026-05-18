import { setRequestLocale } from "next-intl/server";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./contact-form";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">
          Tell us what you need
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">
          One reply within an hour, even on weekends. No sales funnels.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <aside className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-fg">Direct lines</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a href="mailto:hello@pixelforge.dev" className="hover:text-fg">
                  hello@pixelforge.dev
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" />
                <a href="tel:+992900112233" className="hover:text-fg">
                  +992 90 011 22 33
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" />
                Dushanbe, Tajikistan
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4 text-primary" />
                Mon–Fri, 09:00–19:00 (GMT+5)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-display text-lg font-bold text-fg">In a hurry?</h2>
            <p className="mt-2 text-sm text-muted">
              Sign up and open the chat widget in the bottom right of any page
              — a consultant will pick up within an hour.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
