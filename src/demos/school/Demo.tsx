"use client";

import { useState, useEffect } from "react";
import {
  IconSchool, IconUsers, IconBook, IconCalendarEvent,
  IconChartBar, IconBell, IconUser, IconHome,
  IconClipboardList, IconCheck, IconX, IconSearch,
  IconPlus, IconEdit, IconTrash, IconEye, IconStar,
  IconMail, IconPhone, IconMapPin, IconClock,
  IconTrendingUp, IconTrendingDown, IconAlertCircle,
  IconChevronRight, IconChevronLeft, IconFilter,
  IconDownload, IconPrinter, IconSend, IconArrowLeft,
  IconGenderMale, IconGenderFemale, IconMedal,
  IconBookOpen, IconBuildingCommunity, IconFileText,
  IconHeartHandshake, IconTargetArrow, IconAward
} from "@tabler/icons-react";

// ─── palette ───────────────────────────────────────────────────────────────
const C = {
  sky: "#0ea5e9",
  skyDark: "#0284c7",
  skyLight: "#e0f2fe",
  yellow: "#eab308",
  yellowLight: "#fefce8",
  bg: "#f0f9ff",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
};

// ─── sample data ────────────────────────────────────────────────────────────
const STUDENTS = [
  { id: 1, name: "Emma Thompson", grade: "10-A", gpa: 3.9, attendance: 97, status: "active", gender: "F", email: "emma@school.edu", parent: "Sarah Thompson", parentPhone: "+1 555-0101", avatar: "ET", subjects: ["Math", "Science", "English", "History", "Art"], alerts: [] },
  { id: 2, name: "Liam Johnson", grade: "10-A", gpa: 3.4, attendance: 89, status: "active", gender: "M", email: "liam@school.edu", parent: "Mike Johnson", parentPhone: "+1 555-0102", avatar: "LJ", subjects: ["Math", "Science", "English", "PE", "Music"], alerts: ["Low attendance"] },
  { id: 3, name: "Sophia Chen", grade: "11-B", gpa: 4.0, attendance: 99, status: "active", gender: "F", email: "sophia@school.edu", parent: "Wei Chen", parentPhone: "+1 555-0103", avatar: "SC", subjects: ["Math", "Science", "English", "French", "Computer Science"], alerts: [] },
  { id: 4, name: "Noah Williams", grade: "9-C", gpa: 2.8, attendance: 82, status: "watch", gender: "M", email: "noah@school.edu", parent: "Lisa Williams", parentPhone: "+1 555-0104", avatar: "NW", subjects: ["Math", "Science", "English", "History", "PE"], alerts: ["Low GPA", "Attendance concern"] },
  { id: 5, name: "Ava Martinez", grade: "12-A", gpa: 3.7, attendance: 95, status: "active", gender: "F", email: "ava@school.edu", parent: "Carlos Martinez", parentPhone: "+1 555-0105", avatar: "AM", subjects: ["Math", "Science", "English", "Spanish", "Art"], alerts: [] },
  { id: 6, name: "Oliver Brown", grade: "11-B", gpa: 3.2, attendance: 91, status: "active", gender: "M", email: "oliver@school.edu", parent: "Jane Brown", parentPhone: "+1 555-0106", avatar: "OB", subjects: ["Math", "Science", "English", "Music", "History"], alerts: [] },
  { id: 7, name: "Isabella Davis", grade: "9-C", gpa: 3.6, attendance: 94, status: "active", gender: "F", email: "isabella@school.edu", parent: "Tom Davis", parentPhone: "+1 555-0107", avatar: "ID", subjects: ["Math", "Science", "English", "Drama", "French"], alerts: [] },
  { id: 8, name: "James Wilson", grade: "12-A", gpa: 3.1, attendance: 88, status: "watch", gender: "M", email: "james@school.edu", parent: "Ann Wilson", parentPhone: "+1 555-0108", avatar: "JW", subjects: ["Math", "Science", "English", "History", "PE"], alerts: ["Behavior note"] },
];

