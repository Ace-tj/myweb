// Login as a Route Handler — final version.
//
// IMPORTANT: do NOT use NextResponse.redirect() for this flow. In this
// Next.js 16 + Vercel deployment, cookies set on a NextResponse.redirect()
// response don't always serialize into Set-Cookie headers. Instead we
// build a plain NextResponse with status 303 and Location header, attach
// cookies after sign-in, and let the browser follow.
//
// The cookie-check endpoint at /api/cookie-check proved that
// `new NextResponse(...)` + `response.cookies.set()` works on this
// deployment — that's the pattern we use here.

import { createServerClient } from "@supabase/ssr";
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
  return buildRedirect(req, `/${locale}/auth/login?error=${encodeURIComponent(key)}`);
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

  // Collect cookies Supabase wants to set during signInWithPassword so we
  // can attach them to the final response (built AFTER auth completes).
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
          // Replace older entries for the same name so we keep only the
          // most recent value (e.g. if a refresh fires partway through).
          for (const c of cookiesToSet) {
            const idx = cookieJar.findIndex((j) => j.name === c.name);
            if (idx >= 0) cookieJar.splice(idx, 1);
            cookieJar.push(c as CookieToSet);
          }
        },
      },
    },
  );

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    const msg = error?.message?.toLowerCase() ?? "";
    let key = "invalid";
    if (msg.includes("email") && msg.includes("confirm")) key = "emailNotConfirmed";
    else if (msg.includes("banned") || msg.includes("disabled")) key = "banned";
    return errorRedirect(req, locale, key);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  const role = ((profile?.role as Role) ?? "buyer") as Role;
  const response = buildRedirect(req, `/${locale}${dashboardPath(role)}`);

  // Attach every cookie Supabase wanted to write. Force path/sameSite
  // last so they always win, regardless of what Supabase passed.
  for (const { name, value, options } of cookieJar) {
    response.cookies.set(name, value, {
      ...(options ?? {}),
      path: "/",
      sameSite: "lax",
    });
  }

  // Sentinel cookie — verifies the response object itself carries cookies.
  // If THIS appears in the browser after login but no sb-* cookies do, the
  // issue is Supabase setAll. If neither appears, it's the redirect itself.
  response.cookies.set("myweb-login-ran", `ok-${Date.now()}`, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 5,
    httpOnly: false,
  });

  return response;
}
