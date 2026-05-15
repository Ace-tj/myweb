"use client";

import { useState } from "react";
import {
  IconStethoscope, IconUsers, IconCalendar, IconPill,
  IconReportMedical, IconCurrencyDollar, IconHome,
  IconSearch, IconPlus, IconEdit, IconX, IconCheck,
  IconChevronRight, IconArrowLeft, IconPhone, IconMail,
  IconMapPin, IconClock, IconAlertCircle, IconHeartbeat,
  IconDroplet, IconTemperature, IconLungs, IconBrain,
  IconBone, IconEye, IconEar, IconDental, IconVirus,
  IconUserMd, IconClipboardList, IconChartBar,
  IconPrinter, IconDownload, IconSend, IconShield,
  IconActivity, IconHistory, IconNotes, IconVaccine,
  IconFileText, IconBandage, IconMicroscope
} from "@tabler/icons-react";

// ─── palette ────────────────────────────────────────────────────────────────
const C = {
  teal: "#0d9488",
  tealDark: "#0f766e",
  tealLight: "#f0fdfa",
  teal2: "#99f6e4",
  bg: "#f0fdfa",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  success: "#22c55e",
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#8b5cf6",
  blue: "#3b82f6",
};

// ─── data ────────────────────────────────────────────────────────────────────
const PATIENTS = [
  { id: "P-001", name: "Eleanor Vance", dob: "1982-03-14", age: 44, gender: "F", blood: "A+", phone: "+1 555-0301", email: "eleanor.v@email.com", address: "18 Oak Lane, Portland, OR", doctor: "Dr. Okafor", lastVisit: "May 2, 2026", nextAppt: "May 20, 2026", conditions: ["Hypertension", "Type 2 Diabetes"], allergies: ["Penicillin", "Sulfa"], avatar: "EV", status: "active" },
  { id: "P-002", name: "Marcus Webb", dob: "1995-07-22", age: 30, gender: "M", blood: "O-", phone: "+1 555-0302", email: "mwebb@email.com", address: "54 Pine St, Portland, OR", doctor: "Dr. Chen", lastVisit: "Apr 28, 2026", nextAppt: "Jun 1, 2026", conditions: ["Asthma"], allergies: [], avatar: "MW", status: "active" },
  { id: "P-003", name: "Sophia Adeyemi", dob: "1970-11-30", age: 55, gender: "F", blood: "B+", phone: "+1 555-0303", email: "s.adeyemi@email.com", address: "92 Elm Ave, Portland, OR", doctor: "Dr. Patel", lastVisit: "May 10, 2026", nextAppt: "May 17, 2026", conditions: ["Arthritis", "Hypothyroidism", "High Cholesterol"], allergies: ["Aspirin"], avatar: "SA", status: "active" },
  { id: "P-004", name: "Luca Romano", dob: "2001-05-08", age: 25, gender: "M", blood: "AB+", phone: "+1 555-0304", email: "luca.r@email.com", address: "11 Cedar Rd, Portland, OR", doctor: "Dr. Okafor", lastVisit: "May 14, 2026", nextAppt: "May 16, 2026", conditions: [], allergies: ["Latex"], avatar: "LR", status: "active" },
  { id: "P-005", name: "Margaret Liu", dob: "1958-01-19", age: 68, gender: "F", blood: "O+", phone: "+1 555-0305", email: "m.liu@email.com", address: "7 Birch Court, Portland, OR", doctor: "Dr. Chen", lastVisit: "May 12, 2026", nextAppt: "May 26, 2026", conditions: ["Heart Disease", "Osteoporosis", "GERD"], allergies: ["Ibuprofen", "Codeine"], avatar: "ML", status: "critical" },
  { id: "P-006", name: "David Osei", dob: "1987-09-03", age: 38, gender: "M", blood: "A-", phone: "+1 555-0306", email: "d.osei@email.com", address: "33 Maple Dr, Portland, OR", doctor: "Dr. Patel", lastVisit: "Mar 15, 2026", nextAppt: "—", conditions: ["Anxiety", "Migraine"], allergies: [], avatar: "DO", status: "inactive" },
];

