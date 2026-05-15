"use client";
import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import {
  LayoutDashboard, FileText, Receipt, Users, BarChart2,
  Calculator, Plus, Download, ChevronRight, TrendingUp,
  TrendingDown, AlertCircle, CheckCircle2, Clock,
} from "lucide-react";

type Page = "dashboard" | "invoices" | "invoice-detail" | "expenses" | "clients" | "reports" | "tax";

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, expenses: 28000 },
  { month: "Feb", revenue: 38000, expenses: 25000 },
  { month: "Mar", revenue: 51000, expenses: 31000 },
  { month: "Apr", revenue: 47000, expenses: 29000 },
  { month: "May", revenue: 55000, expenses: 33000 },
  { month: "Jun", revenue: 60000, expenses: 36000 },
];

const INVOICES = [
  { id: "INV-2026-041", client: "Techwave Solutions", amount: 8400, due: "May 25", status: "Sent",   issued: "May 1",  items: 3 },
  { id: "INV-2026-040", client: "Nomad Logistics",    amount: 3200, due: "May 20", status: "Paid",   issued: "Apr 25", items: 2 },
  { id: "INV-2026-039", client: "BrightMedia Co.",    amount: 12000,due: "May 15", status: "Overdue",issued: "Apr 15", items: 5 },
  { id: "INV-2026-038", client: "GreenSpace Ltd.",    amount: 5700, due: "Jun 1",  status: "Draft",  issued: "May 10", items: 4 },
  { id: "INV-2026-037", client: "AlphaTech Corp.",    amount: 9100, due: "Jun 5",  status: "Paid",   issued: "May 5",  items: 6 },
];

const EXPENSES = [
  { desc: "Office Rent",      amount: 3200, category: "Operations",  date: "May 1",  status: "Paid" },
  { desc: "SaaS Subscriptions",amount: 840, category: "Software",    date: "May 1",  status: "Paid" },
  { desc: "Team Salaries",    amount: 18000,category: "Payroll",     date: "May 5",  status: "Paid" },
  { desc: "Cloud Hosting",    amount: 420,  category: "Technology",  date: "May 10", status: "Paid" },
  { desc: "Marketing Ads",    amount: 2200, category: "Marketing",   date: "May 8",  status: "Pending" },
  { desc: "Business Travel",  amount: 1100, category: "Travel",      date: "May 12", status: "Pending" },
];

const EXPENSE_CATEGORIES = [
  { name: "Payroll",    value: 18000, color: "#6366f1" },
  { name: "Operations", value: 3200,  color: "#06b6d4" },
  { name: "Marketing",  value: 2200,  color: "#f59e0b" },
  { name: "Technology", value: 840,   color: "#10b981" },
  { name: "Travel",     value: 1100,  color: "#f43f5e" },
];

const CLIENTS = [
  { name: "Techwave Solutions", contact: "Sarah Chen",     balance: 8400,  projects: 4, since: "Jan 2025", status: "Active" },
  { name: "Nomad Logistics",    contact: "James Park",     balance: 0,     projects: 2, since: "Mar 2025", status: "Active" },
  { name: "BrightMedia Co.",    contact: "Laura Torres",   balance: 12000, projects: 3, since: "Aug 2024", status: "Overdue" },
  { name: "GreenSpace Ltd.",    contact: "Michael Adams",  balance: 5700,  projects: 1, since: "Feb 2026", status: "Active" },
  { name: "AlphaTech Corp.",    contact: "Diana Nguyen",   balance: 0,     projects: 6, since: "Oct 2024", status: "Active" },
];

const STATUS_STYLE: Record<string, string> = {
  Sent:    "bg-blue-100 text-blue-700",
  Paid:    "bg-emerald-100 text-emerald-700",
  Overdue: "bg-red-100 text-red-700",
  Draft:   "bg-neutral-100 text-neutral-600",
  Pending: "bg-amber-100 text-amber-700",
  Active:  "bg-emerald-100 text-emerald-700",
};

