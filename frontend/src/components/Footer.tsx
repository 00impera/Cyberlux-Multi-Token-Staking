import React from "react";

const FOOTER_LINKS = [
  { label:"MonadVision", url:"https://monadvision.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b",  color:"#00ffff" },
  { label:"SocialScan",  url:"https://monad.socialscan.io/address/0xe96462daa04464036b24f48b2c43d47f9072c34b",    color:"#8b5cf6" },
  { label:"MonadScan",   url:"https://monadscan.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b",     color:"#ff00ff" },
  { label:"Telegram",    url:"https://t.me/MultiTokenStaking_Bot",                                          color:"#00ffff" },
  { label:"OpenSea",     url:"https://opensea.io/SUPERRARECOINS",                                           color:"#2081e2" },
];

const SECURITY_BADGES = [
  { label:"Certik",      color:"#f7931a", url:"https://certik.com" },
  { label:"Hacken",      color:"#39FF14", url:"https://hacken.io" },
  { label:"Sherlock",    color:"#00ffff", url:"https://sherlock.xyz" },
  { label:"Code4rena",   color:"#8b5cf6", url:"https://code4rena.com" },
  { label:"Spearbit",    color:"#ff00ff", url:"https://spearbit.com" },
  { label:"Immunefi",    color:"#f59e0b", url:"https://immunefi.com" },
  { label:"MonadScan ✅", color:"#39FF14", url:"https://monadscan.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b" },
  { label:"Slither",     color:"#00eaff", url:"https://github.com/crytic/slither" },
  { label:"MythX",       color:"#8b5cf6", url:"https://mythx.io" },
  { label:"Aderyn",      color:"#39FF14", url:"https://github.com/Cyfrin/aderyn" },
];

export default function Footer() {
  return (
    <footer style={{ position:"relative", zIndex:2, borderTop:"1px solid rgba(139,92,246,0.2)", background:"rgba(10,5,20,0.95)" }}>

      {/* Security Banner */}
      <div style={{ borderBottom:"1px solid rgba(139,92,246,0.15)", padding:"16px 32px" }}>
        <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.3)", marginBottom:12, textAlign:"center" }}>
          Security Audit &amp; Static Analysis
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
          {SECURITY_BADGES.map(b => (
            <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div
                style={{ display:"flex", alignItems:"center", gap:6, padding:"6px 12px", background:"rgba(255,255,255,0.03)", border:`1px solid ${b.color}33`, borderRadius:20, cursor:"pointer", transition:"all 0.2s" }}
                onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.background=`${b.color}15`; d.style.borderColor=`${b.color}77`; }}
                onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.background="rgba(255,255,255,0.03)"; d.style.borderColor=`${b.color}33`; }}
              >
                <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:b.color, letterSpacing:1 }}>{b.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Links */}
      <div style={{ padding:"16px 32px", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <div style={{ fontFamily:"'Orbitron',monospace", fontSize:10, fontWeight:700, letterSpacing:2, color:"rgba(255,255,255,0.3)" }}>
          CONTRACT • TRANSACTIONS • CYBERLUX STATION
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center" }}>
          {FOOTER_LINKS.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <div
                style={{ padding:"7px 14px", background:"transparent", border:`1px solid ${l.color}44`, borderRadius:6, fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:l.color, cursor:"pointer", transition:"all 0.2s", letterSpacing:1 }}
                onMouseEnter={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.background=`${l.color}15`; d.style.borderColor=l.color; }}
                onMouseLeave={e=>{ const d=e.currentTarget as HTMLDivElement; d.style.background="transparent"; d.style.borderColor=`${l.color}44`; }}
              >
                {l.label}
              </div>
            </a>
          ))}

          {/* Donate button */}
          <a href="https://monadscan.com/address/0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
            <div
              style={{ padding:"7px 16px", background:"linear-gradient(135deg,#f59e0b,#ef4444)", border:"none", borderRadius:6, fontFamily:"'Orbitron',monospace", fontSize:10, fontWeight:700, color:"#000", cursor:"pointer", letterSpacing:1, transition:"opacity 0.2s" }}
              onMouseEnter={e=>(e.currentTarget as HTMLDivElement).style.opacity="0.8"}
              onMouseLeave={e=>(e.currentTarget as HTMLDivElement).style.opacity="1"}
            >
              DONATE ☕️
            </div>
          </a>
        </div>

        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"#8b5cf6", opacity:0.6, letterSpacing:2 }}>
            CYBERLUX PROTOCOL v1.0.0 — MONAD MAINNET
          </span>
          <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"#ff00ff", opacity:0.4 }}>
            0xE96462daA04464036b24f48B2c43d47f9072c34B
          </span>
        </div>
      </div>

    </footer>
  );
}
