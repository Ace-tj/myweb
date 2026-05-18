import { setRequestLocale } from "next-intl/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";

export default async function AdminChatsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let convos: any[] = [];
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await getSupabaseServer();
    const { data } = await supabase
      .from("conversations")
      .select(
        "*, customer:profiles!conversations_customer_id_fkey(full_name, email), consultant:profiles!conversations_consultant_id_fkey(full_name, email)",
      )
      .order("last_message_at", { ascending: false })
      .limit(50);
    convos = data ?? [];
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Conversations</h1>
      <p className="mt-1 text-sm text-slate-400">
        Read-only audit view of every chat. Last 50 by activity.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-xs uppercase tracking-widest text-slate-400">
            <tr>
              <th className="px-5 py-3 text-left">Customer</th>
              <th className="px-5 py-3 text-left">Consultant</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Last active</th>
            </tr>
          </thead>
          <tbody>
            {convos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                  No conversations yet.
                </td>
              </tr>
            )}
            {convos.map((c) => (
              <tr key={c.id} className="border-t border-slate-800">
                <td className="px-5 py-4">
                  <div className="font-semibold text-white">
                    {c.customer?.full_name || c.customer?.email || "—"}
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-300">
                  {c.consultant?.full_name || c.consultant?.email || (
                    <span className="text-slate-500">Unassigned</span>
                  )}
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-medium">
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs text-slate-400">
                  {new Date(c.last_message_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs text-slate-500">
        Tip: <Link href="/consultant/inbox" className="underline">Open the consultant inbox</Link> to reply as a participant.
      </p>
    </>
  );
}
