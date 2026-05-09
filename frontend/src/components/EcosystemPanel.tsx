import React from "react";

const PROJECTS = [
  { name: "TIMEVAULT", desc: "Safe Deposit Time Lock", url: "https://safedeposittimelock.pages.dev/",        color: "#00ffff", icon: "🔒" },
  { name: "EUROSPACE", desc: "Eurocoin on Monad",       url: "https://d41e7edc.eurocoin-website.pages.dev/", color: "#8b5cf6", icon: "🌍" },
  { name: "WINNOWIN",  desc: "Vault Game on Monad",     url: "https://winnowin.pages.dev/",                  color: "#ff00ff", icon: "🎮" },
  { name: "GEMSROCK",  desc: "Ice Box Rewards",         url: "https://gems-coin-nft.pages.dev/",             color: "#39FF14", icon: "💎" },
];

export default function EcosystemPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {PROJECTS.map((p) => (
        <a
          key={p.name}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "relative", display: "flex", alignItems: "center",
            justifyContent: "space-between", overflow: "hidden",
            borderRadius: 12, border: `1px solid ${p.color}33`,
            background: "rgba(255,255,255,0.03)", padding: "12px 16px",
            textDecoration: "none", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = `${p.color}11`; el.style.borderColor = `${p.color}88`; }}
          onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.03)"; el.style.borderColor = `${p.color}33`; }}
        >
          <div style={{ position: "absolute", left: "-4rem", top: "50%", transform: "translateY(-50%)", width: 120, height: 60, background: `radial-gradient(ellipse, ${p.color}55 0%, transparent 70%)`, filter: "blur(18px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${p.color},transparent)`, opacity: 0.5 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
            <span style={{ fontSize: 20 }}>{p.icon}</span>
            <div>
              <div style={{ fontFamily: "Orbitron, monospace", fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 2, textShadow: `0 0 8px ${p.color}66` }}>{p.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2, letterSpacing: 1 }}>{p.desc}</div>
            </div>
          </div>
          <div style={{ position: "relative", flexShrink: 0, borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", padding: "4px 14px", fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: p.color, letterSpacing: 1 }}>OPEN →</div>
        </a>
      ))}
    </div>
  );
}