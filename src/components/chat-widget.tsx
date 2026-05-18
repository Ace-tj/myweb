"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChatThread } from "./chat-thread";
import type { Message, Profile } from "@/lib/types";

export function ChatWidget({
  profile,
  conversationId,
  initialMessages,
}: {
  profile: Profile | null;
  conversationId: string | null;
  initialMessages: Message[];
}) {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);

  // Don't render for consultants/admins on customer surfaces.
  if (profile?.role === "admin" || profile?.role === "consultant") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-fg shadow-xl shadow-primary/30 transition active:scale-95 hover:bg-primary-hover"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[560px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
          <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <div>
              <div className="text-sm font-bold text-fg">{t("title")}</div>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <span className="size-2 rounded-full bg-success" />
                {t("subtitle")}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid size-7 place-items-center rounded-md text-muted hover:bg-surface-2"
            >
              <X className="size-4" />
            </button>
          </header>

          {!profile ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-sm text-muted">{t("loginToChat")}</p>
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
              >
                Sign in
              </Link>
            </div>
          ) : !conversationId ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-sm text-muted">
                Chat is offline in this preview. Configure Supabase to enable.
              </p>
            </div>
          ) : (
            <ChatThread
              conversationId={conversationId}
              myUserId={profile.id}
              initialMessages={initialMessages}
            />
          )}
        </div>
      )}
    </>
  );
}
