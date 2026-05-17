// Self-contained cookie persistence test.
// Visit it once → it tries to set a cookie. Refresh → it tells you whether
// the cookie persisted between the two requests. No DevTools required.

import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const COOKIE_NAME = "myweb-cookie-check";

export async function GET(req: NextRequest) {
  const existing = req.cookies.get(COOKIE_NAME)?.value;
  const wasPersisted = Boolean(existing);

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Cookie persistence test</title>
  <style>
    body { font-family: ui-monospace, Menlo, monospace; background:#0b1020; color:#e2e8f0; padding: 2rem 1.5rem; }
    .card { max-width: 720px; margin: 0 auto; background: rgba(255,255,255,0.05); border:1px solid #334155; border-radius: 12px; padding: 24px; }
    .ok { color: #10b981; }
    .fail { color: #ef4444; }
    code { background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; }
    h1 { font-size: 20px; margin: 0 0 8px; }
    .note { color: #94a3b8; font-size: 14px; line-height: 1.6; }
    .big { font-size: 36px; font-weight: 800; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🍪 Cookie persistence test</h1>
    <p class="note">Tests whether Vercel + your browser can set and read a plain cookie at all (no Supabase, no middleware).</p>

    <div class="big">
      ${
        wasPersisted
          ? `<span class="ok">✓ COOKIES WORK</span>`
          : `<span class="fail">✕ NO COOKIE FOUND</span>`
      }
    </div>

    <p class="note">
      ${
        wasPersisted
          ? `The cookie <code>${COOKIE_NAME}</code> was successfully read from your browser on this request. Plain cookies work for this site. <br><br>If login still seems broken, the bug is in the auth code path — not the browser. Reply with this result.`
          : `Either this is your first visit (so we just set it — <strong>refresh this page to verify</strong>), OR cookies are blocked entirely for this site.`
      }
    </p>

    <p class="note">
      <strong>What to do now:</strong> press F5 (or Ctrl+R) to reload. If you still see <span class="fail">✕ NO COOKIE FOUND</span> after refresh, cookies are being blocked by something (browser extension, strict privacy mode, or a Vercel configuration). If you now see <span class="ok">✓ COOKIES WORK</span>, the browser is fine and the auth bug is in the code.
    </p>

    <p class="note">URL: <code>${req.url}</code></p>
    <p class="note">Existing cookie value: <code>${existing ? existing.slice(0, 30) + "…" : "(none)"}</code></p>
  </div>
</body>
</html>`;

  const response = new NextResponse(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
  response.cookies.set(COOKIE_NAME, `set-at-${Date.now()}`, {
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    maxAge: 60 * 30,
  });
  return response;
}
