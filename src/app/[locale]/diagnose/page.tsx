// Public diagnostic endpoint. Reports server-side truth about
// env vars, cookies, Supabase auth, profile state, and DB schema.
// No authentication required — but no secrets ever leave the server
// (only value prefixes / lengths are shown).

import { cookies, headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "tg" }];
}

interface Check {
  name: string;
  status: "ok" | "warn" | "fail" | "info";
  detail: string;
}

function mask(v: string | undefined | null, keep = 8): string {
  if (!v) return "(unset)";
  if (v.length <= keep) return v;
  return `${v.slice(0, keep)}…(${v.length} chars)`;
}

async function runChecks(): Promise<Check[]> {
  const checks: Check[] = [];

  // ── ENV ──────────────────────────────────────────────────────────────────
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  checks.push({
    name: "ENV NEXT_PUBLIC_SUPABASE_URL",
    status: !url
      ? "fail"
      : url.includes("/rest/v1") || url.endsWith("/")
        ? "warn"
        : "ok",
    detail: !url
      ? "Missing on Vercel. Add it and redeploy."
      : url.includes("/rest/v1")
        ? `BAD: URL contains "/rest/v1" suffix. Value: ${url}. Must be https://<ref>.supabase.co with NO path.`
        : url.endsWith("/")
          ? `WARNING: URL has trailing slash. Value: ${url}`
          : `OK. ${url}`,
  });

  checks.push({
    name: "ENV NEXT_PUBLIC_SUPABASE_ANON_KEY",
    status: anon ? "ok" : "fail",
    detail: anon ? `Present (${mask(anon)})` : "Missing on Vercel.",
  });

  checks.push({
    name: "ENV SUPABASE_SERVICE_ROLE_KEY",
    status: service ? "ok" : "warn",
    detail: service ? `Present (${mask(service)})` : "Missing — admin actions may fail.",
  });

  // ── MIDDLEWARE ──────────────────────────────────────────────────────────
  const h = await headers();
  const proxyRan = h.get("x-middleware-rewrite") !== null || h.get("x-middleware-next") !== null;
  checks.push({
    name: "Middleware execution",
    status: "info",
    detail: proxyRan
      ? "Middleware ran (x-middleware-* header present)"
      : "No x-middleware-* headers — middleware may not have run for this page request",
  });

  // ── COOKIES ─────────────────────────────────────────────────────────────
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const sbCookies = allCookies.filter((c) => c.name.startsWith("sb-"));
  const mockCookie = allCookies.find((c) => c.name === "myweb_mock_session");

  checks.push({
    name: "Cookies in request",
    status: "info",
    detail:
      allCookies.length === 0
        ? "No cookies sent. Are you in a private/incognito session?"
        : `${allCookies.length} cookie(s): ${allCookies.map((c) => `${c.name}=${mask(c.value, 6)}`).join(", ")}`,
  });

  checks.push({
    name: "Supabase auth cookies (sb-*)",
    status: sbCookies.length > 0 ? "ok" : "warn",
    detail:
      sbCookies.length > 0
        ? `${sbCookies.length} found: ${sbCookies.map((c) => c.name).join(", ")}`
        : "None. You're either not logged in, OR login set them on a different domain, OR Supabase isn't configured.",
  });

  checks.push({
    name: "Mock session cookie",
    status: mockCookie ? "info" : "info",
    detail: mockCookie ? `Present (mock mode active)` : "Not set",
  });

  // ── SUPABASE AUTH ───────────────────────────────────────────────────────
  if (!url || !anon) {
    checks.push({
      name: "Supabase auth.getUser()",
      status: "fail",
      detail: "Cannot test — env vars missing.",
    });
    return checks;
  }

  let userId: string | null = null;
  let userEmail: string | null = null;
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      checks.push({
        name: "Supabase auth.getUser()",
        status: "warn",
        detail: `Error: ${error.message}. (Normal if not logged in.)`,
      });
    } else if (!data.user) {
      checks.push({
        name: "Supabase auth.getUser()",
        status: "info",
        detail: "No user — request is anonymous.",
      });
    } else {
      userId = data.user.id;
      userEmail = data.user.email ?? null;
      checks.push({
        name: "Supabase auth.getUser()",
        status: "ok",
        detail: `User: ${userEmail ?? "(no email)"} (id=${data.user.id.slice(0, 8)}…)`,
      });
    }
  } catch (err) {
    checks.push({
      name: "Supabase auth.getUser()",
      status: "fail",
      detail: `Exception: ${err instanceof Error ? err.message : String(err)}`,
    });
    return checks;
  }

  // ── DB OBJECT EXISTENCE ─────────────────────────────────────────────────
  const supabase = await createServerClient();

  async function tableExists(name: string): Promise<{ ok: boolean; detail: string }> {
    const { error } = await supabase.from(name).select("*", { count: "exact", head: true }).limit(1);
    if (!error) return { ok: true, detail: "exists" };
    return { ok: false, detail: error.message };
  }

  for (const t of ["profiles", "support_threads", "support_messages", "demos", "projects"]) {
    const r = await tableExists(t);
    checks.push({
      name: `Table public.${t}`,
      status: r.ok ? "ok" : "fail",
      detail: r.detail,
    });
  }

  // is_admin function exists? Try calling it.
  try {
    const { error } = await supabase.rpc("is_admin");
    checks.push({
      name: "Function public.is_admin()",
      status: error ? "fail" : "ok",
      detail: error ? error.message : "callable",
    });
  } catch (err) {
    checks.push({
      name: "Function public.is_admin()",
      status: "fail",
      detail: err instanceof Error ? err.message : String(err),
    });
  }

  // profiles.email column exists?
  {
    const { error } = await supabase.from("profiles").select("email").limit(1);
    checks.push({
      name: "Column profiles.email",
      status: error
        ? error.message.toLowerCase().includes("column")
          ? "fail"
          : "warn"
        : "ok",
      detail: error ? error.message : "exists",
    });
  }

  // ── PROFILE LOOKUP / SELF-HEAL TEST ─────────────────────────────────────
  if (userId) {
    const { data: profile, error: pErr } = await supabase
      .from("profiles")
      .select("id, full_name, role, email")
      .eq("id", userId)
      .maybeSingle();

    if (pErr) {
      checks.push({
        name: "Profile row for current user",
        status: "fail",
        detail: `Query error: ${pErr.message}`,
      });
    } else if (!profile) {
      checks.push({
        name: "Profile row for current user",
        status: "warn",
        detail: "Missing — will attempt self-heal upsert below",
      });

      // Try the upsert that getCurrentSession would do
      const { data: created, error: upErr } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            email: userEmail,
            full_name: userEmail?.split("@")[0] ?? "User",
            role: "buyer",
            phone: "",
          },
          { onConflict: "id" },
        )
        .select("id, full_name, role")
        .maybeSingle();

      checks.push({
        name: "Self-heal upsert (profiles)",
        status: upErr ? "fail" : created ? "ok" : "warn",
        detail: upErr
          ? `BLOCKED: ${upErr.message}. Likely missing INSERT policy. Run 0004_profiles_self_insert.sql.`
          : created
            ? `Created row: ${JSON.stringify(created)}`
            : "No error but no row returned — RLS may have silently filtered the result",
      });
    } else {
      checks.push({
        name: "Profile row for current user",
        status: "ok",
        detail: `full_name=${profile.full_name} role=${profile.role} email=${profile.email ?? "(null)"}`,
      });
    }
  }

  return checks;
}

