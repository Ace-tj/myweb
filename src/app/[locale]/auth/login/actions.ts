"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
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
});

export type LoginState =
  | { status: "idle" }
  | { status: "error"; errorKey: string }
  | { status: "ok" };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale"),
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

  const { email, password, locale } = parsed.data;

  // ── Mock fallback (no Supabase env) ──────────────────────────────────
  if (!supabaseConfigured()) {
    const result = await mockSignIn(email, password);
    if (!result.ok) return { status: "error", errorKey: "invalid" };
    redirect(`/${locale}${redirectPathForRole(result.session.role)}`);
  }

  // ── Supabase ─────────────────────────────────────────────────────────
  const supabase = await createServerClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    const msg = error?.message?.toLowerCase() ?? "";
    if (msg.includes("email") && msg.includes("confirm")) {
      return { status: "error", errorKey: "emailNotConfirmed" };
    }
    if (msg.includes("banned") || msg.includes("disabled")) {
      return { status: "error", errorKey: "banned" };
    }
    return { status: "error", errorKey: "invalid" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  const role: Role = (profile?.role as Role) ?? "buyer";

  // CANONICAL Supabase pattern (https://supabase.com/docs/guides/auth/server-side/nextjs):
  // revalidate the layout so the next render sees the freshly-set auth cookie.
  // Without this, Next.js may serve a cached layout that still thinks the
  // user is anonymous, which then causes pages downstream to redirect back
  // to login.
  revalidatePath("/", "layout");

  redirect(`/${locale}${redirectPathForRole(role)}`);
}
