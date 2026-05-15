"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react";

const DEMO_LABELS: Record<string, string> = {
  shop: "Online Shop",
  gym: "Gym Management",
  accounting: "Accounting Suite",
  "china-uni": "Chinese University Agent",
  school: "School System (K-12)",
  university: "University Portal",
  restaurant: "Restaurant POS",
  personal: "Personal CRM",
  clinic: "Clinic System",
  logistics: "Logistics Platform",
};

const DEMO_COLORS: Record<string, string> = {
  shop: "bg-orange-500/15 text-orange-500 border border-orange-500/20",
  gym: "bg-green-500/15 text-green-500 border border-green-500/20",
  accounting: "bg-blue-500/15 text-blue-500 border border-blue-500/20",
  "china-uni": "bg-amber-500/15 text-amber-500 border border-amber-500/20",
  school: "bg-sky-500/15 text-sky-500 border border-sky-500/20",
  university: "bg-purple-500/15 text-purple-500 border border-purple-500/20",
  restaurant: "bg-red-500/15 text-red-500 border border-red-500/20",
  personal: "bg-indigo-500/15 text-indigo-500 border border-indigo-500/20",
  clinic: "bg-teal-500/15 text-teal-500 border border-teal-500/20",
  logistics: "bg-slate-400/20 text-slate-500 border border-slate-400/20",
};

const INPUT_CLASS = "w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

function RequestForm() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const demoSlug = searchParams.get("demo") ?? "";

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    description: "",
    colorPref: "",
    pagesNeeded: "",
    budget: "",
    deadline: "",
    notes: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const project = {
      id: `proj-${Date.now()}`,
      demoSlug,
      ...form,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("myweb_projects") ?? "[]");
    localStorage.setItem("myweb_projects", JSON.stringify([...existing, project]));
    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => {
      router.push(`/${locale}/buyer/dashboard` as "/");
    }, 2000);
  }

  const demoLabel = DEMO_LABELS[demoSlug] ?? demoSlug;
  const demoColor = DEMO_COLORS[demoSlug] ?? "bg-indigo-500/15 text-indigo-500 border border-indigo-500/20";

  const inputStyle = {
    background: "rgb(var(--bg))",
    borderColor: "rgb(var(--border))",
    color: "rgb(var(--text))",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "rgb(var(--bg))" }}>
      {/* Header */}
      <header className="border-b sticky top-0 z-20 backdrop-blur-sm" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
        <div className="mx-auto max-w-4xl px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-base font-bold" style={{ color: "rgb(var(--text))" }}>MyWeb</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/buyer/dashboard" className="text-sm font-medium transition-colors hover:text-indigo-500" style={{ color: "rgb(var(--text-muted))" }}>Dashboard</Link>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-2xl w-full px-6 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "rgb(var(--text))" }}>Submit a Project Brief</h1>
          {demoSlug && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>Selected demo:</span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${demoColor}`}>
                {demoLabel}
              </span>
            </div>
          )}
        </div>

        {success ? (
          <div className="rounded-2xl border p-10 text-center" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={28} className="text-emerald-500" />
            </div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "rgb(var(--text))" }}>Brief submitted!</h2>
            <p className="text-sm" style={{ color: "rgb(var(--text-muted))" }}>Redirecting you to the dashboard…</p>
          </div>
        ) : (
          <div className="rounded-2xl border p-8" style={{ background: "rgb(var(--bg-card))", borderColor: "rgb(var(--border))" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Business name */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Business / Project Name</label>
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                  className={INPUT_CLASS}
                  style={inputStyle}
                  placeholder="Acme Corp"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>What do you need built?</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={INPUT_CLASS + " resize-none"}
                  style={inputStyle}
                  placeholder="Describe what you need, key features, users, etc."
                />
              </div>

              {/* Color preference */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Color &amp; Style Preference</label>
                <input
                  name="colorPref"
                  value={form.colorPref}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                  style={inputStyle}
                  placeholder="e.g. Blue and white, professional look"
                />
              </div>

              {/* Pages + Budget */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Number of Pages</label>
                  <input
                    type="number"
                    name="pagesNeeded"
                    value={form.pagesNeeded}
                    onChange={handleChange}
                    min={1}
                    className={INPUT_CLASS}
                    style={inputStyle}
                    placeholder="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Budget (USD)</label>
                  <input
                    type="number"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    min={0}
                    className={INPUT_CLASS}
                    style={inputStyle}
                    placeholder="1000"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                  style={inputStyle}
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "rgb(var(--text))" }}>Additional Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className={INPUT_CLASS + " resize-none"}
                  style={inputStyle}
                  placeholder="Anything else we should know…"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting…" : <><span>Submit Brief</span><ArrowRight size={15} /></>}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default function BuyerRequestPage() {
  return (
    <Suspense>
      <RequestForm />
    </Suspense>
  );
}
