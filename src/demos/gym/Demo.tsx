"use client";
import { useState } from "react";
import {
  IconUsers, IconBarbell, IconCalendar, IconCurrencyDollar, IconChartBar,
  IconUserCheck, IconClock, IconStar, IconPlus, IconSearch, IconEdit,
  IconTrash, IconCheck, IconX, IconQrcode, IconBolt,
} from "@tabler/icons-react";
import photosData from "@/data/photos.json";

const MEMBER_PHOTOS = (photosData as { categories: Record<string, { src: string; thumb: string }[]> }).categories.gym_fitness;
const AVATAR_PHOTOS = (photosData as { categories: Record<string, { src: string; thumb: string }[]> }).categories.avatars;
const photoForMember = (id: number) => AVATAR_PHOTOS[(id - 1) % AVATAR_PHOTOS.length]?.thumb ?? "";
const photoForTrainer = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_PHOTOS[Math.abs(h) % AVATAR_PHOTOS.length]?.thumb ?? "";
};
const photoForGymHero = (idx: number) => MEMBER_PHOTOS[idx % MEMBER_PHOTOS.length]?.src ?? "";

type Page = "dashboard" | "members" | "member-detail" | "schedule" | "trainers" | "billing" | "checkin";

const MEMBERS = [
  { id: 1, name: "Alex Kovach",   plan: "Premium",  expires: "Jun 30",  status: "Active",   checkins: 48, emoji: "💪" },
  { id: 2, name: "Maria Santos",  plan: "Basic",    expires: "May 25",  status: "Expiring", checkins: 12, emoji: "🏃" },
  { id: 3, name: "Jake Thompson", plan: "Premium",  expires: "Aug 15",  status: "Active",   checkins: 91, emoji: "🏋️" },
  { id: 4, name: "Sara Kim",      plan: "Annual",   expires: "Jan 10",  status: "Active",   checkins: 203,emoji: "⚡" },
  { id: 5, name: "Carlos Ruiz",   plan: "Basic",    expires: "May 15",  status: "Expired",  checkins: 3,  emoji: "😓" },
  { id: 6, name: "Emma Wilson",   plan: "Premium",  expires: "Sep 20",  status: "Active",   checkins: 67, emoji: "🔥" },
];

const SCHEDULE: Record<string, string[][]> = {
  Mon: [["06:00 Yoga","Trainer: Dana"],["09:00 HIIT","Trainer: Mark"],["18:00 CrossFit","Trainer: Lisa"],["20:00 Pilates","Trainer: Dana"]],
  Tue: [["07:00 Spin Cycle","Trainer: Mark"],["10:00 Boxing","Trainer: Tom"],["17:00 Yoga","Trainer: Dana"],["19:00 Strength","Trainer: Lisa"]],
  Wed: [["06:00 CrossFit","Trainer: Lisa"],["09:00 Pilates","Trainer: Dana"],["18:00 HIIT","Trainer: Mark"],["20:00 Yoga","Trainer: Dana"]],
  Thu: [["07:00 Boxing","Trainer: Tom"],["10:00 Spin","Trainer: Mark"],["17:00 HIIT","Trainer: Mark"],["19:00 CrossFit","Trainer: Lisa"]],
  Fri: [["06:00 Yoga","Trainer: Dana"],["09:00 Strength","Trainer: Lisa"],["17:00 Boxing","Trainer: Tom"],["19:00 HIIT","Trainer: Mark"]],
  Sat: [["09:00 CrossFit","Trainer: Lisa"],["11:00 Yoga","Trainer: Dana"],["14:00 HIIT","Trainer: Mark"]],
  Sun: [["10:00 Yoga","Trainer: Dana"],["12:00 Pilates","Trainer: Dana"]],
};

