"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  mockSignIn,
  redirectPathForRole,
  supabaseConfigured,
  type Role,
} from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  locale: z.string().min(2).max(5),
  from: z.string().optional(),
});

export type LoginState =
  | { status: "idle" }
  | { status: "error"; errorKey: string }
  | { status: "ok" };

/** Validate a `from` redirect target — only same-origin, locale-scoped, non-auth paths. */
function safeRedirect(from: string | undefined, locale: string): string | null {
  if (!from) return null;
  if (!from.startsWith(`/${locale}/`)) return null;
  if (from.startsWith("//")) return null;
  if (from.includes("://")) return null;
  if (from.includes("\\")) return null;
  if (from.startsWith(`/${locale}/auth/`)) return null;
  return from;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale"),
    from: formData.get("from") ?? undefined,
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    if (issue?.path[0] === "email") {
      return {
        status: "error",
        errorKey:
          issue.code === "invalid_format" ? "emailInvalid" : "emailRequired",
      };
    }
    if (issue?.path[0] === "password") {
      return {
        status: "error",
        errorKey:
          issue.code === "too_small" ? "passwordShort" : "passwordRequired",
      };
    }
    return { status: "error", errorKey: "generic" };
  }

  const { email, password, locale, from } = parsed.data;
  const safeFrom = safeRedirect(from, locale);

  // ── Mock path (no Supabase configured) ─────────────────────────────────
  if (!supabaseConfigured()) {
    const result = await mockSignIn(email, password);
    if (!result.ok) return { status: "error", errorKey: "invalid" };
    redirect(safeFrom ?? `/${locale}${redirectPathForRole(result.session.role)}`);
  }

  // ── Supabase path ──────────────────────────────────────────────────────
  const supabase = await createServerClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { status: "error", errorKey: "invalid" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  const role: Role = (profile?.role as Role) ?? "buyer";
  redirect(safeFrom ?? `/${locale}${redirectPathForRole(role)}`);
}
