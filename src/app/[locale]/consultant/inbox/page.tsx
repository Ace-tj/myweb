import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Mail } from "lucide-react";
import { listOpenConversationsForConsultant } from "@/lib/chat";

export default async function ConsultantInboxPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("consultant");

  const convos = await listOpenConversationsForConsultant();

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold text-fg">{t("inboxTitle")}</h1>
        <p className="mt-1 text-sm text-muted">
          {t("openConversationsCount", { count: convos.length })}
        </p>
      </header>

      {convos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <Mail className="mx-auto size-8 text-muted" />
          <p className="mt-3 text-sm text-muted">{t("emptyInbox")}</p>
        </div>
      ) : (
        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {convos.map((c) => (
            <li key={c.id}>
              <Link
                href={`/consultant/thread/${c.id}`}
                className="flex items-center gap-4 px-5 py-4 transition hover:bg-surface-2"
              >
                <div className="grid size-10 place-items-center rounded-full bg-primary/15 text-primary">
                  {(c.customer?.full_name || c.customer?.email || "?")
                    .slice(0, 1)
                    .toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-semibold text-fg">
                    {c.customer?.full_name || c.customer?.email || t("customerFallback")}
                  </div>
                  <div className="truncate text-sm text-muted">
                    {c.subject || t("newConvSubject")}
                  </div>
                </div>
                <div className="text-xs text-muted">
                  {new Date(c.last_message_at).toLocaleString(locale, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
