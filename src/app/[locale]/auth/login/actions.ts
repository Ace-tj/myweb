"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  mockSignIn,
  redirectPathForRole,
  supabaseConfigured,
  type Role,
} from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";

// Tag every log line so it's easy to grep in Vercel runtime logs.
const TAG = "[loginAction]";

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
  console.error(`${TAG} START`);
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
  console.error(`${TAG} supabaseConfigured=true, calling signInWithPassword`);
  const supabase = await createServerClient();
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.error(
    `${TAG} signInWithPassword result: error=${error?.message ?? "none"}, user=${data?.user?.id ?? "null"}`,
  );

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

  // Snapshot the cookie store immediately after sign-in so the Vercel log
  // shows exactly which cookies Supabase actually wrote.
  try {
    const snap = await cookies();
    const cookieNames = snap.getAll().map((c) => c.name);
    console.error(`${TAG} cookies after signIn: [${cookieNames.join(", ")}]`);
  } catch (e) {
    console.error(`${TAG} cookies snapshot failed: ${(e as Error).message}`);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();

  const role: Role = (profile?.role as Role) ?? "buyer";
  console.error(`${TAG} role=${role}, about to revalidate + redirect`);

  // CANONICAL Supabase pattern (https://supabase.com/docs/guides/auth/server-side/nextjs):
  // revalidate the layout so the next render sees the freshly-set auth cookie.
  // Without this, Next.js may serve a cached layout that still thinks the
  // user is anonymous, which then causes pages downstream to redirect back
  // to login.
  revalidatePath("/", "layout");

  redirect(`/${locale}${redirectPathForRole(role)}`);
}
