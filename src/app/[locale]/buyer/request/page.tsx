import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { RequestForm } from "./RequestForm";

export const dynamic = "force-dynamic";

export default async function BuyerRequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ demo?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login`);
  if (session.role !== "buyer" && session.role !== "admin") {
    redirect(`/${locale}/consultant/dashboard`);
  }

  const { demo } = await searchParams;
  return <RequestForm initialDemo={demo ?? null} />;
}
