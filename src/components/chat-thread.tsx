"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Send, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { sendMessageAction } from "@/app/actions/chat";
import type { Message } from "@/lib/types";

export function ChatThread({
  conversationId,
  myUserId,
  initialMessages,
  placeholder,
}: {
  conversationId: string;
  myUserId: string;
  initialMessages: Message[];
  placeholder?: string;
}) {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [sending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
      return;
    const supabase = getSupabaseBrowser();
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: { new: Message }) => {
          setMessages((prev) =>
            prev.some((m) => m.id === payload.new.id)
              ? prev
              : [...prev, payload.new],
          );
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    startTransition(async () => {
      const res = await sendMessageAction(conversationId, text);
      if (!res.ok && res.error) {
        setDraft(text);
      }
    });
  }

  return (
    <div className="flex h-full flex-col bg-surface">
      <div
        ref={scrollRef}
        className="flex-1 space-y-2.5 overflow-y-auto px-4 py-5"
        aria-live="polite"
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 110% -10%, rgb(224 78 44 / 0.05), transparent 60%), radial-gradient(500px 280px at -10% 120%, rgb(193 137 49 / 0.05), transparent 60%)",
        }}
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-8 text-center">
            <p className="text-sm font-medium text-muted">
              {t("emptyCustomer")}
            </p>
          </div>
        )}
        {messages.map((m, idx) => {
          const mine = m.sender_id === myUserId;
          const prev = messages[idx - 1];
          const grouped = prev && prev.sender_id === m.sender_id;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"} ${
                grouped ? "mt-1" : "mt-3"
              }`}
            >
              <div
                className={`max-w-[78%] px-3.5 py-2 text-sm leading-relaxed shadow-sm ${
                  mine
                    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-[#F76D3C] to-[#E04E2C] text-white"
                    : "rounded-2xl rounded-bl-md border border-border bg-bg text-fg"
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{m.body}</div>
                <div
                  className={`mt-1 text-[10px] font-medium ${
                    mine ? "text-white/75" : "text-subtle"
                  }`}
                >
                  {new Date(m.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={onSubmit}
        className="relative flex items-end gap-2 border-t border-border bg-surface px-3 py-3"
      >
        <div className="flex-1 rounded-2xl border border-border bg-bg shadow-sm transition focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgb(224_78_44_/_0.18)]">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                (e.currentTarget.form as HTMLFormElement).requestSubmit();
              }
            }}
            rows={1}
            placeholder={placeholder ?? t("placeholder")}
            className="block w-full resize-none rounded-2xl bg-transparent px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle focus:outline-none"
            style={{ minHeight: 42, maxHeight: 128 }}
          />
        </div>
        <button
          type="submit"
          disabled={sending || !draft.trim()}
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-white shadow-[0_8px_20px_-6px_rgba(224,78,44,0.55)] transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          style={{
            background: sending || !draft.trim()
              ? "rgb(var(--surface-2))"
              : "linear-gradient(135deg, #F76D3C 0%, #E04E2C 100%)",
            color: sending || !draft.trim() ? "rgb(var(--subtle))" : undefined,
          }}
          aria-label={t("send")}
        >
          {sending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </button>
      </form>
    </div>
  );
}
