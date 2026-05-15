"use client";

import { useState } from "react";
import {
  BookOpen, GraduationCap, Users, Calendar, FileText,
  CreditCard, Search, Star, Clock, MapPin, ChevronRight,
  ArrowLeft, Download, Filter, Check, X, Plus, Bell,
  Building, Award, BarChart2, Briefcase, Book, Home,
  User, Settings, LogOut, TrendingUp, AlertCircle,
  CheckCircle, XCircle, Mail, Phone
} from "lucide-react";

// ─── palette ───────────────────────────────────────────────────────────────
const C = {
  burgundy: "#6b1a2a",
  burgundyDark: "#4e1220",
  burgundyLight: "#fdf2f4",
  gold: "#b8860b",
  goldLight: "#fefce8",
  bg: "#f8f7f5",
  card: "#ffffff",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e5e7eb",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  accent: "#1d4ed8",
};

// ─── data ──────────────────────────────────────────────────────────────────
const COURSES = [
  { id: "CS401", name: "Advanced Algorithms", dept: "Computer Science", credits: 4, instructor: "Prof. Chen", seats: 30, enrolled: 27, schedule: "Mon/Wed 9:00–10:30", room: "Tech 201", rating: 4.8, level: "Graduate", prereq: "CS301", description: "Advanced data structures, complexity analysis, graph algorithms, and NP-completeness." },
  { id: "MATH302", name: "Linear Algebra & Applications", dept: "Mathematics", credits: 3, instructor: "Prof. Nakamura", seats: 40, enrolled: 36, schedule: "Tue/Thu 11:00–12:30", room: "Math 105", rating: 4.6, level: "Undergraduate", prereq: "MATH201", description: "Vector spaces, eigenvalues, linear transformations, and their applications in data science." },
  { id: "PHYS201", name: "Classical Mechanics", dept: "Physics", credits: 4, instructor: "Dr. Okafor", seats: 35, enrolled: 28, schedule: "Mon/Wed/Fri 10:00–11:00", room: "Sci 310", rating: 4.5, level: "Undergraduate", prereq: "PHYS101", description: "Newtonian mechanics, energy conservation, rotational motion, and oscillations." },
  { id: "ECON501", name: "Microeconomic Theory", dept: "Economics", credits: 3, instructor: "Prof. Martinez", seats: 25, enrolled: 23, schedule: "Tue/Thu 14:00–15:30", room: "Econ 402", rating: 4.7, level: "Graduate", prereq: "ECON301", description: "Consumer and producer theory, market equilibria, game theory, and welfare analysis." },
  { id: "BIO304", name: "Molecular Biology", dept: "Biology", credits: 4, instructor: "Dr. Patel", seats: 24, enrolled: 20, schedule: "Mon/Wed 13:00–14:30", room: "Bio Lab 2", rating: 4.9, level: "Undergraduate", prereq: "BIO201", description: "DNA replication, transcription, translation, recombinant DNA technology." },
  { id: "HIST401", name: "Modern World History", dept: "History", credits: 3, instructor: "Prof. Williams", seats: 50, enrolled: 42, schedule: "Tue/Thu 9:00–10:30", room: "Hum 101", rating: 4.4, level: "Undergraduate", prereq: "None", description: "20th-century political, economic, and social transformations across the globe." },
  { id: "CS501", name: "Machine Learning", dept: "Computer Science", credits: 4, instructor: "Prof. Kim", seats: 20, enrolled: 18, schedule: "Mon/Wed 15:00–16:30", room: "Tech 305", rating: 4.9, level: "Graduate", prereq: "CS401, MATH302", description: "Supervised and unsupervised learning, neural networks, deep learning, and applications." },
  { id: "ENG301", name: "Academic Writing & Research", dept: "English", credits: 2, instructor: "Dr. Foster", seats: 20, enrolled: 15, schedule: "Fri 10:00–12:00", room: "Hum 215", rating: 4.3, level: "Undergraduate", prereq: "ENG101", description: "Research methodology, scholarly writing, citation practices, and argument construction." },
];

const MY_ENROLLMENTS = ["CS401", "MATH302", "CS501", "ENG301"];

