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
      className="group block overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-1 hover:border-border-strong hover:shadow-lg"
    >
      {/* Visual */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `linear-gradient(140deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}cc 50%, ${demo.thumbnail_color}80 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_30%,rgba(255,255,255,0.30),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.40)_100%)]" />

        {/* mock window chrome */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/40" />
          <span className="size-2.5 rounded-full bg-white/40" />
          <span className="size-2.5 rounded-full bg-white/40" />
        </div>

        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <span aria-hidden className="size-1.5 rounded-full bg-white" />
          {demo.category}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="font-display text-2xl font-extrabold text-white drop-shadow-sm">
            {demo.title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-sm leading-relaxed text-muted">{demo.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-bold text-primary transition group-hover:translate-x-0.5">
            {previewLabel}
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-fg transition group-hover:bg-primary group-hover:text-white">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
