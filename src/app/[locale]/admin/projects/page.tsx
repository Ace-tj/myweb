"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  Search, FolderKanban, Clock, CheckCircle2,
  XCircle, AlertCircle, ChevronRight, User, Users
} from "lucide-react";

interface ProjectRow {
  id: string;
  buyerName: string;
  buyerEmail: string;
  consultantName: string | null;
  demoType: string;
  demoSlug: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: string;
  budget: string;
  brief: string;
}

const MOCK_PROJECTS: ProjectRow[] = [
  { id: "proj-001", buyerName: "Sarah Johnson",     buyerEmail: "sarah@example.com",    consultantName: "Elena Petrova", demoType: "Online Shop",           demoSlug: "shop",       status: "in_progress", createdAt: "2026-04-20", budget: "$499", brief: "Full e-commerce setup with payment integration for fashion brand." },
  { id: "proj-002", buyerName: "Mark Williams",     buyerEmail: "mark.w@gmail.com",     consultantName: null,            demoType: "Clinic System",         demoSlug: "clinic",     status: "pending",     createdAt: "2026-05-01", budget: "$549", brief: "Need appointment booking and patient records for a 3-doctor clinic." },
  { id: "proj-003", buyerName: "Green Basket Co.",  buyerEmail: "info@greenbasket.com", consultantName: "Ahmad Rahimi",  demoType: "Restaurant POS",        demoSlug: "restaurant", status: "completed",   createdAt: "2026-03-10", budget: "$449", brief: "Table management, kitchen display, and online menu for 80-seat restaurant." },
  { id: "proj-004", buyerName: "Sunrise Academy",   buyerEmail: "admin@sunriseacad.org",consultantName: "Elena Petrova", demoType: "School System K-12",    demoSlug: "school",     status: "in_progress", createdAt: "2026-04-05", budget: "$699", brief: "Student management, gradebook, and parent portal for 600 students." },
  { id: "proj-005", buyerName: "David Osei-Mensah", buyerEmail: "d.osei@techgh.com",    consultantName: "Yuki Tanaka",   demoType: "Logistics Platform",    demoSlug: "logistics",  status: "in_progress", createdAt: "2026-05-02", budget: "$649", brief: "Fleet tracking and shipment management for 12-truck operation in Ghana." },
  { id: "proj-006", buyerName: "Priya Nair",        buyerEmail: "priya@bloom.in",       consultantName: null,            demoType: "Gym Management",        demoSlug: "gym",        status: "pending",     createdAt: "2026-05-10", budget: "$399", brief: "Membership management and class scheduling for yoga studio." },
  { id: "proj-007", buyerName: "TechNova Corp",     buyerEmail: "projects@technova.io", consultantName: "Ahmad Rahimi",  demoType: "Accounting Suite",      demoSlug: "accounting", status: "completed",   createdAt: "2026-02-28", budget: "$599", brief: "Full accounting, invoicing, and tax module for 20-person tech company." },
  { id: "proj-008", buyerName: "Horizon University",buyerEmail: "it@horizonuni.edu",    consultantName: null,            demoType: "University Portal",     demoSlug: "university", status: "pending",     createdAt: "2026-05-14", budget: "$899", brief: "Course enrollment, transcript, and student billing for 3,000 student campus." },
];

const statusConfig = {
  pending: { label: "Pending", color: "bg-amber-500/20 text-amber-400", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-blue-500/20 text-blue-400", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-emerald-500/20 text-emerald-400", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectRow["status"]>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    return (
      (p.buyerName.toLowerCase().includes(q) || p.demoType.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) &&
      (statusFilter === "all" || p.status === statusFilter)
    );
  });

  const updateStatus = (id: string, status: ProjectRow["status"]) => {
    setProjects(p => p.map(x => x.id === id ? { ...x, status } : x));
  };

  const pending = projects.filter(p => p.status === "pending").length;
  const inProgress = projects.filter(p => p.status === "in_progress").length;
  const completed = projects.filter(p => p.status === "completed").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <p className="text-slate-400 text-sm mt-1">Oversee all buyer projects and consultant assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total", value: projects.length, color: "slate" },
          { label: "Pending", value: pending, color: "amber" },
          { label: "In Progress", value: inProgress, color: "blue" },
          { label: "Completed", value: completed, color: "emerald" },
        ].map(s => (
          <div key={s.label} className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className={`text-xs mt-1 font-medium ${
              s.color === "amber" ? "text-amber-400" :
              s.color === "blue" ? "text-blue-400" :
              s.color === "emerald" ? "text-emerald-400" :
              "text-slate-400"
            }`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 flex-1 min-w-[180px] max-w-xs">
          <Search size={14} className="text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="bg-transparent text-sm text-white placeholder:text-slate-500 outline-none flex-1" />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "in_progress", "completed", "cancelled"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors capitalize ${statusFilter === s ? "bg-indigo-600 text-white" : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"}`}>
              {s === "all" ? "All" : s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-2">
        {filtered.map(p => {
          const cfg = statusConfig[p.status];
          const isExpanded = expanded === p.id;
          return (
            <div key={p.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setExpanded(isExpanded ? null : p.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-slate-800/40 transition-colors"
              >
                <span className="text-xs font-mono text-slate-500 w-24 flex-shrink-0">{p.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white">{p.buyerName}</span>
                    <span className="text-slate-600">→</span>
                    <span className="text-sm text-slate-300">{p.demoType}</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {p.consultantName ? (
                      <span className="text-violet-400">Consultant: {p.consultantName}</span>
                    ) : (
                      <span className="text-amber-400">⚠ No consultant assigned</span>
                    )}
                    <span className="mx-2 text-slate-700">·</span>
                    Created {p.createdAt}
                    <span className="mx-2 text-slate-700">·</span>
                    Budget: <span className="text-emerald-400">{p.budget}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${cfg.color}`}>{cfg.label}</span>
                <ChevronRight size={14} className={`text-slate-600 transition-transform flex-shrink-0 ${isExpanded ? "rotate-90" : ""}`} />
              </button>

              {isExpanded && (
                <div className="border-t border-slate-800 px-5 py-4 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Project Brief</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{p.brief}</p>
                    <div className="mt-4 space-y-2">
                      <div className="text-xs text-slate-500">Buyer: <span className="text-white">{p.buyerName}</span> · <span className="text-slate-400">{p.buyerEmail}</span></div>
                      {p.consultantName && <div className="text-xs text-slate-500">Consultant: <span className="text-violet-400">{p.consultantName}</span></div>}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3">Update Status</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {(["pending", "in_progress", "completed", "cancelled"] as const).map(s => {
                        const c = statusConfig[s];
                        return (
                          <button key={s} onClick={() => updateStatus(p.id, s)}
                            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${p.status === s ? c.color.replace("/20", "/30") + " border border-current/30" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}>
                            {c.label}
                          </button>
                        );
                      })}
                    </div>
                    {!p.consultantName && (
                      <button className="mt-3 w-full py-2 px-3 rounded-lg text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-colors flex items-center justify-center gap-1.5">
                        <User size={12} /> Assign Consultant
                      </button>
                    )}
                    <Link href={`/demos/${p.demoSlug}` as "/"}
                      className="mt-2 w-full py-2 px-3 rounded-lg text-xs font-semibold border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors flex items-center justify-center gap-1.5">
                      View Demo →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">No projects match your filters</div>
        )}
      </div>
    </div>
  );
}
