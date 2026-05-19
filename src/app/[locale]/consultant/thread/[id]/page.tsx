import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations("consultant");
  const tChat = await getTranslations("chat");

  const profile = await getCurrentProfile();
  if (!profile) notFound();

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-muted">
        {tChat("offlinePreview")}
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
        <ArrowLeft className="size-4" /> {t("backToInbox")}
      </Link>
      <div className="mt-4 overflow-hidden rounded-3xl border border-border-strong/60 bg-surface shadow-lg ring-1 ring-black/5">
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
                "radial-gradient(220px 110px at 95% -10%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(180px 100px at -10% 110%, rgba(255,255,255,0.25), transparent 60%)",
            }}
          />
          <div className="relative flex items-center gap-3">
            <div className="relative grid size-11 place-items-center rounded-full bg-white/15 font-display text-base font-extrabold text-white backdrop-blur ring-1 ring-white/30">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {((conv as any).customer?.full_name ||
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                (conv as any).customer?.email ||
                "?")
                .slice(0, 1)
                .toUpperCase()}
              <span
                aria-hidden
                className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-[#E04E2C]"
              />
            </div>
            <div>
              <h1 className="font-display text-base font-extrabold leading-tight">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(conv as any).customer?.full_name ||
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  (conv as any).customer?.email ||
                  t("customerFallback")}
              </h1>
              <p className="mt-0.5 text-[11px] font-medium text-white/85">
                {conv.subject}
              </p>
            </div>
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
