import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SignupForm } from "./signup-form";

export default async function SignupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("auth.signup");

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-fg">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("subtitle")}</p>

        <SignupForm locale={locale} />

        <p className="mt-6 text-center text-sm text-muted">
          {t("haveAccount")}{" "}
          <Link href="/auth/login" className="font-semibold text-primary hover:underline">
            {t("loginLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
