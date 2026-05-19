import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { getOrCreateMyConversation, listMessages } from "@/lib/chat";
import { ChatThread } from "@/components/chat-thread";

export default async function AccountChatPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("chat");
  const tAccount = await getTranslations("account");

  const profile = await getCurrentProfile();
  if (!profile) redirect(`/${locale}/auth/login?next=/${locale}/account/chat`);
  if (profile.role !== "customer") redirect(`/${locale}/account`);

  const conversation = await getOrCreateMyConversation(profile.id);
  const messages = conversation ? await listMessages(conversation.id) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" /> {tAccount("backToAccount")}
      </Link>
      <div className="mt-4 overflow-hidden rounded-3xl border border-border-strong/60 bg-surface shadow-lg ring-1 ring-black/5">
        <header
          className="relative flex items-center gap-3 px-5 py-4 text-white"
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
                "radial-gradient(220px 110px at 95% -10%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(180px 100px at -10% 110%, rgba(255,255,255,0.25), transparent 60%)",
            }}
          />
          <div className="relative grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/30">
            <Sparkles className="size-5" />
            <span
              aria-hidden
              className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-[#E04E2C]"
            />
          </div>
          <div className="relative">
            <h1 className="font-display text-lg font-extrabold leading-tight">
              {t("title")}
            </h1>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-white/85">
              <span className="size-1.5 rounded-full bg-white" />
              {t("subtitle")}
            </p>
          </div>
        </header>
        <div className="h-[520px]">
          {!conversation ? (
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted">
              {t("offlinePreview")}
            </div>
          ) : (
            <ChatThread
              conversationId={conversation.id}
              myUserId={profile.id}
              initialMessages={messages}
            />
          )}
        </div>
      </div>
    </div>
  );
}
