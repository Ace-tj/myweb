import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { getMyThread } from "@/lib/support";
import { MessagesClient } from "./MessagesClient";

// This route depends on the per-request auth cookie. Force dynamic so
// Next.js never reuses a build-time render of the anonymous version.
export const dynamic = "force-dynamic";

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

  // Detect the "cookies say signed-in but session lookup returned null"
  // failure mode so we can render a clear diagnostic instead of silently
  // showing the anonymous panel.
  let sessionBrokenButCookiesPresent = false;
  if (!session) {
    const cookieStore = await cookies();
    const hasSbCookie = cookieStore
      .getAll()
      .some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"));
    if (hasSbCookie) sessionBrokenButCookiesPresent = true;
  }

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
      diagnostic={
        sessionBrokenButCookiesPresent
          ? "We see your auth cookie but couldn't load your session. Try refreshing this page; if that doesn't help, sign out and back in."
          : null
      }
    />
  );
}
