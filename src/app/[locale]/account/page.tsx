import { setRequestLocale, getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowRight, LogOut, MessageCircle } from "lucide-react";
import { getCurrentProfile } from "@/lib/auth";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("account");
  const tNav = await getTranslations("nav");
  const profile = await getCurrentProfile();
  if (!profile) redirect(`/${locale}/auth/login?next=/${locale}/account`);

  if (profile.role === "admin") redirect(`/${locale}/admin/dashboard`);
  if (profile.role === "consultant") redirect(`/${locale}/consultant/inbox`);

  const displayName = profile.full_name || profile.email.split("@")[0];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-fg">
            {t("greeting", { name: displayName })}
          </h1>
          <p className="mt-1 text-sm text-muted">{profile.email}</p>
        </div>
        <form action={`/${locale}/auth/logout`} method="post">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg hover:bg-surface-2"
          >
            <LogOut className="size-4" />
            {tNav("logout")}
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/demos"
          className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="font-display text-lg font-bold text-fg">{t("browseDemosTitle")}</h2>
          <p className="mt-2 text-sm text-muted">{t("browseDemosBody")}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            {t("browseDemosCta")} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/account/chat"
          className="group rounded-2xl border border-border bg-surface p-6 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-fg">
            <MessageCircle className="size-5 text-primary" />
            {t("chatTitle")}
          </h2>
          <p className="mt-2 text-sm text-muted">{t("chatBody")}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            {t("chatCta")} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
}
