"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { mockSignUp, supabaseConfigured, type Role } from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(["buyer", "consultant"]),
  locale: z.string().min(2).max(5),
  demo: z.string().optional(),
});

export type SignupState =
  | { status: "idle" }
  | { status: "error"; errorKey: string }
  | { status: "ok" };

function postSignupDestination(
  locale: string,
  role: Role,
  demo: string | undefined,
  variant: "ok" | "pending" | "registered",
): string {
  // Consultants always land on login awaiting approval.
  if (variant === "pending" || role === "consultant") {
    return `/${locale}/auth/login?pending=1`;
  }
  if (variant === "registered") {
    const qs = demo ? `&demo=${encodeURIComponent(demo)}` : "";
    return `/${locale}/auth/login?registered=1${qs}`;
  }
  // Auto-signed-in buyers go straight to dashboard.
  const qs = demo ? `?demo=${encodeURIComponent(demo)}` : "";
  return `/${locale}/buyer/dashboard${qs}`;
}

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
    demo: formData.get("demo") ?? undefined,
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
    if (issue?.path[0] === "password") {
      return { status: "error", errorKey: "passwordShort" };
    }
    if (issue?.path[0] === "name") {
      return { status: "error", errorKey: "nameRequired" };
    }
    if (issue?.path[0] === "role") {
      return { status: "error", errorKey: "roleRequired" };
    }
    return { status: "error", errorKey: "generic" };
  }

  const { email, password, name, role, locale, demo } = parsed.data;

  // ── Mock path (no Supabase configured) ─────────────────────────────────
  if (!supabaseConfigured()) {
    const result = await mockSignUp(email, password, name, role as Role);
    if (!result.ok) return { status: "error", errorKey: "generic" };
    redirect(postSignupDestination(locale, role as Role, demo, "ok"));
  }

  // ── Supabase path ──────────────────────────────────────────────────────
  const supabase = await createServerClient();

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
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

  // Create / upsert profile row (schema requires NOT NULL phone — pass empty).
  await supabase.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: name,
    role,
    phone: "",
  });

  // Auto sign-in so we can set the session cookie without an email-confirm step.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    redirect(postSignupDestination(locale, role as Role, demo, "registered"));
  }

  redirect(postSignupDestination(locale, role as Role, demo, "ok"));
}