const DOCTORS = [
  { id: 1, name: "Dr. Amara Okafor", specialty: "Internal Medicine", patients: 142, schedule: "Mon–Fri 8:00–17:00", available: true, rating: 4.9, room: "C-101" },
  { id: 2, name: "Dr. James Chen", specialty: "Cardiology", patients: 98, schedule: "Mon/Wed/Fri 9:00–16:00", available: true, rating: 4.8, room: "C-205" },
  { id: 3, name: "Dr. Riya Patel", specialty: "Endocrinology", patients: 115, schedule: "Tue–Thu 8:00–17:00", available: false, rating: 4.9, room: "C-312" },
  { id: 4, name: "Dr. Sam Torres", specialty: "Pulmonology", patients: 87, schedule: "Mon/Thu/Fri 10:00–18:00", available: true, rating: 4.7, room: "C-118" },
  { id: 5, name: "Dr. Nina Hassan", specialty: "Neurology", patients: 76, schedule: "Tue/Wed 9:00–15:00", available: false, rating: 4.8, room: "C-407" },
];

const APPOINTMENTS = [
  { id: "A-001", patient: "Luca Romano", patientId: "P-004", doctor: "Dr. Okafor", time: "09:00", date: "May 16", type: "Follow-up", status: "confirmed", room: "C-101" },
  { id: "A-002", patient: "Eleanor Vance", patientId: "P-001", doctor: "Dr. Okafor", time: "09:45", date: "May 16", type: "Check-up", status: "confirmed", room: "C-101" },
  { id: "A-003", patient: "Sophia Adeyemi", patientId: "P-003", doctor: "Dr. Patel", time: "10:30", date: "May 16", type: "Consultation", status: "waiting", room: "C-312" },
  { id: "A-004", patient: "Marcus Webb", patientId: "P-002", doctor: "Dr. Chen", time: "11:15", date: "May 16", type: "Cardio Screening", status: "confirmed", room: "C-205" },
  { id: "A-005", patient: "Margaret Liu", patientId: "P-005", doctor: "Dr. Chen", time: "14:00", date: "May 16", type: "Urgent Review", status: "confirmed", room: "C-205" },
  { id: "A-006", patient: "New Patient", patientId: "", doctor: "Dr. Torres", time: "15:00", date: "May 16", type: "New Patient", status: "pending", room: "C-118" },
];

const PRESCRIPTIONS = [
  { id: "RX-001", patient: "Eleanor Vance", doctor: "Dr. Okafor", drug: "Metformin 1000mg", dosage: "1 tablet twice daily with meals", qty: 60, refills: 3, issued: "May 2, 2026", expires: "Nov 2, 2026", status: "active", notes: "Monitor blood glucose weekly" },
  { id: "RX-002", patient: "Eleanor Vance", doctor: "Dr. Okafor", drug: "Lisinopril 10mg", dosage: "1 tablet once daily", qty: 30, refills: 5, issued: "May 2, 2026", expires: "Nov 2, 2026", status: "active", notes: "Avoid NSAIDs" },
  { id: "RX-003", patient: "Marcus Webb", doctor: "Dr. Chen", drug: "Albuterol Inhaler 90mcg", dosage: "2 puffs as needed, max 4×/day", qty: 1, refills: 2, issued: "Apr 28, 2026", expires: "Oct 28, 2026", status: "active", notes: "Carry at all times" },
  { id: "RX-004", patient: "Sophia Adeyemi", doctor: "Dr. Patel", drug: "Levothyroxine 50mcg", dosage: "1 tablet on empty stomach daily", qty: 90, refills: 4, issued: "May 10, 2026", expires: "Nov 10, 2026", status: "active", notes: "Take 30 min before breakfast" },
  { id: "RX-005", patient: "Margaret Liu", doctor: "Dr. Chen", drug: "Atorvastatin 40mg", dosage: "1 tablet at bedtime", qty: 30, refills: 6, issued: "May 12, 2026", expires: "Nov 12, 2026", status: "active", notes: "Monitor liver enzymes every 6 months" },
  { id: "RX-006", patient: "David Osei", doctor: "Dr. Patel", drug: "Sertraline 50mg", dosage: "1 tablet in the morning", qty: 30, refills: 1, issued: "Mar 15, 2026", expires: "Sep 15, 2026", status: "refill-needed", notes: "Review dosage at next visit" },
];

