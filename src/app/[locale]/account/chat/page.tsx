import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
        <ArrowLeft className="size-4" /> Back to account
      </Link>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-bg">
        <header className="border-b border-border bg-surface px-5 py-4">
          <h1 className="font-display text-xl font-bold text-fg">{t("title")}</h1>
          <p className="mt-0.5 text-sm text-muted">{t("subtitle")}</p>
        </header>
        <div className="h-[520px]">
          {!conversation ? (
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted">
              Chat is offline in this preview. Configure Supabase to enable.
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
