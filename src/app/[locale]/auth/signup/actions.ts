"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(1),
  role: z.enum(["customer", "consultant"]),
  locale: z.string(),
});

export type SignupState = { ok: boolean; error?: string };

export async function signupAction(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const parsed = Schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
    role: formData.get("role"),
    locale: formData.get("locale"),
  });
  if (!parsed.success) {
    return { ok: false, error: "validation" };
  }
  const { email, password, fullName, role, locale } = parsed.data;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { ok: false, error: "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local." };
  }

  const supabase = await getSupabaseServer();

  const { error: signUpErr } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role } },
  });
  if (signUpErr) {
    if (signUpErr.message.toLowerCase().includes("already"))
      return { ok: false, error: "emailInUse" };
    return { ok: false, error: signUpErr.message };
  }

  // Immediately sign in so the user lands authenticated.
  const { error: signInErr } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (signInErr) {
    // Account created but email confirmation may be required.
    redirect(`/${locale}/auth/login?confirm=1`);
  }

  redirect(`/${locale}/account`);
}
