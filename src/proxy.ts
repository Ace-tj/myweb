import createMiddleware from "next-intl/middleware";
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
  return req.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.includes("auth-token"));
}

function currentProjectRef(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const m = url.match(/^https?:\/\/([^.]+)\.supabase\.co/i);
  return m?.[1] ?? null;
}

function isStaleSupabaseCookie(name: string, currentRef: string | null): boolean {
  if (!currentRef) return false;
  if (!name.startsWith("sb-")) return false;
  if (!name.includes("auth-token")) return false;
  return !name.includes(currentRef);
}

// ---------------------------------------------------------------------------
// SIMPLIFIED MIDDLEWARE
// ---------------------------------------------------------------------------
// All Supabase-session-refresh logic is intentionally removed here. The
// previous version called `supabase.auth.getUser()` on every request, which
// (a) sometimes triggered a `setAll` that re-wrote the auth cookie with a
// narrower path, and (b) on certain validation hiccups could wipe the cookie
// entirely. The session was therefore alive on the dashboard but gone the
// moment the user navigated anywhere else.
//
// Cookies are now written exclusively by:
//   - the /api/auth/login route handler (sign-in)
//   - the /api/auth/signup route handler (sign-up)
//   - page-level Supabase clients on their own refresh paths
// The middleware just handles:
//   1. next-intl URL shaping
//   2. Purging stale auth cookies from previous Supabase project refs
//   3. A cheap auth gate that redirects unauthenticated users away from
//      protected prefixes (without touching any other cookies)
// ---------------------------------------------------------------------------

export default async function middleware(req: NextRequest) {
  // 1) Let next-intl decide the URL shape.
  const intlResponse = intlMiddleware(req);

  if (intlResponse.headers.get("location")) {
    return intlResponse;
  }

  // 2) Purge stale Supabase auth cookies from previous-project deployments.
  // Only touches cookies whose project ref doesn't match the current one.
  const ref = currentProjectRef();
  const staleNames = req.cookies
    .getAll()
    .filter((c) => isStaleSupabaseCookie(c.name, ref))
    .map((c) => c.name);
  if (staleNames.length > 0) {
    for (const name of staleNames) req.cookies.delete(name);
    for (const name of staleNames) {
      intlResponse.cookies.set(name, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });
    }
  }

  // 3) Auth gate. Fast UI-level guard only — pages still re-check authoritatively.
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
    intlResponse.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
