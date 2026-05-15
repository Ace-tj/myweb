"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Search, Check, X, ShieldCheck, Ban, UserCheck,
  Users, Clock, TrendingUp, ChevronDown, Filter
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "consultant";
  approved: boolean;
  banned: boolean;
  joined: string;
  projects: number;
}

const INITIAL_USERS: User[] = [
  { id: "u-001", name: "Sarah Johnson",     email: "sarah@example.com",       role: "buyer",      approved: true,  banned: false, joined: "2026-01-15", projects: 3 },
  { id: "u-002", name: "Ahmad Rahimi",      email: "consultant@agency.com",   role: "consultant", approved: false, banned: false, joined: "2026-02-20", projects: 0 },
  { id: "u-003", name: "Elena Petrova",     email: "elena@studio.io",         role: "consultant", approved: true,  banned: false, joined: "2026-03-01", projects: 5 },
  { id: "u-004", name: "Mark Williams",     email: "mark.w@gmail.com",        role: "buyer",      approved: true,  banned: false, joined: "2026-03-15", projects: 1 },
  { id: "u-005", name: "Nasrin Hosseini",   email: "nasrin@devworks.com",     role: "consultant", approved: false, banned: false, joined: "2026-04-10", projects: 0 },
  { id: "u-006", name: "David Osei-Mensah", email: "d.osei@techgh.com",       role: "buyer",      approved: true,  banned: false, joined: "2026-04-22", projects: 2 },
  { id: "u-007", name: "Yuki Tanaka",       email: "yuki.t@agency.jp",        role: "consultant", approved: true,  banned: false, joined: "2026-05-01", projects: 3 },
  { id: "u-008", name: "Priya Nair",        email: "priya@bloom.in",          role: "buyer",      approved: true,  banned: false, joined: "2026-05-05", projects: 1 },
  { id: "u-009", name: "Carlos Mendez",     email: "carlos@spambot.xyz",      role: "buyer",      approved: true,  banned: true,  joined: "2026-05-08", projects: 0 },
  { id: "u-010", name: "Sofia Lindqvist",   email: "sofia@studio.se",         role: "consultant", approved: false, banned: false, joined: "2026-05-15", projects: 0 },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "buyer" | "consultant">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "banned">("all");

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchQ = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "banned" && u.banned) ||
      (statusFilter === "approved" && u.approved && !u.banned) ||
      (statusFilter === "pending" && !u.approved && !u.banned);
    return matchQ && matchRole && matchStatus;
  });

  const approve = (id: string) => setUsers(p => p.map(u => u.id === id ? { ...u, approved: true } : u));
  const toggleBan = (id: string) => setUsers(p => p.map(u => u.id === id ? { ...u, banned: !u.banned } : u));
  const promote = (id: string) => setUsers(p => p.map(u => u.id === id ? { ...u, role: "consultant" } : u));

  const pendingCount = users.filter(u => !u.approved && !u.banned).length;
  const consultantCount = users.filter(u => u.role === "consultant").length;
  const bannedCount = users.filter(u => u.banned).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-slate-400 text-sm mt-1">Approve, manage, and moderate platform users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: users.length, color: "indigo", icon: Users },
          { label: "Pending Approval", value: pendingCount, color: "amber", icon: Clock },
          { label: "Consultants", value: consultantCount, color: "violet", icon: UserCheck },
          { label: "Banned", value: bannedCount, color: "red", icon: Ban },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              s.color === "indigo" ? "bg-indigo-500/20 text-indigo-400" :
              s.color === "amber" ? "bg-amber-500/20 text-amber-400" :
              s.color === "violet" ? "bg-violet-500/20 text-violet-400" :
              "bg-red-500/20 text-red-400"
            }`}>
              <s.icon size={16} />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 flex-1 min-w-[200px] max-w-xs">
          <Search size={14} className="text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="bg-transparent text-sm text-white placeholder:text-slate-500 outline-none flex-1" />
        </div>
        <div className="flex gap-2">
          {(["all", "buyer", "consultant"] as const).map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${roleFilter === r ? "bg-indigo-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}>
              {r === "all" ? "All Roles" : r}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved", "banned"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${statusFilter === s ? "bg-slate-700 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}>
              {s === "all" ? "All Status" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              {["User", "Role", "Status", "Projects", "Joined", "Actions"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map(user => {
              const status = user.banned ? "banned" : user.approved ? "approved" : "pending";
              const statusStyle = {
                banned: "bg-red-500/20 text-red-400",
                approved: "bg-emerald-500/20 text-emerald-400",
                pending: "bg-amber-500/20 text-amber-400",
              }[status];
              return (
                <tr key={user.id} className={`transition-colors ${user.banned ? "opacity-50" : "hover:bg-slate-800/40"}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.role === "consultant" ? "bg-violet-500/20 text-violet-400" : "bg-sky-500/20 text-sky-400"}`}>
                        {user.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-white">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${user.role === "consultant" ? "bg-violet-500/20 text-violet-400" : "bg-sky-500/20 text-sky-400"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${statusStyle}`}>{status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">{user.projects}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{user.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      {!user.approved && !user.banned && (
                        <button onClick={() => approve(user.id)}
                          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                          <Check size={11} /> Approve
                        </button>
                      )}
                      {user.role === "buyer" && user.approved && !user.banned && (
                        <button onClick={() => promote(user.id)}
                          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-violet-600 text-violet-400 hover:bg-violet-600 hover:text-white transition-colors">
                          <UserCheck size={11} /> Promote
                        </button>
                      )}
                      <button onClick={() => toggleBan(user.id)}
                        className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${user.banned ? "border-slate-600 text-slate-400 hover:bg-slate-700" : "border-red-800 text-red-400 hover:bg-red-600 hover:text-white"}`}>
                        {user.banned ? <><Check size={11} /> Unban</> : <><Ban size={11} /> Ban</>}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">No users match your filters</div>
        )}
      </div>
    </div>
  );
}
