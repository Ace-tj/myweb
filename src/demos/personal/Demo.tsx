"use client";

import { useState } from "react";

const SKILLS = [
  { name: "React / Next.js", pct: 92 },
  { name: "TypeScript", pct: 88 },
  { name: "Node.js", pct: 80 },
  { name: "PostgreSQL", pct: 74 },
  { name: "UI / UX Design", pct: 68 },
  { name: "DevOps / Docker", pct: 60 },
];

const PROJECTS = [
  {
    title: "TaskFlow App",
    desc: "A real-time collaborative task manager with drag & drop.",
    tags: ["React", "Socket.io", "MongoDB"],
    emoji: "📋",
  },
  {
    title: "CryptoTracker",
    desc: "Live portfolio dashboard for crypto assets with alerts.",
    tags: ["Next.js", "WebSocket", "Redis"],
    emoji: "📈",
  },
  {
    title: "MediConnect",
    desc: "Telemedicine platform connecting patients with doctors.",
    tags: ["React Native", "GraphQL", "Supabase"],
    emoji: "🏥",
  },
  {
    title: "ShopWave",
    desc: "Full-stack e-commerce with AI-powered recommendations.",
    tags: ["Next.js", "Stripe", "Python"],
    emoji: "🛍️",
  },
];

const NAV = ["About", "Skills", "Projects", "Contact"];

export default function PersonalDemo() {
  const [activeSection, setActiveSection] = useState("About");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-teal-700 tracking-tight">Alex Johnson</span>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item
                    ? "bg-teal-600 text-white"
                    : "text-slate-600 hover:text-teal-700 hover:bg-teal-50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <select className="text-xs border border-slate-200 rounded-full px-2 py-1 appearance-none">
              <option>EN</option><option>RU</option><option>TG</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <section className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-slate-400 to-teal-500 flex items-center justify-center text-6xl text-white shadow-xl shrink-0">
            AJ
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-800">Alex Johnson</h1>
            <p className="text-xl text-teal-600 font-medium mt-1">Full Stack Developer</p>
            <p className="text-slate-500 mt-3 max-w-lg leading-relaxed">
              I build fast, scalable web applications with clean code and great UX.
              5+ years of experience turning complex problems into elegant solutions.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm hover:bg-slate-700 transition-colors">
                <span>GitHub</span>
              </a>
              <a href="#" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-colors">
                <span>LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition-colors">
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">{s.name}</span>
                  <span className="text-teal-600 font-semibold">{s.pct}%</span>
                </div>
                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all"
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{p.emoji}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 group-hover:text-teal-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Get in Touch</h2>
          {sent ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-3">✅</p>
              <p className="font-medium text-green-700">Message sent! I'll get back to you soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="your@email.com"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Your message…"
                required
                rows={4}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white rounded-xl py-3 font-medium hover:bg-teal-700 transition-colors"
              >
                Send Message →
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}
