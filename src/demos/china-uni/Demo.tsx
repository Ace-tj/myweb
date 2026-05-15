"use client";

import { useState } from "react";

const UNIVERSITIES = [
  {
    name: "Tsinghua University",
    logo: "🏛️",
    ranking: "#1 in China",
    tuition: "$4,500/yr",
    programs: ["Computer Science", "Engineering", "Business", "Arts"],
    grant: "$8,000",
    city: "Beijing",
    acceptance: "6%",
  },
  {
    name: "Peking University",
    logo: "🎓",
    ranking: "#2 in China",
    tuition: "$4,200/yr",
    programs: ["Medicine", "Law", "Economics", "Physics"],
    grant: "$7,500",
    city: "Beijing",
    acceptance: "8%",
  },
  {
    name: "Fudan University",
    logo: "🏫",
    ranking: "#3 in China",
    tuition: "$3,800/yr",
    programs: ["Journalism", "Finance", "Chemistry", "History"],
    grant: "$6,000",
    city: "Shanghai",
    acceptance: "10%",
  },
  {
    name: "Zhejiang University",
    logo: "🏢",
    ranking: "#4 in China",
    tuition: "$3,500/yr",
    programs: ["Agriculture", "Pharmacy", "Architecture", "IT"],
    grant: "$5,500",
    city: "Hangzhou",
    acceptance: "12%",
  },
];

const DOCS = [
  { name: "Passport (copy)", status: "uploaded", date: "2026-02-10" },
  { name: "Academic Transcripts", status: "uploaded", date: "2026-02-12" },
  { name: "HSK Language Certificate", status: "uploaded", date: "2026-02-15" },
  { name: "Recommendation Letters (2)", status: "pending", date: null },
  { name: "Personal Statement", status: "pending", date: null },
];

const STEPS = ["Documents", "Under Review", "Decision"];
const NAV = ["Universities", "Programs", "My Applications", "Documents"];

export default function ChinaUniDemo() {
  const [activeNav, setActiveNav] = useState("Universities");
  const [appStep] = useState(1);
  const [selected, setSelected] = useState<string[]>(["Tsinghua University"]);

  return (
    <div className="min-h-screen bg-red-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 to-red-700 text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐉</span>
            <span className="text-xl font-bold tracking-tight">SinoStudy</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-amber-500 text-white"
                    : "text-red-200 hover:text-white hover:bg-red-700"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="bg-red-700 text-xs text-red-200 border border-red-600 rounded-full px-2 py-1 appearance-none">
            <option>EN</option><option>RU</option><option>TG</option>
          </select>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-red-800 to-amber-700 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Study in China — Top Universities 2025</h1>
          <p className="text-red-200 mb-4">Scholarships up to $8,000 available. Apply before August 1st.</p>
          <div className="flex gap-3 text-sm">
            <span className="bg-amber-500/30 border border-amber-400/40 rounded-full px-3 py-1">🎓 4 Top Universities</span>
            <span className="bg-amber-500/30 border border-amber-400/40 rounded-full px-3 py-1">📄 Online Applications</span>
            <span className="bg-amber-500/30 border border-amber-400/40 rounded-full px-3 py-1">💰 Merit Scholarships</span>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* Universities */}
        <section>
          <h2 className="text-xl font-bold text-red-900 mb-4">Featured Universities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UNIVERSITIES.map((u) => (
              <div
                key={u.name}
                className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                  selected.includes(u.name)
                    ? "border-amber-500 shadow-md"
                    : "border-neutral-200 hover:border-red-300"
                }`}
                onClick={() =>
                  setSelected((prev) =>
                    prev.includes(u.name)
                      ? prev.filter((n) => n !== u.name)
                      : [...prev, u.name]
                  )
                }
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{u.logo}</span>
                    <div>
                      <h3 className="font-bold text-neutral-800">{u.name}</h3>
                      <p className="text-xs text-neutral-500">{u.city} · {u.ranking}</p>
                    </div>
                  </div>
                  {selected.includes(u.name) && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="bg-neutral-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-neutral-400">Tuition</p>
                    <p className="font-semibold text-neutral-700">{u.tuition}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2 text-center">
                    <p className="text-xs text-green-500">Scholarship</p>
                    <p className="font-semibold text-green-700">{u.grant}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {u.programs.slice(0, 3).map((p) => (
                    <span key={p} className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                  {u.programs.length > 3 && (
                    <span className="text-xs text-neutral-400">+{u.programs.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Status Tracker */}
        <section className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="font-bold text-neutral-800 mb-6">My Application Status</h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-amber-500 transition-all"
              style={{ width: `${(appStep / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((step, i) => (
              <div key={step} className="relative flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 border-2 ${
                    i <= appStep
                      ? "bg-amber-500 border-amber-500 text-white"
                      : "bg-white border-neutral-300 text-neutral-400"
                  }`}
                >
                  {i < appStep ? "✓" : i + 1}
                </div>
                <span className={`text-xs font-medium ${i <= appStep ? "text-amber-700" : "text-neutral-400"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
            <h2 className="font-bold text-neutral-800">Document Checklist</h2>
            <button className="text-sm bg-red-700 text-white px-4 py-1.5 rounded-lg hover:bg-red-800 transition-colors">
              Upload Document
            </button>
          </div>
          <ul className="divide-y divide-neutral-100">
            {DOCS.map((doc) => (
              <li key={doc.name} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className={`text-lg ${doc.status === "uploaded" ? "text-green-500" : "text-neutral-300"}`}>
                    {doc.status === "uploaded" ? "✅" : "📄"}
                  </span>
                  <span className="font-medium text-sm text-neutral-700">{doc.name}</span>
                </div>
                <div className="text-right text-xs">
                  {doc.date ? (
                    <span className="text-green-600">Uploaded {doc.date}</span>
                  ) : (
                    <span className="text-neutral-400 italic">Pending upload</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