const BILLING_RECORDS = [
  { id: "INV-001", patient: "Eleanor Vance", date: "May 2, 2026", service: "Internal Medicine Consult", amount: 180, insurance: 144, patient_pay: 36, status: "paid" },
  { id: "INV-002", patient: "Marcus Webb", date: "Apr 28, 2026", service: "Pulmonary Function Test", amount: 320, insurance: 256, patient_pay: 64, status: "paid" },
  { id: "INV-003", patient: "Sophia Adeyemi", date: "May 10, 2026", service: "Endocrinology Consult + Labs", amount: 450, insurance: 360, patient_pay: 90, status: "pending" },
  { id: "INV-004", patient: "Luca Romano", date: "May 14, 2026", service: "New Patient Exam", amount: 200, insurance: 160, patient_pay: 40, status: "pending" },
  { id: "INV-005", patient: "Margaret Liu", date: "May 12, 2026", service: "Cardiology Consult + ECG", amount: 580, insurance: 464, patient_pay: 116, status: "paid" },
];

const VITALS_HISTORY = [
  { date: "May 2", bp: "128/82", pulse: 76, temp: "98.4", spo2: 98, weight: "165 lbs" },
  { date: "Apr 5", bp: "132/84", pulse: 78, temp: "98.6", spo2: 97, weight: "167 lbs" },
  { date: "Mar 1", bp: "136/86", pulse: 80, temp: "98.2", spo2: 98, weight: "169 lbs" },
  { date: "Feb 2", bp: "140/88", pulse: 82, temp: "98.7", spo2: 97, weight: "170 lbs" },
];

// ─── helpers ─────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, color = C.teal }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `2px solid ${color}44` }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 800, color }}>{initials}</span>
    </div>
  );
}