export default function AccountingDemo() {
  const [page, setPage] = useState<Page>("dashboard");
  const [selectedInvoice, setSelectedInvoice] = useState(INVOICES[0]);
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [invoiceSearch, setInvoiceSearch] = useState("");

  const Nav = () => (
    <aside className="fixed left-0 top-0 h-full w-14 sm:w-56 bg-[#0f1e35] border-r border-[#1e3a5f] flex flex-col z-40">
      <div className="p-4 flex items-center gap-2.5 border-b border-[#1e3a5f]">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shrink-0"><Calculator size={16} className="text-white" /></div>
        <span className="hidden sm:block font-extrabold text-white text-base">FinBook Pro</span>
      </div>
      <nav className="flex-1 p-2 flex flex-col gap-0.5">
        {([
          ["dashboard","Dashboard",LayoutDashboard],
          ["invoices","Invoices",FileText],
          ["expenses","Expenses",Receipt],
          ["clients","Clients",Users],
          ["reports","Reports",BarChart2],
          ["tax","Tax Summary",Calculator],
        ] as [Page, string, React.ElementType][]).map(([id, label, Icon]) => (
          <button key={id} onClick={() => setPage(id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${page === id ? "bg-amber-500 text-white" : "text-[#8ba3be] hover:text-white hover:bg-[#1e3a5f]"}`}>
            <Icon size={17} className="shrink-0" />
            <span className="hidden sm:block">{label}</span>
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-[#1e3a5f]">
        <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">F</div><div className="hidden sm:block"><div className="text-xs font-semibold text-white">FinBook</div><div className="text-[9px] text-[#8ba3be]">Pro Account</div></div></div>
      </div>
    </aside>
  );

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      <Nav />
      <main className="flex-1 ml-14 sm:ml-56 p-4 sm:p-6 overflow-auto">{children}</main>
    </div>
  );

  /* DASHBOARD */
  if (page === "dashboard") return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1><p className="text-slate-500 text-sm">May 2026 — Financial Overview</p></div>
        <button onClick={() => setPage("invoices")} className="flex items-center gap-2 px-4 py-2 bg-[#0f1e35] text-white font-semibold rounded-xl hover:bg-[#1e3a5f] transition-colors text-sm"><Plus size={15} /> New Invoice</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Revenue (May)", value: "$55,200", change: "+12%", up: true, icon: <TrendingUp size={18}/> },
          { label: "Expenses",      value: "$33,000", change: "+5%",  up: false, icon: <TrendingDown size={18}/> },
          { label: "Net Profit",    value: "$22,200", change: "+23%", up: true,  icon: <TrendingUp size={18}/> },
          { label: "Pending",       value: "$13,700", change: "2 inv",up: null,  icon: <Clock size={18}/> },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
            <div className={`mb-3 ${s.up === true ? "text-emerald-500" : s.up === false ? "text-red-400" : "text-amber-500"}`}>{s.icon}</div>
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
            <div className={`text-[10px] font-bold mt-1 ${s.up === true ? "text-emerald-500" : s.up === false ? "text-red-400" : "text-slate-400"}`}>{s.change}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Revenue vs. Expenses</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3}/><stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient>
                <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0f1e35" stopOpacity={0.2}/><stop offset="100%" stopColor="#0f1e35" stopOpacity={0}/></linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{fontSize:10, fill:"#94a3b8"}} axisLine={false} tickLine={false} />
              <YAxis tick={{fontSize:10, fill:"#94a3b8"}} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} fill="url(#rev)" name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="#0f1e35" strokeWidth={2} fill="url(#exp)" name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={EXPENSE_CATEGORIES} innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">{EXPENSE_CATEGORIES.map((entry, i) => (<Cell key={i} fill={entry.color} />))}</Pie><Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`]} /></PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {EXPENSE_CATEGORIES.slice(0,3).map((e) => (<div key={e.name} className="flex items-center gap-2 text-xs"><div className="w-2 h-2 rounded-full" style={{background:e.color}} /><span className="flex-1 text-slate-500">{e.name}</span><span className="font-semibold">${e.value.toLocaleString()}</span></div>))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3"><h3 className="font-bold text-slate-900">Recent Invoices</h3><button onClick={() => setPage("invoices")} className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1">View all <ChevronRight size={12}/></button></div>
        <div className="flex flex-col divide-y divide-slate-100">
          {INVOICES.slice(0,4).map((inv) => (
            <div key={inv.id} className="flex items-center justify-between py-2.5 hover:bg-slate-50 px-1 rounded-lg cursor-pointer" onClick={() => { setSelectedInvoice(inv); setPage("invoice-detail"); }}>
              <div><div className="text-sm font-semibold text-slate-800">{inv.client}</div><div className="text-xs text-slate-400">{inv.id} · Due {inv.due}</div></div>
              <div className="flex items-center gap-3"><span className="font-bold text-slate-900">${inv.amount.toLocaleString()}</span><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[inv.status]}`}>{inv.status}</span></div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );

  /* INVOICES */
  if (page === "invoices") return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Invoices</h1><p className="text-slate-500 text-sm">{INVOICES.length} invoices</p></div>
        <button onClick={() => setShowNewInvoice(true)} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors text-sm"><Plus size={15} /> Create Invoice</button>
      </div>
      <div className="flex gap-3 mb-5">
        <input value={invoiceSearch} onChange={(e) => setInvoiceSearch(e.target.value)} placeholder="Search by client..." className="flex-1 max-w-xs text-sm border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400" />
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-slate-400 text-xs bg-slate-50 border-b border-slate-200"><th className="p-3">Invoice</th><th className="p-3">Client</th><th className="p-3">Amount</th><th className="p-3">Due Date</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
          <tbody>
            {INVOICES.filter((i) => !invoiceSearch || i.client.toLowerCase().includes(invoiceSearch.toLowerCase())).map((inv) => (
              <tr key={inv.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { setSelectedInvoice(inv); setPage("invoice-detail"); }}>
                <td className="p-3 font-mono text-xs text-slate-500">{inv.id}</td>
                <td className="p-3 font-semibold text-slate-800">{inv.client}</td>
                <td className="p-3 font-extrabold text-slate-900">${inv.amount.toLocaleString()}</td>
                <td className="p-3 text-slate-500">{inv.due}</td>
                <td className="p-3"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLE[inv.status]}`}>{inv.status}</span></td>
                <td className="p-3">
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button className="text-xs text-amber-600 hover:underline font-medium">Edit</button>
                    <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"><Download size={11}/> PDF</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* New Invoice Modal */}
      {showNewInvoice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNewInvoice(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-extrabold text-xl mb-4">Create Invoice</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {["Client Name","Email","Invoice Number","Due Date"].map((f) => (<div key={f}><label className="text-xs font-semibold text-slate-500 block mb-1">{f}</label><input className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400" /></div>))}
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-500 block mb-1">Line Items</label>
              {[1,2].map((i) => (<div key={i} className="flex gap-2 mb-2"><input placeholder="Description" className="flex-1 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400" /><input placeholder="$" className="w-20 text-sm border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400" /></div>))}
              <button className="text-xs text-amber-600 font-semibold hover:underline">+ Add Line Item</button>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowNewInvoice(false)} className="flex-1 py-2.5 border border-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-50">Cancel</button>
              <button onClick={() => setShowNewInvoice(false)} className="flex-1 py-2.5 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors">Create Invoice</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );

  /* INVOICE DETAIL */
  if (page === "invoice-detail") return (
    <Layout>
      <button onClick={() => setPage("invoices")} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-600 mb-5 transition-colors">← Back to Invoices</button>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 max-w-3xl">
        <div className="flex justify-between items-start mb-8">
          <div><div className="font-extrabold text-2xl text-slate-900">INVOICE</div><div className="font-mono text-sm text-slate-400 mt-1">{selectedInvoice.id}</div></div>
          <div className="text-right"><div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center mb-2 ml-auto"><Calculator size={18} className="text-white" /></div><div className="text-xs text-slate-400">FinBook Pro</div></div>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div><div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bill To</div><div className="font-bold text-slate-900 text-lg">{selectedInvoice.client}</div><div className="text-sm text-slate-400">123 Business Ave<br/>Dushanbe, TJ 734000</div></div>
          <div className="text-right"><div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Details</div><div className="text-sm text-slate-600"><div>Issued: {selectedInvoice.issued}</div><div>Due: {selectedInvoice.due}</div></div></div>
        </div>
        <table className="w-full text-sm mb-6"><thead><tr className="border-b border-slate-200 text-slate-400 text-xs"><th className="py-2 text-left">Description</th><th className="py-2 text-right">Amount</th></tr></thead>
        <tbody>
          {Array.from({length: selectedInvoice.items}).map((_, i) => (<tr key={i} className="border-b border-slate-100 last:border-0"><td className="py-2.5 text-slate-700">Service Item {i + 1}</td><td className="py-2.5 text-right font-semibold">${Math.round(selectedInvoice.amount / selectedInvoice.items).toLocaleString()}</td></tr>))}
        </tbody></table>
        <div className="flex justify-end"><div className="w-48 flex flex-col gap-1 text-sm"><div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="font-semibold">${selectedInvoice.amount.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-slate-400">Tax (12%)</span><span className="font-semibold">${Math.round(selectedInvoice.amount * 0.12).toLocaleString()}</span></div><div className="flex justify-between border-t border-slate-200 pt-2 mt-1 font-extrabold text-base"><span>Total</span><span className="text-amber-600">${Math.round(selectedInvoice.amount * 1.12).toLocaleString()}</span></div></div></div>
        <div className="mt-6 flex gap-3"><button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-50"><Download size={14}/> Download PDF</button>{selectedInvoice.status !== "Paid" && <button className="px-4 py-2 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors">Mark as Paid</button>}</div>
      </div>
    </Layout>
  );

  /* EXPENSES */
  if (page === "expenses") return (
    <Layout>
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-extrabold text-slate-900">Expenses</h1><p className="text-slate-500 text-sm">May 2026</p></div><button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors text-sm"><Plus size={15}/> Add Expense</button></div>
      <div className="grid lg:grid-cols-3 gap-4 mb-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm"><thead><tr className="text-left text-slate-400 text-xs bg-slate-50 border-b border-slate-200"><th className="p-3">Description</th><th className="p-3">Category</th><th className="p-3">Amount</th><th className="p-3">Date</th><th className="p-3">Status</th></tr></thead>
          <tbody>{EXPENSES.map((e, i) => (<tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50"><td className="p-3 font-semibold text-slate-800">{e.desc}</td><td className="p-3 text-slate-500">{e.category}</td><td className="p-3 font-bold text-slate-900">${e.amount.toLocaleString()}</td><td className="p-3 text-slate-400">{e.date}</td><td className="p-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[e.status]}`}>{e.status}</span></td></tr>))}</tbody></table>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4">By Category</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart><Pie data={EXPENSE_CATEGORIES} innerRadius={35} outerRadius={65} paddingAngle={3} dataKey="value">{EXPENSE_CATEGORIES.map((entry, i) => (<Cell key={i} fill={entry.color}/>))}</Pie><Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`]}/></PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3">
            {EXPENSE_CATEGORIES.map((e) => (<div key={e.name} className="flex items-center gap-2 text-xs"><div className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:e.color}}/><span className="flex-1 text-slate-500">{e.name}</span><span className="font-bold">${e.value.toLocaleString()}</span></div>))}
          </div>
        </div>
      </div>
    </Layout>
  );

  /* CLIENTS */
  if (page === "clients") return (
    <Layout>
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-extrabold text-slate-900">Clients</h1><p className="text-slate-500 text-sm">{CLIENTS.length} clients</p></div><button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 transition-colors text-sm"><Plus size={15}/> Add Client</button></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLIENTS.map((c) => (
          <div key={c.name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0f1e35] flex items-center justify-center text-amber-400 font-extrabold text-lg">{c.name[0]}</div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[c.status]}`}>{c.status}</span>
            </div>
            <h3 className="font-bold text-slate-900 mb-0.5">{c.name}</h3>
            <div className="text-xs text-slate-400 mb-3">{c.contact} · Client since {c.since}</div>
            <div className="flex gap-3 text-sm">
              <div><span className="text-slate-400 text-xs">Balance</span><div className={`font-extrabold ${c.balance > 0 ? "text-red-500" : "text-emerald-500"}`}>{c.balance > 0 ? `$${c.balance.toLocaleString()}` : "Paid"}</div></div>
              <div><span className="text-slate-400 text-xs">Projects</span><div className="font-extrabold text-slate-900">{c.projects}</div></div>
            </div>
            <button onClick={() => setPage("invoices")} className="mt-3 w-full py-1.5 border border-amber-200 text-amber-600 rounded-lg text-xs font-semibold hover:bg-amber-50 transition-colors">View Invoices →</button>
          </div>
        ))}
      </div>
    </Layout>
  );

  /* REPORTS */
  if (page === "reports") return (
    <Layout>
      <div className="mb-6 flex items-center justify-between"><div><h1 className="text-2xl font-extrabold text-slate-900">Reports</h1><p className="text-slate-500 text-sm">Financial statements</p></div><button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-xl font-semibold text-sm hover:bg-slate-50"><Download size={15}/> Export All</button></div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-slate-900">Profit & Loss (May 2026)</h3><button className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1"><Download size={11}/> PDF</button></div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between p-2.5 bg-emerald-50 rounded-lg"><span className="text-slate-600 font-medium">Total Revenue</span><span className="font-extrabold text-emerald-600">$55,200</span></div>
            <div className="flex justify-between p-2.5 hover:bg-slate-50 rounded-lg"><span className="text-slate-500 pl-2">— Services</span><span className="font-semibold">$42,000</span></div>
            <div className="flex justify-between p-2.5 hover:bg-slate-50 rounded-lg"><span className="text-slate-500 pl-2">— Consulting</span><span className="font-semibold">$13,200</span></div>
            <div className="flex justify-between p-2.5 bg-red-50 rounded-lg mt-2"><span className="text-slate-600 font-medium">Total Expenses</span><span className="font-extrabold text-red-500">$33,000</span></div>
            {EXPENSES.map((e) => (<div key={e.desc} className="flex justify-between p-2.5 hover:bg-slate-50 rounded-lg"><span className="text-slate-500 pl-2">— {e.desc}</span><span className="font-semibold">${e.amount.toLocaleString()}</span></div>))}
            <div className="flex justify-between p-3 bg-amber-50 rounded-lg mt-2 border border-amber-200"><span className="font-extrabold text-slate-900">Net Profit</span><span className="font-extrabold text-amber-600 text-lg">$22,200</span></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-slate-900">Balance Sheet</h3><button className="text-xs text-amber-600 font-semibold hover:underline flex items-center gap-1"><Download size={11}/> PDF</button></div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="font-bold text-slate-600 text-xs uppercase tracking-wider mb-1">Assets</div>
            {[["Cash & Bank","$84,500"],["Accounts Receivable","$13,700"],["Equipment","$22,000"]].map(([k,v]) => (<div key={String(k)} className="flex justify-between p-2.5 hover:bg-slate-50 rounded-lg"><span className="text-slate-600">{k}</span><span className="font-semibold">{v}</span></div>))}
            <div className="flex justify-between p-2.5 bg-blue-50 rounded-lg font-bold border-t border-slate-200 mt-1"><span>Total Assets</span><span className="text-blue-600">$120,200</span></div>
            <div className="font-bold text-slate-600 text-xs uppercase tracking-wider mb-1 mt-3">Liabilities</div>
            {[["Accounts Payable","$8,200"],["Loan","$15,000"]].map(([k,v]) => (<div key={String(k)} className="flex justify-between p-2.5 hover:bg-slate-50 rounded-lg"><span className="text-slate-600">{k}</span><span className="font-semibold text-red-500">{v}</span></div>))}
            <div className="flex justify-between p-2.5 bg-green-50 rounded-lg font-extrabold border-t border-slate-200 mt-1"><span>Net Equity</span><span className="text-emerald-600">$97,000</span></div>
          </div>
        </div>
      </div>
    </Layout>
  );

  /* TAX */
  return (
    <Layout>
      <div className="mb-6"><h1 className="text-2xl font-extrabold text-slate-900">Tax Summary</h1><p className="text-slate-500 text-sm">Fiscal Year 2026</p></div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4">Quarterly Estimates</h3>
          <div className="flex flex-col gap-3">
            {[{q:"Q1 (Jan–Mar)",income:131000,tax:15720,paid:true},{q:"Q2 (Apr–Jun)",income:162200,tax:19464,paid:false},{q:"Q3 (Jul–Sep)",income:0,tax:0,paid:false},{q:"Q4 (Oct–Dec)",income:0,tax:0,paid:false}].map((q) => (
              <div key={q.q} className={`flex items-center justify-between p-3.5 rounded-xl border ${q.paid ? "border-emerald-200 bg-emerald-50" : "border-slate-200"}`}>
                <div><div className="font-semibold text-slate-800 text-sm">{q.q}</div>{q.income > 0 && <div className="text-xs text-slate-400">Income: ${q.income.toLocaleString()}</div>}</div>
                <div className="text-right">
                  {q.income > 0 && <div className="font-extrabold text-slate-900">${q.tax.toLocaleString()}</div>}
                  {q.paid ? <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold justify-end"><CheckCircle2 size={10}/> Paid</div> : q.income > 0 ? <div className="text-[10px] text-amber-500 font-bold">Due Jun 15</div> : <div className="text-[10px] text-slate-300">Pending</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-bold text-slate-900 mb-4">Deductions</h3>
          <div className="flex flex-col gap-2 text-sm mb-4">
            {[["Office Rent","$38,400"],["Equipment Depreciation","$4,400"],["Business Travel","$3,200"],["Software & Tools","$5,040"],["Marketing","$14,400"]].map(([k,v]) => (<div key={String(k)} className="flex justify-between p-2.5 hover:bg-slate-50 rounded-lg"><span className="text-slate-600">{k}</span><span className="font-semibold text-emerald-600">{v}</span></div>))}
          </div>
          <div className="flex justify-between p-3 bg-amber-50 rounded-xl border border-amber-200 font-extrabold"><span>Total Deductions</span><span className="text-amber-600">$65,440</span></div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm">
            <div className="flex items-center gap-2 text-blue-700 font-semibold"><AlertCircle size={14}/> Estimated Tax Savings</div>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">$7,853</div>
            <div className="text-xs text-blue-500">at 12% effective rate</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
