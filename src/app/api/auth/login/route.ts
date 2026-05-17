// Login Route Handler — instrumented to render a visible diagnostic page
// so we can see exactly what signInWithPassword returns when no auth
// cookies make it to the browser.
//
// Cookies attach to the HTML response (proven to work by /api/cookie-check).
// The page meta-refreshes to the dashboard after 4 seconds if everything
// looks good, or stays visible with the failure reason if not.

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

function htmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

  if (!email || !email.includes("@")) return errorRedirect(req, locale, "emailInvalid");
  if (password.length < 8) return errorRedirect(req, locale, "passwordShort");

  type CookieToSet = {
    name: string;
    value: string;
    options: Record<string, unknown> | undefined;
  };
  const cookieJar: CookieToSet[] = [];
  let setAllCallCount = 0;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          setAllCallCount++;
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

  // Build a diagnostic snapshot of EVERYTHING that happened.
  const diag = {
    hasError: Boolean(error),
    errorMessage: error?.message ?? null,
    errorStatus: (error as { status?: number } | null)?.status ?? null,
    userId: data?.user?.id?.slice(0, 8) ?? null,
    userConfirmedAt:
      (data?.user as { email_confirmed_at?: string } | null | undefined)
        ?.email_confirmed_at ?? null,
    hasSession: Boolean(data?.session),
    sessionAccessTokenPresent: Boolean(data?.session?.access_token),
    sessionRefreshTokenPresent: Boolean(data?.session?.refresh_token),
    setAllCallCount,
    cookieJarSize: cookieJar.length,
    cookieJarNames: cookieJar.map((c) => c.name),
  };

  // Decide what to do based on real conditions.
  if (error || !data.user) {
    const msg = error?.message?.toLowerCase() ?? "";
    let key = "invalid";
    if (msg.includes("email") && msg.includes("confirm")) key = "emailNotConfirmed";
    else if (msg.includes("banned") || msg.includes("disabled")) key = "banned";
    return errorRedirect(req, locale, key);
  }

  // Determine target dashboard.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();
  const role = ((profile?.role as Role) ?? "buyer") as Role;
  const targetPath = `/${locale}${dashboardPath(role)}`;

  // If sign-in returned no session OR no cookies, do NOT silently redirect —
  // render the diagnostic so the user can see why. Otherwise redirect with
  // cookies attached.
  const shouldStop =
    !diag.hasSession || diag.cookieJarSize === 0;

  if (shouldStop) {
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Sign-in diagnostic</title>
  <style>
    body { font-family: ui-monospace, Menlo, monospace; background:#0b1020; color:#e2e8f0; padding: 2rem 1.5rem; line-height: 1.55; }
    .card { max-width: 760px; margin: 0 auto; background: rgba(255,255,255,0.05); border:1px solid #334155; border-radius: 12px; padding: 24px; }
    h1 { font-size: 20px; margin: 0 0 16px; }
    .fail { color: #ef4444; }
    .ok { color: #10b981; }
    pre { background: rgba(0,0,0,0.4); padding: 14px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
    a { color: #60a5fa; }
    .note { color: #94a3b8; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🔍 Login diagnostic</h1>
    <p class="note">Sign-in returned <strong>${diag.hasError ? '<span class="fail">an error</span>' : '<span class="ok">no error</span>'}</strong> but the server did not produce a session that could be stored as cookies. Below is the raw outcome.</p>
    <pre>${htmlEscape(JSON.stringify(diag, null, 2))}</pre>
    <p class="note">Most likely causes when <code>hasSession=false</code> and there's no error:</p>
    <ul class="note">
      <li>Email confirmation is still enforced in Supabase (Authentication → Providers → Email → "Confirm email" — must be OFF).</li>
      <li>The user has unconfirmed <code>email_confirmed_at</code> — run <code>update auth.users set email_confirmed_at=now() where email_confirmed_at is null;</code> in SQL Editor.</li>
      <li>MFA is enabled for this account.</li>
    </ul>
    <p class="note"><a href="/${htmlEscape(locale)}/auth/login">← Back to login</a></p>
  </div>
</body>
</html>`;
    const response = new NextResponse(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
    response.cookies.set("myweb-login-ran", `stop-${Date.now()}`, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 5,
      httpOnly: false,
    });
    for (const { name, value, options } of cookieJar) {
      response.cookies.set(name, value, {
        ...(options ?? {}),
        path: "/",
        sameSite: "lax",
      });
    }
    return response;
  }

  // Happy path — got a session and cookies. Redirect with cookies attached.
  const response = buildRedirect(req, targetPath);
  for (const { name, value, options } of cookieJar) {
    response.cookies.set(name, value, {
      ...(options ?? {}),
      path: "/",
      sameSite: "lax",
    });
  }
  response.cookies.set("myweb-login-ran", `ok-${Date.now()}`, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 5,
    httpOnly: false,
  });
  return response;
}
