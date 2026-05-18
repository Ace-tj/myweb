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
        // Restore draft if it failed; keep simple alert for prototype.
        setDraft(text);
      }
    });
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto p-4"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">
            {t("emptyCustomer")}
          </p>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === myUserId;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  mine
                    ? "rounded-br-md bg-primary text-primary-fg"
                    : "rounded-bl-md bg-surface-2 text-fg"
                }`}
              >
                {m.body}
                <div
                  className={`mt-1 text-[10px] ${mine ? "text-primary-fg/70" : "text-muted"}`}
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
        className="flex items-end gap-2 border-t border-border bg-surface p-3"
      >
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
          className="min-h-[40px] max-h-32 flex-1 resize-none rounded-xl border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending || !draft.trim()}
          className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-fg transition hover:bg-primary-hover disabled:opacity-60"
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
