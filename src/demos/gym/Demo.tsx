"use client";

import { useState } from "react";
import { Users, Activity, DollarSign, Calendar } from "lucide-react";

const STATS = [
  { label: "Total Members", value: "247", icon: Users, color: "bg-red-100 text-red-700" },
  { label: "Active Today", value: "83", icon: Activity, color: "bg-orange-100 text-orange-700" },
  { label: "Revenue (Month)", value: "$12,400", icon: DollarSign, color: "bg-green-100 text-green-700" },
  { label: "Classes Today", value: "8", icon: Calendar, color: "bg-blue-100 text-blue-700" },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SCHEDULE: Record<string, { morning: string; evening: string }> = {
  Mon: { morning: "CrossFit", evening: "Yoga" },
  Tue: { morning: "Spinning", evening: "Pilates" },
  Wed: { morning: "HIIT", evening: "Boxing" },
  Thu: { morning: "CrossFit", evening: "Zumba" },
  Fri: { morning: "Yoga", evening: "HIIT" },
  Sat: { morning: "Boot Camp", evening: "Spinning" },
  Sun: { morning: "Open Gym", evening: "—" },
};

const MEMBERS = [
  { name: "Alex Turner", type: "Premium", expires: "2026-12-01", status: "Active" },
  { name: "Maria Chen", type: "Basic", expires: "2026-06-15", status: "Active" },
  { name: "Sam Johnson", type: "Premium", expires: "2026-05-20", status: "Expiring" },
  { name: "Priya Sharma", type: "Day Pass", expires: "2026-05-15", status: "Active" },
  { name: "Leo Müller", type: "Basic", expires: "2026-03-01", status: "Expired" },
];

const NAV = ["Dashboard", "Members", "Schedule", "Billing"];

export default function GymDemo() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans">
      {/* Header */}
      <header className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💪</span>
            <span className="text-xl font-black text-red-500 tracking-wider">IronFit</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-red-600 text-white"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-700"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="bg-neutral-700 text-xs text-neutral-300 border border-neutral-600 rounded-full px-3 py-1 appearance-none">
            <option>EN</option><option>RU</option><option>TG</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-neutral-800 rounded-2xl p-5 border border-neutral-700">
                <div className={`inline-flex p-2 rounded-xl mb-3 ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-neutral-400 text-sm mt-1">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Weekly Schedule */}
        <div className="bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-700">
            <h2 className="font-bold text-lg">Weekly Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left px-4 py-3 text-neutral-400 w-24">Slot</th>
                  {DAYS.map((d) => (
                    <th key={d} className="px-4 py-3 text-neutral-400 text-center">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-700/50">
                  <td className="px-4 py-3 text-red-400 font-medium">Morning</td>
                  {DAYS.map((d) => (
                    <td key={d} className="px-2 py-3 text-center">
                      <span className="bg-red-900/40 text-red-300 text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                        {SCHEDULE[d].morning}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-4 py-3 text-blue-400 font-medium">Evening</td>
                  {DAYS.map((d) => (
                    <td key={d} className="px-2 py-3 text-center">
                      {SCHEDULE[d].evening !== "—" ? (
                        <span className="bg-blue-900/40 text-blue-300 text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                          {SCHEDULE[d].evening}
                        </span>
                      ) : (
                        <span className="text-neutral-600">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Members */}
        <div className="bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-700 flex items-center justify-between">
            <h2 className="font-bold text-lg">Recent Members</h2>
            <button className="text-xs text-red-400 hover:text-red-300">View all →</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="text-left px-4 py-3 text-neutral-400">Member</th>
                <th className="text-left px-4 py-3 text-neutral-400">Type</th>
                <th className="text-left px-4 py-3 text-neutral-400">Expires</th>
                <th className="text-left px-4 py-3 text-neutral-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700/50">
              {MEMBERS.map((m) => (
                <tr key={m.name} className="hover:bg-neutral-700/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-neutral-400">{m.type}</td>
                  <td className="px-4 py-3 text-neutral-400">{m.expires}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      m.status === "Active" ? "bg-green-900/50 text-green-400" :
                      m.status === "Expiring" ? "bg-yellow-900/50 text-yellow-400" :
                      "bg-red-900/50 text-red-400"
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
