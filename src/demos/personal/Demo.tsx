"use client";

import { useState } from "react";
import {
  Users, User, CheckSquare, Calendar, FileText, Search,
  Plus, X, Edit2, Star, Phone, Mail, MapPin, Briefcase,
  ChevronRight, ArrowLeft, Link, Tag, Clock, MoreVertical,
  TrendingUp, MessageSquare, Globe, Link2, ExternalLink,
  Filter, Grid, List, Bell, Settings, Home, Archive,
  Circle, CheckCircle2, AlertCircle, Target, Zap
} from "lucide-react";

// ─── palette ────────────────────────────────────────────────────────────────
const C = {
  bg: "#fafafa",
  card: "#ffffff",
  text: "#09090b",
  muted: "#71717a",
  border: "#e4e4e7",
  accent: "#6366f1",
  accentLight: "#eef2ff",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
  pink: "#ec4899",
};

// ─── data ────────────────────────────────────────────────────────────────────
type ContactStatus = "active" | "prospect" | "vip" | "cold";
type TaskStatus = "todo" | "in-progress" | "done";
type TaskPriority = "low" | "medium" | "high";

const CONTACTS = [
  { id: 1, name: "Sarah Mitchell", company: "Vertex Capital", role: "Partner", email: "sarah@vertex.vc", phone: "+1 555-0201", location: "San Francisco, CA", status: "vip" as ContactStatus, tags: ["Investor", "Board"], lastContact: "2 days ago", notes: "Interested in Series B. Follow up after Q2 results.", linkedin: "linkedin.com/in/smitchell", avatar: "SM", starred: true, deals: 2 },
  { id: 2, name: "Marcus Chen", company: "TechFlow Inc.", role: "CTO", email: "m.chen@techflow.io", phone: "+1 555-0202", location: "Austin, TX", status: "active" as ContactStatus, tags: ["Client", "Technical"], lastContact: "1 week ago", notes: "Evaluating enterprise plan. Needs API integration demo.", linkedin: "linkedin.com/in/mchen", avatar: "MC", starred: true, deals: 1 },
  { id: 3, name: "Priya Sharma", company: "DesignLab Studio", role: "CEO", email: "priya@designlab.co", phone: "+1 555-0203", location: "New York, NY", status: "prospect" as ContactStatus, tags: ["Lead", "Design"], lastContact: "3 weeks ago", notes: "Met at ProductCon. Interested in the analytics module.", linkedin: "linkedin.com/in/psharma", avatar: "PS", starred: false, deals: 0 },
  { id: 4, name: "James O'Brien", company: "Meridian Group", role: "VP Sales", email: "james.ob@meridian.com", phone: "+1 555-0204", location: "Chicago, IL", status: "active" as ContactStatus, tags: ["Partner", "Sales"], lastContact: "4 days ago", notes: "Referral partner. Has sent 3 qualified leads this quarter.", linkedin: "linkedin.com/in/jobrien", avatar: "JO", starred: false, deals: 3 },
  { id: 5, name: "Yuki Tanaka", company: "Scale Ventures", role: "Principal", email: "yuki@scale.vc", phone: "+1 555-0205", location: "Seattle, WA", status: "vip" as ContactStatus, tags: ["Investor", "Lead"], lastContact: "Today", notes: "Warm intro from Sarah. Very interested in mission.", linkedin: "linkedin.com/in/ytanaka", avatar: "YT", starred: true, deals: 0 },
  { id: 6, name: "Carlos Ruiz", company: "Innovatech", role: "Product Manager", email: "carlos@innovatech.com", phone: "+1 555-0206", location: "Miami, FL", status: "cold" as ContactStatus, tags: ["Former Client"], lastContact: "2 months ago", notes: "Contract ended. Check back in Q3 when their budget resets.", linkedin: "linkedin.com/in/cruiz", avatar: "CR", starred: false, deals: 0 },
  { id: 7, name: "Amara Johnson", company: "Bloom Health", role: "Head of Growth", email: "amara@bloomhealth.co", phone: "+1 555-0207", location: "Boston, MA", status: "prospect" as ContactStatus, tags: ["Lead", "Healthcare"], lastContact: "5 days ago", notes: "Referral from James. Needs HIPAA compliance info.", linkedin: "linkedin.com/in/ajohnson", avatar: "AJ", starred: false, deals: 0 },
  { id: 8, name: "Leo Wagner", company: "Founders Fund", role: "General Partner", email: "leo@ff.vc", phone: "+1 555-0208", location: "Palo Alto, CA", status: "active" as ContactStatus, tags: ["Investor", "Advisor"], lastContact: "1 week ago", notes: "Board observer since Seed. Very supportive.", linkedin: "linkedin.com/in/lwagner", avatar: "LW", starred: true, deals: 1 },
];