const TRANSCRIPT = [
  { semester: "Fall 2024", courses: [{ id: "CS301", name: "Data Structures", credits: 4, grade: "A", points: 4.0 }, { id: "MATH201", name: "Calculus II", credits: 3, grade: "A−", points: 3.7 }, { id: "ENG101", name: "Composition", credits: 2, grade: "B+", points: 3.3 }] },
  { semester: "Spring 2025", courses: [{ id: "CS302", name: "Operating Systems", credits: 4, grade: "A−", points: 3.7 }, { id: "PHYS101", name: "Physics I", credits: 4, grade: "B+", points: 3.3 }, { id: "MATH202", name: "Discrete Math", credits: 3, grade: "A", points: 4.0 }] },
  { semester: "Fall 2025", courses: [{ id: "CS401", name: "Advanced Algorithms", credits: 4, grade: "IP", points: 0 }, { id: "MATH302", name: "Linear Algebra", credits: 3, grade: "IP", points: 0 }, { id: "CS501", name: "Machine Learning", credits: 4, grade: "IP", points: 0 }] },
];

const FACULTY = [
  { name: "Prof. Chen", dept: "Computer Science", title: "Associate Professor", courses: ["CS401", "CS302"], email: "chen@university.edu", office: "Tech 502", hours: "Mon/Wed 11:00–13:00", rating: 4.8 },
  { name: "Prof. Kim", dept: "Computer Science", title: "Assistant Professor", courses: ["CS501"], email: "kim@university.edu", office: "Tech 410", hours: "Tue/Thu 13:00–15:00", rating: 4.9 },
  { name: "Prof. Nakamura", dept: "Mathematics", title: "Professor", courses: ["MATH302"], email: "nakamura@university.edu", office: "Math 310", hours: "Mon/Wed/Fri 13:00–14:00", rating: 4.6 },
  { name: "Dr. Okafor", dept: "Physics", title: "Associate Professor", courses: ["PHYS201"], email: "okafor@university.edu", office: "Sci 205", hours: "Tue 14:00–16:00", rating: 4.5 },
  { name: "Prof. Martinez", dept: "Economics", title: "Professor", courses: ["ECON501"], email: "martinez@university.edu", office: "Econ 301", hours: "Thu 10:00–12:00", rating: 4.7 },
  { name: "Dr. Patel", dept: "Biology", title: "Assistant Professor", courses: ["BIO304"], email: "patel@university.edu", office: "Bio 108", hours: "Mon/Fri 14:00–15:30", rating: 4.9 },
];

const SCHEDULE_EVENTS = [
  { day: "Mon", time: "9:00", course: "CS401", room: "Tech 201", color: "#6b1a2a" },
  { day: "Mon", time: "13:00", course: "BIO304", room: "Bio Lab 2", color: "#16a34a" },
  { day: "Mon", time: "15:00", course: "CS501", room: "Tech 305", color: "#1d4ed8" },
  { day: "Tue", time: "11:00", course: "MATH302", room: "Math 105", color: "#d97706" },
  { day: "Tue", time: "14:00", course: "ECON501", room: "Econ 402", color: "#7c3aed" },
  { day: "Wed", time: "9:00", course: "CS401", room: "Tech 201", color: "#6b1a2a" },
  { day: "Wed", time: "15:00", course: "CS501", room: "Tech 305", color: "#1d4ed8" },
  { day: "Thu", time: "11:00", course: "MATH302", room: "Math 105", color: "#d97706" },
  { day: "Fri", time: "10:00", course: "ENG301", room: "Hum 215", color: "#dc2626" },
];

const BILLING_ITEMS = [
  { description: "Tuition — Fall 2025 (12 credits)", amount: 7200, due: "Aug 15, 2025", status: "paid" },
  { description: "Student Activity Fee", amount: 150, due: "Aug 15, 2025", status: "paid" },
  { description: "Library & Technology Fee", amount: 220, due: "Aug 15, 2025", status: "paid" },
  { description: "Tuition — Spring 2026 (11 credits)", amount: 6600, due: "Jan 15, 2026", status: "pending" },
  { description: "Housing — Spring 2026", amount: 3200, due: "Jan 15, 2026", status: "pending" },
  { description: "Meal Plan — Spring 2026", amount: 1800, due: "Jan 15, 2026", status: "pending" },
];

