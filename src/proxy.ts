import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { supabaseConfigured } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PREFIXES = ["/buyer", "/consultant", "/admin"];

const ROLE_PREFIXES: Record<string, string[]> = {
  buyer: ["/buyer"],
  consultant: ["/consultant"],
  admin: ["/buyer", "/consultant", "/admin"],
};

async function getSessionFromRequest(req: NextRequest) {
  if (!supabaseConfigured()) {
    const raw = req.cookies.get("myweb_mock_session")?.value;
    if (!raw) return null;
    try {
      return JSON.parse(raw) as { role: string; name: string };
    } catch {
      return null;
    }
  }

  const sbCookie = [...req.cookies.getAll()].find(
    (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"),
  );
  if (!sbCookie) return null;
  return { role: "unknown", name: "" };
}

export default async function middleware(req: NextRequest) {
  const intlResponse = intlMiddleware(req);

  const { pathname } = req.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[0] ?? "en";
  const pathWithoutLocale = "/" + segments.slice(1).join("/");

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

  if (session.role !== "unknown") {
    const allowed = ROLE_PREFIXES[session.role] ?? [];
    const hasAccess = allowed.some((prefix) =>
      pathWithoutLocale.startsWith(prefix),
    );

    if (!hasAccess) {
      let ownDash = `/${locale}/buyer/dashboard`;
      if (session.role === "consultant") ownDash = `/${locale}/consultant/dashboard`;
      if (session.role === "admin") ownDash = `/${locale}/admin/dashboard`;
      return NextResponse.redirect(new URL(ownDash, req.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
