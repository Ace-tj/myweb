"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { acceptQuote, declineQuote } from "@/lib/projects";

export function ProjectActions({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleAccept() {
    startTransition(async () => {
      const result = await acceptQuote(projectId);
      if (result.ok) router.refresh();
      else alert(result.message || "Could not accept quote.");
    });
  }

  function handleDecline() {
    startTransition(async () => {
      const result = await declineQuote(projectId);
      if (result.ok) router.refresh();
      else alert(result.message || "Could not decline quote.");
    });
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={handleAccept}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white font-semibold px-4 py-2.5 text-sm hover:bg-emerald-500 transition-colors disabled:opacity-50"
      >
        <ThumbsUp size={14} aria-hidden /> Accept
      </button>
      <button
        type="button"
        onClick={handleDecline}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 text-red-500 font-semibold px-4 py-2.5 text-sm hover:bg-red-500/10 transition-colors disabled:opacity-50"
      >
        <ThumbsDown size={14} aria-hidden /> Decline
      </button>
    </div>
  );
}
