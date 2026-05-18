import { ArrowUpRight } from "lucide-react";
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
      className="group block bg-bg p-6 transition hover:bg-surface"
    >
      {/* Spec strip */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block size-2 rounded-sm"
            style={{ background: demo.thumbnail_color }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {demo.category}
          </span>
        </div>
        <ArrowUpRight className="size-4 text-muted transition group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      {/* Visual preview */}
      <div
        className="relative my-5 aspect-[16/10] overflow-hidden rounded-sm border border-border"
        style={{
          background: `linear-gradient(140deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}aa 50%, ${demo.thumbnail_color}55 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_30%,rgba(255,255,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(0,0,0,0.35)_100%)]" />

        {/* mock window chrome */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/30" />
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="font-display text-2xl font-bold text-white">
            {demo.title}
          </div>
        </div>
      </div>

      {/* Body */}
      <p className="text-sm leading-relaxed text-muted">{demo.tagline}</p>
      <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-fg transition group-hover:text-primary">
        {previewLabel} →
      </div>
    </Link>
  );
}
