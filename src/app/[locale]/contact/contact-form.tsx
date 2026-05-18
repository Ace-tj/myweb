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

  const inputClass =
    "mt-2 w-full rounded-sm border border-border-strong bg-bg px-3 py-2.5 font-mono text-sm text-fg placeholder:text-subtle transition focus:border-primary focus:outline-none";

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-primary/40 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-primary" />
        <h3 className="mt-4 font-display text-2xl font-bold text-fg">{t("successTitle")}</h3>
        <p className="mt-3 text-sm text-muted">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-sm border border-border bg-bg p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="spec-line">{t("name")}</span>
          <input required name="name" autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="spec-line">{t("email")}</span>
          <input required type="email" name="email" autoComplete="email" className={inputClass} />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="spec-line">{t("company")}</span>
        <input name="company" className={inputClass} />
      </label>
      <label className="mt-5 block">
        <span className="spec-line">{t("demoChooser")}</span>
        <select name="demo" className={inputClass}>
          <option value="">{t("demoChooserNone")}</option>
          {demoOptions.map((slug) => (
            <option key={slug} value={slug}>
              {tData(`${slug}.title`)}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-5 block">
        <span className="spec-line">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-fg transition hover:bg-primary-hover hover:shadow-[0_0_24px_rgb(197_255_63_/_0.35)] disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="size-4 animate-spin" />}
        {status === "sending" ? t("sending") : t("submit")} →
      </button>
    </form>
  );
}
