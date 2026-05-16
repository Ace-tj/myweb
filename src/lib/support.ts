"use server";

import { getCurrentSession, supabaseConfigured } from "@/lib/auth";
import { createClient as createServerClient } from "@/lib/supabase/server";

export interface SupportMessage {
  id: string;
  threadId: string;
  fromRole: "user" | "admin";
  body: string;
  imageUrl: string | null;
  read: boolean;
  createdAt: string;
}

export interface SupportThread {
  id: string;
  userId: string;
  displayName: string;
  displayEmail: string | null;
  lastMessageAt: string;
  unreadForAdmin: number;
  unreadForUser: number;
  createdAt: string;
}

export interface SupportThreadWithLast extends SupportThread {
  lastBody: string | null;
  lastFromRole: "user" | "admin" | null;
}

export type SupportResult =
  | { ok: true; thread: SupportThread; messages: SupportMessage[] }
  | { ok: false; reason: "anon" | "no_db" | "error"; message?: string };

function rowToMessage(r: Record<string, unknown>): SupportMessage {
  return {
    id: String(r.id),
    threadId: String(r.thread_id),
    fromRole: r.from_role as "user" | "admin",
    body: (r.body as string | null) ?? "",
    imageUrl: (r.image_url as string | null) ?? null,
    read: Boolean(r.read),
    createdAt: String(r.created_at),
  };
}

function rowToThread(r: Record<string, unknown>): SupportThread {
  return {
    id: String(r.id),
    userId: String(r.user_id),
    displayName: String(r.display_name ?? "User"),
    displayEmail: (r.display_email as string | null) ?? null,
    lastMessageAt: String(r.last_message_at),
    unreadForAdmin: Number(r.unread_for_admin ?? 0),
    unreadForUser: Number(r.unread_for_user ?? 0),
    createdAt: String(r.created_at),
  };
}

// ─── User-side actions ─────────────────────────────────────────────────────

export async function getMyThread(): Promise<SupportResult> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (!supabaseConfigured()) return { ok: false, reason: "no_db" };

  const supabase = await createServerClient();

  let { data: thread, error: tErr } = await supabase
    .from("support_threads")
    .select("*")
    .eq("user_id", session.id)
    .maybeSingle();

  if (tErr) return { ok: false, reason: "error", message: tErr.message };

  if (!thread) {
    const { data: created, error: cErr } = await supabase
      .from("support_threads")
      .insert({
        user_id: session.id,
        display_name: session.name || "User",
        display_email: session.email || null,
      })
      .select("*")
      .single();
    if (cErr) return { ok: false, reason: "error", message: cErr.message };
    thread = created;
  }

  const { data: msgs, error: mErr } = await supabase
    .from("support_messages")
    .select("*")
    .eq("thread_id", thread.id)
    .order("created_at", { ascending: true });

  if (mErr) return { ok: false, reason: "error", message: mErr.message };

  return {
    ok: true,
    thread: rowToThread(thread),
    messages: (msgs || []).map(rowToMessage),
  };
}

export async function sendMyMessage(
  body: string,
  imageUrl: string | null = null,
): Promise<{ ok: true; message: SupportMessage } | { ok: false; reason: string }> {
  const session = await getCurrentSession();
  if (!session) return { ok: false, reason: "anon" };
  if (!supabaseConfigured()) return { ok: false, reason: "no_db" };
  const trimmed = body.trim();
  if (!trimmed && !imageUrl) return { ok: false, reason: "empty" };

  const supabase = await createServerClient();

  // Ensure thread exists
  const threadResult = await getMyThread();
  if (!threadResult.ok) return { ok: false, reason: threadResult.reason };
  const threadId = threadResult.thread.id;

  const { data, error } = await supabase
    .from("support_messages")
    .insert({
      thread_id: threadId,
      from_role: "user",
      sender_id: session.id,
      body: trimmed,
      image_url: imageUrl,
    })
    .select("*")
    .single();

  if (error) return { ok: false, reason: error.message };
  return { ok: true, message: rowToMessage(data) };
}

