"use client";

import { useState } from "react";
import {
  Package, Truck, MapPin, ChartBar, Users, Plus,
  MagnifyingGlass, ArrowLeft, CaretRight, Clock, Check,
  X, Warning, TrendUp, TrendDown,
  NavigationArrow, Archive, Globe, Lightning, Shield, Star,
  Funnel, Download, Printer, Phone, Envelope,
  Hash, Calendar, CurrencyDollar, ChartLineUp,
  CheckCircle, XCircle, Circle, ArrowRight
} from "@phosphor-icons/react";

// ─── palette ────────────────────────────────────────────────────────────────
const C = {
  slate: "#0f172a",
  slateLight: "#1e293b",
  orange: "#f97316",
  orangeLight: "#fff7ed",
  orangeDark: "#c2410c",
  bg: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  muted: "#64748b",
  border: "#e2e8f0",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
  blue: "#3b82f6",
};

// ─── data ────────────────────────────────────────────────────────────────────
type ShipStatus = "In Transit" | "Delivered" | "Pending" | "Delayed" | "Out for Delivery";

const SHIPMENTS = [
  { id: "SHP-20847", origin: "Los Angeles, CA", dest: "Chicago, IL", customer: "TechFlow Inc.", weight: "24.5 kg", status: "In Transit" as ShipStatus, eta: "May 18", driver: "Marcus Bell", truck: "TK-104", progress: 62, value: 1840, priority: "standard", tracking: ["Picked up LA hub", "Departed LA facility", "Arrived Phoenix hub", "In transit to Denver"] },
  { id: "SHP-20848", origin: "Seattle, WA", dest: "New York, NY", customer: "Bloom Health", weight: "8.2 kg", status: "Out for Delivery" as ShipStatus, eta: "May 16", driver: "Priya Sinha", truck: "TK-207", progress: 95, value: 3200, priority: "express", tracking: ["Picked up SEA hub", "Departed SEA", "Chicago hub", "NYC facility", "Out for delivery"] },
  { id: "SHP-20849", origin: "Miami, FL", dest: "Houston, TX", customer: "Meridian Group", weight: "52.0 kg", status: "Delayed" as ShipStatus, eta: "May 19", driver: "Carlos Ruiz", truck: "TK-315", progress: 40, value: 920, priority: "standard", tracking: ["Picked up MIA hub", "In transit", "Held at Orlando hub — weather delay"] },
  { id: "SHP-20850", origin: "Denver, CO", dest: "Seattle, WA", customer: "Scale Ventures", weight: "3.1 kg", status: "Delivered" as ShipStatus, eta: "May 15", driver: "Emma Torres", truck: "TK-108", progress: 100, value: 560, priority: "express", tracking: ["Picked up DEN hub", "SLC hub", "Arrived SEA", "Delivered — signed by R. Kim"] },
  { id: "SHP-20851", origin: "Boston, MA", dest: "Atlanta, GA", customer: "Innovatech", weight: "14.7 kg", status: "Pending" as ShipStatus, eta: "May 20", driver: "—", truck: "—", progress: 0, value: 740, priority: "economy", tracking: ["Order received — awaiting pickup"] },
  { id: "SHP-20852", origin: "Phoenix, AZ", dest: "Las Vegas, NV", customer: "Vertex Capital", weight: "6.8 kg", status: "In Transit" as ShipStatus, eta: "May 17", driver: "James Park", truck: "TK-221", progress: 78, value: 1120, priority: "express", tracking: ["Picked up PHX hub", "In transit", "Approaching LAS"] },
];