const TRAINERS = [
  { name: "Dana Rivers",  specialty: "Yoga & Pilates", emoji: "🧘", rating: 4.9, clients: 38, available: true,  exp: "8 yrs" },
  { name: "Mark Johnson", specialty: "HIIT & Spin",    emoji: "🚴", rating: 4.7, clients: 42, available: true,  exp: "5 yrs" },
  { name: "Lisa Chen",    specialty: "CrossFit",       emoji: "🏋️", rating: 4.8, clients: 35, available: false, exp: "6 yrs" },
  { name: "Tom Brady",    specialty: "Boxing & MMA",   emoji: "🥊", rating: 4.6, clients: 29, available: true,  exp: "10 yrs" },
];

const INVOICES = [
  { member: "Alex Kovach",   plan: "Premium", amount: 89, date: "May 1", status: "Paid" },
  { member: "Maria Santos",  plan: "Basic",   amount: 49, date: "May 1", status: "Paid" },
  { member: "Jake Thompson", plan: "Premium", amount: 89, date: "May 1", status: "Paid" },
  { member: "Sara Kim",      plan: "Annual",  amount: 699,date: "Jan 10",status: "Paid" },
  { member: "Carlos Ruiz",   plan: "Basic",   amount: 49, date: "May 1", status: "Overdue" },
  { member: "Emma Wilson",   plan: "Premium", amount: 89, date: "May 1", status: "Pending" },
];

const CHECKIN_TODAY = ["Jake Thompson (10:24)", "Sara Kim (07:05)", "Emma Wilson (06:12)", "Alex Kovach (08:47)"];

const STATUS_STYLE: Record<string, string> = {
  Active:   "bg-green-900/40 text-green-400",
  Expiring: "bg-yellow-900/40 text-yellow-400",
  Expired:  "bg-red-900/40 text-red-400",
  Paid:     "bg-green-900/40 text-green-400",
  Overdue:  "bg-red-900/40 text-red-400",
  Pending:  "bg-yellow-900/40 text-yellow-400",
};

