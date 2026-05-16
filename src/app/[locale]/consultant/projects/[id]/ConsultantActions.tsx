"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Send, RotateCcw, AlertCircle } from "lucide-react";
import { claimBrief, sendQuote, releaseBrief } from "@/lib/projects";

export function ClaimButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handle() {
    setError(null);
    startTransition(async () => {
      const result = await claimBrief(projectId);
      if (result.ok) router.refresh();
      else setError(result.message ?? "Could not claim this brief.");
    });
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handle}
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Briefcase size={15} aria-hidden />
        {pending ? "Claiming…" : "Claim this brief"}
      </button>
      {error && (
        <p
          role="alert"
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
        >
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}

export function QuoteForm({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const n = Number(amount);
    if (!n || n <= 0) {
      setError("Enter a positive amount in USD.");
      return;
    }
    startTransition(async () => {
      const result = await sendQuote(projectId, n);
      if (result.ok) {
        setAmount("");
        router.refresh();
      } else {
        setError(result.message ?? "Could not send quote.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label
          htmlFor="quote-amount"
          className="block text-sm font-medium mb-1.5"
        >
          Quote amount (USD)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-muted))] font-semibold">
            $
          </span>
          <input
            id="quote-amount"
            type="number"
            min={1}
            step={1}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1200"
            required
            className="w-full rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] pl-7 pr-4 py-3 text-sm tabular-nums outline-none transition-all focus:border-[rgb(var(--accent))] focus:ring-2 focus:ring-[rgb(var(--accent))]/20"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[rgb(var(--accent))] text-white font-semibold text-sm hover:bg-[rgb(var(--accent-hover))] transition-all shadow-lg shadow-[rgb(var(--accent))]/25 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={14} aria-hidden />
        {pending ? "Sending…" : "Send quote to buyer"}
      </button>
      {error && (
        <p
          role="alert"
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
        >
          <AlertCircle size={14} aria-hidden /> {error}
        </p>
      )}
    </form>
  );
}

export function ReleaseButton({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handle() {
    if (!confirm("Release this brief back to the open pool?")) return;
    startTransition(async () => {
      const result = await releaseBrief(projectId);
      if (result.ok) router.push("/consultant/dashboard");
      else alert(result.message ?? "Could not release.");
    });
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={pending}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[rgb(var(--text-muted))] hover:text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
    >
      <RotateCcw size={14} aria-hidden />
      {pending ? "Releasing…" : "Release brief"}
    </button>
  );
}
