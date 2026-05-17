// Cookie-write test that compares BOTH ways of setting a cookie in a Route
// Handler. The fundamental Next.js 16 bug we're chasing: cookieStore.set()
// from next/headers may silently fail to propagate to the response, while
// response.cookies.set() always works.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const before = cookieStore.getAll().map((c) => c.name);

  // Method A: write via cookieStore.set (next/headers)
  let methodAOk = true;
  let methodAError: string | null = null;
  try {
    cookieStore.set("test-cookieStore", `via-cookieStore-${Date.now()}`, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 10,
    });
  } catch (err) {
    methodAOk = false;
    methodAError = err instanceof Error ? err.message : String(err);
  }

  // Method B: write via response.cookies.set (NextResponse object)
  const response = NextResponse.json({
    methodA: { ok: methodAOk, error: methodAError, name: "test-cookieStore" },
    methodB: { name: "test-response" },
    cookiesBeforeSet: before,
    instructions:
      "Open DevTools → Application → Cookies. Both 'test-cookieStore' AND " +
      "'test-response' should appear. If only 'test-response' appears, that " +
      "confirms the Next.js bug: cookieStore.set() doesn't propagate. The " +
      "auth flow has been refactored to use the response.cookies.set() path.",
  });
  response.cookies.set("test-response", `via-response-${Date.now()}`, {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    maxAge: 60 * 10,
  });

  return response;
}
