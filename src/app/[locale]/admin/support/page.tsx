import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { adminListThreads } from "@/lib/support";
import { SupportClient } from "./SupportClient";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

export default async function AdminSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);
  if (session.role !== "admin") redirect(`/${locale}/buyer/dashboard`);

  const result = await adminListThreads();

  if (!result.ok) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-2">Support</h1>
        <p className="text-amber-400 text-sm">
          {result.reason === "no_db"
            ? "Supabase isn't configured. Add the environment variables to enable support chat."
            : `Error: ${result.reason}`}
        </p>
      </div>
    );
  }

  return <SupportClient initialThreads={result.threads} />;
}