const CLASSES = [
  { id: 1, name: "Advanced Mathematics", teacher: "Mr. Reynolds", grade: "10-A/11-B", room: "204", schedule: "Mon/Wed/Fri 8:00–9:00", students: 28, avg: 82 },
  { id: 2, name: "Physics & Science Lab", teacher: "Dr. Patel", grade: "10-A/11-B", room: "Lab-1", schedule: "Tue/Thu 9:10–10:40", students: 24, avg: 78 },
  { id: 3, name: "English Literature", teacher: "Ms. Evans", grade: "All", room: "101", schedule: "Mon/Tue/Thu 10:00–11:00", students: 32, avg: 85 },
  { id: 4, name: "World History", teacher: "Mr. Grant", grade: "9-C/10-A", room: "305", schedule: "Mon/Wed 11:10–12:10", students: 30, avg: 79 },
  { id: 5, name: "Computer Science", teacher: "Ms. Kim", grade: "11-B/12-A", room: "CS Lab", schedule: "Tue/Fri 13:00–14:30", students: 22, avg: 88 },
  { id: 6, name: "Art & Design", teacher: "Mr. Torres", grade: "All", room: "Studio", schedule: "Wed/Fri 14:00–15:30", students: 18, avg: 91 },
  { id: 7, name: "Physical Education", teacher: "Coach Adams", grade: "9-C/10-A", room: "Gym", schedule: "Tue/Thu/Fri 15:00–16:00", students: 35, avg: 90 },
  { id: 8, name: "Music Theory", teacher: "Ms. Liu", grade: "All", room: "Music Hall", schedule: "Mon/Thu 14:00–15:00", students: 20, avg: 87 },
];

const GRADES_DATA = [
  { subject: "Math", q1: 82, q2: 85, q3: 88, q4: 90, grade: "A−" },
  { subject: "Science", q1: 75, q2: 78, q3: 76, q4: 80, grade: "B+" },
  { subject: "English", q1: 90, q2: 88, q3: 92, q4: 94, grade: "A" },
  { subject: "History", q1: 79, q2: 82, q3: 85, q4: 83, grade: "B+" },
  { subject: "Art", q1: 95, q2: 96, q3: 97, q4: 98, grade: "A+" },
];

const ATTENDANCE_DATA = [
  { month: "Sep", present: 20, absent: 1, late: 1 },
  { month: "Oct", present: 21, absent: 1, late: 0 },
  { month: "Nov", present: 19, absent: 2, late: 1 },
  { month: "Dec", present: 16, absent: 1, late: 0 },
  { month: "Jan", present: 20, absent: 0, late: 2 },
  { month: "Feb", present: 18, absent: 1, late: 1 },
];

const ANNOUNCEMENTS = [
  { id: 1, title: "Spring Academic Fair — May 24th", body: "Students are invited to display their science and art projects. Volunteers needed for setup. Contact Mr. Torres or Dr. Patel.", author: "Principal Wang", date: "May 12", category: "event", pinned: true },
  { id: 2, title: "Final Exam Schedule Released", body: "Final exams will be held June 9–13. All students must confirm exam room assignments via the student portal by May 30.", author: "Academics Office", date: "May 10", category: "academic", pinned: true },
  { id: 3, title: "Library Extended Hours", body: "The library will be open until 8:00 PM on weekdays from May 20 through exam week. Study pods are bookable online.", author: "Library Staff", date: "May 9", category: "facility", pinned: false },
  { id: 4, title: "Graduation Ceremony Details", body: "Class of 2026 graduation will be held on June 20 at 10:00 AM in the main auditorium. Each graduate receives 4 guest tickets.", author: "Principal Wang", date: "May 8", category: "event", pinned: false },
  { id: 5, title: "School Counselor Availability", body: "Mr. Hassan is available for 1-on-1 sessions every Tuesday and Thursday, 1–3 PM. Book via the portal.", author: "Counseling Dept", date: "May 6", category: "wellness", pinned: false },
  { id: 6, title: "Sports Day Results", body: "Congratulations to Grade 10-A for winning the inter-class relay! Full results posted on the bulletin board.", author: "Coach Adams", date: "May 3", category: "sports", pinned: false },
];

// ─── helpers ────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, color = C.sky }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 700, color }}>{initials}</span>
    </div>
  );
}

