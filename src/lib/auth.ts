// Auth abstraction.
//
// Session storage is now self-managed: each successful sign-in writes a row
// to public.user_sessions and returns the row's UUID in a `mw_session`
// cookie. Server-side, we look the session up via the service-role client
// (bypassing @supabase/ssr cookie handling entirely, which was unreliable
// on this Next.js 16 + Vercel deployment).

import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export type Role = "buyer" | "consultant" | "admin";

export type MockSession = {
  id: string;
  email: string;
  name: string;
  role: Role;
  isAgent?: boolean;
};

const MOCK_COOKIE = "myweb_mock_session";
export const SESSION_COOKIE = "mw_session";

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("YOUR_PROJECT_REF"),
  );
}

// ----- Mock implementation (works without Supabase) -----

export async function mockSignIn(
  email: string,
  _password: string,
): Promise<{ ok: true; session: MockSession } | { ok: false; error: string }> {
  const prefix = email.split("@")[0]?.toLowerCase() ?? "";
  let role: Role = "buyer";
  if (prefix.startsWith("admin")) role = "admin";
  else if (prefix.startsWith("consultant") || prefix.startsWith("agent"))
    role = "consultant";

  const session: MockSession = {
    id: `mock-${Buffer.from(email).toString("base64").slice(0, 12)}`,
    email,
    name: prefix || "User",
    role,
    isAgent: prefix.startsWith("agent"),
  };

  const cookieStore = await cookies();
  cookieStore.set(MOCK_COOKIE, JSON.stringify(session), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });

  return { ok: true, session };
}

export async function mockSignUp(
  email: string,
  _password: string,
  name: string,
  role: Role,
): Promise<{ ok: true; session: MockSession } | { ok: false; error: string }> {
  const session: MockSession = {
    id: `mock-${Buffer.from(email).toString("base64").slice(0, 12)}`,
    email,
    name,
    role,
  };
  const cookieStore = await cookies();
  cookieStore.set(MOCK_COOKIE, JSON.stringify(session), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return { ok: true, session };
}

export async function mockSignOut() {
  const cookieStore = await cookies();
  cookieStore.delete(MOCK_COOKIE);
}

export async function getMockSession(): Promise<MockSession | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(MOCK_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MockSession;
  } catch {
    return null;
  }
}

// ----- Unified API (auto-switches between mock and Supabase) -----

export async function getCurrentSession(): Promise<MockSession | null> {
  if (!supabaseConfigured()) return getMockSession();

  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  // Look the session up via service-role. Bypasses RLS and any
  // @supabase/ssr cookie handling.
  let admin;
  try {
    admin = createAdminClient();
  } catch {
    return null;
  }

  const { data: row, error } = await admin
    .from("user_sessions")
    .select("user_id, expires_at")
    .eq("id", sessionId)
    .maybeSingle();

  if (error || !row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) return null;

  // Fetch user details. Schema fields documented in lib/auth previously.
  const { data: profile } = await admin
    .from("profiles")
    .select("id, full_name, role, email")
    .eq("id", row.user_id)
    .maybeSingle();

  // Self-heal: if profile is missing for an existing auth.users row,
  // create one with sane defaults.
  if (!profile) {
    const { data: authUser } = await admin.auth.admin.getUserById(row.user_id);
    const email = authUser?.user?.email ?? "";
    const meta =
      (authUser?.user?.user_metadata as Record<string, unknown>) ?? {};
    const fallbackName =
      (typeof meta.name === "string" && meta.name) ||
      (typeof meta.full_name === "string" && meta.full_name) ||
      email.split("@")[0] ||
      "User";
    const fallbackRole: Role =
      typeof meta.role === "string" &&
      (meta.role === "consultant" || meta.role === "admin")
        ? (meta.role as Role)
        : "buyer";

    const { data: created } = await admin
      .from("profiles")
      .upsert(
        {
          id: row.user_id,
          email,
          full_name: fallbackName,
          role: fallbackRole,
          phone: "",
        },
        { onConflict: "id" },
      )
      .select("id, full_name, role, email")
      .maybeSingle();

    if (!created) return null;
    return {
      id: created.id,
      email: created.email ?? email,
      name: (created.full_name as string) || fallbackName,
      role: (created.role as Role) ?? fallbackRole,
    };
  }

  return {
    id: profile.id,
    email: (profile.email as string) ?? "",
    name: (profile.full_name as string) ?? "User",
    role: profile.role as Role,
  };
}

export function redirectPathForRole(role: Role): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "consultant":
      return "/consultant/dashboard";
    default:
      return "/buyer/dashboard";
  }
}
