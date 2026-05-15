"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  mockSignIn,
  redirectPathForRole,
  supabaseConfigured,
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
        errorKey: issue.code === "invalid_format" ? "emailInvalid" : "emailRequired",
      };
    }
    if (issue?.path[0] === "password") {
      return {
        status: "error",
        errorKey: issue.code === "too_small" ? "passwordShort" : "passwordRequired",
      };
    }
    return { status: "error", errorKey: "generic" };
  }

  const { email, password, locale } = parsed.data;

  if (!supabaseConfigured()) {
    const result = await mockSignIn(email, password);
    if (!result.ok) return { status: "error", errorKey: "invalid" };
    redirect(`/${locale}${redirectPathForRole(result.session.role)}`);
    return { status: "ok" };
  }

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
    .select("role, approved")
    .eq("id", data.user.id)
    .single();

  if (profile?.role === "consultant" && !profile.approved) {
    await supabase.auth.signOut();
    return { status: "error", errorKey: "notApproved" };
  }

  redirect(
    `/${locale}${redirectPathForRole((profile?.role as "buyer" | "consultant" | "admin") ?? "buyer")}`,
  );
  // redirect() throws — the line below is unreachable at runtime but satisfies TS
  return { status: "ok" };
}
