"use client";

import { useState } from "react";

const STATS = [
  { label: "Total Students", value: "450", icon: "🎒", color: "bg-green-100 text-green-800" },
  { label: "Teachers", value: "32", icon: "👨‍🏫", color: "bg-blue-100 text-blue-800" },
  { label: "Classes", value: "24", icon: "🏫", color: "bg-purple-100 text-purple-800" },
  { label: "Attendance Today", value: "94%", icon: "✅", color: "bg-amber-100 text-amber-800" },
];

const SCHEDULE = [
  { period: "1st (8:00–8:45)", mon: "Math", tue: "English", wed: "Science", thu: "History", fri: "Math" },
  { period: "2nd (8:55–9:40)", mon: "English", tue: "Math", wed: "PE", thu: "Math", fri: "Science" },
  { period: "3rd (9:50–10:35)", mon: "Science", tue: "Art", wed: "English", thu: "Music", fri: "English" },
  { period: "4th (10:45–11:30)", mon: "History", tue: "Science", wed: "Math", thu: "English", fri: "History" },
  { period: "Lunch (11:30–12:00)", mon: "—", tue: "—", wed: "—", thu: "—", fri: "—" },
  { period: "5th (12:00–12:45)", mon: "PE", tue: "History", wed: "History", thu: "Science", fri: "Art" },
  { period: "6th (12:55–1:40)", mon: "Art", tue: "PE", wed: "Music", thu: "PE", fri: "Music" },
  { period: "7th (1:50–2:35)", mon: "Music", tue: "Music", wed: "Art", thu: "Art", fri: "PE" },
];

const GRADES = [
  { student: "Emma Wilson", subject: "Mathematics", grade: "A+", date: "May 10" },
  { student: "James Lee", subject: "Science", grade: "B+", date: "May 9" },
  { student: "Aisha Patel", subject: "English", grade: "A", date: "May 9" },
  { student: "Noah Brown", subject: "History", grade: "B", date: "May 8" },
  { student: "Sofia Garcia", subject: "Art", grade: "A+", date: "May 8" },
];

const NAV = ["Students", "Classes", "Grades", "Attendance", "Parents"];

export default function SchoolDemo() {
  const [activeNav, setActiveNav] = useState("Students");

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-green-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏫</span>
            <span className="text-xl font-bold text-green-700">BrightAcademy</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-green-600 text-white"
                    : "text-neutral-600 hover:text-green-700 hover:bg-green-50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="text-xs border border-green-200 rounded-full px-2 py-1 appearance-none">
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

        {/* Class Schedule */}
        <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-green-100">
            <h2 className="font-bold text-neutral-800">Class Schedule — Grade 7A</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-green-50 border-b border-green-100">
                  <th className="text-left px-3 py-3 text-green-700 font-medium w-36">Period</th>
                  {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                    <th key={d} className="px-3 py-3 text-green-700 font-medium text-center">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {SCHEDULE.map((row) => (
                  <tr key={row.period} className={`${row.period.includes("Lunch") ? "bg-amber-50" : "hover:bg-green-50/50"} transition-colors`}>
                    <td className="px-3 py-2.5 text-neutral-500 font-medium whitespace-nowrap">{row.period}</td>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri].map((sub, i) => (
                      <td key={i} className="px-3 py-2.5 text-center">
                        {sub !== "—" ? (
                          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                            {sub}
                          </span>
                        ) : (
                          <span className="text-neutral-300">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grades */}
        <div className="bg-white rounded-2xl border border-green-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-green-100 flex items-center justify-between">
            <h2 className="font-bold text-neutral-800">Recent Grades</h2>
            <button className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
              Enter Grade
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="text-left px-4 py-3 text-green-700 font-medium">Student</th>
                <th className="text-left px-4 py-3 text-green-700 font-medium">Subject</th>
                <th className="text-left px-4 py-3 text-green-700 font-medium">Grade</th>
                <th className="text-left px-4 py-3 text-green-700 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {GRADES.map((g, i) => (
                <tr key={i} className="hover:bg-green-50/40 transition-colors">
                  <td className="px-4 py-3 font-medium">{g.student}</td>
                  <td className="px-4 py-3 text-neutral-600">{g.subject}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold text-sm ${
                      g.grade.startsWith("A") ? "text-green-600" :
                      g.grade.startsWith("B") ? "text-blue-600" :
                      "text-orange-600"
                    }`}>
                      {g.grade}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{g.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
