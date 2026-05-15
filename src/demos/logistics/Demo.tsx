"use client";

import { useState } from "react";

type ShipStatus = "In Transit" | "Delivered" | "Pending" | "Delayed";
type DriverStatus = "On Route" | "Available" | "Off Duty";

const SHIPMENTS: {
  id: string;
  origin: string;
  destination: string;
  driver: string;
  status: ShipStatus;
  eta: string;
}[] = [
  { id: "SHP-1001", origin: "Tashkent", destination: "Almaty", driver: "Ravshan M.", status: "In Transit", eta: "May 16" },
  { id: "SHP-1002", origin: "Dushanbe", destination: "Bishkek", driver: "Timur A.", status: "Delivered", eta: "May 14" },
  { id: "SHP-1003", origin: "Samarkand", destination: "Tehran", driver: "Unassigned", status: "Pending", eta: "May 18" },
  { id: "SHP-1004", origin: "Bukhara", destination: "Moscow", driver: "Jahongir K.", status: "Delayed", eta: "May 19" },
  { id: "SHP-1005", origin: "Khujand", destination: "Astana", driver: "Ravshan M.", status: "In Transit", eta: "May 17" },
];

const DRIVERS: {
  name: string;
  vehicle: string;
  status: DriverStatus;
  location: string;
  trips: number;
}[] = [
  { name: "Ravshan M.", vehicle: "Volvo FH16 · TJ 12AB34", status: "On Route", location: "Near Shymkent", trips: 2 },
  { name: "Timur A.", vehicle: "Scania R730 · TJ 56CD78", status: "Available", location: "Almaty Depot", trips: 1 },
  { name: "Jahongir K.", vehicle: "Mercedes Actros · TJ 90EF12", status: "On Route", location: "Near Saratov", trips: 1 },
  { name: "Dilshod N.", vehicle: "MAN TGX · UZ 34GH56", status: "Off Duty", location: "Tashkent Base", trips: 0 },
];

const STATUS_STYLES: Record<ShipStatus, string> = {
  "In Transit":  "bg-blue-100 text-blue-800",
  "Delivered":   "bg-green-100 text-green-800",
  "Pending":     "bg-yellow-100 text-yellow-800",
  "Delayed":     "bg-red-100 text-red-800",
};

const DRIVER_STYLES: Record<DriverStatus, string> = {
  "On Route":   "bg-blue-100 text-blue-700",
  "Available":  "bg-green-100 text-green-700",
  "Off Duty":   "bg-neutral-100 text-neutral-500",
};

const NAV = ["Shipments", "Drivers", "Routes", "Tracking", "Reports"];

const ROUTE_DOTS = [
  { label: "Tashkent", pct: 0 },
  { label: "Samarkand", pct: 22 },
  { label: "Termez", pct: 45 },
  { label: "Shymkent", pct: 68 },
  { label: "Almaty", pct: 100 },
];

export default function LogisticsDemo() {
  const [activeNav, setActiveNav] = useState("Shipments");

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      {/* Header */}
      <header className="bg-neutral-900 text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚛</span>
            <span className="text-xl font-bold tracking-tight text-yellow-400">SwiftRoute</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeNav === item
                    ? "bg-yellow-500 text-neutral-900"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <select className="bg-neutral-800 text-xs text-neutral-400 border border-neutral-700 rounded-full px-2 py-1 appearance-none">
            <option>EN</option><option>RU</option><option>TG</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Shipments Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="font-bold text-neutral-800">Live Shipments</h2>
            <button className="text-sm bg-yellow-500 text-neutral-900 font-semibold px-4 py-1.5 rounded-lg hover:bg-yellow-400 transition-colors">
              + New Shipment
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-100">
                  {["Shipment ID", "Origin", "Destination", "Driver", "Status", "ETA"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-neutral-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {SHIPMENTS.map((s) => (
                  <tr key={s.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-yellow-700">{s.id}</td>
                    <td className="px-4 py-3 font-medium text-neutral-700">{s.origin}</td>
                    <td className="px-4 py-3 text-neutral-600">{s.destination}</td>
                    <td className="px-4 py-3 text-neutral-600">{s.driver}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${STATUS_STYLES[s.status]}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{s.eta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drivers */}
        <div>
          <h2 className="font-bold text-neutral-800 mb-4">Driver Availability</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DRIVERS.map((d) => (
              <div
                key={d.name}
                className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
                    🧑‍✈️
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DRIVER_STYLES[d.status]}`}>
                    {d.status}
                  </span>
                </div>
                <p className="font-bold text-neutral-800 text-sm">{d.name}</p>
                <p className="text-neutral-400 text-xs mt-0.5">{d.vehicle}</p>
                <p className="text-neutral-500 text-xs mt-2">📍 {d.location}</p>
                <p className="text-neutral-400 text-xs mt-0.5">{d.trips} active trip{d.trips !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Route Map Placeholder */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
          <h2 className="font-bold text-neutral-800 mb-4">Route Map — SHP-1001</h2>
          <div className="relative bg-gradient-to-r from-amber-50 to-yellow-100 rounded-xl p-6 overflow-hidden">
            {/* Route line */}
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-yellow-400 rounded-full -translate-y-1/2" />
            {/* Progress */}
            <div className="absolute top-1/2 left-6 h-1 bg-yellow-600 rounded-full -translate-y-1/2" style={{ width: "68%" }} />

            {/* Dots */}
            <div className="relative flex justify-between">
              {ROUTE_DOTS.map((dot, i) => {
                const progress = 68;
                const isPast = dot.pct <= progress;
                return (
                  <div key={dot.label} className="flex flex-col items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 z-10 ${
                      isPast ? "bg-yellow-600 border-yellow-600" : "bg-white border-neutral-300"
                    }`} />
                    <span className={`text-xs font-medium ${isPast ? "text-yellow-800" : "text-neutral-400"}`}>
                      {dot.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Truck indicator */}
            <div
              className="absolute top-1/2 -translate-y-full -translate-x-1/2 text-2xl"
              style={{ left: "68%" }}
            >
              🚛
            </div>
          </div>
          <p className="text-sm text-neutral-500 mt-3 text-center">
            Currently near Shymkent · Estimated arrival May 16
          </p>
        </div>
      </main>
    </div>
  );
}
