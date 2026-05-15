"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MONTHLY_DATA = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 38000, expenses: 24000 },
  { month: "Mar", revenue: 55000, expenses: 32000 },
  { month: "Apr", revenue: 61000, expenses: 35000 },
  { month: "May", revenue: 48000, expenses: 29000 },
  { month: "Jun", revenue: 72000, expenses: 40000 },
  { month: "Jul", revenue: 66000, expenses: 37000 },
  { month: "Aug", revenue: 80000, expenses: 42000 },
];

const METRICS = [
  { label: "Total Revenue", value: "$462,000", change: "+12.4%", positive: true },
  { label: "Total Expenses", value: "$267,000", change: "+5.1%", positive: false },
  { label: "Net Profit", value: "$195,000", change: "+22.8%", positive: true },
  { label: "Pending Invoices", value: "$34,500", change: "8 invoices", positive: true },
];

const TRANSACTIONS = [
  { date: "May 12", desc: "Client payment — Acme Corp", category: "Revenue", amount: 8500, status: "Completed" },
  { date: "May 11", desc: "Office supplies", category: "Operations", amount: -320, status: "Completed" },
  { date: "May 10", desc: "Freelancer payment — Design", category: "Payroll", amount: -2400, status: "Completed" },
  { date: "May 9", desc: "Client payment — Beta Inc", category: "Revenue", amount: 5200, status: "Pending" },
  { date: "May 8", desc: "Cloud hosting subscription", category: "Software", amount: -199, status: "Completed" },
];

const NAV = ["Dashboard", "Transactions", "Reports", "Invoices"];

export default function AccountingDemo() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showModal, setShowModal] = useState(false);
  const [invoice, setInvoice] = useState({ client: "", amount: "", due: "" });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            <span className="text-xl font-bold text-blue-700 tracking-tight">FinBook Pro</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Invoice
            </button>
            <select className="text-xs border border-slate-200 rounded-full px-2 py-1 appearance-none">
              <option>EN</option><option>RU</option><option>TG</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{m.label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{m.value}</p>
              <span className={`text-xs font-medium ${m.positive ? "text-green-600" : "text-red-500"}`}>
                {m.change}
              </span>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-800 mb-4">Revenue vs Expenses (2025)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2563eb" fill="url(#rev)" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" fill="url(#exp)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">Recent Transactions</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Date</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Description</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Category</th>
                <th className="text-right px-4 py-3 text-slate-400 font-medium">Amount</th>
                <th className="text-left px-4 py-3 text-slate-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {TRANSACTIONS.map((tx, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-slate-500">{tx.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-700">{tx.desc}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{tx.category}</span>
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      tx.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Create Invoice</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                <input
                  value={invoice.client}
                  onChange={(e) => setInvoice((p) => ({ ...p, client: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount (USD)</label>
                <input
                  type="number"
                  value={invoice.amount}
                  onChange={(e) => setInvoice((p) => ({ ...p, amount: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={invoice.due}
                  onChange={(e) => setInvoice((p) => ({ ...p, due: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Create Invoice
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-lg border border-slate-300 py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
