import { cookies } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";
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

  // ALWAYS-ON DIAGNOSTIC. Same shape as the dashboard strip so we can
  // compare what /messages saw vs what /buyer/dashboard saw.
  const cookieStore = await cookies();
  const allCookieNames = cookieStore.getAll().map((c) => c.name).join(", ");
  const sbCookies = cookieStore
    .getAll()
    .filter((c) => c.name.startsWith("sb-"));
  const hasAuthCookie = sbCookies.some((c) => c.name.includes("auth-token"));

  let diagnostic: string;
  if (session) {
    diagnostic = `MESSAGES-DEBUG | session: name=${session.name} role=${session.role} | cookies: ${allCookieNames}`;
  } else if (hasAuthCookie) {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.getUser();
    const userInfo = data?.user
      ? `user=${data.user.id.slice(0, 8)}…`
      : "user=null";
    const errMsg = error ? `${error.name}: ${error.message}` : "(no error)";
    const authCookie = sbCookies.find((c) => c.name.includes("auth-token"));
    const raw = authCookie?.value ?? "";
    diagnostic = `MESSAGES-DEBUG | session: null but has sb-* cookie | cookies: ${allCookieNames} | getUser ${userInfo} | err: ${errMsg} | cookie value len=${raw.length}`;
  } else {
    diagnostic = `MESSAGES-DEBUG | session: null, no sb-* cookies | cookies: ${allCookieNames || "(none)"}`;
  }

  // For everyone else (signed in OR anonymous) we render the chat page —
  // anonymous visitors see a friendly "sign in to chat" panel via the
  // client, signed-in users see their thread. Never bounce to /auth/login.
  const result = session
    ? await getMyThread()
    : ({ ok: false, reason: "anon" } as const);

  return (
    <>
      <div
        style={{
          background: "#0b1020",
          color: "#fbbf24",
          fontFamily: "ui-monospace, Menlo, monospace",
          fontSize: 11,
          padding: "6px 12px",
          borderBottom: "1px solid #334155",
          wordBreak: "break-all",
        }}
      >
        {diagnostic}
      </div>
      <MessagesClient
        initialState={result.ok ? { thread: result.thread, messages: result.messages } : null}
        reason={result.ok ? null : result.reason}
        session={session ? { name: session.name, role: session.role } : null}
        diagnostic={diagnostic}
      />
    </>
  );
}