export default function GymDemo() {
  const [page, setPage]             = useState<Page>("dashboard");
  const [selectedMember, setSelectedMember] = useState(MEMBERS[0]);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [checkinInput, setCheckinInput] = useState("");
  const [checkinResult, setCheckinResult] = useState<string | null>(null);
  const [todayCheckins, setTodayCheckins] = useState(CHECKIN_TODAY);

  const filteredMembers = MEMBERS.filter((m) => {
    if (statusFilter !== "All" && m.status !== statusFilter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function doCheckin() {
    const member = MEMBERS.find((m) => m.name.toLowerCase().includes(checkinInput.toLowerCase()));
    if (member) {
      setCheckinResult(`✅ Welcome, ${member.name}! (${member.plan})`);
      setTodayCheckins((prev) => [`${member.name} (${new Date().toLocaleTimeString("en", {hour:"2-digit",minute:"2-digit"})})`, ...prev]);
    } else {
      setCheckinResult("❌ Member not found.");
    }
    setCheckinInput("");
    setTimeout(() => setCheckinResult(null), 3000);
  }

  /* ── NAV ── */
  const Nav = () => (
    <aside className="fixed left-0 top-0 h-full w-16 sm:w-52 bg-neutral-950 border-r border-neutral-800 flex flex-col z-40">
      <div className="p-4 flex items-center gap-2 border-b border-neutral-800">
        <IconBarbell size={22} className="text-green-400 shrink-0" />
        <span className="hidden sm:block font-extrabold text-white text-lg tracking-tight">IronFit</span>
      </div>
      <nav className="flex-1 p-2 flex flex-col gap-1">
        {([
          ["dashboard","Dashboard",IconChartBar],
          ["members","Members",IconUsers],
          ["schedule","Schedule",IconCalendar],
          ["trainers","Trainers",IconStar],
          ["billing","Billing",IconCurrencyDollar],
          ["checkin","Check-in",IconQrcode],
        ] as [Page, string, React.ElementType][]).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setPage(id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${page === id ? "bg-green-500 text-black" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}>
            <Icon size={18} className="shrink-0" />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-neutral-800">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-sm">A</div><div className="hidden sm:block"><div className="text-xs font-semibold text-white">Admin</div><div className="text-[10px] text-neutral-500">ironfit.app</div></div></div>
      </div>
    </aside>
  );

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-neutral-900 font-sans flex">
      <Nav />
      <main className="flex-1 ml-16 sm:ml-52 p-4 sm:p-6 overflow-auto">{children}</main>
    </div>
  );

  /* ── DASHBOARD ── */
  if (page === "dashboard") return (
    <Layout>
      <div className="mb-6"><h1 className="text-2xl font-extrabold text-white">Dashboard</h1><p className="text-neutral-400 text-sm">Good morning, Admin 💪</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Members", value: MEMBERS.length.toString(), icon: <IconUsers size={20}/>, color: "text-blue-400" },
          { label: "Active Today", value: todayCheckins.length.toString(), icon: <IconUserCheck size={20}/>, color: "text-green-400" },
          { label: "Monthly Revenue", value: "$4,284", icon: <IconCurrencyDollar size={20}/>, color: "text-yellow-400" },
          { label: "Classes Today", value: "8", icon: <IconCalendar size={20}/>, color: "text-purple-400" },
        ].map((s) => (
          <div key={s.label} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4">
            <div className={`${s.color} mb-3`}>{s.icon}</div>
            <div className="text-2xl font-extrabold text-white">{s.value}</div>
            <div className="text-xs text-neutral-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4">Today's Classes</h3>
          <div className="flex flex-col gap-2">
            {SCHEDULE.Mon.map(([cls, trainer], i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-neutral-700 rounded-xl">
                <div><div className="text-sm font-semibold text-white">{cls}</div><div className="text-xs text-neutral-400">{trainer}</div></div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${i < 2 ? "bg-green-900/40 text-green-400" : "bg-neutral-600 text-neutral-400"}`}>{i < 2 ? "Done" : "Upcoming"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4">Recent Check-ins</h3>
          <div className="flex flex-col gap-2">
            {todayCheckins.slice(0, 6).map((c, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-neutral-700 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"><IconUserCheck size={14} className="text-green-400" /></div>
                <span className="text-sm text-white">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-neutral-800 border border-neutral-700 rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4">Member Status Overview</h3>
          <div className="flex gap-4">
            {[{label:"Active",count:MEMBERS.filter(m=>m.status==="Active").length,color:"bg-green-500"},{label:"Expiring",count:MEMBERS.filter(m=>m.status==="Expiring").length,color:"bg-yellow-500"},{label:"Expired",count:MEMBERS.filter(m=>m.status==="Expired").length,color:"bg-red-500"}].map((s) => (
              <div key={s.label} className="flex-1 bg-neutral-700 rounded-xl p-4 text-center">
                <div className={`text-2xl font-extrabold text-white`}>{s.count}</div>
                <div className="flex items-center justify-center gap-1 mt-1"><div className={`w-2 h-2 rounded-full ${s.color}`} /><span className="text-xs text-neutral-400">{s.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );

  /* ── MEMBERS ── */
  if (page === "members") return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-white">Members</h1><p className="text-neutral-400 text-sm">{MEMBERS.length} registered members</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors"><IconPlus size={16} /> Add Member</button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <IconSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search members..." className="w-full pl-8 pr-3 py-2 text-sm rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:border-green-500 transition-colors" />
        </div>
        <div className="flex gap-2">
          {["All","Active","Expiring","Expired"].map((s) => (<button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${statusFilter === s ? "bg-green-500 text-black" : "bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white"}`}>{s}</button>))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {filteredMembers.map((m) => (
          <div key={m.id} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 flex items-center gap-4 hover:border-green-500/30 transition-colors cursor-pointer" onClick={() => { setSelectedMember(m); setPage("member-detail"); }}>
            <div className="w-12 h-12 rounded-xl bg-neutral-700 overflow-hidden shrink-0"><img src={photoForMember(m.id)} alt={m.name} className="w-full h-full object-cover" /></div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-white">{m.name}</div>
              <div className="text-xs text-neutral-400">{m.plan} · Expires {m.expires}</div>
            </div>
            <div className="text-right">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[m.status]}`}>{m.status}</span>
              <div className="text-xs text-neutral-500 mt-1">{m.checkins} check-ins</div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );

  /* ── MEMBER DETAIL ── */
  if (page === "member-detail") return (
    <Layout>
      <button onClick={() => setPage("members")} className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-green-400 mb-5 transition-colors">← Back to Members</button>
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5 text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-3 mx-auto border-2 border-emerald-400"><img src={photoForMember(selectedMember.id)} alt={selectedMember.name} className="w-full h-full object-cover" /></div>
          <h2 className="text-xl font-extrabold text-white">{selectedMember.name}</h2>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[selectedMember.status]} mt-2 inline-block`}>{selectedMember.status}</span>
          <div className="mt-4 flex flex-col gap-2 text-left">
            {[["Plan",selectedMember.plan],["Expires",selectedMember.expires],["Total Check-ins",selectedMember.checkins]].map(([k,v]) => (
              <div key={String(k)} className="flex justify-between bg-neutral-700 rounded-lg px-3 py-2 text-sm"><span className="text-neutral-400">{k}</span><span className="font-bold text-white">{String(v)}</span></div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors text-sm">Renew</button>
            <button className="flex-1 py-2 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-900/20 transition-colors text-sm">Suspend</button>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5">
            <h3 className="font-bold text-white mb-3">Personal Info</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Full Name","Email","Phone","Emergency Contact","Join Date","Membership ID"].map((f) => (
                <div key={f}><label className="text-xs text-neutral-500 block mb-1">{f}</label><input defaultValue={f === "Full Name" ? selectedMember.name : f === "Join Date" ? "Jan 15, 2026" : f === "Membership ID" ? `GYM-${String(selectedMember.id).padStart(4,"0")}` : ""} className="w-full text-sm bg-neutral-700 border border-neutral-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-green-500" /></div>
              ))}
            </div>
          </div>
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5">
            <h3 className="font-bold text-white mb-3">Recent Activity</h3>
            <div className="flex flex-col gap-2">
              {["May 14 — CrossFit (06:00)","May 12 — Yoga (07:00)","May 10 — HIIT (18:00)","May 8 — Strength (09:00)","May 6 — Spin Cycle (07:00)"].map((a, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 bg-neutral-700 rounded-xl text-sm text-neutral-300">
                  <IconCheck size={14} className="text-green-400 shrink-0" /> {a}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  /* ── SCHEDULE ── */
  if (page === "schedule") return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-white">Class Schedule</h1><p className="text-neutral-400 text-sm">Weekly timetable</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors text-sm"><IconPlus size={16} /> Add Class</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Object.entries(SCHEDULE).map(([day, classes]) => (
          <div key={day} className="bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden">
            <div className="bg-neutral-700 px-2 py-2 text-center text-xs font-extrabold text-green-400 uppercase tracking-wider">{day}</div>
            <div className="p-2 flex flex-col gap-1.5">
              {classes.map(([cls, trainer], i) => (
                <div key={i} className="bg-neutral-700 rounded-lg p-2">
                  <div className="text-[10px] font-bold text-white leading-tight">{cls}</div>
                  <div className="text-[9px] text-neutral-400 mt-0.5 leading-tight">{trainer}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );

  /* ── TRAINERS ── */
  if (page === "trainers") return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-white">Trainers</h1><p className="text-neutral-400 text-sm">{TRAINERS.length} staff members</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-black font-bold rounded-xl hover:bg-green-400 transition-colors text-sm"><IconPlus size={16} /> Add Trainer</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {TRAINERS.map((tr) => (
          <div key={tr.name} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-neutral-700 overflow-hidden"><img src={photoForTrainer(tr.name)} alt={tr.name} className="w-full h-full object-cover" /></div>
                <div>
                  <div className="font-bold text-white text-lg">{tr.name}</div>
                  <div className="text-xs text-neutral-400">{tr.specialty}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tr.available ? "bg-green-900/40 text-green-400" : "bg-red-900/40 text-red-400"}`}>{tr.available ? "Available" : "In Session"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[["Rating",`${tr.rating}★`],["Clients",tr.clients],["Exp",tr.exp]].map(([k,v]) => (
                <div key={String(k)} className="bg-neutral-700 rounded-lg p-2 text-center">
                  <div className="font-bold text-white text-sm">{String(v)}</div>
                  <div className="text-[9px] text-neutral-400">{k}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1.5 border border-green-500/30 text-green-400 rounded-lg text-xs font-semibold hover:bg-green-900/20 transition-colors">View Schedule</button>
              <button className="flex-1 py-1.5 bg-neutral-700 text-neutral-300 rounded-lg text-xs font-semibold hover:bg-neutral-600 transition-colors">Message</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );

  /* ── BILLING ── */
  if (page === "billing") return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-white">Billing</h1><p className="text-neutral-400 text-sm">Invoice management</p></div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[{label:"Monthly Revenue",value:"$4,284",color:"text-green-400"},{label:"Outstanding",value:"$49",color:"text-red-400"},{label:"Collected",value:"$4,235",color:"text-blue-400"}].map((s) => (
          <div key={s.label} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4">
            <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-neutral-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-neutral-700 flex items-center justify-between"><h3 className="font-bold text-white">Invoices</h3><button className="text-xs text-green-400 font-semibold hover:underline">Export CSV</button></div>
        <table className="w-full text-sm">
          <thead><tr className="text-left text-neutral-500 text-xs border-b border-neutral-700"><th className="p-3">Member</th><th className="p-3">Plan</th><th className="p-3">Amount</th><th className="p-3">Date</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead>
          <tbody>
            {INVOICES.map((inv, i) => (
              <tr key={i} className="border-b border-neutral-700 last:border-0 hover:bg-neutral-700/50 transition-colors">
                <td className="p-3 font-medium text-white">{inv.member}</td>
                <td className="p-3 text-neutral-400">{inv.plan}</td>
                <td className="p-3 font-bold text-white">${inv.amount}</td>
                <td className="p-3 text-neutral-400">{inv.date}</td>
                <td className="p-3"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[inv.status]}`}>{inv.status}</span></td>
                <td className="p-3"><button className="text-xs text-green-400 hover:underline">{inv.status === "Overdue" ? "Send Reminder" : "View"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );

  /* ── CHECK-IN KIOSK ── */
  return (
    <div className="min-h-screen bg-neutral-950 font-sans flex flex-col items-center justify-center p-8">
      <div className="mb-8 text-center">
        <IconBarbell size={48} className="text-green-400 mx-auto mb-3" />
        <h1 className="text-4xl font-extrabold text-white">IronFit Check-in</h1>
        <p className="text-neutral-400 mt-2">Enter your name or member ID</p>
      </div>
      <div className="w-full max-w-md">
        <div className="bg-neutral-800 border border-neutral-700 rounded-3xl p-8 shadow-2xl">
          <div className="flex gap-3 mb-6">
            <input value={checkinInput} onChange={(e) => setCheckinInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && doCheckin()} placeholder="Name or Member ID..." className="flex-1 bg-neutral-700 border border-neutral-600 text-white text-lg rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 placeholder:text-neutral-500 transition-colors" />
            <button onClick={doCheckin} className="px-5 py-3 bg-green-500 text-black font-extrabold rounded-xl hover:bg-green-400 transition-colors"><IconCheck size={22} /></button>
          </div>
          {checkinResult && (<div className="p-4 bg-neutral-700 rounded-xl text-center font-bold text-white text-lg mb-4 animate-fade-in">{checkinResult}</div>)}
          <div className="border-t border-neutral-700 pt-4">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3">Today's Check-ins</div>
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {todayCheckins.map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2 bg-neutral-700 rounded-lg text-sm text-neutral-300">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><IconCheck size={12} className="text-green-400" /></div>
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <button onClick={() => setPage("dashboard")} className="text-sm text-neutral-500 hover:text-green-400 transition-colors">← Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
