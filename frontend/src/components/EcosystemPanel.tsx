import React from "react";

const PROJECTS = [
  { name:"TimeVault",  desc:"Safe Deposit Time Lock",  url:"https://safedeposittimelock.pages.dev/",            color:"#00ffff", icon:"🔒" },
  { name:"Eurospace",  desc:"Eurocoin on Monad",        url:"https://d41e7edc.eurocoin-website.pages.dev/",      color:"#8b5cf6", icon:"🌍" },
  { name:"WINNOWIN",   desc:"Vault Game on Monad",      url:"https://winnowin.pages.dev/",                       color:"#ff00ff", icon:"🎮" },
  { name:"GEMSROCK",   desc:"Ice Box Rewards",          url:"https://gems-coin-nft.pages.dev/",                  color:"#39FF14", icon:"💎" },
];

export default function EcosystemPanel() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {PROJECTS.map(p => (
        <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
          <div
            style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.03)", border:`1px solid ${p.color}33`, borderRadius:10, padding:"14px 16px", cursor:"pointer", transition:"all 0.2s", position:"relative", overflow:"hidden" }}
            onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background=`${p.color}11`; d.style.borderColor=`${p.color}88`; }}
            onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background="rgba(255,255,255,0.03)"; d.style.borderColor=`${p.color}33`; }}
          >
            <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,${p.color},transparent)`, opacity:0.4 }} />
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:22, lineHeight:"1" }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily:"'Orbitron',monospace", fontSize:12, fontWeight:700, color:p.color, letterSpacing:2, textShadow:`0 0 8px ${p.color}66` }}>{p.name}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:3, letterSpacing:1 }}>{p.desc}</div>
              </div>
            </div>
            <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:p.color, opacity:0.7, letterSpacing:1 }}>OPEN ↗</div>
          </div>
        </a>
      ))}
    </div>
  );
}