const DRIVERS = [
  { id: 1, name: "Marcus Bell", truck: "TK-104", status: "On Route" as const, route: "LA → Chicago", location: "Denver, CO", phone: "+1 555-0401", rating: 4.9, deliveries: 1284, onTime: 97, license: "CDL-A", avatar: "MB" },
  { id: 2, name: "Priya Sinha", truck: "TK-207", status: "On Route" as const, route: "SEA → NYC", location: "New York, NY", phone: "+1 555-0402", rating: 4.8, deliveries: 972, onTime: 98, license: "CDL-A", avatar: "PS" },
  { id: 3, name: "Carlos Ruiz", truck: "TK-315", status: "Delayed" as const, route: "MIA → Houston", location: "Orlando, FL", phone: "+1 555-0403", rating: 4.7, deliveries: 843, onTime: 91, license: "CDL-B", avatar: "CR" },
  { id: 4, name: "Emma Torres", truck: "TK-108", status: "Available" as const, route: "—", location: "Seattle, WA", phone: "+1 555-0404", rating: 4.9, deliveries: 1530, onTime: 99, license: "CDL-A", avatar: "ET" },
  { id: 5, name: "James Park", truck: "TK-221", status: "On Route" as const, route: "PHX → Las Vegas", location: "Outside Phoenix", phone: "+1 555-0405", rating: 4.8, deliveries: 761, onTime: 95, license: "CDL-A", avatar: "JP" },
  { id: 6, name: "Sofia Greco", truck: "TK-419", status: "Available" as const, route: "—", location: "Los Angeles, CA", phone: "+1 555-0406", rating: 4.6, deliveries: 624, onTime: 94, license: "CDL-B", avatar: "SG" },
];

const FLEET = [
  { id: "TK-104", type: "Semi-Truck", make: "Freightliner Cascadia", year: 2023, mileage: "84,230 mi", status: "active", driver: "Marcus Bell", nextService: "Jun 15", fuel: 72, load: 68 },
  { id: "TK-207", type: "Semi-Truck", make: "Kenworth T680", year: 2022, mileage: "112,500 mi", status: "active", driver: "Priya Sinha", nextService: "May 30", fuel: 45, load: 85 },
  { id: "TK-315", type: "Box Truck", make: "Mercedes Sprinter 4500", year: 2024, mileage: "38,100 mi", status: "delayed", driver: "Carlos Ruiz", nextService: "Jul 10", fuel: 58, load: 75 },
  { id: "TK-108", type: "Semi-Truck", make: "Volvo VNL 860", year: 2023, mileage: "97,400 mi", status: "idle", driver: "Emma Torres", nextService: "Aug 1", fuel: 90, load: 0 },
  { id: "TK-221", type: "Cargo Van", make: "Ford Transit 350", year: 2024, mileage: "22,800 mi", status: "active", driver: "James Park", nextService: "Sep 5", fuel: 65, load: 40 },
  { id: "TK-419", type: "Box Truck", make: "Isuzu NQR", year: 2022, mileage: "68,900 mi", status: "idle", driver: "Sofia Greco", nextService: "Jun 28", fuel: 80, load: 0 },
];

const WEEKLY_DATA = [
  { day: "Mon", shipments: 24, revenue: 18400, onTime: 96 },
  { day: "Tue", shipments: 31, revenue: 22800, onTime: 94 },
  { day: "Wed", shipments: 28, revenue: 19600, onTime: 97 },
  { day: "Thu", shipments: 35, revenue: 26200, onTime: 95 },
  { day: "Fri", shipments: 42, revenue: 31400, onTime: 93 },
  { day: "Sat", shipments: 19, revenue: 14100, onTime: 98 },
  { day: "Sun", shipments: 11, revenue: 8200, onTime: 100 },
];

