import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getCurrentProfile } from "@/lib/auth";
import { getSupabaseServer } from "@/lib/supabase/server";
import { listMessages } from "@/lib/chat";
import { ChatThread } from "@/components/chat-thread";

export default async function ConsultantThreadPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const profile = await getCurrentProfile();
  if (!profile) notFound();

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
        Chat is offline in this preview.
      </div>
    );
  }

  const supabase = await getSupabaseServer();
  const { data: conv } = await supabase
    .from("conversations")
    .select("*, customer:profiles!conversations_customer_id_fkey(id, full_name, email)")
    .eq("id", id)
    .maybeSingle();

  if (!conv) notFound();
  const messages = await listMessages(id);

  return (
    <div>
      <Link
        href="/consultant/inbox"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" /> Back to inbox
      </Link>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-bg">
        <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-4">
          <div>
            <h1 className="font-display text-lg font-bold text-fg">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(conv as any).customer?.full_name ||
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                (conv as any).customer?.email ||
                "Customer"}
            </h1>
            <p className="mt-0.5 text-xs text-muted">{conv.subject}</p>
          </div>
        </header>
        <div className="h-[560px]">
          <ChatThread
            conversationId={id}
            myUserId={profile.id}
            initialMessages={messages}
          />
        </div>
      </div>
    </div>
  );
}
