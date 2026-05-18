"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  locale: z.string(),
  next: z.string().optional().nullable(),
});

export type LoginState = { ok: boolean; error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = Schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    locale: formData.get("locale"),
    next: formData.get("next"),
  });
  if (!parsed.success) return { ok: false, error: "validation" };

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { ok: false, error: "Supabase not configured. Set credentials in .env.local." };
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });
  if (error) return { ok: false, error: "invalidCredentials" };

  redirect(parsed.data.next || `/${parsed.data.locale}/account`);
}
