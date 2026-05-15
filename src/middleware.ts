import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { supabaseConfigured } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

// Routes that require authentication (prefix match)
const PROTECTED_PREFIXES = ["/buyer", "/consultant", "/admin"];

// Role → allowed path prefixes
const ROLE_PREFIXES: Record<string, string[]> = {
  buyer: ["/buyer"],
  consultant: ["/consultant"],
  admin: ["/buyer", "/consultant", "/admin"],
};

async function getSessionFromRequest(req: NextRequest) {
  if (!supabaseConfigured()) {
    // Read mock cookie directly from the request (no Next.js cache in middleware)
    const raw = req.cookies.get("myweb_mock_session")?.value;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as { role: string; name: string };
    } catch {
      return null;
    }
  }

  // Supabase: we can't call the full server client in middleware safely across
  // all Next versions, so we do a lightweight cookie check only.
  // Real session validation happens in server components via getCurrentSession().
  const sbCookie = [...req.cookies.getAll()].find(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"),
  );
  if (!sbCookie) return null;
  // Return a placeholder — server components will validate properly.
  return { role: "unknown", name: "" };
}

export default async function middleware(req: NextRequest) {
  // Run next-intl locale routing first
  const intlResponse = intlMiddleware(req);

  // Extract the locale from the pathname
  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] ?? "en";
  const pathWithoutLocale = "/" + segments.slice(1).join("/");

  // Check if this path needs auth protection
  const needsAuth = PROTECTED_PREFIXES.some((prefix) =>
    pathWithoutLocale.startsWith(prefix),
  );

  if (!needsAuth) {
    return intlResponse;
  }

  const session = await getSessionFromRequest(req);

  if (!session) {
    const loginUrl = new URL(`/${locale}/auth/login`, req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role mismatch check (skip for unknown/supabase placeholder)
  if (session.role !== "unknown") {
    const allowed = ROLE_PREFIXES[session.role] ?? [];
    const hasAccess = allowed.some((prefix) =>
      pathWithoutLocale.startsWith(prefix),
    );

    if (!hasAccess) {
      // Redirect to own dashboard
      let ownDash = `/${locale}/buyer/dashboard`;
      if (session.role === "consultant") ownDash = `/${locale}/consultant/dashboard`;
      if (session.role === "admin") ownDash = `/${locale}/admin/dashboard`;
      return NextResponse.redirect(new URL(ownDash, req.url));
    }
  }

  return intlResponse;
}

export const config = {
  // Match every path EXCEPT api routes, Next internals, and static files with extensions.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