const TASKS: { id: number; title: string; contact?: string; due: string; status: TaskStatus; priority: TaskPriority; column: string }[] = [
  { id: 1, title: "Send Series B deck to Sarah Mitchell", contact: "Sarah Mitchell", due: "May 16", status: "todo", priority: "high", column: "Todo" },
  { id: 2, title: "Schedule API demo for Marcus Chen", contact: "Marcus Chen", due: "May 18", status: "todo", priority: "high", column: "Todo" },
  { id: 3, title: "Follow up on ProductCon connection — Priya", contact: "Priya Sharma", due: "May 20", status: "todo", priority: "medium", column: "Todo" },
  { id: 4, title: "Prepare HIPAA one-pager for Amara", contact: "Amara Johnson", due: "May 22", status: "in-progress", priority: "medium", column: "In Progress" },
  { id: 5, title: "Q2 investor update email draft", due: "May 24", status: "in-progress", priority: "high", column: "In Progress" },
  { id: 6, title: "Review partnership terms with James O'Brien", contact: "James O'Brien", due: "May 17", status: "in-progress", priority: "medium", column: "In Progress" },
  { id: 7, title: "Send thank-you note to Leo Wagner", contact: "Leo Wagner", due: "May 14", status: "done", priority: "low", column: "Done" },
  { id: 8, title: "Update CRM with Yuki intro notes", contact: "Yuki Tanaka", due: "May 15", status: "done", priority: "medium", column: "Done" },
];

const CALENDAR_EVENTS = [
  { time: "09:00", title: "Investor call — Yuki Tanaka", contact: "Yuki Tanaka", type: "call", duration: "45 min" },
  { time: "11:00", title: "API demo prep", contact: "Marcus Chen", type: "task", duration: "1 hr" },
  { time: "13:00", title: "Lunch with James O'Brien", contact: "James O'Brien", type: "meeting", duration: "1.5 hr" },
  { time: "15:30", title: "Board update call", contact: "Leo Wagner", type: "call", duration: "30 min" },
  { time: "17:00", title: "Review deck for Sarah", contact: "Sarah Mitchell", type: "task", duration: "1 hr" },
];

const DOCUMENTS = [
  { id: 1, name: "Series B Pitch Deck v3.pptx", type: "deck", size: "4.2 MB", modified: "May 14", contact: "Sarah Mitchell" },
  { id: 2, name: "API Integration Guide.pdf", type: "pdf", size: "1.1 MB", modified: "May 12", contact: "Marcus Chen" },
  { id: 3, name: "HIPAA Compliance Summary.pdf", type: "pdf", size: "380 KB", modified: "May 10", contact: "Amara Johnson" },
  { id: 4, name: "Partnership Agreement Draft.docx", type: "doc", size: "220 KB", modified: "May 9", contact: "James O'Brien" },
  { id: 5, name: "Q1 Investor Update.pdf", type: "pdf", size: "780 KB", modified: "Apr 30", contact: "" },
  { id: 6, name: "Product Roadmap 2026.pdf", type: "pdf", size: "2.1 MB", modified: "Apr 22", contact: "" },
];

