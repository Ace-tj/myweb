"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
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
    "mt-2 w-full rounded-2xl border-[1.5px] border-border bg-surface px-4 py-3 text-sm text-fg placeholder:text-subtle transition focus:border-primary focus:outline-none";

  if (status === "sent") {
    return (
      <div className="card p-12 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-fg">{t("successTitle")}</h3>
        <p className="mt-3 text-sm text-muted">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">{t("name")}</span>
          <input required name="name" autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="eyebrow">{t("email")}</span>
          <input required type="email" name="email" autoComplete="email" className={inputClass} />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="eyebrow">{t("company")}</span>
        <input name="company" className={inputClass} />
      </label>
      <label className="mt-5 block">
        <span className="eyebrow">{t("demoChooser")}</span>
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
        <span className="eyebrow">{t("message")}</span>
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
        className="btn-primary mt-8 w-full disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <>
            {t("submit")} <ArrowRight className="size-4" />
          </>
        )}
        {status === "sending" && t("sending")}
      </button>
    </form>
  );
}
