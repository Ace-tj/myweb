"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginAction, type LoginState } from "./actions";

const initial: LoginState = { ok: false };

export function LoginForm({
  locale,
  next,
}: {
  locale: string;
  next: string | null;
}) {
  const t = useTranslations("auth.login");
  const tErr = useTranslations("auth.errors");
  const [state, action, pending] = useActionState(loginAction, initial);
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="mt-6 space-y-4">
      <input type="hidden" name="locale" value={locale} />
      {next && <input type="hidden" name="next" value={next} />}

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
            autoComplete="current-password"
            className="w-full rounded-lg border border-border bg-bg px-3 py-2 pr-10 text-sm text-fg focus:border-primary focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? t("hidePassword") : t("showPassword")}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid size-7 place-items-center rounded-md text-muted hover:bg-surface-2"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </label>

      {state.error && !state.ok && (
        <div role="alert" className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-danger">
          {state.error === "invalidCredentials"
            ? tErr("invalidCredentials")
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
