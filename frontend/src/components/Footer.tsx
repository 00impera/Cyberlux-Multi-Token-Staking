import React from "react";

const NAV_LINKS = [
  { label: "MonadVision", url: "https://monadvision.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b" },
  { label: "SocialScan",  url: "https://monad.socialscan.io/address/0xe96462daa04464036b24f48b2c43d47f9072c34b" },
  { label: "MonadScan",   url: "https://monadscan.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b" },
  { label: "Telegram",    url: "https://t.me/MultiTokenStaking_Bot" },
  { label: "OpenSea",     url: "https://opensea.io/SUPERRARECOINS" },
  { label: "GitHub",      url: "https://github.com/00impera/Cyberlux-Multi-Token-Staking" },
];

const SECURITY_BADGES = [
  { label: "Certik",    color: "#f7931a", url: "https://certik.com" },
  { label: "Hacken",    color: "#39FF14", url: "https://hacken.io" },
  { label: "Sherlock",  color: "#00ffff", url: "https://sherlock.xyz" },
  { label: "Code4rena", color: "#8b5cf6", url: "https://code4rena.com" },
  { label: "Spearbit",  color: "#ff00ff", url: "https://spearbit.com" },
  { label: "Immunefi",  color: "#f59e0b", url: "https://immunefi.com" },
  { label: "MonadScan", color: "#39FF14", url: "https://monadscan.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b" },
  { label: "Slither",   color: "#00eaff", url: "https://github.com/crytic/slither" },
  { label: "MythX",     color: "#8b5cf6", url: "https://mythx.io" },
  { label: "Aderyn",    color: "#39FF14", url: "https://github.com/Cyfrin/aderyn" },
];

const GIF_URL = "https://raw.githubusercontent.com/00impera/Cyberlux-Multi-Token-Staking/9517371315835ca1b8a1a3bf5a2478a306aaef30/cyberlux_bot.gif";

export default function Footer() {
  return (
    <footer style={{ position:"relative", zIndex:2, borderTop:"1px solid rgba(139,92,246,0.2)", background:"rgba(10,5,20,0.98)" }}>
      <div style={{ borderBottom:"1px solid rgba(139,92,246,0.12)", padding:"20px 32px" }}>
        <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(255,255,255,0.25)", textAlign:"center", marginBottom:14 }}>
          Security Audit &amp; Static Analysis
        </p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
          {SECURITY_BADGES.map(b => (
            <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer"
              style={{ textDecoration:"none", padding:"5px 12px", background:"rgba(255,255,255,0.03)", border:"1px solid "+b.color+"33", borderRadius:20, transition:"all 0.2s", fontFamily:"'Share Tech Mono',monospace", fontSize:10, color:b.color, letterSpacing:1 }}
              onMouseEnter={e=>{ const el=e.currentTarget; el.style.background=b.color+"15"; el.style.borderColor=b.color+"77"; }}
              onMouseLeave={e=>{ const el=e.currentTarget; el.style.background="rgba(255,255,255,0.03)"; el.style.borderColor=b.color+"33"; }}
            >{b.label}</a>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 32px 32px" }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <img src={GIF_URL} alt="Cyberlux Bot" style={{ height:90, width:"auto", borderRadius:10, marginBottom:16, display:"inline-block" }} />
          <div style={{ fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:900, letterSpacing:4, color:"#ffffff", textShadow:"0 0 20px rgba(139,92,246,0.6)", marginBottom:8 }}>
            CYBERLUX STATION
          </div>
          <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:2 }}>
            Multi-Token Staking + NFT Cards on Monad Mainnet
          </p>
        </div>
        <nav style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px 24px", marginBottom:32 }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.45)", letterSpacing:1, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="#ffffff")}
              onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.45)")}
            >{l.label}</a>
          ))}
        </nav>
        <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(139,92,246,0.4),transparent)", marginBottom:24 }} />
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:16 }}>
          <p style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.2)", letterSpacing:1 }}>
            &copy; 2025 Cyberlux Protocol v1.0.0 — 0xE96462daA04464036b24f48B2c43d47f9072c34B
          </p>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <a href="https://t.me/MultiTokenStaking_Bot" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", textDecoration:"none", fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.55)", transition:"all 0.2s" }}
              onMouseEnter={e=>{ const el=e.currentTarget; el.style.background="rgba(139,92,246,0.2)"; el.style.borderColor="rgba(139,92,246,0.6)"; }}
              onMouseLeave={e=>{ const el=e.currentTarget; el.style.background="rgba(255,255,255,0.05)"; el.style.borderColor="rgba(255,255,255,0.1)"; }}
            >TG</a>
            <a href="https://opensea.io/SUPERRARECOINS" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", textDecoration:"none", fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.55)", transition:"all 0.2s" }}
              onMouseEnter={e=>{ const el=e.currentTarget; el.style.background="rgba(139,92,246,0.2)"; el.style.borderColor="rgba(139,92,246,0.6)"; }}
              onMouseLeave={e=>{ const el=e.currentTarget; el.style.background="rgba(255,255,255,0.05)"; el.style.borderColor="rgba(255,255,255,0.1)"; }}
            >OS</a>
            <a href="https://github.com/00impera/Cyberlux-Multi-Token-Staking" target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", textDecoration:"none", fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:"rgba(255,255,255,0.55)", transition:"all 0.2s" }}
              onMouseEnter={e=>{ const el=e.currentTarget; el.style.background="rgba(139,92,246,0.2)"; el.style.borderColor="rgba(139,92,246,0.6)"; }}
              onMouseLeave={e=>{ const el=e.currentTarget; el.style.background="rgba(255,255,255,0.05)"; el.style.borderColor="rgba(255,255,255,0.1)"; }}
            >GH</a>
            <a href="https://monadscan.com/address/0x592B35c8917eD36c39Ef73D0F5e92B0173560b2e" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration:"none", padding:"6px 16px", background:"linear-gradient(135deg,#f59e0b,#ef4444)", borderRadius:20, fontFamily:"'Orbitron',monospace", fontSize:10, fontWeight:700, color:"#000", letterSpacing:1, transition:"opacity 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.opacity="0.8")}
              onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
            >DONATE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