// ─── helpers ─────────────────────────────────────────────────────────────────
function Avatar({ initials, size = 36, color = C.orange }: { initials: string; size?: number; color?: string }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 10, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${color}33` }}>
      <span style={{ fontSize: size * 0.35, fontWeight: 800, color }}>{initials}</span>
    </div>
  );
}

function Badge({ children, color = C.orange }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ background: color + "18", color, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

const statusColors: Record<ShipStatus, string> = {
  "In Transit": C.blue,
  "Out for Delivery": C.orange,
  "Delivered": C.success,
  "Delayed": C.danger,
  "Pending": C.muted,
};

const priorityColors: Record<string, string> = { express: C.orange, standard: C.blue, economy: C.muted };

function Sidebar({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const nav = [
    { id: "dashboard", icon: <ChartBar size={18} />, label: "Dashboard" },
    { id: "shipments", icon: <Package size={18} />, label: "Shipments" },
    { id: "new-shipment", icon: <Plus size={18} />, label: "New Shipment" },
    { id: "drivers", icon: <Users size={18} />, label: "Drivers" },
    { id: "tracker", icon: <MapPin size={18} />, label: "Package Tracker" },
    { id: "fleet", icon: <Truck size={18} />, label: "Fleet" },
    { id: "reports", icon: <ChartLineUp size={18} />, label: "Reports" },
  ];
  return (
    <div style={{ width: 220, background: C.slate, display: "flex", flexDirection: "column", flexShrink: 0, height: "100%" }}>
      <div style={{ padding: "20px 18px 16px", borderBottom: "1px solid #ffffff18" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: C.orange, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Truck size={22} color="#fff" weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>SwiftShip</div>
            <div style={{ fontSize: 10, color: "#ffffff66" }}>Logistics Platform</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setPage(n.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: page === n.id ? C.orange : "transparent", color: page === n.id ? "#fff" : "#ffffff77", fontWeight: page === n.id ? 700 : 500, fontSize: 13, textAlign: "left", transition: "all .15s" }}>
            {n.icon}{n.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: "14px 18px", borderTop: "1px solid #ffffff18" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials="SW" size={30} color={C.orange} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>SwiftShip HQ</div>
            <div style={{ fontSize: 10, color: "#ffffff55" }}>Operations Manager</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ setPage }: { setPage: (p: string) => void }) {
  const inTransit = SHIPMENTS.filter(s => s.status === "In Transit" || s.status === "Out for Delivery").length;
  const delayed = SHIPMENTS.filter(s => s.status === "Delayed").length;
  const totalRevenue = WEEKLY_DATA.reduce((s, d) => s + d.revenue, 0);
  const maxRev = Math.max(...WEEKLY_DATA.map(d => d.revenue));

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Operations Overview</h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 2 }}>Friday, May 16 — Live dashboard</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Active Shipments", value: inTransit, icon: <Package size={20} />, color: C.blue, sub: `${SHIPMENTS.length} total` },
          { label: "Delayed", value: delayed, icon: <Warning size={20} />, color: C.danger, sub: "Action required" },
          { label: "Drivers on Route", value: DRIVERS.filter(d => d.status === "On Route").length, icon: <Truck size={20} />, color: C.orange, sub: `${DRIVERS.filter(d => d.status === "Available").length} available` },
          { label: "Week Revenue", value: `$${(totalRevenue / 1000).toFixed(0)}k`, icon: <CurrencyDollar size={20} />, color: C.success, sub: "+18% vs last week" },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 16, padding: 18, border: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: s.color }}>{s.icon}</span>
              </div>
              <span style={{ fontSize: 12, color: C.muted }}>{s.label}</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Revenue chart */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Weekly Revenue & Shipments</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130 }}>
            {WEEKLY_DATA.map(d => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 10, color: C.muted }}>{d.shipments}</span>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ width: "100%", height: Math.round((d.revenue / maxRev) * 100), background: C.orange, borderRadius: "4px 4px 0 0" }} />
                </div>
                <span style={{ fontSize: 10, color: C.muted }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live shipments */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Active Shipments</h3>
            <button onClick={() => setPage("shipments")} style={{ fontSize: 12, color: C.orange, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>All</button>
          </div>
          {SHIPMENTS.filter(s => s.status !== "Pending").slice(0, 4).map((s, i) => (
            <div key={s.id} style={{ padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontFamily: "monospace" }}>{s.id}</span>
                <Badge color={statusColors[s.status]}>{s.status}</Badge>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{s.origin} → {s.dest}</div>
              <div style={{ height: 4, background: C.border, borderRadius: 99 }}>
                <div style={{ width: `${s.progress}%`, height: "100%", background: s.status === "Delayed" ? C.danger : C.orange, borderRadius: 99, transition: "width .5s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SHIPMENTS LIST ───────────────────────────────────────────────────────────
function Shipments({ setPage, setSelectedShipment }: { setPage: (p: string) => void; setSelectedShipment: (s: typeof SHIPMENTS[0]) => void }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const statuses = ["All", "In Transit", "Out for Delivery", "Delivered", "Delayed", "Pending"];
  const filtered = SHIPMENTS.filter(s => {
    const q = search.toLowerCase();
    return (
      (s.id.toLowerCase().includes(q) || s.customer.toLowerCase().includes(q) || s.dest.toLowerCase().includes(q)) &&
      (filterStatus === "All" || s.status === filterStatus)
    );
  });

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Shipments</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{filtered.length} of {SHIPMENTS.length} shown</p>
        </div>
        <button onClick={() => setPage("new-shipment")} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.orange, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> New Shipment
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", flex: 1, minWidth: 200 }}>
          <MagnifyingGlass size={15} color={C.muted} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search ID, customer, destination..." style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.text, flex: 1 }} />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ padding: "8px 14px", borderRadius: 10, border: `1px solid ${filterStatus === s ? C.orange : C.border}`, background: filterStatus === s ? C.orange + "15" : C.card, color: filterStatus === s ? C.orange : C.muted, fontWeight: 600, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg }}>
              {["Tracking ID", "Customer", "Route", "Driver", "Weight", "Priority", "ETA", "Status", "Progress"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} onClick={() => { setSelectedShipment(s); setPage("shipment-detail"); }}
                style={{ borderTop: `1px solid ${C.border}`, cursor: "pointer", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "14px 14px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 800, color: C.orange }}>{s.id}</span>
                </td>
                <td style={{ padding: "14px 14px", fontSize: 13, fontWeight: 600, color: C.text }}>{s.customer}</td>
                <td style={{ padding: "14px 14px" }}>
                  <div style={{ fontSize: 12, color: C.text }}>{s.origin}</div>
                  <div style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}><ArrowRight size={10} />{s.dest}</div>
                </td>
                <td style={{ padding: "14px 14px", fontSize: 13, color: s.driver === "—" ? C.muted : C.text }}>{s.driver}</td>
                <td style={{ padding: "14px 14px", fontSize: 13, color: C.muted }}>{s.weight}</td>
                <td style={{ padding: "14px 14px" }}><Badge color={priorityColors[s.priority]}>{s.priority}</Badge></td>
                <td style={{ padding: "14px 14px", fontSize: 13, color: C.text }}>{s.eta}</td>
                <td style={{ padding: "14px 14px" }}><Badge color={statusColors[s.status]}>{s.status}</Badge></td>
                <td style={{ padding: "14px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 60, height: 5, background: C.border, borderRadius: 99 }}>
                      <div style={{ width: `${s.progress}%`, height: "100%", background: s.status === "Delayed" ? C.danger : C.orange, borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 11, color: C.muted }}>{s.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SHIPMENT DETAIL ─────────────────────────────────────────────────────────
function ShipmentDetail({ shipment, setPage }: { shipment: typeof SHIPMENTS[0]; setPage: (p: string) => void }) {
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <button onClick={() => setPage("shipments")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.orange, background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
        <ArrowLeft size={15} /> Back to Shipments
      </button>

      <div style={{ background: `linear-gradient(135deg, ${C.slate}, ${C.slateLight})`, borderRadius: 20, padding: 28, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "#ffffff66", marginBottom: 6 }}>TRACKING ID</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", fontFamily: "monospace" }}>{shipment.id}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <Badge color={statusColors[shipment.status]}>{shipment.status}</Badge>
              <Badge color={priorityColors[shipment.priority]}>{shipment.priority.toUpperCase()}</Badge>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#ffffff66" }}>ETA</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.orange }}>{shipment.eta}</div>
            <div style={{ fontSize: 12, color: "#ffffff66", marginTop: 4 }}>Shipment value: ${shipment.value.toLocaleString()}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#ffffff66" }}>{shipment.origin}</span>
            <span style={{ fontSize: 11, color: "#ffffff66" }}>{shipment.dest}</span>
          </div>
          <div style={{ height: 8, background: "#ffffff22", borderRadius: 99 }}>
            <div style={{ width: `${shipment.progress}%`, height: "100%", background: shipment.status === "Delayed" ? C.danger : C.orange, borderRadius: 99, transition: "width 1s", position: "relative" }}>
              <div style={{ position: "absolute", right: -8, top: -6, width: 20, height: 20, borderRadius: "50%", background: C.orange, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Truck size={10} color="#fff" weight="fill" />
              </div>
            </div>
          </div>
          <div style={{ textAlign: "right", marginTop: 10, fontSize: 16, fontWeight: 800, color: "#fff" }}>{shipment.progress}% complete</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Shipment Details</h3>
            {[
              ["Customer", shipment.customer],
              ["Weight", shipment.weight],
              ["Driver", shipment.driver],
              ["Vehicle", shipment.truck],
              ["Origin", shipment.origin],
              ["Destination", shipment.dest],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking timeline */}
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>Tracking Timeline</h3>
          {shipment.tracking.map((event, i) => {
            const isLast = i === shipment.tracking.length - 1;
            return (
              <div key={i} style={{ display: "flex", gap: 14, paddingBottom: i < shipment.tracking.length - 1 ? 16 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: isLast ? C.orange : C.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {isLast ? <Circle size={10} color="#fff" weight="fill" /> : <Check size={10} color="#fff" weight="bold" />}
                  </div>
                  {i < shipment.tracking.length - 1 && <div style={{ width: 2, flex: 1, background: C.border, marginTop: 4 }} />}
                </div>
                <div style={{ paddingBottom: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: isLast ? 700 : 500, color: isLast ? C.text : C.muted }}>{event}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>May {16 - (shipment.tracking.length - 1 - i)}, 2026</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── NEW SHIPMENT ─────────────────────────────────────────────────────────────
function NewShipment({ setPage }: { setPage: (p: string) => void }) {
  const [step, setStep] = useState(1);
  const steps = ["Sender & Recipient", "Package Details", "Service & Pricing", "Confirm"];

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>New Shipment</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>Create a new shipping order</p>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: i + 1 <= step ? C.orange : C.border, display: "flex", alignItems: "center", justifyContent: "center", color: i + 1 <= step ? "#fff" : C.muted, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>
                {i + 1 < step ? <Check size={16} weight="bold" color="#fff" /> : i + 1}
              </div>
              <span style={{ fontSize: 12, fontWeight: i + 1 === step ? 700 : 500, color: i + 1 <= step ? C.orange : C.muted, textAlign: "center" }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i + 1 < step ? C.orange : C.border, maxWidth: 60, margin: "0 4px", marginTop: -18 }} />}
          </div>
        ))}
      </div>

      <div style={{ background: C.card, borderRadius: 20, padding: 32, border: `1px solid ${C.border}`, maxWidth: 640 }}>
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[{ title: "Sender Information", fields: ["Company / Name", "Address", "City, State, ZIP", "Phone", "Email"] }, { title: "Recipient Information", fields: ["Company / Name", "Address", "City, State, ZIP", "Phone", "Email"] }].map(section => (
              <div key={section.title}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>{section.title}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {section.fields.map(f => (
                    <div key={f} style={{ gridColumn: f === "Address" ? "1 / -1" : "auto" }}>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>{f}</label>
                      <input placeholder={f} style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Package Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {["Weight (kg)", "Length (cm)", "Width (cm)", "Height (cm)", "Number of Packages", "Declared Value ($)"].map(f => (
                <div key={f}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 5, textTransform: "uppercase" }}>{f}</label>
                  <input type="number" placeholder="0" style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8, textTransform: "uppercase" }}>Package Contents</label>
              <select style={{ width: "100%", padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 13, color: C.text, outline: "none" }}>
                <option>General Merchandise</option>
                <option>Electronics</option>
                <option>Fragile Items</option>
                <option>Documents</option>
                <option>Perishables</option>
                <option>Hazardous Materials</option>
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>Service Options</h3>
            {[
              { label: "Economy", time: "5–7 business days", price: "$12.40", color: C.muted },
              { label: "Standard", time: "3–5 business days", price: "$24.80", color: C.blue },
              { label: "Express", time: "1–2 business days", price: "$48.60", color: C.orange },
              { label: "Overnight", time: "Next business day", price: "$89.00", color: C.danger },
            ].map((opt, i) => (
              <label key={opt.label} style={{ display: "flex", alignItems: "center", gap: 14, padding: 16, background: i === 1 ? C.orange + "08" : C.bg, border: `2px solid ${i === 1 ? C.orange : C.border}`, borderRadius: 14, cursor: "pointer" }}>
                <input type="radio" name="service" defaultChecked={i === 1} style={{ accentColor: C.orange }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{opt.label}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{opt.time}</div>
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: opt.color }}>{opt.price}</span>
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.success + "20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <CheckCircle size={40} color={C.success} weight="fill" />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 8 }}>Shipment Created!</h3>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>Tracking ID: <strong style={{ color: C.orange, fontFamily: "monospace" }}>SHP-20853</strong></p>
            <button onClick={() => setPage("shipments")} style={{ padding: "12px 32px", background: C.orange, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>View All Shipments</button>
          </div>
        )}

        {step < 4 && (
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 1 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: "12px 0", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, cursor: "pointer", fontSize: 14, color: C.muted, fontWeight: 600 }}>Back</button>}
            <button onClick={() => setStep(s => s + 1)} style={{ flex: 2, padding: "12px 0", background: C.orange, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
              {step === 3 ? "Create Shipment" : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── DRIVERS ─────────────────────────────────────────────────────────────────
function DriversPage() {
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Drivers</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{DRIVERS.length} drivers · {DRIVERS.filter(d => d.status === "On Route").length} on route</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", background: C.orange, color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
          <Plus size={15} /> Add Driver
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {DRIVERS.map(d => {
          const statusColor = d.status === "On Route" ? C.success : d.status === "Delayed" ? C.danger : C.muted;
          return (
            <div key={d.id} style={{ background: C.card, borderRadius: 16, padding: 22, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <Avatar initials={d.avatar} size={48} color={statusColor} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{d.name}</div>
                  <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                    <Badge color={statusColor}>{d.status}</Badge>
                    <Badge color={C.muted}>{d.truck}</Badge>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.warning }}>★ {d.rating}</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div style={{ background: C.bg, borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>{d.deliveries.toLocaleString()}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>Deliveries</div>
                </div>
                <div style={{ background: C.bg, borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.success }}>{d.onTime}%</div>
                  <div style={{ fontSize: 10, color: C.muted }}>On-Time</div>
                </div>
                <div style={{ background: C.bg, borderRadius: 8, padding: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: C.orange }}>{d.license}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>License</div>
                </div>
              </div>
              {d.status === "On Route" && (
                <div style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}>
                  <NavigationArrow size={12} />{d.route} · Currently at {d.location}
                </div>
              )}
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                <Phone size={12} />{d.phone}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PACKAGE TRACKER ─────────────────────────────────────────────────────────
function PackageTracker({ setPage, setSelectedShipment }: { setPage: (p: string) => void; setSelectedShipment: (s: typeof SHIPMENTS[0]) => void }) {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<typeof SHIPMENTS[0] | null>(null);
  const search = () => {
    const result = SHIPMENTS.find(s => s.id.toLowerCase() === query.toLowerCase().trim());
    setFound(result || null);
  };

  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Package Tracker</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>Track any shipment by ID</p>
      </div>

      <div style={{ maxWidth: 560 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: C.card, border: `2px solid ${query ? C.orange : C.border}`, borderRadius: 12, padding: "12px 16px" }}>
            <Hash size={18} color={C.orange} />
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && search()} placeholder="Enter tracking ID (e.g. SHP-20847)" style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, color: C.text, flex: 1, fontFamily: "monospace" }} />
          </div>
          <button onClick={search} style={{ padding: "12px 24px", background: C.orange, color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>Track</button>
        </div>

        {/* Quick picks */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Recent Shipments:</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SHIPMENTS.slice(0, 4).map(s => (
              <button key={s.id} onClick={() => { setQuery(s.id); setFound(s); }}
                style={{ padding: "6px 12px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "monospace", color: C.orange, fontWeight: 700 }}>
                {s.id}
              </button>
            ))}
          </div>
        </div>

        {found && (
          <div style={{ background: C.card, borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <div style={{ background: C.slate, padding: "20px 24px" }}>
              <div style={{ fontSize: 12, color: "#ffffff66", marginBottom: 4 }}>TRACKING RESULT</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "monospace" }}>{found.id}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <Badge color={statusColors[found.status]}>{found.status}</Badge>
              </div>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div><div style={{ fontSize: 11, color: C.muted }}>FROM</div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{found.origin}</div></div>
                <ArrowRight size={20} color={C.orange} />
                <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: C.muted }}>TO</div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{found.dest}</div></div>
              </div>
              <div style={{ height: 8, background: C.border, borderRadius: 99, marginBottom: 16 }}>
                <div style={{ width: `${found.progress}%`, height: "100%", background: found.status === "Delayed" ? C.danger : C.orange, borderRadius: 99 }} />
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Customer: <strong style={{ color: C.text }}>{found.customer}</strong> · ETA: <strong style={{ color: C.orange }}>{found.eta}</strong></div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Latest Update</div>
                <div style={{ fontSize: 13, color: C.muted }}>{found.tracking[found.tracking.length - 1]}</div>
              </div>
              <button onClick={() => { setSelectedShipment(found); setPage("shipment-detail"); }} style={{ marginTop: 16, width: "100%", padding: "10px 0", background: C.orange, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                Full Tracking Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── FLEET ───────────────────────────────────────────────────────────────────
function Fleet() {
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Fleet Management</h1>
          <p style={{ color: C.muted, fontSize: 13 }}>{FLEET.length} vehicles · {FLEET.filter(f => f.status === "active").length} active</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {FLEET.map(v => {
          const statusColor = v.status === "active" ? C.success : v.status === "delayed" ? C.danger : C.muted;
          return (
            <div key={v.id} style={{ background: C.card, borderRadius: 16, padding: 22, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.orange, fontFamily: "monospace" }}>{v.id}</div>
                  <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{v.make}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{v.type} · {v.year}</div>
                </div>
                <Badge color={statusColor}>{v.status}</Badge>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Driver", v.driver], ["Mileage", v.mileage], ["Next Service", v.nextService]].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: C.muted }}>{label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>{value}</span>
                  </div>
                ))}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: C.muted }}>Fuel</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: v.fuel < 30 ? C.danger : v.fuel < 50 ? C.warning : C.success }}>{v.fuel}%</span>
                  </div>
                  <div style={{ height: 5, background: C.border, borderRadius: 99 }}>
                    <div style={{ width: `${v.fuel}%`, height: "100%", background: v.fuel < 30 ? C.danger : v.fuel < 50 ? C.warning : C.success, borderRadius: 99 }} />
                  </div>
                </div>
                {v.load > 0 && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: C.muted }}>Cargo Load</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: C.orange }}>{v.load}%</span>
                    </div>
                    <div style={{ height: 5, background: C.border, borderRadius: 99 }}>
                      <div style={{ width: `${v.load}%`, height: "100%", background: C.orange, borderRadius: 99 }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── REPORTS ─────────────────────────────────────────────────────────────────
function Reports() {
  const maxShipments = Math.max(...WEEKLY_DATA.map(d => d.shipments));
  return (
    <div style={{ padding: 28, overflowY: "auto", height: "100%" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>Reports & Analytics</h1>
        <p style={{ color: C.muted, fontSize: 13 }}>Week of May 12–18, 2026</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Revenue", value: `$${WEEKLY_DATA.reduce((s, d) => s + d.revenue, 0).toLocaleString()}`, trend: "+18%", up: true },
          { label: "Shipments", value: WEEKLY_DATA.reduce((s, d) => s + d.shipments, 0), trend: "+12%", up: true },
          { label: "On-Time Rate", value: `${Math.round(WEEKLY_DATA.reduce((s, d) => s + d.onTime, 0) / WEEKLY_DATA.length)}%`, trend: "-1%", up: false },
        ].map(s => (
          <div key={s.label} style={{ background: C.card, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.text }}>{s.value}</div>
            <div style={{ fontSize: 13, color: C.muted }}>{s.label}</div>
            <div style={{ fontSize: 13, color: s.up ? C.success : C.danger, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
              {s.up ? <TrendUp size={14} /> : <TrendDown size={14} />}{s.trend} vs last week
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 20 }}>Shipments per Day</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
            {WEEKLY_DATA.map(d => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{d.shipments}</span>
                <div style={{ width: "100%", height: Math.round((d.shipments / maxShipments) * 120), background: C.orange, borderRadius: "6px 6px 0 0" }} />
                <span style={{ fontSize: 11, color: C.muted }}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.card, borderRadius: 16, padding: 24, border: `1px solid ${C.border}` }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 16 }}>Status Breakdown</h3>
          {[
            { label: "In Transit", count: SHIPMENTS.filter(s => s.status === "In Transit").length, color: C.blue },
            { label: "Out for Delivery", count: SHIPMENTS.filter(s => s.status === "Out for Delivery").length, color: C.orange },
            { label: "Delivered", count: SHIPMENTS.filter(s => s.status === "Delivered").length, color: C.success },
            { label: "Delayed", count: SHIPMENTS.filter(s => s.status === "Delayed").length, color: C.danger },
            { label: "Pending", count: SHIPMENTS.filter(s => s.status === "Pending").length, color: C.muted },
          ].map(s => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: C.text, flex: 1 }}>{s.label}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.count}</span>
              <div style={{ width: 60, height: 4, background: C.border, borderRadius: 99 }}>
                <div style={{ width: `${(s.count / SHIPMENTS.length) * 100}%`, height: "100%", background: s.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function LogisticsDemo() {
  const [page, setPage] = useState("dashboard");
  const [selectedShipment, setSelectedShipment] = useState(SHIPMENTS[0]);

  const renderPage = () => {
    switch (page) {
      case "dashboard":       return <Dashboard setPage={setPage} />;
      case "shipments":       return <Shipments setPage={setPage} setSelectedShipment={setSelectedShipment} />;
      case "shipment-detail": return <ShipmentDetail shipment={selectedShipment} setPage={setPage} />;
      case "new-shipment":    return <NewShipment setPage={setPage} />;
      case "drivers":         return <DriversPage />;
      case "tracker":         return <PackageTracker setPage={setPage} setSelectedShipment={setSelectedShipment} />;
      case "fleet":           return <Fleet />;
      case "reports":         return <Reports />;
      default:                return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", background: C.bg, height: "100vh", display: "flex", overflow: "hidden" }}>
      <Sidebar page={page} setPage={setPage} />
      <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {renderPage()}
      </main>
    </div>
  );
}
