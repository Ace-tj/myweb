import { getSupabaseServer } from "./supabase/server";
import type { Conversation, Message, Profile } from "./types";

export async function listMyConversations(): Promise<Conversation[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return [];
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("conversations")
    .select("*")
    .order("last_message_at", { ascending: false })
    .limit(50);
  return (data as Conversation[]) ?? [];
}

export async function getOrCreateMyConversation(
  customerId: string,
): Promise<Conversation | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return null;
  const supabase = await getSupabaseServer();
  const { data: existing } = await supabase
    .from("conversations")
    .select("*")
    .eq("customer_id", customerId)
    .eq("status", "open")
    .order("last_message_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) return existing as Conversation;

  const { data: created } = await supabase
    .from("conversations")
    .insert({ customer_id: customerId, subject: "New conversation" })
    .select("*")
    .single();
  return (created as Conversation) ?? null;
}

export async function listMessages(conversationId: string): Promise<Message[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return [];
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(200);
  return (data as Message[]) ?? [];
}

export async function listOpenConversationsForConsultant(): Promise<
  Array<Conversation & { customer: Pick<Profile, "id" | "full_name" | "email"> }>
> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return [];
  const supabase = await getSupabaseServer();
  const { data } = await supabase
    .from("conversations")
    .select("*, customer:profiles!conversations_customer_id_fkey(id, full_name, email)")
    .eq("status", "open")
    .order("last_message_at", { ascending: false });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any[]) ?? [];
}
