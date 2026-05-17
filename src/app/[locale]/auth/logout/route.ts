import { NextRequest, NextResponse } from "next/server";
import { mockSignOut, supabaseConfigured, SESSION_COOKIE } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!supabaseConfigured()) {
    await mockSignOut();
  } else {
    const sessionId = req.cookies.get(SESSION_COOKIE)?.value;
    if (sessionId) {
      try {
        const admin = createAdminClient();
        await admin.from("user_sessions").delete().eq("id", sessionId);
      } catch {
        // ignore — we'll clear the cookie regardless
      }
    }
  }

  const response = NextResponse.redirect(new URL(`/${locale}`, req.url));
  response.cookies.set(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
