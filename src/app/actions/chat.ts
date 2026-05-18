"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getSupabaseServer } from "@/lib/supabase/server";

const SendSchema = z.object({
  conversationId: z.string().uuid(),
  body: z.string().min(1).max(4000),
});

export type SendResult = { ok: boolean; error?: string };

export async function sendMessageAction(
  conversationId: string,
  body: string,
): Promise<SendResult> {
  const parsed = SendSchema.safeParse({ conversationId, body });
  if (!parsed.success) return { ok: false, error: "Invalid input" };

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { ok: false, error: "Chat is offline in this preview." };
  }

  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  const { error } = await supabase.from("messages").insert({
    conversation_id: parsed.data.conversationId,
    sender_id: user.id,
    body: parsed.data.body,
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath("/[locale]/account/chat", "page");
  revalidatePath("/[locale]/consultant/inbox", "page");
  return { ok: true };
}

export async function claimConversationAction(
  conversationId: string,
): Promise<SendResult> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return { ok: false, error: "Supabase not configured" };

  const supabase = await getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not authenticated" };

  const { error } = await supabase
    .from("conversations")
    .update({ consultant_id: user.id })
    .eq("id", conversationId);
  if (error) return { ok: false, error: error.message };

  revalidatePath("/[locale]/consultant/inbox", "page");
  return { ok: true };
}
