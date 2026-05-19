"use client";

import { useState } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
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

  if (profile?.role === "admin" || profile?.role === "consultant") return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t("closeWidget") : t("openWidget")}
        aria-expanded={open}
        className="group fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full text-white shadow-[0_14px_36px_-8px_rgba(224,78,44,0.55)] transition-transform duration-200 ease-out active:scale-95 hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, #F76D3C 0%, #E04E2C 55%, #B33C1F 100%)",
        }}
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full anim-pulse-ring"
          />
        )}
        <span className="relative">
          {open ? (
            <X className="size-5" />
          ) : (
            <MessageCircle className="size-6" />
          )}
        </span>
        {!open && (
          <span
            aria-hidden
            className="absolute right-1 top-1 size-3 rounded-full bg-success ring-2 ring-white"
          />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="anim-spring fixed bottom-24 right-5 z-50 flex h-[580px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-border-strong/60 bg-surface shadow-[0_30px_80px_-12px_rgba(63,38,22,0.45),_0_0_0_1px_rgba(255,255,255,0.06)_inset] ring-1 ring-black/5"
        >
          {/* Premium gradient header */}
          <header
            className="relative flex items-center justify-between px-5 py-4 text-white"
            style={{
              background:
                "linear-gradient(135deg, #F76D3C 0%, #E04E2C 55%, #B33C1F 100%)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(180px 90px at 90% -10%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(160px 80px at -10% 110%, rgba(255,255,255,0.25), transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-3">
              <div className="relative grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/30">
                <Sparkles className="size-5" />
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-[#E04E2C]"
                />
              </div>
              <div>
                <div className="font-display text-base font-extrabold leading-tight">
                  {t("title")}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-white/85">
                  <span className="size-1.5 rounded-full bg-white" />
                  {t("subtitle")}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("closeWidget")}
              className="relative grid size-8 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
            >
              <X className="size-4" />
            </button>
          </header>

          {!profile ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
              <div className="grad-ember grid size-14 place-items-center rounded-2xl text-white shadow-[0_12px_30px_-8px_rgba(224,78,44,0.55)]">
                <MessageCircle className="size-6" />
              </div>
              <p className="text-pretty text-sm leading-relaxed text-muted">
                {t("loginToChat")}
              </p>
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="btn-primary mt-1"
              >
                {t("signIn")}
              </Link>
            </div>
          ) : !conversationId ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-surface px-6 text-center">
              <div className="grid size-12 place-items-center rounded-2xl bg-surface-2 text-muted">
                <MessageCircle className="size-5" />
              </div>
              <p className="text-sm text-muted">{t("offlinePreview")}</p>
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
