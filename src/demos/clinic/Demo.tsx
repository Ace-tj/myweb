"use client";

import { useState } from "react";

const STATS = [
  { label: "Patients Today", value: "18", icon: "🧑‍⚕️", color: "bg-teal-100 text-teal-800" },
  { label: "Doctors on Duty", value: "5", icon: "👨‍⚕️", color: "bg-blue-100 text-blue-800" },
  { label: "Appointments", value: "32", icon: "📅", color: "bg-purple-100 text-purple-800" },
  { label: "Prescriptions Issued", value: "67", icon: "💊", color: "bg-green-100 text-green-800" },
];

const APPOINTMENTS = [
  { time: "09:00", patient: "Maria Chen", doctor: "Dr. Wilson", status: "Completed" },
  { time: "10:30", patient: "James Park", doctor: "Dr. Nguyen", status: "In Progress" },
  { time: "11:00", patient: "Sara Ali", doctor: "Dr. Wilson", status: "Waiting" },
  { time: "11:30", patient: "Tom Brown", doctor: "Dr. Patel", status: "Waiting" },
  { time: "13:00", patient: "Lucy Evans", doctor: "Dr. Nguyen", status: "Scheduled" },
  { time: "14:30", patient: "Marco Rossi", doctor: "Dr. Patel", status: "Scheduled" },
];

const DOCTORS = [
  {
    name: "Dr. Emily Wilson",
    specialty: "General Practice",
    available: true,
    emoji: "👩‍⚕️",
    patients: 8,
  },
  {
    name: "Dr. James Nguyen",
    specialty: "Pediatrics",
    available: true,
    emoji: "👨‍⚕️",
    patients: 6,
  },
  {
    name: "Dr. Priya Patel",
    specialty: "Cardiology",
    available: false,
    emoji: "👩‍⚕️",
    patients: 4,
  },
];

const NAV = ["Appointments", "Patients", "Doctors", "Prescriptions", "Reports"];

const STATUS_STYLES: Record<string, string> = {
  "Completed": "bg-green-100 text-green-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Waiting": "bg-amber-100 text-amber-700",
  "Scheduled": "bg-neutral-100 text-neutral-600",
};

export default function ClinicDemo() {
  const [activeNav, setActiveNav] = useState("Appointments");
  const [search, setSearch] = useState("");

  const filteredAppts = search
    ? APPOINTMENTS.filter(
        (a) =>
          a.patient.toLowerCase().includes(search.toLowerCase()) ||
          a.doctor.toLowerCase().includes(search.toLowerCase())
      )
    : APPOINTMENTS;

  return (
    <div className="min-h-screen bg-cyan-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-cyan-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏥</span>
            <span className="text-xl font-bold text-teal-700">MediCare+</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-teal-600 text-white"
                    : "text-neutral-600 hover:text-teal-700 hover:bg-teal-50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="text-xs border border-teal-200 rounded-full px-2 py-1 appearance-none">
            <option>EN</option><option>RU</option><option>TG</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className={`${s.color} rounded-2xl p-5 flex items-center gap-4`}>
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm font-medium opacity-80">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Search */}
        <div className="bg-white rounded-2xl border border-teal-100 p-5">
          <h2 className="font-bold text-neutral-800 mb-3">Patient Quick Search</h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient or doctor…"
            className="w-full border border-teal-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Appointments */}
        <div className="bg-white rounded-2xl border border-teal-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-teal-50 flex items-center justify-between">
            <h2 className="font-bold text-neutral-800">Today's Appointments</h2>
            <button className="text-sm bg-teal-600 text-white px-4 py-1.5 rounded-lg hover:bg-teal-700 transition-colors">
              + New Appointment
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-teal-50 border-b border-teal-100">
                  <th className="text-left px-4 py-3 text-teal-700 font-medium">Time</th>
                  <th className="text-left px-4 py-3 text-teal-700 font-medium">Patient</th>
                  <th className="text-left px-4 py-3 text-teal-700 font-medium">Doctor</th>
                  <th className="text-left px-4 py-3 text-teal-700 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-50">
                {filteredAppts.map((a, i) => (
                  <tr key={i} className="hover:bg-teal-50/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-teal-700 font-medium">{a.time}</td>
                    <td className="px-4 py-3 font-medium text-neutral-800">{a.patient}</td>
                    <td className="px-4 py-3 text-neutral-600">{a.doctor}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctors */}
        <section>
          <h2 className="font-bold text-neutral-800 mb-4">Doctors on Duty</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DOCTORS.map((d) => (
              <div
                key={d.name}
                className="bg-white rounded-2xl border border-teal-100 p-5 flex items-start gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-3xl shrink-0">
                  {d.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-neutral-800">{d.name}</p>
                      <p className="text-teal-600 text-xs font-medium">{d.specialty}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                        d.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.available ? "Available" : "Busy"}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs mt-2">
                    {d.patients} patients today
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