function Badge({ children, color = C.sky }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: color + "18", color, padding: "2px 8px", borderRadius: 99, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function StatCard({ icon, label, value, sub, color = C.sky, trend }: {
  icon: React.ReactNode; label: string; value: string | number; sub?: string; color?: string; trend?: "up" | "down";
}) {
  return (
    <div style={{ background: C.card, borderRadius: 16, padding: "20px 24px", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px #0001" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color }}>{icon}</span>
        </div>
        <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: C.text, lineHeight: 1 }}>{value}</div>
      {sub && (
        <div style={{ marginTop: 6, fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
          {trend === "up" && <IconTrendingUp size={13} color={C.success} />}
          {trend === "down" && <IconTrendingDown size={13} color={C.danger} />}
          {sub}
        </div>
      )}
    </div>
  );
}

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "dashboard", icon: <IconHome size={18} />, label: "Dashboard" },
    { id: "students", icon: <IconUsers size={18} />, label: "Students" },
    { id: "classes", icon: <IconBook size={18} />, label: "Classes" },
    { id: "gradebook", icon: <IconChartBar size={18} />, label: "Gradebook" },
    { id: "attendance", icon: <IconCalendarEvent size={18} />, label: "Attendance" },
    { id: "announcements", icon: <IconBell size={18} />, label: "Announcements" },
    { id: "parent-portal", icon: <IconHeartHandshake size={18} />, label: "Parent Portal" },
  ];
  return (
    <div style={{ width: 220, background: C.card, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${C.sky}, ${C.yellow})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconSchool size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>Bright Future</div>
            <div style={{ fontSize: 10, color: C.muted }}>Academy — Admin</div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: page === n.id ? C.sky : "transparent", color: page === n.id ? "#fff" : C.muted, fontWeight: page === n.id ? 700 : 500, fontSize: 13, textAlign: "left", transition: "all .15s" }}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>
      {/* Footer */}
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="PW" size={32} color={C.sky} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Principal Wang</div>
            <div style={{ fontSize: 10, color: C.muted }}>Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── pages ──────────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  const alerts = STUDENTS.filter(s => s.alerts.length > 0);
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text }}>Good morning, Principal Wang 👋</h1>
        <p style={{ color: C.muted, marginTop: 4 }}>Here's your school at a glance — Friday, May 16, 2026</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard icon={<IconUsers size={20} />} label="Total Students" value="847" sub="+12 this semester" trend="up" />
        <StatCard icon={<IconBook size={20} />} label="Active Classes" value="32" sub="8 subjects offered" color={C.yellow} />
        <StatCard icon={<IconCalendarEvent size={20} />} label="Avg Attendance" value="93.4%" sub="+1.2% vs last month" trend="up" color={C.success} />
        <StatCard icon={<IconChartBar size={20} />} label="School GPA" value="3.41" sub="Top: 4.0 (6 students)" color={C.purple} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Grade distribution */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 20 }}>Grade Distribution by Class</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CLASSES.slice(0, 6).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: C.muted, width: 160, flexShrink: 0 }}>{c.name}</span>
                <div style={{ flex: 1, height: 8, background: C.border, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.avg}%`, background: c.avg >= 85 ? C.success : c.avg >= 75 ? C.sky : C.warning, borderRadius: 99, transition: "width .5s" }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text, width: 30 }}>{c.avg}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Student Alerts</h3>
          {alerts.length === 0 ? (
            <div style={{ textAlign: "center", color: C.muted, fontSize: 13, padding: "20px 0" }}>No active alerts</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {alerts.map(s => (
                <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 12, background: C.bg, borderRadius: 10, border: `1px solid #fbbf2444` }}>
                  <IconAlertCircle size={16} color={C.warning} style={{ marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</div>
                    {s.alerts.map(a => <div key={a} style={{ fontSize: 11, color: C.warning }}>{a}</div>)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Today's schedule & quick actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Today's Classes</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CLASSES.slice(0, 4).map(c => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: C.bg, borderRadius: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: C.sky, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{c.teacher} · Room {c.room}</div>
                </div>
                <span style={{ fontSize: 11, color: C.muted }}>{c.schedule.split(" ").slice(-1)[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Quick Actions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Take Attendance", icon: <IconCalendarEvent size={20} />, action: "attendance", color: C.sky },
              { label: "View Students", icon: <IconUsers size={20} />, action: "students", color: C.yellow },
              { label: "Gradebook", icon: <IconChartBar size={20} />, action: "gradebook", color: C.purple },
              { label: "Announce", icon: <IconBell size={20} />, action: "announcements", color: C.success },
            ].map(a => (
              <button key={a.action} onClick={() => setPage(a.action)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 16, background: a.color + "10", border: `1px solid ${a.color}33`, borderRadius: 12, cursor: "pointer" }}>
                <span style={{ color: a.color }}>{a.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Students({ setPage, setSelectedStudent }: { setPage: (p: string) => void; setSelectedStudent: (s: typeof STUDENTS[0]) => void }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = STUDENTS.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = s.name.toLowerCase().includes(q) || s.grade.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchFilter = filter === "all" || (filter === "watch" && s.status === "watch") || (filter === "active" && s.status === "active");
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Students</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{filtered.length} of {STUDENTS.length} students shown</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.sky, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <IconPlus size={15} /> Add Student
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px" }}>
          <IconSearch size={16} color={C.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text, flex: 1 }} />
        </div>
        {["all", "active", "watch"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "10px 16px", borderRadius: 10, border: `1px solid ${filter === f ? C.sky : C.border}`, background: filter === f ? C.sky + "15" : C.card, color: filter === f ? C.sky : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>
            {f === "watch" ? "Needs Attention" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Student", "Grade", "GPA", "Attendance", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: ".5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={s.avatar} size={34} color={s.gender === "F" ? "#ec4899" : C.sky} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{s.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}><Badge color={C.purple}>{s.grade}</Badge></td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: s.gpa >= 3.7 ? C.success : s.gpa >= 3.0 ? C.sky : C.warning }}>{s.gpa.toFixed(1)}</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60, height: 6, background: C.border, borderRadius: 99 }}>
                      <div style={{ width: `${s.attendance}%`, height: "100%", background: s.attendance >= 90 ? C.success : s.attendance >= 80 ? C.warning : C.danger, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 12, color: C.muted }}>{s.attendance}%</span>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge color={s.status === "active" ? C.success : C.warning}>{s.status === "active" ? "Active" : "Needs Attention"}</Badge>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <button onClick={() => { setSelectedStudent(s); setPage("student-profile"); }}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: C.sky + "15", color: C.sky, border: `1px solid ${C.sky}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                    <IconEye size={13} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StudentProfile({ student, setPage }: { student: typeof STUDENTS[0]; setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<"overview" | "grades" | "attendance" | "contact">("overview");

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <button onClick={() => setPage("students")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.sky, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
        <IconArrowLeft size={15} /> Back to Students
      </button>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.sky}18, ${C.yellow}18)`, borderRadius: 20, padding: 28, marginBottom: 20, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Avatar initials={student.avatar} size={72} color={student.gender === "F" ? "#ec4899" : C.sky} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{student.name}</h1>
              <Badge color={C.purple}>{student.grade}</Badge>
              <Badge color={student.status === "active" ? C.success : C.warning}>{student.status === "active" ? "Active" : "Needs Attention"}</Badge>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}><IconMail size={14} />{student.email}</span>
              <span style={{ fontSize: 13, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>{student.gender === "F" ? <IconGenderFemale size={14} /> : <IconGenderMale size={14} />}{student.gender === "F" ? "Female" : "Male"}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 20, textAlign: "center" }}>
            <div><div style={{ fontSize: 24, fontWeight: 800, color: student.gpa >= 3.7 ? C.success : C.sky }}>{student.gpa.toFixed(1)}</div><div style={{ fontSize: 11, color: C.muted }}>GPA</div></div>
            <div><div style={{ fontSize: 24, fontWeight: 800, color: student.attendance >= 90 ? C.success : C.warning }}>{student.attendance}%</div><div style={{ fontSize: 11, color: C.muted }}>Attendance</div></div>
          </div>
        </div>
        {student.alerts.length > 0 && (
          <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {student.alerts.map(a => (
              <span key={a} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: C.warning, background: C.warning + "18", padding: "4px 10px", borderRadius: 99, fontWeight: 600 }}>
                <IconAlertCircle size={12} /> {a}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.card, padding: 4, borderRadius: 12, border: `1px solid ${C.border}`, width: "fit-content" }}>
        {(["overview", "grades", "attendance", "contact"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            style={{ padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: activeTab === t ? C.sky : "transparent", color: activeTab === t ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Enrolled Subjects</h3>
            {student.subjects.map(subj => (
              <div key={subj} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <IconBook size={16} color={C.sky} />
                <span style={{ fontSize: 13, color: C.text }}>{subj}</span>
                <div style={{ flex: 1 }} />
                <Badge color={C.sky}>Enrolled</Badge>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Performance Snapshot</h3>
            {GRADES_DATA.map(g => (
              <div key={g.subject} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: C.text }}>{g.subject}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{g.grade}</span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 99 }}>
                  <div style={{ width: `${g.q4}%`, height: "100%", background: g.q4 >= 90 ? C.success : g.q4 >= 80 ? C.sky : C.warning, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "grades" && (
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Quarterly Grade Report</h3>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 12, color: C.muted }}>
              <IconDownload size={13} /> Export PDF
            </button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Subject", "Q1", "Q2", "Q3", "Q4", "Final Grade"].map(h => (
                  <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: C.muted }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRADES_DATA.map((g, i) => (
                <tr key={g.subject} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                  <td style={{ padding: "14px 20px", fontWeight: 600, color: C.text }}>{g.subject}</td>
                  {[g.q1, g.q2, g.q3, g.q4].map((q, qi) => (
                    <td key={qi} style={{ padding: "14px 20px", color: q >= 90 ? C.success : q >= 80 ? C.sky : q >= 70 ? C.warning : C.danger, fontWeight: 600 }}>{q}%</td>
                  ))}
                  <td style={{ padding: "14px 20px" }}><Badge color={g.q4 >= 90 ? C.success : g.q4 >= 80 ? C.sky : C.warning}>{g.grade}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "attendance" && (
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 20 }}>Monthly Attendance Record</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            <div style={{ textAlign: "center", padding: 20, background: C.success + "10", borderRadius: 12, border: `1px solid ${C.success}33` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.success }}>112</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Days Present</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: C.danger + "10", borderRadius: 12, border: `1px solid ${C.danger}33` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.danger }}>6</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Days Absent</div>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: C.warning + "10", borderRadius: 12, border: `1px solid ${C.warning}33` }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: C.warning }}>5</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Late Arrivals</div>
            </div>
          </div>
          {ATTENDANCE_DATA.map(m => (
            <div key={m.month} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.text, width: 40 }}>{m.month}</span>
              <div style={{ flex: 1, display: "flex", gap: 2, height: 18 }}>
                {Array.from({ length: m.present + m.absent + m.late }).map((_, i) => (
                  <div key={i} style={{ flex: 1, borderRadius: 3, background: i < m.present ? C.success : i < m.present + m.late ? C.warning : C.danger }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: C.muted, width: 60, textAlign: "right" }}>{m.present}/{m.present + m.absent + m.late} days</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "contact" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 20 }}>Parent / Guardian</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar initials={student.parent.split(" ").map(w => w[0]).join("")} size={44} color={C.yellow} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{student.parent}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Primary Guardian</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text }}>
                  <IconPhone size={15} color={C.muted} />{student.parentPhone}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text }}>
                  <IconMail size={15} color={C.muted} />parent@email.com
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text }}>
                  <IconMapPin size={15} color={C.muted} />123 Maple Street, Springfield
                </div>
              </div>
              <button style={{ marginTop: 8, padding: "10px 0", background: C.sky, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <IconMail size={14} /> Send Message
              </button>
            </div>
          </div>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Notes & Actions</h3>
            <textarea placeholder="Add a note about this student..." rows={5}
              style={{ width: "100%", padding: 12, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, resize: "none", outline: "none", marginBottom: 12, boxSizing: "border-box" }} />
            <button style={{ width: "100%", padding: "10px 0", background: C.sky, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Save Note</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Classes() {
  const [selected, setSelected] = useState<typeof CLASSES[0] | null>(null);
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Classes</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{CLASSES.length} active classes this semester</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.sky, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <IconPlus size={15} /> New Class
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {CLASSES.map(c => (
          <div key={c.id} onClick={() => setSelected(c === selected ? null : c)}
            style={{ background: C.card, borderRadius: 16, padding: 20, border: `2px solid ${selected?.id === c.id ? C.sky : C.border}`, cursor: "pointer", transition: "border-color .15s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{c.teacher}</div>
              </div>
              <Badge color={C.sky}>{c.grade}</Badge>
            </div>
            <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}><IconUsers size={12} />{c.students} students</span>
              <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}><IconMapPin size={12} />Room {c.room}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1, height: 6, background: C.border, borderRadius: 99 }}>
                <div style={{ width: `${c.avg}%`, height: "100%", background: c.avg >= 85 ? C.success : c.avg >= 75 ? C.sky : C.warning, borderRadius: 99 }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{c.avg}% avg</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
              <IconClock size={11} />{c.schedule}
            </div>
            {selected?.id === c.id && (
              <div style={{ marginTop: 16, padding: "14px 0 0", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
                <button style={{ flex: 1, padding: "8px 0", background: C.sky + "15", color: C.sky, border: `1px solid ${C.sky}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>View Roster</button>
                <button style={{ flex: 1, padding: "8px 0", background: C.yellow + "15", color: C.yellow, border: `1px solid ${C.yellow}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Enter Grades</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Gradebook() {
  const [selectedClass, setSelectedClass] = useState("Advanced Mathematics");
  const scores: Record<string, number[]> = {
    "Emma Thompson":   [95, 88, 92, 97, 85],
    "Liam Johnson":    [72, 78, 70, 75, 68],
    "Sophia Chen":     [98, 100, 96, 99, 100],
    "Noah Williams":   [60, 65, 58, 62, 55],
    "Ava Martinez":    [85, 88, 90, 87, 92],
    "Oliver Brown":    [78, 80, 75, 82, 79],
    "Isabella Davis":  [88, 85, 90, 92, 87],
    "James Wilson":    [70, 72, 68, 74, 71],
  };
  const assignments = ["HW #1", "HW #2", "Quiz 1", "Midterm", "HW #3"];

  const avg = (arr: number[]) => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  const letterGrade = (n: number) => n >= 90 ? "A" : n >= 80 ? "B" : n >= 70 ? "C" : n >= 60 ? "D" : "F";

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Gradebook</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Enter and manage student grades</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, cursor: "pointer", fontSize: 13, color: C.muted }}>
            <IconDownload size={14} /> Export
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", background: C.sky, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            <IconPlus size={14} /> Add Assignment
          </button>
        </div>
      </div>

      {/* Class selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
        {CLASSES.map(c => (
          <button key={c.name} onClick={() => setSelectedClass(c.name)}
            style={{ padding: "8px 16px", borderRadius: 20, border: `1px solid ${selectedClass === c.name ? C.sky : C.border}`, background: selectedClass === c.name ? C.sky : C.card, color: selectedClass === c.name ? "#fff" : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Grade table */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ background: C.bg }}>
              <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: C.muted, position: "sticky", left: 0, background: C.bg }}>Student</th>
              {assignments.map(a => (
                <th key={a} style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, fontWeight: 700, color: C.muted }}>{a}</th>
              ))}
              <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, fontWeight: 700, color: C.muted }}>Average</th>
              <th style={{ padding: "12px 16px", textAlign: "center", fontSize: 12, fontWeight: 700, color: C.muted }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(scores).map(([name, s], i) => {
              const a = avg(s);
              return (
                <tr key={name} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                  <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600, color: C.text, position: "sticky", left: 0, background: i % 2 === 0 ? "#fff" : "#fafbff" }}>{name}</td>
                  {s.map((score, si) => (
                    <td key={si} style={{ padding: "12px 16px", textAlign: "center" }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: score >= 90 ? C.success : score >= 80 ? C.sky : score >= 70 ? C.warning : C.danger }}>{score}</span>
                    </td>
                  ))}
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: a >= 90 ? C.success : a >= 80 ? C.sky : a >= 70 ? C.warning : C.danger }}>{a}%</span>
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "center" }}>
                    <Badge color={a >= 90 ? C.success : a >= 80 ? C.sky : a >= 70 ? C.warning : C.danger}>{letterGrade(a)}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Attendance() {
  const [date, setDate] = useState("2026-05-16");
  const [records, setRecords] = useState<Record<number, "present" | "absent" | "late">>(
    Object.fromEntries(STUDENTS.map(s => [s.id, s.attendance >= 90 ? "present" : s.attendance >= 80 ? "late" : "absent"]))
  );

  const counts = { present: 0, absent: 0, late: 0 };
  Object.values(records).forEach(v => counts[v]++);

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Attendance</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Mark daily attendance for all classes</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }} />
          <button style={{ padding: "10px 18px", background: C.sky, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Save</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.success + "15", border: `1px solid ${C.success}44`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <IconCheck size={24} color={C.success} />
          <div><div style={{ fontSize: 24, fontWeight: 800, color: C.success }}>{counts.present}</div><div style={{ fontSize: 12, color: C.muted }}>Present</div></div>
        </div>
        <div style={{ background: C.danger + "15", border: `1px solid ${C.danger}44`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <IconX size={24} color={C.danger} />
          <div><div style={{ fontSize: 24, fontWeight: 800, color: C.danger }}>{counts.absent}</div><div style={{ fontSize: 12, color: C.muted }}>Absent</div></div>
        </div>
        <div style={{ background: C.warning + "15", border: `1px solid ${C.warning}44`, borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
          <IconClock size={24} color={C.warning} />
          <div><div style={{ fontSize: 24, fontWeight: 800, color: C.warning }}>{counts.late}</div><div style={{ fontSize: 12, color: C.muted }}>Late</div></div>
        </div>
      </div>

      {/* Student list */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, background: C.bg }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>All Students — {date}</span>
        </div>
        {STUDENTS.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
            <Avatar initials={s.avatar} size={34} color={s.gender === "F" ? "#ec4899" : C.sky} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{s.grade}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {(["present", "late", "absent"] as const).map(status => (
                <button key={status} onClick={() => setRecords(r => ({ ...r, [s.id]: status }))}
                  style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${records[s.id] === status ? (status === "present" ? C.success : status === "late" ? C.warning : C.danger) : C.border}`, background: records[s.id] === status ? (status === "present" ? C.success : status === "late" ? C.warning : C.danger) + "18" : "transparent", color: records[s.id] === status ? (status === "present" ? C.success : status === "late" ? C.warning : C.danger) : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Announcements() {
  const [selected, setSelected] = useState<typeof ANNOUNCEMENTS[0] | null>(null);
  const [showForm, setShowForm] = useState(false);
  const catColors: Record<string, string> = { event: C.sky, academic: C.purple, facility: C.success, wellness: "#ec4899", sports: C.warning };

  if (showForm) {
    return (
      <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
        <button onClick={() => setShowForm(false)} style={{ display: "flex", alignItems: "center", gap: 6, color: C.sky, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
          <IconArrowLeft size={15} /> Back to Announcements
        </button>
        <div style={{ maxWidth: 640, background: C.card, borderRadius: 20, padding: 32, border: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 24 }}>New Announcement</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase" }}>Title</label>
              <input placeholder="Announcement title..." style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14, color: C.text, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase" }}>Category</label>
              <select style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#fff" }}>
                <option>Academic</option><option>Event</option><option>Facility</option><option>Wellness</option><option>Sports</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase" }}>Audience</label>
              <select style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#fff" }}>
                <option>All Students & Parents</option><option>Grade 9 Only</option><option>Grade 10 Only</option><option>Grade 11 Only</option><option>Grade 12 Only</option><option>Staff Only</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase" }}>Message</label>
              <textarea placeholder="Write your announcement..." rows={6}
                style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", resize: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13, color: C.text }}>
                <input type="checkbox" />Pin this announcement
              </label>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: "12px 0", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, cursor: "pointer", fontSize: 14, color: C.muted, fontWeight: 600 }}>Cancel</button>
              <button style={{ flex: 2, padding: "12px 0", background: C.sky, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <IconSend size={15} /> Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Announcements</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{ANNOUNCEMENTS.filter(a => a.pinned).length} pinned · {ANNOUNCEMENTS.length} total</p>
        </div>
        <button onClick={() => setShowForm(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.sky, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <IconPlus size={15} /> New Announcement
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} onClick={() => setSelected(selected?.id === a.id ? null : a)}
            style={{ background: C.card, borderRadius: 16, padding: 20, border: `2px solid ${selected?.id === a.id ? C.sky : C.border}`, cursor: "pointer", transition: "border-color .15s" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                  {a.pinned && <span style={{ fontSize: 10, fontWeight: 700, color: C.yellow, background: C.yellow + "20", padding: "2px 8px", borderRadius: 99 }}>📌 PINNED</span>}
                  <Badge color={catColors[a.category] || C.sky}>{a.category.toUpperCase()}</Badge>
                  <span style={{ fontSize: 12, color: C.muted }}>{a.date}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{selected?.id === a.id ? a.body : a.body.substring(0, 100) + "..."}</p>
                {selected?.id === a.id && (
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: C.muted }}>— {a.author}</span>
                    <div style={{ flex: 1 }} />
                    <button style={{ padding: "6px 12px", background: C.sky + "15", color: C.sky, border: `1px solid ${C.sky}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Edit</button>
                    <button style={{ padding: "6px 12px", background: C.danger + "15", color: C.danger, border: `1px solid ${C.danger}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentPortal() {
  const student = STUDENTS[0]; // Emma — logged in as parent
  const [activeTab, setActiveTab] = useState<"overview" | "grades" | "messages">("overview");

  return (
    <div style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Parent portal banner */}
      <div style={{ background: `linear-gradient(135deg, ${C.sky}, ${C.yellow})`, padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <IconHeartHandshake size={32} color="#fff" />
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Parent Portal</div>
            <div style={{ fontSize: 13, color: "#ffffff99" }}>Welcome, Sarah Thompson — viewing {student.name}'s profile</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        {/* Student snapshot */}
        <div style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar initials={student.avatar} size={52} color="#ec4899" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.text }}>{student.name}</div>
            <div style={{ fontSize: 13, color: C.muted }}>Grade {student.grade} · {student.email}</div>
          </div>
          <div style={{ display: "flex", gap: 24, textAlign: "center" }}>
            <div><div style={{ fontSize: 22, fontWeight: 800, color: C.success }}>{student.gpa.toFixed(1)}</div><div style={{ fontSize: 11, color: C.muted }}>GPA</div></div>
            <div><div style={{ fontSize: 22, fontWeight: 800, color: C.sky }}>{student.attendance}%</div><div style={{ fontSize: 11, color: C.muted }}>Attendance</div></div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.bg, padding: 4, borderRadius: 12, width: "fit-content", border: `1px solid ${C.border}` }}>
          {(["overview", "grades", "messages"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ padding: "8px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: activeTab === t ? C.sky : "transparent", color: activeTab === t ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Recent Announcements</h3>
              {ANNOUNCEMENTS.slice(0, 3).map(a => (
                <div key={a.id} style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: C.sky, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Today's Schedule</h3>
              {CLASSES.slice(0, 4).map(c => (
                <div key={c.id} style={{ padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{c.teacher} · {c.schedule.split(" ").slice(-1)[0]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "grades" && (
          <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ padding: "16px 24px", borderBottom: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Current Grades — {student.name}</h3>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Subject", "Q1", "Q2", "Q3", "Q4", "Grade"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 700, color: C.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GRADES_DATA.map((g, i) => (
                  <tr key={g.subject} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: C.text }}>{g.subject}</td>
                    {[g.q1, g.q2, g.q3, g.q4].map((q, qi) => (
                      <td key={qi} style={{ padding: "14px 20px", color: q >= 85 ? C.success : q >= 70 ? C.sky : C.warning, fontWeight: 600 }}>{q}%</td>
                    ))}
                    <td style={{ padding: "14px 20px" }}><Badge color={g.q4 >= 90 ? C.success : g.q4 >= 80 ? C.sky : C.warning}>{g.grade}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "messages" && (
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 20 }}>Message a Teacher</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Teacher</label>
                <select style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }}>
                  {CLASSES.map(c => <option key={c.id}>{c.teacher} — {c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Subject</label>
                <input placeholder="e.g. Question about upcoming exam" style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Message</label>
                <textarea rows={5} placeholder="Write your message..." style={{ width: "100%", padding: "12px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", resize: "none", boxSizing: "border-box" }} />
              </div>
              <button style={{ padding: "12px 0", background: C.sky, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <IconSend size={15} /> Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── root ────────────────────────────────────────────────────────────────────
export default function SchoolDemo() {
  const [page, setPage] = useState("dashboard");
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0]>(STUDENTS[0]);

  const renderPage = () => {
    switch (page) {
      case "dashboard":     return <Dashboard setPage={setPage} />;
      case "students":      return <Students setPage={setPage} setSelectedStudent={setSelectedStudent} />;
      case "student-profile": return <StudentProfile student={selectedStudent} setPage={setPage} />;
      case "classes":       return <Classes />;
      case "gradebook":     return <Gradebook />;
      case "attendance":    return <Attendance />;
      case "announcements": return <Announcements />;
      case "parent-portal": return <ParentPortal />;
      default:              return <Dashboard setPage={setPage} />;
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
