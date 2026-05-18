import "../globals.css";
import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeScript } from "@/components/theme-script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatWidgetServer } from "@/components/chat-widget-server";
import { getCurrentProfile } from "@/lib/auth";

const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const interDisplay = Inter_Tight({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brand" });
  return {
    title: { default: t("name"), template: `%s · ${t("name")}` },
    description: t("tagline"),
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();
  const profile = await getCurrentProfile();

  return (
    <html
      lang={locale}
      className={`${interTight.variable} ${interDisplay.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header profile={profile} />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidgetServer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