export async function markMyThreadRead(): Promise<{ ok: boolean }> {
  const session = await getCurrentSession();
  if (!session || !supabaseConfigured()) return { ok: false };
  const supabase = await createServerClient();

  // Mark admin messages as read AND reset unread counter
  const { data: thread } = await supabase
    .from("support_threads")
    .select("id")
    .eq("user_id", session.id)
    .maybeSingle();
  if (!thread) return { ok: true };

  await supabase
    .from("support_messages")
    .update({ read: true })
    .eq("thread_id", thread.id)
    .eq("from_role", "admin")
    .eq("read", false);

  await supabase
    .from("support_threads")
    .update({ unread_for_user: 0 })
    .eq("id", thread.id);

  return { ok: true };
}

// ─── Admin-side actions ────────────────────────────────────────────────────

export async function adminListThreads(): Promise<
  { ok: true; threads: SupportThreadWithLast[] } | { ok: false; reason: string }
> {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return { ok: false, reason: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "no_db" };

  const supabase = await createServerClient();

  const { data: threads, error } = await supabase
    .from("support_threads")
    .select("*")
    .order("last_message_at", { ascending: false });

  if (error) return { ok: false, reason: error.message };

  // Get the last message per thread
  const ids = (threads || []).map((t) => t.id);
  const lastByThread = new Map<string, { body: string; from_role: string }>();
  if (ids.length > 0) {
    const { data: lastMsgs } = await supabase
      .from("support_messages")
      .select("thread_id, body, from_role, created_at")
      .in("thread_id", ids)
      .order("created_at", { ascending: false });

    for (const m of lastMsgs || []) {
      if (!lastByThread.has(m.thread_id)) {
        lastByThread.set(m.thread_id, { body: m.body, from_role: m.from_role });
      }
    }
  }

  const enriched: SupportThreadWithLast[] = (threads || []).map((t) => {
    const last = lastByThread.get(t.id);
    return {
      ...rowToThread(t),
      lastBody: last?.body ?? null,
      lastFromRole: (last?.from_role as "user" | "admin" | undefined) ?? null,
    };
  });

  return { ok: true, threads: enriched };
}

export async function adminGetThread(
  threadId: string,
): Promise<SupportResult> {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return { ok: false, reason: "error", message: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "no_db" };

  const supabase = await createServerClient();
  const { data: thread, error: tErr } = await supabase
    .from("support_threads")
    .select("*")
    .eq("id", threadId)
    .single();
  if (tErr || !thread) return { ok: false, reason: "error", message: tErr?.message ?? "not found" };

  const { data: msgs, error: mErr } = await supabase
    .from("support_messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });
  if (mErr) return { ok: false, reason: "error", message: mErr.message };

  // Mark user messages as read by admin
  await supabase
    .from("support_messages")
    .update({ read: true })
    .eq("thread_id", threadId)
    .eq("from_role", "user")
    .eq("read", false);
  await supabase
    .from("support_threads")
    .update({ unread_for_admin: 0 })
    .eq("id", threadId);

  return {
    ok: true,
    thread: rowToThread(thread),
    messages: (msgs || []).map(rowToMessage),
  };
}

export async function adminReply(
  threadId: string,
  body: string,
  imageUrl: string | null = null,
): Promise<{ ok: true; message: SupportMessage } | { ok: false; reason: string }> {
  const session = await getCurrentSession();
  if (!session || session.role !== "admin") return { ok: false, reason: "forbidden" };
  if (!supabaseConfigured()) return { ok: false, reason: "no_db" };
  const trimmed = body.trim();
  if (!trimmed && !imageUrl) return { ok: false, reason: "empty" };

  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("support_messages")
    .insert({
      thread_id: threadId,
      from_role: "admin",
      sender_id: session.id,
      body: trimmed,
      image_url: imageUrl,
    })
    .select("*")
    .single();

  if (error) return { ok: false, reason: error.message };
  return { ok: true, message: rowToMessage(data) };
}
