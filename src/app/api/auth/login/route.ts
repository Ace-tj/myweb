// Login as a Route Handler (not a Server Action).
//
// Why: in this app's Next.js 16 + Vercel deployment, cookies written via
// next/headers `cookieStore.set()` inside a Server Action were not making
// it back to the browser, so signInWithPassword had no observable effect.
// Route Handlers let us construct our own NextResponse and call
// `response.cookies.set()` directly, which the Vercel runtime always
// propagates as Set-Cookie headers.
//
// The form posts here as multipart/form-data; we respond with a 303 redirect
// to the role-appropriate dashboard (or back to /auth/login with ?error= on
// failure). All Supabase auth cookies are written on the redirect response.

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

function errorRedirect(req: NextRequest, locale: string, key: string) {
  const url = new URL(`/${locale}/auth/login`, req.url);
  url.searchParams.set("error", key);
  return NextResponse.redirect(url, 303);
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

  // Build the redirect response first so we can write cookies directly onto it.
  // We don't yet know the redirect target — initialize to a placeholder and
  // overwrite the Location header later.
  const response = NextResponse.redirect(new URL(`/${locale}`, req.url), 303);

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
            // Spread options FIRST, then force path/sameSite — so Supabase
            // can't accidentally write a path-scoped cookie that fails to
            // match later navigations.
            response.cookies.set(name, value, {
              ...options,
              path: "/",
              sameSite: "lax",
            });
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

  // Overwrite the Location header on the cookie-bearing response so the
  // browser follows to the right dashboard, taking the auth cookies with it.
  const target = new URL(`/${locale}${dashboardPath(role)}`, req.url);
  response.headers.set("Location", target.toString());
  return response;
}
