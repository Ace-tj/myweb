"use client";

import { useState } from "react";

const MENU_ITEMS = [
  { id: 1, name: "Margherita Pizza", emoji: "🍕", price: 14.99, inStock: true },
  { id: 2, name: "BBQ Burger", emoji: "🍔", price: 12.50, inStock: true },
  { id: 3, name: "Caesar Salad", emoji: "🥗", price: 9.99, inStock: false },
  { id: 4, name: "Spaghetti Carbonara", emoji: "🍝", price: 16.00, inStock: true },
  { id: 5, name: "Tiramisu", emoji: "🍰", price: 6.50, inStock: true },
  { id: 6, name: "Grilled Salmon", emoji: "🐟", price: 22.00, inStock: false },
];

const INITIAL_ORDERS: Record<string, { id: string; table: string; items: string; total: number; time: string }[]> = {
  new: [
    { id: "ORD-201", table: "T-04", items: "2× Pizza, 1× Burger", total: 42.48, time: "5 min ago" },
    { id: "ORD-202", table: "T-09", items: "1× Salmon, 2× Salad", total: 41.98, time: "2 min ago" },
  ],
  "in-kitchen": [
    { id: "ORD-199", table: "T-02", items: "3× Pasta, 1× Tiramisu", total: 54.50, time: "12 min ago" },
    { id: "ORD-200", table: "T-07", items: "2× Burger", total: 25.00, time: "8 min ago" },
  ],
  ready: [
    { id: "ORD-197", table: "T-01", items: "1× Pizza, 2× Salad", total: 34.97, time: "18 min ago" },
    { id: "ORD-198", table: "T-06", items: "2× Salmon", total: 44.00, time: "15 min ago" },
  ],
};

type TableStatus = "available" | "occupied" | "reserved";

const TABLES: { id: string; status: TableStatus }[] = [
  { id: "T-01", status: "occupied" }, { id: "T-02", status: "occupied" }, { id: "T-03", status: "available" }, { id: "T-04", status: "occupied" },
  { id: "T-05", status: "reserved" }, { id: "T-06", status: "occupied" }, { id: "T-07", status: "occupied" }, { id: "T-08", status: "available" },
  { id: "T-09", status: "occupied" }, { id: "T-10", status: "available" }, { id: "T-11", status: "reserved" }, { id: "T-12", status: "available" },
];

const NAV = ["Orders", "Menu", "Tables", "Kitchen", "Reports"];

const STATUS_LABELS: Record<string, string> = {
  new: "New Orders",
  "in-kitchen": "In Kitchen",
  ready: "Ready",
};

export default function RestaurantDemo() {
  const [activeNav, setActiveNav] = useState("Orders");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [menu, setMenu] = useState(MENU_ITEMS);

  function moveOrder(fromCol: string, orderId: string) {
    const cols = ["new", "in-kitchen", "ready"];
    const fromIdx = cols.indexOf(fromCol);
    if (fromIdx === cols.length - 1) return;
    const toCol = cols[fromIdx + 1];
    const order = orders[fromCol].find((o) => o.id === orderId);
    if (!order) return;
    setOrders((prev) => ({
      ...prev,
      [fromCol]: prev[fromCol].filter((o) => o.id !== orderId),
      [toCol]: [...prev[toCol], order],
    }));
  }

  function toggleStock(id: number) {
    setMenu((prev) => prev.map((m) => (m.id === id ? { ...m, inStock: !m.inStock } : m)));
  }

  const TABLE_COLORS: Record<TableStatus, string> = {
    available: "bg-green-100 border-green-300 text-green-800",
    occupied: "bg-red-100 border-red-300 text-red-800",
    reserved: "bg-yellow-100 border-yellow-300 text-yellow-800",
  };

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Header */}
      <header className="bg-amber-900 text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-xl font-bold tracking-tight">TableFlow</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-amber-600 text-white"
                    : "text-amber-300 hover:text-white hover:bg-amber-800"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="bg-amber-800 text-xs text-amber-200 border border-amber-700 rounded-full px-2 py-1 appearance-none">
            <option>EN</option><option>RU</option><option>TG</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Kanban Orders */}
        <section>
          <h2 className="font-bold text-amber-900 text-lg mb-4">Live Orders Board</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(["new", "in-kitchen", "ready"] as const).map((col) => (
              <div key={col} className="bg-white rounded-2xl border border-amber-200 overflow-hidden">
                <div className={`px-4 py-3 border-b text-sm font-bold ${
                  col === "new" ? "bg-purple-50 border-purple-200 text-purple-800" :
                  col === "in-kitchen" ? "bg-orange-50 border-orange-200 text-orange-800" :
                  "bg-teal-50 border-teal-200 text-teal-800"
                }`}>
                  {STATUS_LABELS[col]} ({orders[col].length})
                </div>
                <div className="p-3 space-y-3 min-h-40">
                  {orders[col].map((order) => (
                    <div
                      key={order.id}
                      className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-amber-900">{order.id}</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {order.table}
                        </span>
                      </div>
                      <p className="text-neutral-600 text-xs mb-2">{order.items}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-800">${order.total}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-400">{order.time}</span>
                          {col !== "ready" && (
                            <button
                              onClick={() => moveOrder(col, order.id)}
                              className="text-xs bg-amber-600 text-white px-2 py-0.5 rounded-lg hover:bg-amber-700 transition-colors"
                            >
                              →
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Menu */}
          <div className="bg-white rounded-2xl border border-amber-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-amber-100">
              <h2 className="font-bold text-neutral-800">Menu Items</h2>
            </div>
            <div className="divide-y divide-neutral-100">
              {menu.map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-neutral-800">{item.name}</p>
                    <p className="text-amber-700 font-bold text-sm">${item.price}</p>
                  </div>
                  <button
                    onClick={() => toggleStock(item.id)}
                    className={`text-xs px-3 py-1 rounded-full font-medium border transition-colors ${
                      item.inStock
                        ? "bg-green-100 border-green-300 text-green-700 hover:bg-red-100 hover:border-red-300 hover:text-red-700"
                        : "bg-red-100 border-red-300 text-red-700 hover:bg-green-100 hover:border-green-300 hover:text-green-700"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Table Map */}
          <div className="bg-white rounded-2xl border border-amber-200 p-5">
            <h2 className="font-bold text-neutral-800 mb-4">Table Map</h2>
            <div className="flex gap-4 text-xs mb-4">
              {(["available", "occupied", "reserved"] as TableStatus[]).map((s) => (
                <div key={s} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded-sm border ${TABLE_COLORS[s]}`} />
                  <span className="capitalize text-neutral-600">{s}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {TABLES.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-xl border-2 p-3 text-center text-xs font-bold cursor-pointer transition-all hover:scale-105 ${TABLE_COLORS[t.status]}`}
                >
                  {t.id}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
