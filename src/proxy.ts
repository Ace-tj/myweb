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
  // Supabase splits the auth cookie into chunked parts when the JWT is large:
  // `sb-<ref>-auth-token.0`, `sb-<ref>-auth-token.1`, etc. Match anything that
  // starts with `sb-` AND contains `auth-token`.
  return req.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"));
}

/**
 * Combined next-intl + Supabase middleware.
 *
 * Order matters. We follow Supabase's canonical Next.js SSR pattern verbatim
 * (https://supabase.com/docs/guides/auth/server-side/nextjs) — the docs warn:
 *
 *   "If you're creating a new response object with NextResponse.next() …
 *    you may be causing the browser and server to go out of sync and
 *    terminate the user's session prematurely!"
 *
 * Previous versions of this file returned the `intlResponse` (a different
 * response than the one Supabase wrote cookies onto) with cookies copied via
 * individual `set(name, value)` calls. That stripped `path`, `sameSite`,
 * `httpOnly`, `maxAge`, `secure` — so the browser scoped the auth cookie to
 * the current URL and never sent it again on the next navigation. Result:
 * user appeared logged out the moment they clicked any link.
 *
 * The fix: run intl first (and bail early if it's a redirect), then build
 * `supabaseResponse` as the SAME object intl produced, mutated in place by
 * Supabase's `setAll`. Return that object unchanged at the end.
 */
export default async function middleware(req: NextRequest) {
  // 1) Let next-intl decide the URL shape.
  const intlResponse = intlMiddleware(req);

  // If intl wants a hard redirect (e.g. `/` → `/en`), short-circuit. There's
  // no point refreshing Supabase on a request the browser is about to abandon.
  if (intlResponse.headers.get("location")) {
    return intlResponse;
  }

  // 2) Supabase session refresh. supabaseResponse starts as intl's response so
  //    we preserve any rewrite headers / locale cookies intl set. Inside
  //    `setAll` we rebuild the response (because `req.cookies` was mutated),
  //    then explicitly re-apply intl's state so nothing is lost.
  let supabaseResponse: NextResponse = intlResponse;

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
            // 2a. Mutate request cookies so downstream Server Components
            //     (running on this same request) read the refreshed values.
            cookiesToSet.forEach(({ name, value }) =>
              req.cookies.set(name, value),
            );
            // 2b. Rebuild the response from the now-updated request.
            const rebuilt = NextResponse.next({ request: req });
            // 2c. Carry intl's response-level state through the rebuild.
            intlResponse.headers.forEach((value, key) => {
              if (key.toLowerCase().startsWith("x-middleware-")) {
                rebuilt.headers.set(key, value);
              }
            });
            intlResponse.cookies
              .getAll()
              .forEach((c) => rebuilt.cookies.set(c));
            // 2d. Write the refreshed Supabase cookies WITH FULL OPTIONS so
            //     the browser stores them with the right path/sameSite/etc.
            cookiesToSet.forEach(({ name, value, options }) =>
              rebuilt.cookies.set(name, value, options),
            );
            supabaseResponse = rebuilt;
          },
        },
      },
    );

    // CRITICAL — nothing between createServerClient() and getUser(). The
    // Supabase docs explicitly warn this can cause random session loss.
    await supabase.auth.getUser();
  }

  // 3) Auth gate for protected prefixes. This is a fast UI-level guard; pages
  //    still re-check authoritatively via `getCurrentSession()`.
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] ?? "en";
  const pathWithoutLocale = "/" + segments.slice(1).join("/");

  const needsAuth = PROTECTED_PREFIXES.some((p) =>
    pathWithoutLocale.startsWith(p),
  );

  if (needsAuth && !hasSessionCookies(req)) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    loginUrl.searchParams.set("from", pathname);
    const redirect = NextResponse.redirect(loginUrl);
    // Carry refreshed Supabase cookies through the redirect — full ResponseCookie
    // objects, not (name, value), so path/sameSite/secure all survive.
    supabaseResponse.cookies
      .getAll()
      .forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  // 4) Return supabaseResponse unchanged. Returning a *different* response
  //    (like intlResponse with cookies copied onto it) is exactly what the
  //    Supabase docs warn about — don't change this back.
  return supabaseResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
