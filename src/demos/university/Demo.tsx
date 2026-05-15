"use client";

import { useState } from "react";

const STATS = [
  { label: "Enrolled Students", value: "12,450", icon: "🎓" },
  { label: "Faculty Members", value: "842", icon: "👩‍🏫" },
  { label: "Departments", value: "48", icon: "🏛️" },
  { label: "Research Papers", value: "2,180", icon: "📜" },
];

const COURSES = [
  { code: "CS401", title: "Machine Learning", credits: 4, instructor: "Dr. Chen Wei", seats: "12/40", dept: "Computer Science" },
  { code: "BUS320", title: "Corporate Finance", credits: 3, instructor: "Prof. Maria Santos", seats: "28/35", dept: "Business" },
  { code: "PHY201", title: "Quantum Mechanics", credits: 4, instructor: "Dr. Alan Park", seats: "8/25", dept: "Physics" },
  { code: "PSY310", title: "Cognitive Psychology", credits: 3, instructor: "Dr. Sarah Davis", seats: "30/40", dept: "Psychology" },
  { code: "LAW440", title: "International Law", credits: 3, instructor: "Prof. James Lin", seats: "18/30", dept: "Law" },
  { code: "ART250", title: "Digital Illustration", credits: 2, instructor: "Prof. Nina Torres", seats: "15/20", dept: "Fine Arts" },
];

const EXAMS = [
  { date: "May 20", course: "Quantum Mechanics", time: "09:00", room: "Hall A" },
  { date: "May 22", course: "Corporate Finance", time: "13:00", room: "B-204" },
  { date: "May 25", course: "Machine Learning", time: "10:00", room: "Lab C" },
];

const NAV = ["Students", "Faculty", "Courses", "Exams", "Library"];

const STUDENT = {
  name: "Jordan Lee",
  id: "UNI-2024-5512",
  major: "Computer Science",
  year: "3rd Year",
  gpa: "3.87",
  courses: ["CS401", "PHY201", "BUS320"],
  fees: "Paid",
};

export default function UniversityDemo() {
  const [activeNav, setActiveNav] = useState("Courses");

  return (
    <div className="min-h-screen bg-purple-50 font-sans">
      {/* Header */}
      <header className="bg-purple-900 text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="text-xl font-bold tracking-tight">UniCore</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-purple-500 text-white"
                    : "text-purple-300 hover:text-white hover:bg-purple-800"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="bg-purple-800 text-xs text-purple-200 border border-purple-700 rounded-full px-2 py-1 appearance-none">
            <option>EN</option><option>RU</option><option>TG</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-purple-100 p-5 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <p className="text-2xl font-bold text-purple-800">{s.value}</p>
              <p className="text-neutral-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Catalog */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-purple-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between">
              <h2 className="font-bold text-neutral-800">Course Catalog</h2>
              <button className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors">
                Enroll
              </button>
            </div>
            <div className="divide-y divide-neutral-100">
              {COURSES.map((c) => (
                <div key={c.code} className="px-6 py-4 hover:bg-purple-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-purple-600 font-bold">{c.code}</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{c.dept}</span>
                      </div>
                      <p className="font-semibold text-neutral-800 text-sm">{c.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{c.instructor}</p>
                    </div>
                    <div className="text-right text-xs shrink-0">
                      <p className="font-medium text-neutral-700">{c.credits} Credits</p>
                      <p className="text-neutral-400 mt-0.5">{c.seats} seats</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student Card + Upcoming Exams */}
          <div className="space-y-4">
            {/* Student Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
                  {STUDENT.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{STUDENT.name}</p>
                  <p className="text-purple-200 text-xs">{STUDENT.id}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/10 rounded-lg p-2">
                  <p className="text-purple-300 text-xs">GPA</p>
                  <p className="font-bold text-lg">{STUDENT.gpa}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <p className="text-purple-300 text-xs">Year</p>
                  <p className="font-bold text-sm">{STUDENT.year}</p>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <p className="text-purple-300 text-xs mb-1">Major</p>
                <p className="font-medium">{STUDENT.major}</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-purple-300 text-xs">Fees</span>
                <span className="bg-green-400/30 text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">{STUDENT.fees}</span>
              </div>
            </div>

            {/* Upcoming Exams */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <h3 className="font-bold text-neutral-800 mb-3">Upcoming Exams</h3>
              <div className="space-y-3">
                {EXAMS.map((e) => (
                  <div key={e.course} className="flex items-center gap-3">
                    <div className="bg-purple-100 rounded-lg px-2 py-1 text-center min-w-12">
                      <p className="text-purple-700 text-xs font-bold">{e.date.split(" ")[0]}</p>
                      <p className="text-purple-600 text-xs">{e.date.split(" ")[1]}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-700">{e.course}</p>
                      <p className="text-xs text-neutral-400">{e.time} · {e.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
