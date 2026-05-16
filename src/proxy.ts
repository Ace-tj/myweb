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
  // Supabase splits the auth cookie into chunked parts when the JWT is
  // large: `sb-<ref>-auth-token.0`, `sb-<ref>-auth-token.1`, etc.
  // The original `endsWith("-auth-token")` predicate missed all chunked
  // cookies, so the middleware redirected every authenticated user
  // straight back to login. Match anything starting with "sb-" and
  // containing "auth-token" instead.
  return [...req.cookies.getAll()].some(
    (c) => c.name.startsWith("sb-") && c.name.includes("auth-token"),
  );
}

export default async function middleware(req: NextRequest) {
  // ── Step 1: Refresh Supabase session and rebuild response from fresh request.
  // This is the canonical pattern from Supabase's Next.js SSR docs. The key
  // detail is that `setAll` mutates BOTH the request (so downstream code in
  // this same request sees the fresh cookies) AND rebuilds the response
  // (so the page render is bound to the updated request state).
  let supabaseResponse: NextResponse = NextResponse.next({ request: req });

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
            cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
            supabaseResponse = NextResponse.next({ request: req });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );
    await supabase.auth.getUser();
  }

  // ── Step 2: Let next-intl handle locale routing on the (possibly updated) request.
  const intlResponse = intlMiddleware(req);

  // If intl produced a redirect or rewrite distinct from our supabaseResponse,
  // copy the refreshed Supabase cookies onto it so they aren't lost.
  // IMPORTANT: pass the full ResponseCookie object — passing just (name, value)
  // drops `path`, `httpOnly`, `sameSite`, `maxAge`, `secure`, etc., which makes
  // the browser scope the cookie to the current URL only. The cookie then fails
  // to send on the next navigation and the user gets bounced back to login.
  let response: NextResponse = intlResponse;
  if (intlResponse !== supabaseResponse) {
    supabaseResponse.cookies.getAll().forEach((c) => {
      intlResponse.cookies.set(c);
    });
  }

  // ── Step 3: Auth gate for protected route prefixes (UI-level guard;
  // pages still do the authoritative check via getCurrentSession()).
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
    // Carry refreshed cookies through the redirect — full object, not (name, value).
    response.cookies.getAll().forEach((c) => {
      redirect.cookies.set(c);
    });
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