function Badge({ children, color = C.teal }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: color + "18", color, padding: "2px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", border: `1px solid ${color}33` }}>
      {children}
    </span>
  );
}

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "dashboard", icon: <IconHome size={18} />, label: "Dashboard" },
    { id: "appointments", icon: <IconCalendar size={18} />, label: "Appointments" },
    { id: "patients", icon: <IconUsers size={18} />, label: "Patients" },
    { id: "doctors", icon: <IconUserMd size={18} />, label: "Doctors" },
    { id: "prescriptions", icon: <IconPill size={18} />, label: "Prescriptions" },
    { id: "billing", icon: <IconCurrencyDollar size={18} />, label: "Billing" },
    { id: "patient-portal", icon: <IconShield size={18} />, label: "Patient Portal" },
  ];
  return (
    <div style={{ width: 220, background: C.card, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      <div style={{ padding: "20px 18px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconStethoscope size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>MedCore</div>
            <div style={{ fontSize: 10, color: C.muted }}>Clinic System</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: page === n.id ? C.teal : "transparent", color: page === n.id ? "#fff" : C.muted, fontWeight: page === n.id ? 700 : 500, fontSize: 13, textAlign: "left", transition: "all .15s" }}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: "14px 18px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="AO" size={30} color={C.teal} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Dr. Okafor</div>
            <div style={{ fontSize: 10, color: C.muted }}>Administrator</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  const todayAppts = APPOINTMENTS.length;
  const waiting = APPOINTMENTS.filter(a => a.status === "waiting").length;
  const critical = PATIENTS.filter(p => p.status === "critical").length;

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Clinical Dashboard</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Friday, May 16, 2026 — Morning shift</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Today's Appointments", value: todayAppts, color: C.teal, icon: <IconCalendar size={20} />, sub: "6 confirmed" },
          { label: "Patients Waiting", value: waiting, color: C.warning, icon: <IconClock size={20} />, sub: "Avg. 12 min wait" },
          { label: "Critical Patients", value: critical, color: C.danger, icon: <IconAlertCircle size={20} />, sub: "Needs immediate review" },
          { label: "Total Patients", value: PATIENTS.length, color: C.blue, icon: <IconUsers size={20} />, sub: `${DOCTORS.length} doctors on staff` },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 16, padding: 18, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <span style={{ fontSize: 12, color: C.muted }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Today's schedule */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Today's Schedule</h3>
            <button onClick={() => setPage("appointments")} style={{ fontSize: 12, color: C.teal, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all</button>
          </div>
          {APPOINTMENTS.map((a, i) => {
            const statusColor = a.status === "confirmed" ? C.teal : a.status === "waiting" ? C.warning : C.muted;
            return (
              <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width: 52, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.text, fontFamily: "monospace" }}>{a.time}</div>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: statusColor, margin: "4px auto 0" }} />
                </div>
                <Avatar initials={a.patient.split(" ").map(w => w[0]).join("").slice(0, 2)} size={32} color={C.teal} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{a.patient}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{a.type} · {a.doctor} · {a.room}</div>
                </div>
                <Badge color={statusColor}>{a.status}</Badge>
              </div>
            );
          })}
        </div>

        {/* Quick stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>Doctor Availability</h3>
            {DOCTORS.map(d => (
              <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 99, background: d.available ? C.success : C.muted, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{d.name.replace("Dr. ", "")}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{d.specialty}</div>
                </div>
                <span style={{ fontSize: 11, color: d.available ? C.success : C.muted, fontWeight: 600 }}>{d.available ? "Available" : "Busy"}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <IconAlertCircle size={20} color="#fff" />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>Critical Alert</h3>
            </div>
            <p style={{ fontSize: 12, color: "#ffffffcc", lineHeight: 1.6 }}>Margaret Liu (P-005) has an urgent cardiology review at 14:00. Labs show elevated troponin — notify Dr. Chen immediately.</p>
            <button onClick={() => setPage("patients")} style={{ marginTop: 14, width: "100%", padding: "8px 0", background: "#ffffff22", border: "1px solid #ffffff44", borderRadius: 8, color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>View Patient</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────
function Appointments() {
  const [showBook, setShowBook] = useState(false);
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Appointments</h1>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>May 16, 2026 — {APPOINTMENTS.length} scheduled</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ display: "flex", background: C.bg, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {(["list", "calendar"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding: "9px 16px", background: view === v ? C.teal : "transparent", color: view === v ? "#fff" : C.muted, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
                {v}
              </button>
            ))}
          </div>
          <button onClick={() => setShowBook(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.teal, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            <IconPlus size={15} /> Book Appointment
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "12px 20px", background: C.bg, borderBottom: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "80px 1fr 160px 140px 120px 120px", gap: 16 }}>
            {["Time", "Patient", "Doctor", "Type", "Room", "Status"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {APPOINTMENTS.map((a, i) => {
            const statusColor = a.status === "confirmed" ? C.teal : a.status === "waiting" ? C.warning : C.muted;
            return (
              <div key={a.id} style={{ padding: "14px 20px", borderTop: i > 0 ? `1px solid ${C.border}` : "none", display: "grid", gridTemplateColumns: "80px 1fr 160px 140px 120px 120px", gap: 16, alignItems: "center" }}>
                <span style={{ fontFamily: "monospace", fontWeight: 700, color: C.text, fontSize: 14 }}>{a.time}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar initials={a.patient.split(" ").map(w => w[0]).join("").slice(0, 2)} size={30} color={C.teal} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{a.patient}</span>
                </div>
                <span style={{ fontSize: 13, color: C.muted }}>{a.doctor}</span>
                <Badge color={C.blue}>{a.type}</Badge>
                <span style={{ fontSize: 13, color: C.muted }}>{a.room}</span>
                <Badge color={statusColor}>{a.status}</Badge>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
            {["Mon 11", "Tue 12", "Wed 13", "Thu 14", "Fri 15", "Sat 16", "Sun 17"].map((d, i) => (
              <div key={d} style={{ background: i === 5 ? C.teal + "15" : C.bg, borderRadius: 10, padding: 10, border: `1px solid ${i === 5 ? C.teal : C.border}`, minHeight: 120 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: i === 5 ? C.teal : C.text, marginBottom: 8 }}>{d}</div>
                {i === 5 && APPOINTMENTS.slice(0, 3).map(a => (
                  <div key={a.id} style={{ background: C.teal + "22", borderRadius: 6, padding: "4px 6px", marginBottom: 4, borderLeft: `2px solid ${C.teal}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.teal }}>{a.time}</div>
                    <div style={{ fontSize: 10, color: C.text }}>{a.patient.split(" ")[0]}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Book modal */}
      {showBook && (
        <div style={{ position: "fixed", inset: 0, background: "#00000066", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowBook(false)}>
          <div style={{ background: C.card, borderRadius: 20, padding: 32, width: 500, maxWidth: "90vw" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: C.text }}>Book Appointment</h3>
              <button onClick={() => setShowBook(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><IconX size={20} color={C.muted} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "Patient", type: "select", options: PATIENTS.map(p => p.name) },
                { label: "Doctor", type: "select", options: DOCTORS.map(d => d.name) },
                { label: "Appointment Type", type: "select", options: ["Check-up", "Follow-up", "Consultation", "New Patient", "Urgent", "Procedure"] },
                { label: "Date", type: "date" },
                { label: "Time", type: "time" },
                { label: "Notes", type: "textarea" },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase" }}>{f.label}</label>
                  {f.type === "select" ? (
                    <select style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }}>
                      {f.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea rows={3} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", resize: "none", boxSizing: "border-box" }} />
                  ) : (
                    <input type={f.type} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }} />
                  )}
                </div>
              ))}
              <button onClick={() => setShowBook(false)} style={{ padding: "12px 0", background: C.teal, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────────────
function Patients({ setPage, setSelectedPatient }: { setPage: (p: string) => void; setSelectedPatient: (p: typeof PATIENTS[0]) => void }) {
  const [search, setSearch] = useState("");
  const filtered = PATIENTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Patients</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{PATIENTS.length} registered patients</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.teal, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <IconPlus size={15} /> New Patient
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px" }}>
          <IconSearch size={16} color={C.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients by name or ID..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text, flex: 1 }} />
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Patient", "ID", "Age / Gender", "Blood", "Doctor", "Conditions", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.id} onClick={() => { setSelectedPatient(p); setPage("patient-detail"); }}
                style={{ borderTop: `1px solid ${C.border}`, cursor: "pointer", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar initials={p.avatar} size={34} color={p.status === "critical" ? C.danger : C.teal} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{p.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}><span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: C.teal }}>{p.id}</span></td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.text }}>{p.age}y / {p.gender}</td>
                <td style={{ padding: "14px 16px" }}><Badge color={C.danger}>{p.blood}</Badge></td>
                <td style={{ padding: "14px 16px", fontSize: 13, color: C.muted }}>{p.doctor}</td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {p.conditions.slice(0, 2).map(c => <Badge key={c} color={C.muted}>{c}</Badge>)}
                    {p.conditions.length > 2 && <Badge color={C.muted}>+{p.conditions.length - 2}</Badge>}
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <Badge color={p.status === "active" ? C.success : p.status === "critical" ? C.danger : C.muted}>
                    {p.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PATIENT DETAIL ───────────────────────────────────────────────────────────
function PatientDetail({ patient, setPage }: { patient: typeof PATIENTS[0]; setPage: (p: string) => void }) {
  const [tab, setTab] = useState<"overview" | "vitals" | "prescriptions" | "history">("overview");
  const rxs = PRESCRIPTIONS.filter(rx => rx.patient === patient.name);

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <button onClick={() => setPage("patients")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.teal, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
        <IconArrowLeft size={15} /> Back to Patients
      </button>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${C.teal}18, ${C.blue}10)`, borderRadius: 20, padding: 28, border: `1px solid ${C.border}`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Avatar initials={patient.avatar} size={72} color={patient.status === "critical" ? C.danger : C.teal} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{patient.name}</h1>
              <Badge color={patient.status === "active" ? C.success : patient.status === "critical" ? C.danger : C.muted}>{patient.status}</Badge>
              <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.teal }}>{patient.id}</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>DOB: {patient.dob} · Age {patient.age} · {patient.gender === "F" ? "Female" : "Male"}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Badge color={C.danger}>Blood: {patient.blood}</Badge>
              {patient.allergies.length > 0 && patient.allergies.map(a => <Badge key={a} color={C.warning}>⚠ {a}</Badge>)}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ padding: "10px 16px", background: C.teal, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Book Appointment</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.bg, padding: 4, borderRadius: 12, width: "fit-content", border: `1px solid ${C.border}` }}>
        {(["overview", "vitals", "prescriptions", "history"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: tab === t ? C.teal : "transparent", color: tab === t ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Contact & Demographics</h3>
            {[
              { icon: <IconPhone size={14} />, value: patient.phone },
              { icon: <IconMail size={14} />, value: patient.email },
              { icon: <IconMapPin size={14} />, value: patient.address },
              { icon: <IconUserMd size={14} />, value: `Primary: ${patient.doctor}` },
              { icon: <IconCalendar size={14} />, value: `Last visit: ${patient.lastVisit}` },
              { icon: <IconCalendar size={14} />, value: `Next appt: ${patient.nextAppt}` },
            ].map(({ icon, value }) => (
              <div key={value} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ color: C.muted }}>{icon}</span>
                <span style={{ fontSize: 13, color: C.text }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>Chronic Conditions</h3>
              {patient.conditions.length === 0 ? (
                <p style={{ fontSize: 13, color: C.muted }}>No chronic conditions recorded</p>
              ) : patient.conditions.map(c => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <IconHeartbeat size={14} color={C.teal} />
                  <span style={{ fontSize: 13, color: C.text }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ background: patient.allergies.length > 0 ? C.danger + "08" : C.card, borderRadius: 16, padding: 20, border: `1px solid ${patient.allergies.length > 0 ? C.danger + "44" : C.border}` }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: patient.allergies.length > 0 ? C.danger : C.text, marginBottom: 12 }}>
                {patient.allergies.length > 0 ? "⚠ Allergies — CAUTION" : "Allergies"}
              </h3>
              {patient.allergies.length === 0 ? (
                <p style={{ fontSize: 13, color: C.success, fontWeight: 600 }}>No known drug allergies</p>
              ) : patient.allergies.map(a => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${C.danger}22` }}>
                  <IconAlertCircle size={14} color={C.danger} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: C.danger }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "vitals" && (
        <div>
          {/* Latest vitals */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Blood Pressure", value: VITALS_HISTORY[0].bp, icon: <IconActivity size={20} />, unit: "mmHg", color: C.danger },
              { label: "Pulse", value: VITALS_HISTORY[0].pulse, icon: <IconHeartbeat size={20} />, unit: "bpm", color: C.teal },
              { label: "Temperature", value: VITALS_HISTORY[0].temp, icon: <IconTemperature size={20} />, unit: "°F", color: C.warning },
              { label: "SpO2", value: VITALS_HISTORY[0].spo2, icon: <IconLungs size={20} />, unit: "%", color: C.blue },
              { label: "Weight", value: VITALS_HISTORY[0].weight, icon: <IconBone size={20} />, unit: "", color: C.purple },
            ].map(v => (
              <div key={v.label} style={{ background: C.card, borderRadius: 14, padding: 16, border: `1px solid ${C.border}`, textAlign: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: v.color + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                  <span style={{ color: v.color }}>{v.icon}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{v.value}<span style={{ fontSize: 11, color: C.muted, marginLeft: 3 }}>{v.unit}</span></div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{v.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Vitals History</h3>
              <button style={{ fontSize: 12, color: C.teal, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Record Vitals</button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: C.bg }}>
                  {["Date", "Blood Pressure", "Pulse", "Temp", "SpO2", "Weight"].map(h => (
                    <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VITALS_HISTORY.map((v, i) => (
                  <tr key={v.date} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "12px 20px", fontWeight: 600, color: C.text }}>{v.date}</td>
                    <td style={{ padding: "12px 20px", color: C.danger, fontWeight: 600 }}>{v.bp}</td>
                    <td style={{ padding: "12px 20px", color: C.teal, fontWeight: 600 }}>{v.pulse}</td>
                    <td style={{ padding: "12px 20px", color: C.text }}>{v.temp}°F</td>
                    <td style={{ padding: "12px 20px", color: C.blue, fontWeight: 600 }}>{v.spo2}%</td>
                    <td style={{ padding: "12px 20px", color: C.muted }}>{v.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "prescriptions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rxs.length === 0 ? (
            <div style={{ textAlign: "center", color: C.muted, padding: "40px 0" }}>No prescriptions on file</div>
          ) : rxs.map(rx => (
            <div key={rx.id} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${rx.status === "refill-needed" ? C.warning : C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 700, color: C.teal }}>{rx.id}</span>
                    <Badge color={rx.status === "active" ? C.success : C.warning}>{rx.status}</Badge>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{rx.drug}</div>
                </div>
                <button style={{ padding: "7px 14px", background: C.teal + "15", color: C.teal, border: `1px solid ${C.teal}44`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600 }}>Refill</button>
              </div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: C.muted }}>Dosage: <strong style={{ color: C.text }}>{rx.dosage}</strong></span>
                <span style={{ fontSize: 12, color: C.muted }}>Qty: <strong style={{ color: C.text }}>{rx.qty}</strong></span>
                <span style={{ fontSize: 12, color: C.muted }}>Refills: <strong style={{ color: C.text }}>{rx.refills}</strong></span>
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>Issued: {rx.issued} · Expires: {rx.expires} · By: {rx.doctor}</div>
              {rx.notes && <div style={{ marginTop: 10, padding: "8px 12px", background: C.tealLight, borderRadius: 8, fontSize: 12, color: C.teal }}><strong>Note:</strong> {rx.notes}</div>}
            </div>
          ))}
        </div>
      )}

      {tab === "history" && (
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Visit History</h3>
          {[
            { date: "May 2, 2026", type: "Check-up", doctor: "Dr. Okafor", notes: "BP reviewed. Metformin dosage maintained. Follow-up in 6 weeks." },
            { date: "Mar 20, 2026", type: "Follow-up", doctor: "Dr. Okafor", notes: "Blood glucose improving. A1C down to 7.1%. Continue current regimen." },
            { date: "Jan 15, 2026", type: "Quarterly Review", doctor: "Dr. Okafor", notes: "Annual labs ordered. Kidney function stable. Referred to dietitian." },
            { date: "Nov 5, 2025", type: "Check-up", doctor: "Dr. Okafor", notes: "New diagnosis: Type 2 Diabetes. Started Metformin 500mg." },
          ].map((v, i) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 3, background: C.teal, borderRadius: 99, flexShrink: 0 }} />
              <div>
                <div style={{ display: "flex", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.teal }}>{v.date}</span>
                  <Badge color={C.blue}>{v.type}</Badge>
                  <span style={{ fontSize: 12, color: C.muted }}>{v.doctor}</span>
                </div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{v.notes}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DOCTORS ──────────────────────────────────────────────────────────────────
function Doctors() {
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Doctors</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{DOCTORS.length} physicians on staff</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.teal, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <IconPlus size={15} /> Add Doctor
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {DOCTORS.map(d => (
          <div key={d.id} style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 16 }}>
              <Avatar initials={d.name.split(" ").slice(-1)[0].substring(0, 2).toUpperCase()} size={52} color={d.available ? C.teal : C.muted} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{d.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{d.specialty}</div>
                <div style={{ marginTop: 4, display: "flex", gap: 6 }}>
                  <Badge color={d.available ? C.success : C.muted}>{d.available ? "Available" : "With Patient"}</Badge>
                  <Badge color={C.blue}>Room {d.room}</Badge>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div style={{ background: C.bg, borderRadius: 10, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.teal }}>{d.patients}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Patients</div>
              </div>
              <div style={{ background: C.bg, borderRadius: 10, padding: 12, textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.warning }}>★ {d.rating}</div>
                <div style={{ fontSize: 11, color: C.muted }}>Rating</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}>
              <IconClock size={12} />{d.schedule}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRESCRIPTIONS ────────────────────────────────────────────────────────────
function Prescriptions() {
  const [search, setSearch] = useState("");
  const filtered = PRESCRIPTIONS.filter(rx => rx.patient.toLowerCase().includes(search.toLowerCase()) || rx.drug.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Prescriptions</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{PRESCRIPTIONS.length} active prescriptions · {PRESCRIPTIONS.filter(rx => rx.status === "refill-needed").length} need refill</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.teal, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <IconPlus size={15} /> New Prescription
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 20 }}>
        <IconSearch size={16} color={C.muted} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by patient or drug..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text, flex: 1 }} />
      </div>

      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Rx ID", "Patient", "Medication", "Dosage", "Prescribed By", "Expires", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((rx, i) => (
              <tr key={rx.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.teal }}>{rx.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: C.text }}>{rx.patient}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: C.text }}>{rx.drug}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: C.muted }}>{rx.dosage}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: C.muted }}>{rx.doctor}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: C.muted }}>{rx.expires}</td>
                <td style={{ padding: "12px 16px" }}><Badge color={rx.status === "active" ? C.success : C.warning}>{rx.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── BILLING ─────────────────────────────────────────────────────────────────
function Billing() {
  const totalRevenue = BILLING_RECORDS.reduce((s, b) => s + b.amount, 0);
  const pending = BILLING_RECORDS.filter(b => b.status === "pending");
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Billing</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>May 2026 · {BILLING_RECORDS.length} invoices</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Billed", value: `$${totalRevenue.toLocaleString()}`, color: C.teal },
          { label: "Insurance Collected", value: `$${BILLING_RECORDS.reduce((s, b) => s + b.insurance, 0).toLocaleString()}`, color: C.success },
          { label: "Patient Balance Due", value: `$${pending.reduce((s, b) => s + b.patient_pay, 0).toLocaleString()}`, color: C.warning },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Invoice", "Patient", "Service", "Date", "Billed", "Insurance", "Patient Owes", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BILLING_RECORDS.map((b, i) => (
              <tr key={b.id} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 14px", fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: C.teal }}>{b.id}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: C.text }}>{b.patient}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: C.muted }}>{b.service}</td>
                <td style={{ padding: "12px 14px", fontSize: 12, color: C.muted }}>{b.date}</td>
                <td style={{ padding: "12px 14px", fontWeight: 700, color: C.text }}>${b.amount}</td>
                <td style={{ padding: "12px 14px", color: C.success, fontWeight: 600 }}>${b.insurance}</td>
                <td style={{ padding: "12px 14px", color: C.warning, fontWeight: 700 }}>${b.patient_pay}</td>
                <td style={{ padding: "12px 14px" }}><Badge color={b.status === "paid" ? C.success : C.warning}>{b.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── PATIENT PORTAL ───────────────────────────────────────────────────────────
function PatientPortal() {
  const patient = PATIENTS[0]; // Eleanor — logged in
  const rxs = PRESCRIPTIONS.filter(rx => rx.patient === patient.name);
  const [tab, setTab] = useState<"overview" | "appointments" | "prescriptions" | "message">("overview");

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`, padding: "22px 28px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <IconShield size={30} color="#fff" />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>Patient Portal</div>
            <div style={{ fontSize: 13, color: "#ffffff88" }}>Welcome back, {patient.name.split(" ")[0]}</div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div style={{ background: C.card, borderRadius: 14, padding: 18, border: `1px solid ${C.border}`, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
          <Avatar initials={patient.avatar} size={48} color={C.teal} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{patient.name}</div>
            <div style={{ fontSize: 13, color: C.muted }}>Patient ID: {patient.id} · DOB: {patient.dob}</div>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 800, color: C.danger }}>{patient.blood}</div><div style={{ fontSize: 11, color: C.muted }}>Blood Type</div></div>
            <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, fontWeight: 800, color: C.warning }}>{patient.allergies.length}</div><div style={{ fontSize: 11, color: C.muted }}>Allergies</div></div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 4, marginBottom: 20, background: C.bg, padding: 4, borderRadius: 12, width: "fit-content", border: `1px solid ${C.border}` }}>
          {(["overview", "appointments", "prescriptions", "message"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", background: tab === t ? C.teal : "transparent", color: tab === t ? "#fff" : C.muted, fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>Latest Vitals (May 2)</h3>
              {[["Blood Pressure", "128/82 mmHg"], ["Pulse", "76 bpm"], ["SpO2", "98%"], ["Weight", "165 lbs"]].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, color: C.muted }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>Upcoming</h3>
              <div style={{ background: C.tealLight, borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.teal }}>{patient.nextAppt}</div>
                <div style={{ fontSize: 12, color: C.muted }}>Check-up · {patient.doctor}</div>
              </div>
            </div>
          </div>
        )}

        {tab === "appointments" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {APPOINTMENTS.filter(a => a.patientId === patient.id).map(a => (
              <div key={a.id} style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{a.type} · {a.date} at {a.time}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{a.doctor} · Room {a.room}</div>
                </div>
                <Badge color={C.teal}>{a.status}</Badge>
              </div>
            ))}
          </div>
        )}

        {tab === "prescriptions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rxs.map(rx => (
              <div key={rx.id} style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{rx.drug}</div>
                  <Badge color={C.success}>{rx.status}</Badge>
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{rx.dosage}</div>
                <div style={{ fontSize: 12, color: C.muted }}>Expires: {rx.expires} · {rx.refills} refills remaining</div>
              </div>
            ))}
          </div>
        )}

        {tab === "message" && (
          <div style={{ background: C.card, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Message Your Doctor</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <select style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }}>
                <option>Dr. Okafor — Internal Medicine</option>
              </select>
              <input placeholder="Subject" style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }} />
              <textarea rows={5} placeholder="Your message..." style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", resize: "none" }} />
              <button style={{ padding: "12px 0", background: C.teal, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <IconSend size={15} /> Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function ClinicDemo() {
  const [page, setPage] = useState("dashboard");
  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0]);

  const renderPage = () => {
    switch (page) {
      case "dashboard":      return <Dashboard setPage={setPage} />;
      case "appointments":   return <Appointments />;
      case "patients":       return <Patients setPage={setPage} setSelectedPatient={setSelectedPatient} />;
      case "patient-detail": return <PatientDetail patient={selectedPatient} setPage={setPage} />;
      case "doctors":        return <Doctors />;
      case "prescriptions":  return <Prescriptions />;
      case "billing":        return <Billing />;
      case "patient-portal": return <PatientPortal />;
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
