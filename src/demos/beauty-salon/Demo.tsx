"use client";

import { useState } from "react";
import { Scissors, Clock, User, Sparkles, Heart } from "lucide-react";

const C = {
  bg: "#fdf4ff",
  paper: "#ffffff",
  ink: "#3a0a3a",
  muted: "#7a4a7a",
  primary: "#a21caf",
  accent: "#e879f9",
  border: "#f0d3f0",
};

const SERVICES = [
  { name: "Signature Cut & Style", price: 65, duration: "60 min", stylist: "Nora" },
  { name: "Balayage · Full", price: 220, duration: "150 min", stylist: "Mara" },
  { name: "Color Refresh", price: 95, duration: "75 min", stylist: "Mara" },
  { name: "Bridal Trial", price: 140, duration: "90 min", stylist: "Nora" },
  { name: "Express Blowout", price: 45, duration: "30 min", stylist: "Liv" },
  { name: "Keratin Smoothing", price: 280, duration: "180 min", stylist: "Mara" },
];

const SLOTS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function BeautySalonDemo() {
  const [chosen, setChosen] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <div style={{ background: C.bg, color: C.ink, minHeight: "100vh", fontFamily: "ui-sans-serif, system-ui" }}>
      <header style={{ background: C.paper, padding: "20px 32px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: C.primary, borderRadius: 12, display: "grid", placeItems: "center" }}>
            <Scissors style={{ width: 20, height: 20, color: "white" }} />
          </div>
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 20 }}>Maison Mira</div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>Hair · Skin · Mood</div>
          </div>
        </div>
        <button style={{ background: C.primary, color: "white", border: "none", padding: "10px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Sign in
        </button>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
        <section style={{ textAlign: "center", padding: "40px 0" }}>
          <span style={{ fontSize: 11, color: C.primary, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
            ✿ Spring slots open
          </span>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 48, lineHeight: 1.05, margin: "12px auto", maxWidth: 600 }}>
            Two stylists, one mirror, your best hair day.
          </h1>
          <p style={{ color: C.muted, maxWidth: 540, margin: "0 auto" }}>
            Pick a service. Pick a time. We'll text you the directions.
          </p>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
              Choose a service
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {SERVICES.map((s) => {
                const active = chosen === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={() => setChosen(s.name)}
                    style={{
                      textAlign: "left",
                      background: active ? C.primary : C.paper,
                      color: active ? "white" : C.ink,
                      border: `1px solid ${active ? C.primary : C.border}`,
                      borderRadius: 14,
                      padding: 16,
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{s.name}</span>
                      <span style={{ fontWeight: 800, fontSize: 17 }}>${s.price}</span>
                    </div>
                    <div style={{ marginTop: 8, display: "flex", gap: 12, fontSize: 12, opacity: active ? 0.9 : 0.7 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Clock style={{ width: 12, height: 12 }} /> {s.duration}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <User style={{ width: 12, height: 12 }} /> with {s.stylist}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside style={{ background: C.paper, border: `1px solid ${C.border}`, borderRadius: 16, padding: 22, position: "sticky", top: 24, alignSelf: "start" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700 }}>Your booking</h2>
            <div style={{ marginTop: 12, padding: 14, background: C.bg, borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Service</div>
              <div style={{ marginTop: 4, fontWeight: 600 }}>{chosen ?? "Choose a service →"}</div>
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>
                Saturday · May 22
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                {SLOTS.map((s) => {
                  const taken = ["10:00", "13:00"].includes(s);
                  const active = time === s;
                  return (
                    <button
                      key={s}
                      disabled={taken}
                      onClick={() => setTime(s)}
                      style={{
                        padding: "8px 4px",
                        borderRadius: 8,
                        border: `1px solid ${active ? C.primary : C.border}`,
                        background: taken ? C.bg : active ? C.primary : C.paper,
                        color: taken ? C.muted : active ? "white" : C.ink,
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: taken ? "not-allowed" : "pointer",
                        textDecoration: taken ? "line-through" : "none",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              disabled={!chosen || !time}
              style={{
                marginTop: 22,
                width: "100%",
                padding: 12,
                background: !chosen || !time ? C.border : C.primary,
                color: !chosen || !time ? C.muted : "white",
                border: "none",
                borderRadius: 9999,
                fontWeight: 700,
                cursor: !chosen || !time ? "not-allowed" : "pointer",
              }}
            >
              <Sparkles style={{ width: 14, height: 14, display: "inline", marginRight: 6, verticalAlign: -2 }} />
              Confirm appointment
            </button>
            <p style={{ marginTop: 10, fontSize: 11, color: C.muted, textAlign: "center" }}>
              <Heart style={{ width: 11, height: 11, display: "inline", marginRight: 4, color: C.accent, fill: C.accent, verticalAlign: -1 }} />
              No-card-required. Confirm by SMS.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
}
