import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string; confirm?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("auth.login");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-fg">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>

        {sp.confirm && (
          <div className="mt-4 rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success">
            Check your email to confirm your account, then log in.
          </div>
        )}

        <LoginForm locale={locale} next={sp.next ?? null} />

        <p className="mt-6 text-center text-sm text-muted">
          {t("noAccount")}{" "}
          <Link href="/auth/signup" className="font-semibold text-primary hover:underline">
            {t("signupLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