// ─── photo lookup ───────────────────────────────────────────────────────────
import photosData from "@/data/photos.json";
const CONTACT_PHOTOS = (photosData as { categories: Record<string, { src: string; thumb: string }[]> }).categories.personal_contacts;
const photoForContact = (id: number) =>
  CONTACT_PHOTOS[(id - 1) % CONTACT_PHOTOS.length]?.thumb ?? "";

// ─── helpers ─────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, color = C.accent, photo }: { initials: string; size?: number; color?: string; photo?: string }) {
  if (photo) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: `2px solid ${color}66`, position: "relative" }}>
        <img src={photo} alt={initials} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `2px solid ${color}33` }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 800, color }}>{initials}</span>
    </div>
  );
}

function Badge({ children, color = C.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: color + "18", color, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

const statusColors: Record<ContactStatus, string> = { active: C.success, prospect: C.warning, vip: C.purple, cold: C.muted };
const statusLabels: Record<ContactStatus, string> = { active: "Active", prospect: "Prospect", vip: "VIP", cold: "Cold" };
const priorityColors: Record<TaskPriority, string> = { low: C.muted, medium: C.warning, high: C.danger };
const typeColors: Record<string, string> = { call: C.accent, meeting: C.success, task: C.warning };

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "dashboard", icon: <Home size={17} />, label: "Dashboard" },
    { id: "contacts", icon: <Users size={17} />, label: "Contacts" },
    { id: "tasks", icon: <CheckSquare size={17} />, label: "Tasks" },
    { id: "calendar", icon: <Calendar size={17} />, label: "Calendar" },
    { id: "documents", icon: <FileText size={17} />, label: "Documents" },
    { id: "search", icon: <Search size={17} />, label: "Search" },
  ];

  const starred = CONTACTS.filter(c => c.starred);

  return (
    <div style={{ width: 220, background: C.card, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>NexusCRM</div>
            <div style={{ fontSize: 10, color: C.muted }}>Personal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: page === n.id ? C.accentLight : "transparent", color: page === n.id ? C.accent : C.muted, fontWeight: page === n.id ? 700 : 500, fontSize: 13, textAlign: "left" }}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>

      {/* Starred contacts */}
      <div style={{ padding: "12px 14px 6px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Starred</div>
        {starred.map(c => (
          <div key={c.id} onClick={() => setPage("contact-detail")}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 6px", borderRadius: 8, cursor: "pointer", marginBottom: 2 }}>
            <Avatar initials={c.avatar} size={24} color={statusColors[c.status]} photo={photoForContact(c.id)} />
            <span style={{ fontSize: 12, color: C.text, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</span>
          </div>
        ))}
      </div>

      {/* Profile */}
      <div style={{ marginTop: "auto", padding: "14px 18px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="JD" size={30} color={C.accent} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Jordan Doe</div>
            <div style={{ fontSize: 10, color: C.muted }}>Personal CRM</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  const vips = CONTACTS.filter(c => c.status === "vip").length;
  const pendingTasks = TASKS.filter(t => t.status !== "done").length;
  const todayEvents = CALENDAR_EVENTS.length;

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Good afternoon, Jordan</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Friday, May 16 — {todayEvents} events today</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Contacts", value: CONTACTS.length, icon: <Users size={18} />, color: C.accent },
          { label: "VIP Contacts", value: vips, icon: <Star size={18} />, color: C.purple },
          { label: "Open Tasks", value: pendingTasks, icon: <CheckSquare size={18} />, color: C.warning },
          { label: "Today's Meetings", value: todayEvents, icon: <Calendar size={18} />, color: C.success },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Today's schedule */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Today's Schedule</h3>
            <button onClick={() => setPage("calendar")} style={{ fontSize: 12, color: C.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all</button>
          </div>
          {CALENDAR_EVENTS.map(e => (
            <div key={e.time} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, flexShrink: 0, textAlign: "right" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, fontFamily: "monospace" }}>{e.time}</span>
              </div>
              <div style={{ width: 3, background: typeColors[e.type] || C.accent, borderRadius: 99, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{e.title}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{e.duration}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Priority tasks */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Priority Tasks</h3>
            <button onClick={() => setPage("tasks")} style={{ fontSize: 12, color: C.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all</button>
          </div>
          {TASKS.filter(t => t.priority === "high" && t.status !== "done").map(task => (
            <div key={task.id} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
              <AlertCircle size={16} color={C.danger} style={{ marginTop: 1, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{task.title}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Due {task.due} {task.contact ? `· ${task.contact}` : ""}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent contacts */}
      <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Recently Active</h3>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {CONTACTS.filter(c => c.status !== "cold").slice(0, 5).map(c => (
            <div key={c.id} onClick={() => setPage("contact-detail")}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: C.bg, borderRadius: 12, cursor: "pointer", border: `1px solid ${C.border}` }}>
              <Avatar initials={c.avatar} size={32} color={statusColors[c.status]} photo={photoForContact(c.id)} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{c.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{c.lastContact}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CONTACTS LIST ────────────────────────────────────────────────────────────
function ContactsList({ setPage, setSelectedContact }: { setPage: (p: string) => void; setSelectedContact: (c: typeof CONTACTS[0]) => void }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ContactStatus | "all">("all");
  const [view, setView] = useState<"grid" | "list">("list");

  const filtered = CONTACTS.filter(c => {
    const q = search.toLowerCase();
    return (
      (c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)) &&
      (filterStatus === "all" || c.status === filterStatus)
    );
  });

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Contacts</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{filtered.length} of {CONTACTS.length} shown</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> Add Contact
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px" }}>
          <Search size={15} color={C.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text, flex: 1 }} />
        </div>
        {(["all", "vip", "active", "prospect", "cold"] as const).map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            style={{ padding: "10px 14px", borderRadius: 10, border: `1px solid ${filterStatus === s ? (s === "all" ? C.accent : statusColors[s as ContactStatus] || C.accent) : C.border}`, background: filterStatus === s ? (s === "all" ? C.accent : statusColors[s as ContactStatus] || C.accent) + "15" : C.card, color: filterStatus === s ? (s === "all" ? C.accent : statusColors[s as ContactStatus] || C.accent) : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>
            {s === "all" ? "All" : statusLabels[s as ContactStatus]}
          </button>
        ))}
        <div style={{ display: "flex", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {[{ t: "list" as const, i: <List size={15} /> }, { t: "grid" as const, i: <Grid size={15} /> }].map(({ t, i }) => (
            <button key={t} onClick={() => setView(t)}
              style={{ padding: "8px 10px", background: view === t ? C.accent : "transparent", color: view === t ? "#fff" : C.muted, border: "none", cursor: "pointer" }}>
              {i}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {filtered.map((c, i) => (
            <div key={c.id} onClick={() => { setSelectedContact(c); setPage("contact-detail"); }}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", cursor: "pointer", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
              <Avatar initials={c.avatar} size={40} color={statusColors[c.status]} photo={photoForContact(c.id)} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{c.name}</span>
                  {c.starred && <Star size={12} fill={C.warning} color={C.warning} />}
                  <Badge color={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                </div>
                <div style={{ fontSize: 12, color: C.muted }}>{c.role} @ {c.company}</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {c.tags.map(t => <Badge key={t} color={C.muted}>{t}</Badge>)}
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, color: C.muted }}>{c.lastContact}</div>
                <div style={{ fontSize: 11, color: c.deals > 0 ? C.success : C.muted, fontWeight: 600 }}>{c.deals > 0 ? `${c.deals} deal${c.deals > 1 ? "s" : ""}` : "No deals"}</div>
              </div>
              <ChevronRight size={16} color={C.muted} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {filtered.map(c => (
            <div key={c.id} onClick={() => { setSelectedContact(c); setPage("contact-detail"); }}
              style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <Avatar initials={c.avatar} size={44} color={statusColors[c.status]} photo={photoForContact(c.id)} />
                <div style={{ display: "flex", gap: 6 }}>
                  {c.starred && <Star size={14} fill={C.warning} color={C.warning} />}
                  <Badge color={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>{c.role} · {c.company}</div>
              <div style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={11} /> Last: {c.lastContact}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CONTACT DETAIL ───────────────────────────────────────────────────────────
function ContactDetail({ contact, setPage }: { contact: typeof CONTACTS[0]; setPage: (p: string) => void }) {
  const [tab, setTab] = useState<"overview" | "tasks" | "notes">("overview");
  const relatedTasks = TASKS.filter(t => t.contact === contact.name);

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <button onClick={() => setPage("contacts")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.accent, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
        <ArrowLeft size={15} /> Back to Contacts
      </button>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${statusColors[contact.status]}15, ${C.accent}10)`, borderRadius: 20, padding: 28, border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Avatar initials={contact.avatar} size={72} color={statusColors[contact.status]} photo={photoForContact(contact.id)} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>{contact.name}</h1>
              {contact.starred && <Star size={18} fill={C.warning} color={C.warning} />}
              <Badge color={statusColors[contact.status]}>{statusLabels[contact.status]}</Badge>
            </div>
            <div style={{ fontSize: 14, color: C.muted, marginBottom: 8 }}>{contact.role} @ {contact.company}</div>
            <div style={{ display: "flex", gap: 8 }}>
              {contact.tags.map(t => <Badge key={t} color={C.accent}>{t}</Badge>)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ padding: "10px 16px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
              <Mail size={13} /> Email
            </button>
            <button style={{ padding: "10px 16px", background: C.card, color: C.text, border: `1px solid ${C.border}`, borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
              <Phone size={13} /> Call
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.bg, padding: 4, borderRadius: 12, width: "fit-content", border: `1px solid ${C.border}` }}>
        {(["overview", "tasks", "notes"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: tab === t ? C.accent : "transparent", color: tab === t ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Contact Info</h3>
            {[
              { icon: <Mail size={14} />, label: contact.email },
              { icon: <Phone size={14} />, label: contact.phone },
              { icon: <MapPin size={14} />, label: contact.location },
              { icon: <Briefcase size={14} />, label: contact.company },
              { icon: <Link2 size={14} />, label: contact.linkedin },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.muted }}>{icon}</span>
                <span style={{ fontSize: 13, color: C.text }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>Relationship</h3>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.accent }}>{contact.deals}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Deals</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: C.success }}>{relatedTasks.length}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Tasks</div>
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: C.muted }}>Last contact: <strong style={{ color: C.text }}>{contact.lastContact}</strong></div>
            </div>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>Quick Note</h3>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{contact.notes}</p>
            </div>
          </div>
        </div>
      )}

      {tab === "tasks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {relatedTasks.length === 0 ? (
            <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}>No tasks for this contact</div>
          ) : (
            relatedTasks.map(task => (
              <div key={task.id} style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
                {task.status === "done" ? <CheckCircle2 size={18} color={C.success} /> : <Circle size={18} color={C.muted} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text, textDecoration: task.status === "done" ? "line-through" : "none" }}>{task.title}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Due {task.due}</div>
                </div>
                <Badge color={priorityColors[task.priority]}>{task.priority}</Badge>
              </div>
            ))
          )}
          <button style={{ padding: "12px 0", background: C.accentLight, border: `1px dashed ${C.accent}66`, borderRadius: 10, cursor: "pointer", fontSize: 13, color: C.accent, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Plus size={14} /> Add Task for {contact.name.split(" ")[0]}
          </button>
        </div>
      )}

      {tab === "notes" && (
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Notes</h3>
          <div style={{ background: C.bg, borderRadius: 10, padding: 16, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 13, color: C.text, lineHeight: 1.7 }}>{contact.notes}</p>
            <div style={{ marginTop: 10, fontSize: 11, color: C.muted }}>Edited May 14, 2026</div>
          </div>
          <textarea placeholder="Add a new note..." rows={4}
            style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, resize: "none", outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
          <button style={{ padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Save Note</button>
        </div>
      )}
    </div>
  );
}

// ─── TASKS (KANBAN) ───────────────────────────────────────────────────────────
function Tasks() {
  const columns = ["Todo", "In Progress", "Done"];
  const [tasks, setTasks] = useState(TASKS);
  const [dragging, setDragging] = useState<number | null>(null);

  const move = (id: number, to: string) => {
    setTasks(t => t.map(x => x.id === id ? { ...x, column: to, status: to === "Todo" ? "todo" : to === "In Progress" ? "in-progress" : "done" } : x));
  };

  return (
    <div style={{ padding: 28, height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Tasks</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{tasks.filter(t => t.status !== "done").length} open · {tasks.filter(t => t.status === "done").length} completed</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> New Task
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, flex: 1, overflow: "hidden" }}>
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.column === col);
          const colColor = col === "Todo" ? C.muted : col === "In Progress" ? C.warning : C.success;
          return (
            <div key={col} style={{ background: C.bg, borderRadius: 14, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}
              onDragOver={e => e.preventDefault()}
              onDrop={() => dragging !== null && move(dragging, col)}>
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: colColor }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{col}</span>
                <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: C.muted, background: C.card, padding: "2px 8px", borderRadius: 99, border: `1px solid ${C.border}` }}>{colTasks.length}</span>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                {colTasks.map(task => (
                  <div key={task.id} draggable onDragStart={() => setDragging(task.id)} onDragEnd={() => setDragging(null)}
                    style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.border}`, cursor: "grab", boxShadow: dragging === task.id ? "0 4px 12px #0002" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.4 }}>{task.title}</span>
                      <div style={{ width: 8, height: 8, borderRadius: 99, background: priorityColors[task.priority], flexShrink: 0, marginTop: 4, marginLeft: 8 }} title={task.priority} />
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 }}>
                      {task.contact && <Badge color={C.accent}>{task.contact.split(" ")[0]}</Badge>}
                      <Badge color={priorityColors[task.priority]}>{task.priority}</Badge>
                    </div>
                    <div style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
                      <Clock size={11} /> {task.due}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarPage() {
  const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17", "Sun 18"];
  const today = "Fri 16";

  return (
    <div style={{ padding: 28, height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Calendar</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>Week of May 12–18, 2026</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> New Event
        </button>
      </div>

      <div style={{ flex: 1, background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ background: C.bg, borderRight: `1px solid ${C.border}` }} />
          {days.map(d => (
            <div key={d} style={{ padding: "12px 0", textAlign: "center", background: d === today ? C.accentLight : C.bg, borderLeft: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: d === today ? C.accent : C.text }}>{d.split(" ")[0]}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: d === today ? C.accent : C.muted }}>{d.split(" ")[1]}</div>
            </div>
          ))}
        </div>
        {/* Time slots */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(time => (
            <div key={time} style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: `1px solid ${C.border}`, minHeight: 64 }}>
              <div style={{ padding: "10px 8px", textAlign: "right", borderRight: `1px solid ${C.border}`, background: C.bg }}>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{time}</span>
              </div>
              {days.map(d => {
                const event = d === today ? CALENDAR_EVENTS.find(e => e.time === time) : null;
                return (
                  <div key={d} style={{ borderLeft: `1px solid ${C.border}`, padding: 4, background: d === today ? C.accentLight + "44" : "transparent" }}>
                    {event && (
                      <div style={{ background: typeColors[event.type] || C.accent, borderRadius: 6, padding: "4px 8px" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{event.title}</div>
                        <div style={{ fontSize: 10, color: "#ffffff99" }}>{event.duration}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DOCUMENTS ────────────────────────────────────────────────────────────────
function Documents() {
  const typeIcons: Record<string, string> = { pdf: "📄", doc: "📝", deck: "📊" };
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Documents</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{DOCUMENTS.length} files</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.accent, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> Upload
        </button>
      </div>

      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "12px 20px", background: C.bg, borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 100px 100px 140px 80px", gap: 16 }}>
          {["File Name", "Type", "Size", "Modified", "Actions"].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>
        {DOCUMENTS.map((doc, i) => (
          <div key={doc.id} style={{ padding: "14px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", display: "grid", gridTemplateColumns: "1fr 100px 100px 140px 80px", gap: 16, alignItems: "center", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{typeIcons[doc.type]}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{doc.name}</div>
                {doc.contact && <div style={{ fontSize: 11, color: C.muted }}>{doc.contact}</div>}
              </div>
            </div>
            <Badge color={doc.type === "pdf" ? C.danger : doc.type === "doc" ? C.accent : C.success}>{doc.type.toUpperCase()}</Badge>
            <span style={{ fontSize: 13, color: C.muted }}>{doc.size}</span>
            <span style={{ fontSize: 13, color: C.muted }}>{doc.modified}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ padding: "5px 10px", background: C.accentLight, color: C.accent, border: `1px solid ${C.accent}33`, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────
function SearchPage({ setPage, setSelectedContact }: { setPage: (p: string) => void; setSelectedContact: (c: typeof CONTACTS[0]) => void }) {
  const [query, setQuery] = useState("");
  const results = query.length >= 2 ? CONTACTS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.company.toLowerCase().includes(query.toLowerCase()) || c.role.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Search</h1>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.card, border: `2px solid ${query ? C.accent : C.border}`, borderRadius: 14, padding: "14px 18px", marginBottom: 24, transition: "border-color .15s" }}>
        <Search size={20} color={query ? C.accent : C.muted} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search contacts, companies, roles..." autoFocus
          style={{ border: "none", outline: "none", background: "transparent", fontSize: 15, color: C.text, flex: 1 }} />
        {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.muted} /></button>}
      </div>

      {query.length < 2 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: C.muted }}>
          <Search size={40} color={C.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 16, fontWeight: 600, color: C.muted }}>Type to search</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Search across contacts, companies, and roles</div>
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.muted }}>No results for "{query}"</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, color: C.muted, fontWeight: 600, marginBottom: 4 }}>{results.length} result{results.length !== 1 ? "s" : ""}</div>
          {results.map(c => (
            <div key={c.id} onClick={() => { setSelectedContact(c); setPage("contact-detail"); }}
              style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
              <Avatar initials={c.avatar} size={44} color={statusColors[c.status]} photo={photoForContact(c.id)} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{c.role} · {c.company}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{c.location}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Badge color={statusColors[c.status]}>{statusLabels[c.status]}</Badge>
                {c.tags.map(t => <Badge key={t} color={C.muted}>{t}</Badge>)}
              </div>
              <ChevronRight size={16} color={C.muted} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PersonalCRMDemo() {
  const [page, setPage] = useState("dashboard");
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);

  const renderPage = () => {
    switch (page) {
      case "dashboard":      return <Dashboard setPage={setPage} />;
      case "contacts":       return <ContactsList setPage={setPage} setSelectedContact={setSelectedContact} />;
      case "contact-detail": return <ContactDetail contact={selectedContact} setPage={setPage} />;
      case "tasks":          return <Tasks />;
      case "calendar":       return <CalendarPage />;
      case "documents":      return <Documents />;
      case "search":         return <SearchPage setPage={setPage} setSelectedContact={setSelectedContact} />;
      default:               return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: C.bg, height: "100vh", display: "flex", overflow: "hidden" }}>
      <Sidebar page={page} setPage={setPage} />
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {renderPage()}
      </main>
    </div>
  );
}
