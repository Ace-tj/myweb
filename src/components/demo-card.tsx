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
      className="group block overflow-hidden rounded-2xl border border-border bg-bg transition hover:-translate-y-1 hover:border-border-strong hover:shadow-lg"
    >
      {/* Visual head — soft gradient + a single chip */}
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{
          background: `linear-gradient(155deg, ${demo.thumbnail_color} 0%, ${demo.thumbnail_color}cc 50%, ${demo.thumbnail_color}80 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_30%_30%,rgba(255,255,255,0.25),transparent_70%)]" />
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
          <span aria-hidden className="size-1.5 rounded-full bg-white" />
          {demo.category}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <div className="font-display text-2xl font-medium text-white">
            {demo.title}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-sm leading-relaxed text-muted">{demo.tagline}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg transition group-hover:text-primary">
          {previewLabel}
          <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
