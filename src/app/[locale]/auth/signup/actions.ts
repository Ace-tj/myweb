"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  mockSignUp,
  supabaseConfigured,
  type Role,
} from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(["buyer", "consultant"]),
  locale: z.string().min(2).max(5),
});

export type SignupState =
  | { status: "idle" }
  | { status: "error"; errorKey: string }
  | { status: "ok" };

export async function signupAction(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    role: formData.get("role"),
    locale: formData.get("locale"),
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    if (issue?.path[0] === "email") {
      return {
        status: "error",
        errorKey:
          issue.code === "invalid_format" || issue.code === "invalid_value"
            ? "emailInvalid"
            : "emailRequired",
      };
    }
    if (issue?.path[0] === "password") return { status: "error", errorKey: "passwordShort" };
    if (issue?.path[0] === "name") return { status: "error", errorKey: "nameRequired" };
    if (issue?.path[0] === "role") return { status: "error", errorKey: "roleRequired" };
    return { status: "error", errorKey: "generic" };
  }

  const { email, password, name, role, locale } = parsed.data;

  // ── Mock path (no Supabase configured) ──────────────────────────────────
  if (!supabaseConfigured()) {
    const result = await mockSignUp(email, password, name, role as Role);
    if (!result.ok) return { status: "error", errorKey: "generic" };
    const dest =
      role === "consultant"
        ? `/${locale}/auth/login?pending=1`
        : `/${locale}/buyer/dashboard`;
    redirect(dest);
    return { status: "ok" };
  }

  // ── Supabase path ────────────────────────────────────────────────────────
  const supabase = await createServerClient();

  // Sign up — this creates the auth user. If Supabase project has
  // "Confirm email" disabled the session will be available immediately.
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Skip email verification entirely — users are trusted at sign-up
      emailRedirectTo: undefined,
      data: { name, role },
    },
  });

  if (error || !data.user) {
    if (error?.message?.toLowerCase().includes("already")) {
      return { status: "error", errorKey: "emailTaken" };
    }
    return { status: "error", errorKey: "generic" };
  }

  // Create profile row. Use `full_name`/`phone` to match the existing
  // shared-database schema (NOT NULL phone constraint).
  await supabase.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: name,
    role,
    phone: "",
  });

  // Auto sign-in so the session cookie is set immediately, bypassing any
  // email-confirmation redirect that Supabase would normally enforce.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    // If auto-login fails (e.g. Supabase still requires confirmation in project
    // settings), send them to login with a helpful note instead of erroring.
    const dest =
      role === "consultant"
        ? `/${locale}/auth/login?pending=1`
        : `/${locale}/auth/login?registered=1`;
    redirect(dest);
    return { status: "ok" };
  }

  // Success — redirect directly into the app, no email step required.
  const dest =
    role === "consultant"
      ? `/${locale}/auth/login?pending=1`
      : `/${locale}/buyer/dashboard`;
  redirect(dest);
  return { status: "ok" };
}
