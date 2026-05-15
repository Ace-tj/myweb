"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

const DEMO_LABELS: Record<string, string> = {
  shop: "Online Shop",
  gym: "Gym Management",
  accounting: "Accounting Suite",
  "china-uni": "Chinese University Agent",
  school: "School System (K-12)",
  university: "University System",
  restaurant: "Restaurant POS",
  personal: "Personal Info System",
  clinic: "Clinic Appointments",
  logistics: "Logistics & Delivery",
};

const DEMO_COLORS: Record<string, string> = {
  shop: "bg-orange-100 text-orange-800",
  gym: "bg-red-100 text-red-800",
  accounting: "bg-blue-100 text-blue-800",
  "china-uni": "bg-yellow-100 text-yellow-800",
  school: "bg-green-100 text-green-800",
  university: "bg-purple-100 text-purple-800",
  restaurant: "bg-amber-100 text-amber-800",
  personal: "bg-slate-100 text-slate-800",
  clinic: "bg-teal-100 text-teal-800",
  logistics: "bg-yellow-100 text-yellow-800",
};

function RequestForm() {
  const t = useTranslations();
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    localStorage.setItem(
      "myweb_projects",
      JSON.stringify([...existing, project])
    );

    setSuccess(true);
    setSubmitting(false);

    setTimeout(() => {
      router.push(`/${locale}/buyer/dashboard` as "/");
    }, 2000);
  }

  const demoLabel = DEMO_LABELS[demoSlug] ?? demoSlug;
  const demoColor =
    DEMO_COLORS[demoSlug] ?? "bg-neutral-100 text-neutral-700";

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <header className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            {t("common.appName")}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/buyer/dashboard" className="text-neutral-500 hover:text-neutral-700">
              {t("nav.dashboard")}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-2xl w-full px-6 py-12">
        <h1 className="text-3xl font-bold tracking-tight">
          {t("buyer.request.heading")}
        </h1>

        {demoSlug && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-neutral-500">
              {t("buyer.request.selectedDemo")}:
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${demoColor}`}
            >
              {demoLabel}
            </span>
          </div>
        )}

        {success ? (
          <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-8 text-center">
            <p className="text-green-800 font-medium text-lg">
              {t("buyer.request.success")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t("buyer.request.businessName")}
              </label>
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Acme Corp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t("buyer.request.description")}
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Describe what you need…"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t("buyer.request.colorPref")}
              </label>
              <input
                name="colorPref"
                value={form.colorPref}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                placeholder="Blue and white, modern look…"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t("buyer.request.pagesNeeded")}
                </label>
                <input
                  type="number"
                  name="pagesNeeded"
                  value={form.pagesNeeded}
                  onChange={handleChange}
                  min={1}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {t("buyer.request.budget")}
                </label>
                <input
                  type="number"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  min={0}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  placeholder="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t("buyer.request.deadline")}
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t("buyer.request.notes")}
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                placeholder="Any other details…"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-60"
            >
              {submitting
                ? t("buyer.request.submitting")
                : t("buyer.request.submit")}
            </button>
          </form>
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