// ─── helpers ────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, color = C.burgundy }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `2px solid ${color}44` }}>
      <span style={{ fontSize: size * 0.36, fontWeight: 800, color }}>{initials}</span>
    </div>
  );
}

function Badge({ children, color = C.burgundy }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: color + "18", color, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", border: `1px solid ${color}33` }}>
      {children}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} fill={i <= Math.round(rating) ? C.gold : "none"} color={i <= Math.round(rating) ? C.gold : C.muted} />
      ))}
      <span style={{ fontSize: 12, color: C.muted, marginLeft: 2 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "catalog", icon: <BookOpen size={17} />, label: "Course Catalog" },
    { id: "enrollment", icon: <GraduationCap size={17} />, label: "My Enrollment" },
    { id: "schedule", icon: <Calendar size={17} />, label: "Schedule" },
    { id: "transcript", icon: <FileText size={17} />, label: "Transcript" },
    { id: "faculty", icon: <Users size={17} />, label: "Faculty" },
    { id: "billing", icon: <CreditCard size={17} />, label: "Billing" },
  ];
  return (
    <div style={{ width: 230, background: C.burgundy, display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ffffff22" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>Crestwood</div>
            <div style={{ fontSize: 10, color: "#ffffff88" }}>University Portal</div>
          </div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: page === n.id ? "#ffffff22" : "transparent", color: page === n.id ? "#fff" : "#ffffff88", fontWeight: page === n.id ? 700 : 500, fontSize: 13, textAlign: "left", transition: "all .15s" }}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>
      {/* Profile */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #ffffff22" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="AS" size={32} color="#fff" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Alex Sinclair</div>
            <div style={{ fontSize: 10, color: "#ffffff77" }}>ID: U-2024-0847</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── pages ──────────────────────────────────────────────────────────────────
function CourseCatalog({ setPage, setSelectedCourse }: { setPage: (p: string) => void; setSelectedCourse: (c: typeof COURSES[0]) => void }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [level, setLevel] = useState("All");
  const depts = ["All", "Computer Science", "Mathematics", "Physics", "Economics", "Biology", "History", "English"];
  const levels = ["All", "Undergraduate", "Graduate"];

  const filtered = COURSES.filter(c => {
    const q = search.toLowerCase();
    return (
      (c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)) &&
      (dept === "All" || c.dept === dept) &&
      (level === "All" || c.level === level)
    );
  });

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Course Catalog</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Spring 2026 — {COURSES.length} courses available</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", flex: 1, minWidth: 200 }}>
          <Search size={15} color={C.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses, instructors..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text, flex: 1 }} />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#fff" }}>
          {depts.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={level} onChange={e => setLevel(e.target.value)} style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", background: "#fff" }}>
          {levels.map(l => <option key={l}>{l}</option>)}
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(c => {
          const isEnrolled = MY_ENROLLMENTS.includes(c.id);
          const pct = Math.round((c.enrolled / c.seats) * 100);
          return (
            <div key={c.id} style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, display: "flex", gap: 16, cursor: "pointer", transition: "box-shadow .15s" }}
              onClick={() => { setSelectedCourse(c); setPage("course-detail"); }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: C.burgundy + "12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Book size={22} color={C.burgundy} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.gold, fontFamily: "monospace" }}>{c.id}</span>
                  <Badge color={c.level === "Graduate" ? C.burgundy : C.accent}>{c.level}</Badge>
                  <Badge color={C.muted}>{c.credits} cr</Badge>
                  {isEnrolled && <Badge color={C.success}>Enrolled</Badge>}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>{c.instructor} · {c.dept}</div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}><Clock size={12} />{c.schedule}</span>
                  <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}><MapPin size={12} />{c.room}</span>
                  <StarRating rating={c.rating} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: pct >= 90 ? C.danger : pct >= 70 ? C.warning : C.success, fontWeight: 600 }}>{c.enrolled}/{c.seats} seats</div>
                  <div style={{ width: 80, height: 4, background: C.border, borderRadius: 99, marginTop: 4 }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: pct >= 90 ? C.danger : pct >= 70 ? C.warning : C.success, borderRadius: 99 }} />
                  </div>
                </div>
                <ChevronRight size={16} color={C.muted} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CourseDetail({ course, setPage }: { course: typeof COURSES[0]; setPage: (p: string) => void }) {
  const isEnrolled = MY_ENROLLMENTS.includes(course.id);
  const pct = Math.round((course.enrolled / course.seats) * 100);
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <button onClick={() => setPage("catalog")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.burgundy, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
        <ArrowLeft size={15} /> Back to Catalog
      </button>

      <div style={{ background: `linear-gradient(135deg, ${C.burgundy}18, ${C.gold}18)`, borderRadius: 20, padding: 28, border: `1px solid ${C.border}`, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: C.gold, fontFamily: "monospace" }}>{course.id}</span>
              <Badge color={course.level === "Graduate" ? C.burgundy : C.accent}>{course.level}</Badge>
              <Badge color={C.muted}>{course.credits} credits</Badge>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 6 }}>{course.name}</h1>
            <p style={{ fontSize: 14, color: C.muted }}>{course.dept}</p>
          </div>
          <div>
            {isEnrolled ? (
              <button style={{ padding: "12px 24px", background: C.success, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={16} /> Enrolled
              </button>
            ) : (
              <button style={{ padding: "12px 24px", background: C.burgundy, color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <Plus size={16} /> Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 12 }}>Description</h3>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{course.description}</p>
          </div>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Instructor</h3>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Avatar initials={course.instructor.split(" ")[1]?.substring(0, 2) || "PR"} size={52} color={C.burgundy} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{course.instructor}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{course.dept}</div>
                <StarRating rating={course.rating} />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Schedule", value: course.schedule, icon: <Calendar size={15} /> },
            { label: "Room", value: course.room, icon: <MapPin size={15} /> },
            { label: "Prerequisite", value: course.prereq, icon: <BookOpen size={15} /> },
            { label: "Credits", value: `${course.credits} credit hours`, icon: <Award size={15} /> },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ color: C.burgundy }}>{icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{label}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{value}</div>
            </div>
          ))}
          <div style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>Seat Availability</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: pct >= 90 ? C.danger : C.success }}>{course.seats - course.enrolled} seats left</div>
            <div style={{ width: "100%", height: 6, background: C.border, borderRadius: 99, marginTop: 8 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: pct >= 90 ? C.danger : pct >= 70 ? C.warning : C.success, borderRadius: 99 }} />
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{course.enrolled}/{course.seats} enrolled</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyEnrollment({ setPage, setSelectedCourse }: { setPage: (p: string) => void; setSelectedCourse: (c: typeof COURSES[0]) => void }) {
  const enrolled = COURSES.filter(c => MY_ENROLLMENTS.includes(c.id));
  const totalCredits = enrolled.reduce((sum, c) => sum + c.credits, 0);

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>My Enrollment</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Spring 2026 — {enrolled.length} courses · {totalCredits} credit hours</p>
      </div>

      {/* Credit load */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Enrolled Courses", value: enrolled.length, color: C.burgundy },
          { label: "Total Credits", value: totalCredits, color: C.gold },
          { label: "Status", value: totalCredits >= 12 ? "Full-Time" : "Part-Time", color: C.success },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}`, textAlign: "center" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {enrolled.map(c => (
          <div key={c.id} style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, display: "flex", gap: 16, cursor: "pointer" }}
            onClick={() => { setSelectedCourse(c); setPage("course-detail"); }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: C.burgundy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: "monospace" }}>{c.id.replace(/[A-Z]/g, "")}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.gold, fontWeight: 700, fontFamily: "monospace" }}>{c.id}</span>
                <Badge color={C.success}>Enrolled</Badge>
                <Badge color={C.muted}>{c.credits} cr</Badge>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{c.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>{c.instructor} · {c.schedule} · {c.room}</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={e => e.stopPropagation()} style={{ padding: "7px 14px", background: C.danger + "15", color: C.danger, border: `1px solid ${C.danger}33`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Drop</button>
              <ChevronRight size={16} color={C.muted} />
            </div>
          </div>
        ))}
      </div>

      {/* Add more */}
      <button onClick={() => setPage("catalog")} style={{ marginTop: 16, width: "100%", padding: "14px 0", background: C.burgundy + "10", border: `2px dashed ${C.burgundy}44`, borderRadius: 14, cursor: "pointer", fontSize: 14, fontWeight: 600, color: C.burgundy, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Plus size={16} /> Browse More Courses
      </button>
    </div>
  );
}

function Schedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Weekly Schedule</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Spring 2026 — Week of May 12–16</p>
      </div>

      {/* Timetable */}
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)" }}>
          {/* Header */}
          <div style={{ background: C.bg, padding: "14px 0", borderBottom: `1px solid ${C.border}` }} />
          {days.map(d => (
            <div key={d} style={{ background: C.bg, padding: "14px 0", textAlign: "center", borderBottom: `1px solid ${C.border}`, borderLeft: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{d}</div>
            </div>
          ))}
          {/* Time slots */}
          {times.map(time => (
            <>
              <div key={`t-${time}`} style={{ padding: "0 8px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{time}</span>
              </div>
              {days.map(day => {
                const event = SCHEDULE_EVENTS.find(e => e.day === day && e.time === time);
                const course = event ? COURSES.find(c => c.id === event.course) : null;
                return (
                  <div key={`${day}-${time}`} style={{ borderLeft: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, minHeight: 56, padding: 4 }}>
                    {event && course && (
                      <div style={{ height: "100%", background: event.color + "18", border: `1px solid ${event.color}44`, borderRadius: 6, padding: "4px 8px", borderLeft: `3px solid ${event.color}` }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: event.color, fontFamily: "monospace" }}>{event.course}</div>
                        <div style={{ fontSize: 10, color: C.text, fontWeight: 600, lineHeight: 1.2 }}>{course.name.split(" ").slice(0, 2).join(" ")}</div>
                        <div style={{ fontSize: 10, color: C.muted }}>{event.room}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

function TranscriptPage() {
  const allCompleted = TRANSCRIPT.flatMap(s => s.courses).filter(c => c.grade !== "IP");
  const totalPoints = allCompleted.reduce((sum, c) => sum + c.points * c.credits, 0);
  const totalCredits = allCompleted.reduce((sum, c) => sum + c.credits, 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Academic Transcript</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Alex Sinclair · Student ID: U-2024-0847</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.burgundy, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Download size={14} /> Download PDF
        </button>
      </div>

      {/* GPA summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ background: `linear-gradient(135deg, ${C.burgundy}, ${C.burgundyDark})`, borderRadius: 16, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>{gpa}</div>
          <div style={{ fontSize: 12, color: "#ffffff88", marginTop: 4 }}>Cumulative GPA</div>
        </div>
        <div style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.gold }}>{totalCredits}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Credits Earned</div>
        </div>
        <div style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.accent }}>{TRANSCRIPT.length}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Semesters</div>
        </div>
      </div>

      {/* Semester records */}
      {TRANSCRIPT.map(sem => (
        <div key={sem.semester} style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ padding: "14px 24px", background: C.burgundy + "10", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: C.burgundy }}>{sem.semester}</span>
            <span style={{ fontSize: 12, color: C.muted }}>{sem.courses.reduce((s, c) => s + c.credits, 0)} credits</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: C.bg }}>
                {["Course ID", "Course Name", "Credits", "Grade", "Points"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sem.courses.map(c => (
                <tr key={c.id} style={{ borderTop: `1px solid ${C.border}` }}>
                  <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: C.gold, fontFamily: "monospace" }}>{c.id}</td>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: C.text }}>{c.name}</td>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: C.muted }}>{c.credits}</td>
                  <td style={{ padding: "12px 20px" }}>
                    <Badge color={c.grade === "IP" ? C.warning : c.points >= 3.7 ? C.success : c.points >= 3.0 ? C.accent : C.warning}>{c.grade}</Badge>
                  </td>
                  <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: c.grade === "IP" ? C.muted : C.text }}>{c.grade === "IP" ? "—" : c.points.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function FacultyPage() {
  const [selected, setSelected] = useState<typeof FACULTY[0] | null>(null);
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Faculty Directory</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>{FACULTY.length} faculty members</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {FACULTY.map(f => (
          <div key={f.name} onClick={() => setSelected(selected?.name === f.name ? null : f)}
            style={{ background: C.card, borderRadius: 16, padding: 20, border: `2px solid ${selected?.name === f.name ? C.burgundy : C.border}`, cursor: "pointer", transition: "border-color .15s" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 12 }}>
              <Avatar initials={f.name.split(" ").map(w => w[0]).join("").slice(0, 2)} size={44} color={C.burgundy} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{f.name}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{f.title}</div>
                <StarRating rating={f.rating} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              <Badge color={C.burgundy}>{f.dept}</Badge>
              {f.courses.map(c => <Badge key={c} color={C.gold}>{c}</Badge>)}
            </div>
            {selected?.name === f.name && (
              <div style={{ paddingTop: 12, borderTop: `1px solid ${C.border}`, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 8 }}><Mail size={12} />{f.email}</div>
                <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 8 }}><MapPin size={12} />Office: {f.office}</div>
                <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 8 }}><Clock size={12} />Office Hours: {f.hours}</div>
                <button style={{ marginTop: 4, padding: "8px 0", background: C.burgundy, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Mail size={12} /> Email Faculty
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Billing() {
  const pending = BILLING_ITEMS.filter(b => b.status === "pending");
  const paid = BILLING_ITEMS.filter(b => b.status === "paid");
  const pendingTotal = pending.reduce((s, b) => s + b.amount, 0);
  const paidTotal = paid.reduce((s, b) => s + b.amount, 0);

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Student Billing</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Alex Sinclair · Account #00847</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
        <div style={{ background: C.danger + "10", border: `1px solid ${C.danger}33`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.danger, textTransform: "uppercase", marginBottom: 6 }}>Amount Due</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.danger }}>${pendingTotal.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Due Jan 15, 2026</div>
        </div>
        <div style={{ background: C.success + "10", border: `1px solid ${C.success}33`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.success, textTransform: "uppercase", marginBottom: 6 }}>Paid to Date</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.success }}>${paidTotal.toLocaleString()}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Fall 2025 semester</div>
        </div>
        <div style={{ background: C.gold + "10", border: `1px solid ${C.gold}33`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, textTransform: "uppercase", marginBottom: 6 }}>Financial Aid</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.gold }}>$4,500</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Merit scholarship applied</div>
        </div>
      </div>

      {/* Pay now button */}
      {pending.length > 0 && (
        <div style={{ background: `linear-gradient(135deg, ${C.burgundy}, ${C.burgundyDark})`, borderRadius: 16, padding: 20, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Spring 2026 Payment Due</div>
            <div style={{ fontSize: 13, color: "#ffffff88" }}>${pendingTotal.toLocaleString()} due by January 15, 2026</div>
          </div>
          <button style={{ padding: "12px 24px", background: C.gold, color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>Pay Now</button>
        </div>
      )}

      {/* Itemized */}
      {[{ title: "Pending Charges", items: pending, color: C.danger }, { title: "Paid Charges", items: paid, color: C.success }].map(group => (
        <div key={group.title} style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{group.title}</span>
            <Badge color={group.color}>{group.items.length} items</Badge>
          </div>
          {group.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: group.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.status === "paid" ? <CheckCircle size={16} color={C.success} /> : <CreditCard size={16} color={C.danger} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{item.description}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Due: {item.due}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>${item.amount.toLocaleString()}</div>
                <Badge color={item.status === "paid" ? C.success : C.danger}>{item.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── root ───────────────────────────────────────────────────────────────────
export default function UniversityDemo() {
  const [page, setPage] = useState("catalog");
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0]);

  const renderPage = () => {
    switch (page) {
      case "catalog":       return <CourseCatalog setPage={setPage} setSelectedCourse={setSelectedCourse} />;
      case "course-detail": return <CourseDetail course={selectedCourse} setPage={setPage} />;
      case "enrollment":    return <MyEnrollment setPage={setPage} setSelectedCourse={setSelectedCourse} />;
      case "schedule":      return <Schedule />;
      case "transcript":    return <TranscriptPage />;
      case "faculty":       return <FacultyPage />;
      case "billing":       return <Billing />;
      default:              return <CourseCatalog setPage={setPage} setSelectedCourse={setSelectedCourse} />;
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
