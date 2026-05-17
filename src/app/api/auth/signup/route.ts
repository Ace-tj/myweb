// Signup as a Route Handler (not a Server Action).
//
// Same rationale as /api/auth/login/route.ts: cookies written via Server
// Action through next/headers `cookieStore.set` don't reach the browser on
// this Next.js 16 + Vercel deployment. By using a Route Handler we can
// construct a NextResponse and call `response.cookies.set()` directly so
// the Set-Cookie headers are guaranteed to be present on the redirect.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function errorRedirect(req: NextRequest, locale: string, key: string) {
  const url = new URL(`/${locale}/auth/signup`, req.url);
  url.searchParams.set("error", key);
  return NextResponse.redirect(url, 303);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "buyer");
  const locale = String(formData.get("locale") ?? "en");

  if (!email || !email.includes("@")) {
    return errorRedirect(req, locale, "emailInvalid");
  }
  if (password.length < 8) {
    return errorRedirect(req, locale, "passwordShort");
  }
  if (!name) {
    return errorRedirect(req, locale, "nameRequired");
  }
  if (role !== "buyer" && role !== "consultant") {
    return errorRedirect(req, locale, "roleRequired");
  }

  const isConsultant = role === "consultant";

  // Build the redirect response up-front so Supabase's setAll callback can
  // write auth cookies onto it.
  const target = isConsultant
    ? new URL(`/${locale}/auth/login?pending=1`, req.url)
    : new URL(`/${locale}/buyer/dashboard`, req.url);
  const response = NextResponse.redirect(target, 303);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, {
              path: "/",
              sameSite: "lax",
              ...options,
            });
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

  // Best-effort profile upsert. Schema lives in the migrations; the
  // handle_new_user trigger should have already created the row, this is
  // just a safety net.
  await supabase.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: name,
    role,
    phone: "",
  });

  if (isConsultant) {
    // Consultants need admin approval — don't auto-sign-in.
    return response;
  }

  // Auto sign-in for buyers so they land directly in the dashboard with
  // the auth cookies attached to this redirect.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInError) {
    const url = new URL(`/${locale}/auth/login?registered=1`, req.url);
    response.headers.set("Location", url.toString());
  }

  return response;
}
