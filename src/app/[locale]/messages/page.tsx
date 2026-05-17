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

  // Deep diagnostic: if getCurrentSession came back null but the request
  // looks signed-in (has an sb-*-auth-token cookie), capture exactly why
  // auth.getUser() failed so we can see it in the UI.
  let diagnostic: string | null = null;
  if (!session) {
    const cookieStore = await cookies();
    const sbCookies = cookieStore
      .getAll()
      .filter((c) => c.name.startsWith("sb-"));
    const hasAuthCookie = sbCookies.some((c) => c.name.includes("auth-token"));

    if (hasAuthCookie) {
      const supabase = await createServerClient();
      const { data, error } = await supabase.auth.getUser();
      const userInfo = data?.user
        ? `user=${data.user.id.slice(0, 8)}…`
        : "user=null";
      const cookieNames = sbCookies.map((c) => c.name).join(", ");
      const errMsg = error ? `${error.name}: ${error.message}` : "(no error)";

      const authCookie = sbCookies.find((c) => c.name.includes("auth-token"));
      const raw = authCookie?.value ?? "";
      const valuePreview = `len=${raw.length} startsWith="${raw.slice(0, 12)}" endsWith="${raw.slice(-6)}"`;
      let shape = "unknown";
      if (raw.startsWith("base64-")) {
        shape = "base64-prefixed";
      } else if (raw.startsWith("[")) {
        shape = "array-json";
      } else if (raw.startsWith("{")) {
        shape = "object-json";
      } else if (raw.startsWith("eyJ")) {
        shape = "bare-jwt (no wrapper)";
      } else if (raw === "") {
        shape = "EMPTY";
      } else {
        shape = `other (first char: ${JSON.stringify(raw[0] ?? "")})`;
      }
      diagnostic = `DEBUG | cookies(${sbCookies.length}): ${cookieNames} | getUser ${userInfo} | err: ${errMsg} | value: ${valuePreview} shape=${shape}`;
    }
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
      diagnostic={diagnostic}
    />
  );
}
