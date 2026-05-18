import { getTranslations, setRequestLocale } from "next-intl/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { demoMeta, localizedDemos } from "@/lib/demos";
import { toggleDemo } from "@/app/actions/admin";

export default async function AdminDemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("admin.demos");
  const tData = await getTranslations("demoData");

  // Translatable fields always come from i18n; enabled state comes from DB when available.
  const localized = localizedDemos(
    tData as unknown as Parameters<typeof localizedDemos>[0],
  );

  let enabledMap: Record<string, boolean> = Object.fromEntries(
    demoMeta.map((m) => [m.slug, m.enabled]),
  );

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase
      .from("demos")
      .select("slug, enabled")
      .order("display_order");
    if (data) {
      enabledMap = { ...enabledMap, ...Object.fromEntries(data.map((r) => [r.slug, r.enabled])) };
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <p className="mt-1 text-sm text-slate-400">{t("lede")}</p>

      <div className="mt-8 grid gap-3">
        {localized.map((d) => {
          const enabled = enabledMap[d.slug] ?? true;
          return (
            <article
              key={d.slug}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <div
                className="grid size-12 shrink-0 place-items-center rounded-xl font-bold text-white"
                style={{ background: d.thumbnail_color }}
              >
                {d.title[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{d.title}</div>
                <div className="truncate text-xs text-slate-400">{d.tagline}</div>
              </div>
              <div className="text-right text-sm">
                <div className="font-bold text-indigo-300">${d.price_usd.toLocaleString()}</div>
                <div className="text-xs text-slate-500">{d.category}</div>
              </div>
              <form action={toggleDemo}>
                <input type="hidden" name="slug" value={d.slug} />
                <input type="hidden" name="enabled" value={enabled ? "false" : "true"} />
                <button
                  type="submit"
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    enabled
                      ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {enabled ? t("enabled") : t("disabled")}
                </button>
              </form>
            </article>
          );
        })}
      </div>
    </>
  );
}
