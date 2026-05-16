"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { requestAction, type RequestState } from "./actions";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";

const DEMO_LABELS: Record<string, string> = {
  shop: "Online Shop",
  gym: "Gym Management",
  accounting: "Accounting Suite",
  "china-uni": "Chinese University Agent",
  school: "School System (K-12)",
  university: "University Portal",
  restaurant: "Restaurant POS",
  personal: "Personal CRM",
  clinic: "Clinic System",
  logistics: "Logistics Platform",
};

const ERROR_LABEL: Record<string, string> = {
  businessNameRequired: "Business name is required.",
  descriptionRequired:
    "Please describe what you need (at least 10 characters).",
  anon: "Please sign in again to submit a brief.",
  forbidden: "Consultants can't submit briefs.",
  dbOff:
    "Backend not configured — your brief wasn't saved. Try again later.",
  generic: "Something went wrong. Please try again.",
};

const initialState: RequestState = { status: "idle" };

export function RequestForm({ initialDemo }: { initialDemo: string | null }) {
  const locale = useLocale();
  const t = useTranslations();

  const [state, formAction, isPending] = useActionState(
    requestAction,
    initialState,
  );

  const errorMessage =
    state.status === "error"
      ? (ERROR_LABEL[state.errorKey] ?? ERROR_LABEL.generic)
      : null;
  const demoLabel = initialDemo
    ? (DEMO_LABELS[initialDemo] ?? initialDemo)
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link
            href="/buyer/dashboard"
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))] hover:bg-[rgb(var(--bg-hover))] transition-colors"
          >
            <ArrowLeft size={16} aria-hidden /> <span>Back</span>
          </Link>
          <Link
            href="/"
            className="flex items-center font-extrabold text-xl tracking-tight"
            aria-label="myweb home"
          >
            <span className="gradient-text">myweb</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-2xl w-full px-4 sm:px-6 py-10 sm:py-14">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            {t("buyer.request.heading")}
          </h1>
          {demoLabel && (
            <p className="text-sm text-[rgb(var(--text-muted))]">
              {t("buyer.request.selectedDemo")}:{" "}
              <span className="font-semibold text-[rgb(var(--accent))]">
                {demoLabel}
              </span>
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-card))] p-6 sm:p-8 shadow-sm">
          <form
            action={formAction}
            aria-busy={isPending}
            className="space-y-5"
            noValidate
          >
            <input type="hidden" name="locale" value={locale} />
            {initialDemo && (
              <input type="hidden" name="demoSlug" value={initialDemo} />
            )}

            <Field
              label={t("buyer.request.businessName")}
              name="businessName"
              placeholder="Acme Corp"
              required
            />
            <Field
              label={t("buyer.request.description")}
              name="description"
              type="textarea"
              placeholder="Describe what you need, key features, users…"
              required
              rows={4}
            />
            <Field
              label={t("buyer.request.colorPref")}
              name="colorPref"
              placeholder="e.g. Blue and white, professional look"
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label={t("buyer.request.pagesNeeded")}
                name="pagesNeeded"
                type="number"
                min={1}
                placeholder="5"
              />
              <Field
                label={t("buyer.request.budget")}
                name="budget"
                type="number"
                min={0}
                placeholder="1000"
              />
            </div>

            <Field
              label={t("buyer.request.deadline")}
              name="deadline"
              type="date"
            />
            <Field
              label={t("buyer.request.notes")}
              name="notes"
              type="textarea"
              rows={3}
              placeholder="Anything else we should know…"
            />

            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl border border-red-300/40 bg-red-50 dark:bg-red-950/30 dark:border-red-800/30 px-4 py-3 text-sm text-red-700 dark:text-red-300 flex items-start gap-2"
              >
                <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold py-3 text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isPending ? (
                t("buyer.request.submitting")
              ) : (
                <>
                  {t("buyer.request.submit")} <ArrowRight size={15} aria-hidden />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  rows,
  min,
}: {
  label: string;
  name: string;
  type?: "text" | "number" | "date" | "textarea";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  min?: number;
}) {
  const baseClass =
    "w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-4 py-3 text-sm outline-none transition-all focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20 placeholder:text-[rgb(var(--text-subtle))]";
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          min={min}
          className={baseClass}
        />
      )}
    </label>
  );
}
