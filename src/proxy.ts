import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PREFIXES = ["/buyer", "/consultant", "/admin"];

function supabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR_PROJECT_REF"),
  );
}

function hasSessionCookies(req: NextRequest): boolean {
  if (!supabaseConfigured()) {
    return Boolean(req.cookies.get("myweb_mock_session")?.value);
  }
  return [...req.cookies.getAll()].some(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"),
  );
}

export default async function middleware(req: NextRequest) {
  // 1. Let next-intl handle locale routing — may rewrite or redirect.
  const response = intlMiddleware(req);

  // 2. Refresh Supabase session on every request. This is THE critical piece:
  // without it, access tokens expire silently and the user appears logged out
  // on the next navigation. The setAll callback mutates BOTH the request
  // (so downstream code in this same request sees fresh cookies) AND the
  // response (so the browser receives the refreshed cookies).
  if (supabaseConfigured()) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              req.cookies.set(name, value);
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );
    // This call triggers token refresh + setAll if a refresh occurs.
    await supabase.auth.getUser();
  }

  // 3. Lightweight UI-level auth gate on protected route prefixes.
  // The page itself does the authoritative check via getCurrentSession().
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] ?? "en";
  const pathWithoutLocale = "/" + segments.slice(1).join("/");

  const needsAuth = PROTECTED_PREFIXES.some((prefix) =>
    pathWithoutLocale.startsWith(prefix),
  );

  if (needsAuth && !hasSessionCookies(req)) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    loginUrl.searchParams.set("from", pathname);
    const redirect = NextResponse.redirect(loginUrl);
    // Carry over any cookies the Supabase refresh set, so the redirect
    // doesn't lose them.
    response.cookies.getAll().forEach((c) => {
      redirect.cookies.set(c.name, c.value);
    });
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
