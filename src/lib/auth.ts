// Auth abstraction with a mock fallback.
// When Supabase env vars are missing, we use a cookie-based mock so the UI
// can be developed and previewed end-to-end. Once .env.local is set, the
// real Supabase client takes over automatically.

import { cookies } from "next/headers";
import { createClient as createServerClient } from "@/lib/supabase/server";

export type Role = "buyer" | "consultant" | "admin";

export type MockSession = {
  id: string;
  email: string;
  name: string;
  role: Role;
  isAgent?: boolean;
};

const MOCK_COOKIE = "myweb_mock_session";

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
  // Pretend any email works. Derive role from email prefix for convenience:
  //   admin@... → admin    consultant@... → consultant    anything else → buyer
  const prefix = email.split("@")[0]?.toLowerCase() ?? "";
  let role: Role = "buyer";
  if (prefix.startsWith("admin")) role = "admin";
  else if (prefix.startsWith("consultant") || prefix.startsWith("agent")) role = "consultant";

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

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let { data: profile } = await supabase
    .from("profiles")
    .select("id, name, role, is_agent")
    .eq("id", user.id)
    .maybeSingle();

  // Self-heal: if the auth user exists but profiles row is missing (e.g.
  // the signup trigger silently failed or DB was provisioned after the
  // user signed up), create the row now using auth metadata.
  if (!profile) {
    const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
    const fallbackName =
      (typeof meta.name === "string" && meta.name) ||
      user.email?.split("@")[0] ||
      "User";
    const fallbackRole =
      (typeof meta.role === "string" && (meta.role === "consultant" || meta.role === "admin")
        ? meta.role
        : "buyer") as Role;

    const { data: created } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email,
          name: fallbackName,
          role: fallbackRole,
          approved: fallbackRole === "buyer",
        },
        { onConflict: "id" },
      )
      .select("id, name, role, is_agent")
      .maybeSingle();

    if (created) profile = created;
  }

  if (!profile) return null;

  return {
    id: profile.id,
    email: user.email ?? "",
    name: profile.name,
    role: profile.role as Role,
    isAgent: profile.is_agent ?? undefined,
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
