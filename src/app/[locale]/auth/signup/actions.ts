"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { mockSignUp, supabaseConfigured, type Role } from "@/lib/auth";
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

  const { email, password, name, role, locale } = parsed.data;
  const isConsultant = role === "consultant";

  // ── Mock fallback (no Supabase env) ──────────────────────────────────
  if (!supabaseConfigured()) {
    const result = await mockSignUp(email, password, name, role as Role);
    if (!result.ok) return { status: "error", errorKey: "generic" };
    redirect(
      isConsultant
        ? `/${locale}/auth/login?pending=1`
        : `/${locale}/buyer/dashboard`,
    );
  }

  // ── Supabase ─────────────────────────────────────────────────────────
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

  // Create profile row (NOT NULL phone — pass empty).
  await supabase.from("profiles").upsert({
    id: data.user.id,
    email,
    full_name: name,
    role,
    phone: "",
  });

  // Auto sign-in for buyers so they land directly in the dashboard. Consultants
  // skip auto-sign-in: they bounce to /auth/login?pending=1 because they need
  // admin approval before they can use their account.
  if (isConsultant) {
    redirect(`/${locale}/auth/login?pending=1`);
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    redirect(`/${locale}/auth/login?registered=1`);
  }

  // Revalidate layout so the buyer dashboard sees the freshly-set auth cookie.
  revalidatePath("/", "layout");

  redirect(`/${locale}/buyer/dashboard`);
}
