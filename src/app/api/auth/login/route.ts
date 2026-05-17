// Login Route Handler — self-managed session.
//
// Verifies credentials via Supabase auth, then writes a row to
// public.user_sessions via service-role and returns just the session
// ID in a single `mw_session` cookie. No more @supabase/ssr cookie
// roundtrips.

import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { SESSION_COOKIE } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

type Role = "buyer" | "consultant" | "admin";

function dashboardPath(role: Role): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "consultant":
      return "/consultant/dashboard";
    default:
      return "/buyer/dashboard";
  }
}

function buildRedirect(req: NextRequest, path: string) {
  const target = new URL(path, req.url);
  return new NextResponse(null, {
    status: 303,
    headers: { Location: target.toString() },
  });
}

function errorRedirect(req: NextRequest, locale: string, key: string) {
  return buildRedirect(
    req,
    `/${locale}/auth/login?error=${encodeURIComponent(key)}`,
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const locale = String(formData.get("locale") ?? "en");

  if (!email || !email.includes("@")) {
    return errorRedirect(req, locale, "emailInvalid");
  }
  if (password.length < 8) {
    return errorRedirect(req, locale, "passwordShort");
  }

  // Use a plain supabase-js client (anon key) to verify credentials.
  // No cookie storage — we manage that ourselves.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    const msg = error?.message?.toLowerCase() ?? "";
    let key = "invalid";
    if (msg.includes("email") && msg.includes("confirm"))
      key = "emailNotConfirmed";
    else if (msg.includes("banned") || msg.includes("disabled")) key = "banned";
    return errorRedirect(req, locale, key);
  }

  // Insert a session row via service-role.
  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return errorRedirect(req, locale, "generic");
  }

  const { data: sess, error: sErr } = await admin
    .from("user_sessions")
    .insert({
      user_id: data.user.id,
      user_agent: req.headers.get("user-agent") ?? null,
    })
    .select("id")
    .single();

  if (sErr || !sess) {
    return errorRedirect(req, locale, "generic");
  }

  // Look up role for the redirect destination.
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();
  const role = ((profile?.role as Role) ?? "buyer") as Role;

  const response = buildRedirect(req, `/${locale}${dashboardPath(role)}`);
  response.cookies.set(SESSION_COOKIE, sess.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
