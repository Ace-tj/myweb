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

  // Admin gets routed to the multi-thread support inbox instead.
  if (session?.role === "admin") redirect(`/${locale}/admin/support`);

  // For everyone else (signed in OR anonymous) we render the chat page —
  // anonymous visitors see a friendly "sign in to chat" panel via the
  // client, signed-in users see their thread. Never bounce to /auth/login.
  const result = session
    ? await getMyThread()
    : ({ ok: false, reason: "anon" } as const);

  return (
    <MessagesClient
      initialState={result.ok ? { thread: result.thread, messages: result.messages } : null}
      reason={result.ok ? null : result.reason}
      session={session ? { name: session.name, role: session.role } : null}
    />
  );
}
