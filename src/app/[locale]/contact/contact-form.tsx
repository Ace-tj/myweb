"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tData = useTranslations("demoData");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  }

  const demoOptions = [
    "china-agency",
    "university",
    "school",
    "restaurant",
    "accounting",
    "hospital",
    "gym",
    "shopping",
    "travel-agency",
    "beauty-salon",
  ];

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" />
        <h3 className="mt-4 font-display text-xl font-bold text-fg">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-muted">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-fg">{t("name")}</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-fg">{t("email")}</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-fg">{t("company")}</span>
        <input
          name="company"
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
        />
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-fg">{t("demoChooser")}</span>
        <select
          name="demo"
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
        >
          <option value="">{t("demoChooserNone")}</option>
          {demoOptions.map((slug) => (
            <option key={slug} value={slug}>
              {tData(`${slug}.title`)}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-fg">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="size-4 animate-spin" />}
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
