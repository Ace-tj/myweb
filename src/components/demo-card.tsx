import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Demo } from "@/lib/types";

export function DemoCard({
  demo,
  previewLabel,
}: {
  demo: Demo;
  previewLabel: string;
}) {
  return (
    <Link
      href={`/demos/${demo.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-bg transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}80 60%, ${demo.thumbnail_color}40 100%)`,
        }}
      >
        <div className="absolute inset-0 grid place-items-center text-white">
          <div className="text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
              <Sparkles className="size-6" />
            </div>
            <div className="mt-3 font-display text-lg font-bold">{demo.title}</div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          {demo.category}
        </div>
        <div className="mt-1.5 text-base font-semibold text-fg">{demo.tagline}</div>
        <div className="mt-4 flex items-center text-sm font-semibold text-primary">
          {previewLabel}
          <ArrowRight className="ml-1.5 size-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
