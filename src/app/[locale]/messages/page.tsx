import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { getMyThread } from "@/lib/support";
import { MessagesClient } from "./MessagesClient";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await getCurrentSession();
  if (!session) redirect(`/${locale}/auth/login?from=/${locale}/messages`);

  // Admin gets routed to the multi-thread support inbox instead
  if (session.role === "admin") redirect(`/${locale}/admin/support`);

  const result = await getMyThread();

  return (
    <MessagesClient
      initialState={result.ok ? { thread: result.thread, messages: result.messages } : null}
      reason={result.ok ? null : result.reason}
      session={{ name: session.name, role: session.role }}
    />
  );
}
