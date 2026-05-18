"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/5 p-10 text-center">
        <CheckCircle2 className="mx-auto size-10 text-success" />
        <h3 className="mt-4 font-display text-xl font-bold text-fg">
          Got it — a consultant is on it.
        </h3>
        <p className="mt-2 text-sm text-muted">
          Expect a personal reply within one business hour.
        </p>
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
          <span className="text-sm font-medium text-fg">Your name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-fg">Work email</span>
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
        <span className="text-sm font-medium text-fg">Company (optional)</span>
        <input
          name="company"
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
        />
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-fg">Which demo are you closest to?</span>
        <select
          name="demo"
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg focus:border-primary focus:outline-none"
        >
          <option value="">Not sure yet</option>
          <option value="china-agency">Study-in-China Agency</option>
          <option value="university">University Portal</option>
          <option value="school">K-12 School Portal</option>
          <option value="restaurant">Restaurant Operating System</option>
          <option value="accounting">Accounting Suite</option>
          <option value="hospital">Clinic &amp; Hospital Ops</option>
          <option value="gym">Gym Membership Hub</option>
          <option value="shopping">Storefront</option>
          <option value="travel-agency">Travel Agency Platform</option>
          <option value="beauty-salon">Beauty &amp; Spa Booking</option>
        </select>
      </label>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-fg">What are you trying to build?</span>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell us the goal, the deadline, and one thing that's non-negotiable."
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-fg transition hover:bg-primary-hover disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="size-4 animate-spin" />}
        Send the brief
      </button>
    </form>
  );
}
