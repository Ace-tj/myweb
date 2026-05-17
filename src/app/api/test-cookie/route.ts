// Plain cookie-write test. No Supabase, no middleware (matcher excludes /api).
// If GET /api/test-cookie does NOT set a cookie in the browser, the issue is
// fundamental (Vercel, Next.js, or browser) and unrelated to Supabase.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const before = cookieStore.getAll().map((c) => c.name);

  let setOk = true;
  let setError: string | null = null;
  try {
    cookieStore.set("myweb-cookie-test", `set-at-${Date.now()}`, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 10,
    });
  } catch (err) {
    setOk = false;
    setError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    ok: setOk,
    error: setError,
    cookiesBeforeSet: before,
    note:
      "After loading this URL once, open DevTools → Application → Cookies. " +
      "You should see 'myweb-cookie-test' for myweb-pied-three.vercel.app. " +
      "If you do, plain cookie writes work. If you don't, cookies are broken globally.",
  });
}
