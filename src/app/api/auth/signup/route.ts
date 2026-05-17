// Signup Route Handler — self-managed session, same pattern as login.

import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { SESSION_COOKIE } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

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
    `/${locale}/auth/signup?error=${encodeURIComponent(key)}`,
  );
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "buyer");
  const locale = String(formData.get("locale") ?? "en");

  if (!email || !email.includes("@"))
    return errorRedirect(req, locale, "emailInvalid");
  if (password.length < 8) return errorRedirect(req, locale, "passwordShort");
  if (!name) return errorRedirect(req, locale, "nameRequired");
  if (role !== "buyer" && role !== "consultant")
    return errorRedirect(req, locale, "roleRequired");

  const isConsultant = role === "consultant";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role } },
  });

  if (error || !data.user) {
    if (error?.message?.toLowerCase().includes("already"))
      return errorRedirect(req, locale, "emailTaken");
    return errorRedirect(req, locale, "generic");
  }

  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return errorRedirect(req, locale, "generic");
  }

  // Best-effort profile upsert (the DB trigger should already have created
  // a row; this is the safety net).
  await admin.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: name,
    role,
    phone: "",
  });

  // Consultants need admin approval before signing in.
  if (isConsultant) {
    return buildRedirect(req, `/${locale}/auth/login?pending=1`);
  }

  // Create a session row.
  const { data: sess, error: sErr } = await admin
    .from("user_sessions")
    .insert({
      user_id: data.user.id,
      user_agent: req.headers.get("user-agent") ?? null,
    })
    .select("id")
    .single();
  if (sErr || !sess) {
    return buildRedirect(req, `/${locale}/auth/login?registered=1`);
  }

  const response = buildRedirect(req, `/${locale}/buyer/dashboard`);
  response.cookies.set(SESSION_COOKIE, sess.id, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
  });
  return response;
}