export default async function DiagnosePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const checks = await runChecks();

  const stats = checks.reduce(
    (acc, c) => {
      acc[c.status]++;
      return acc;
    },
    { ok: 0, warn: 0, fail: 0, info: 0 },
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b1020",
        color: "#e2e8f0",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        padding: "2rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>
          🔍 Production Diagnostic
        </h1>
        <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 24 }}>
          Snapshot of server-side truth at request time. Refresh anytime.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {(
            [
              ["✅ OK", stats.ok, "#10b981"],
              ["⚠️  WARN", stats.warn, "#f59e0b"],
              ["❌ FAIL", stats.fail, "#ef4444"],
              ["ℹ️  INFO", stats.info, "#3b82f6"],
            ] as const
          ).map(([label, count, color]) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${color}33`,
                borderRadius: 8,
                padding: "10px 14px",
              }}
            >
              <div style={{ fontSize: 11, color: "#94a3b8" }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color }}>{count}</div>
            </div>
          ))}
        </div>

        {checks.map((c, i) => {
          const color =
            c.status === "ok"
              ? "#10b981"
              : c.status === "warn"
                ? "#f59e0b"
                : c.status === "fail"
                  ? "#ef4444"
                  : "#3b82f6";
          const symbol =
            c.status === "ok" ? "✓" : c.status === "warn" ? "⚠" : c.status === "fail" ? "✕" : "i";
          return (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${color}33`,
                borderLeft: `3px solid ${color}`,
                borderRadius: 6,
                padding: "10px 14px",
                marginBottom: 6,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span style={{ color, fontWeight: 700, fontSize: 14, minWidth: 16 }}>{symbol}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
                  {c.detail}
                </div>
              </div>
            </div>
          );
        })}

        <p style={{ marginTop: 24, fontSize: 11, color: "#64748b" }}>
          Locale: {locale} · Generated at {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
}
