"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { signupAction, type SignupState } from "./actions";

const initial: SignupState = { ok: false };

export function SignupForm({ locale }: { locale: string }) {
  const t = useTranslations("auth.signup");
  const tErr = useTranslations("auth.errors");
  const tLogin = useTranslations("auth.login");
  const [state, action, pending] = useActionState(signupAction, initial);
  const [show, setShow] = useState(false);
  const [role, setRole] = useState<"customer" | "consultant">("customer");

  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="locale" value={locale} />

      <label className="block">
        <span className="text-sm font-medium text-fg">{t("fullName")}</span>
        <input
          type="text"
          name="fullName"
          required
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-fg">{t("email")}</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-fg">{t("password")}</span>
        <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 pr-10 text-sm text-fg focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? tLogin("hidePassword") : tLogin("showPassword")}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid size-7 place-items-center rounded-md text-muted hover:bg-surface-2"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        <span className="mt-1 block text-xs text-subtle">{t("passwordHint")}</span>
      </label>

      <fieldset>
        <legend className="text-sm font-medium text-fg">{t("role")}</legend>
        <div className="mt-2 space-y-2">
          {(["customer", "consultant"] as const).map((r) => (
            <label
              key={r}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                role === r ? "border-primary bg-primary/5" : "border-border bg-bg"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                className="mt-0.5"
              />
              <span className="text-sm text-fg">{t(r)}</span>
            </label>
          ))}
        </div>
        {role === "consultant" && (
          <p className="mt-2 text-xs text-warning">{t("consultantNote")}</p>
        )}
      </fieldset>

      {state.error && !state.ok && (
        <div role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          {state.error === "emailInUse"
            ? tErr("emailInUse")
            : state.error === "validation"
              ? tErr("generic")
              : state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-60"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}
        {t("submit")}
      </button>
    </form>
  );
}
