// Signup Route Handler — final version. Same pattern as /api/auth/login:
// avoid NextResponse.redirect(), collect cookies during auth, attach them
// to a manual 303 response after.

import { createServerClient } from "@supabase/ssr";
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
  return buildRedirect(req, `/${locale}/auth/signup?error=${encodeURIComponent(key)}`);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "buyer");
  const locale = String(formData.get("locale") ?? "en");

  if (!email || !email.includes("@")) return errorRedirect(req, locale, "emailInvalid");
  if (password.length < 8) return errorRedirect(req, locale, "passwordShort");
  if (!name) return errorRedirect(req, locale, "nameRequired");
  if (role !== "buyer" && role !== "consultant") return errorRedirect(req, locale, "roleRequired");

  const isConsultant = role === "consultant";

  type CookieToSet = {
    name: string;
    value: string;
    options: Record<string, unknown> | undefined;
  };
  const cookieJar: CookieToSet[] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const c of cookiesToSet) {
            const idx = cookieJar.findIndex((j) => j.name === c.name);
            if (idx >= 0) cookieJar.splice(idx, 1);
            cookieJar.push(c as CookieToSet);
          }
        },
      },
    },
  );

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name, role } },
  });

  if (error || !data.user) {
    if (error?.message?.toLowerCase().includes("already")) {
      return errorRedirect(req, locale, "emailTaken");
    }
    return errorRedirect(req, locale, "generic");
  }

  await supabase.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: name,
    role,
    phone: "",
  });

  // For consultants we don't auto-sign-in (admin must approve first).
  if (isConsultant) {
    return buildRedirect(req, `/${locale}/auth/login?pending=1`);
  }

  // Auto sign-in buyers so they land directly on the dashboard.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const targetPath = signInError
    ? `/${locale}/auth/login?registered=1`
    : `/${locale}/buyer/dashboard`;
  const response = buildRedirect(req, targetPath);

  for (const { name, value, options } of cookieJar) {
    response.cookies.set(name, value, {
      ...(options ?? {}),
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}
