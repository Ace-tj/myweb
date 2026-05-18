import { setRequestLocale } from "next-intl/server";
import { Users, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { getSupabaseServer } from "@/lib/supabase/server";

async function getStats() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
    return { users: 0, openChats: 0, approvedConsultants: 0, demos: 10 };
  const supabase = await getSupabaseServer();
  const [{ count: users }, { count: openChats }, { count: approvedConsultants }, { count: demos }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("status", "open"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "consultant")
      .eq("consultant_status", "approved"),
    supabase.from("demos").select("*", { count: "exact", head: true }),
  ]);
  return {
    users: users ?? 0,
    openChats: openChats ?? 0,
    approvedConsultants: approvedConsultants ?? 0,
    demos: demos ?? 0,
  };
}

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const s = await getStats();

  const cards = [
    { Icon: Users, label: "Total users", v: s.users },
    { Icon: MessageSquare, label: "Open chats", v: s.openChats },
    { Icon: ShieldCheck, label: "Approved consultants", v: s.approvedConsultants },
    { Icon: Sparkles, label: "Live demos", v: s.demos },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        Snapshot across the platform — auto-refreshes every page load.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
          >
            <c.Icon className="size-5 text-indigo-400" />
            <div className="mt-3 text-xs uppercase tracking-widest text-slate-400">
              {c.label}
            </div>
            <div className="mt-1 text-3xl font-bold">{c.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-lg font-bold">Quick actions</h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
          <li>· Approve pending consultant accounts on the Users page</li>
          <li>· Disable demos that are out of inventory on the Demos page</li>
          <li>· Inspect any conversation on the Chats page (read-only)</li>
          <li>· Promote a user to admin via the Users page</li>
        </ul>
      </div>
    </>
  );
}
