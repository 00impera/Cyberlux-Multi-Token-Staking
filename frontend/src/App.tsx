import { useState, useEffect, useCallback } from "react";
import { ConnectButton } from "thirdweb/react";
import { thirdwebClient, monadMainnet } from "./lib/contract";
import StakePanel from "./components/StakePanel";
import { useIsMobile } from "./hooks/useIsMobile";
import NFTCard from "./components/NFTCard";
import BuyPanel from "./components/BuyPanel";
import EcosystemPanel from "./components/EcosystemPanel";
import Footer from "./components/Footer";
import SwapPanel from "./components/SwapPanel";

interface Toast { id: number; msg: string; err: boolean; }

export default function App() {
  const [toasts, setToasts]   = useState<Toast[]>([]);
  const [viewId, setViewId]   = useState<number | null>(null);
  const [inputId, setInputId] = useState("");
  const [prices, setPrices]   = useState<Record<string,number>>({});
  const [mainTab, setMainTab] = useState<"stake"|"buy"|"swap">("stake");

  const addToast = useCallback((msg: string, err = false) => {
    const id = Date.now();
    setToasts(p => [...p, { id, msg, err }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000);
  }, []);

  useEffect(() => {
    fetch("/api/oracle-prices")
      .then(r => r.json())
      .then(d => d.prices && setPrices(d.prices))
      .catch(() => {});
  }, []);

  const fmt = (n?: number) =>
    n == null ? "—" : n > 1000
      ? `$${n.toLocaleString("en",{maximumFractionDigits:0})}`
      : `$${n.toFixed(4)}`;

  const isMobile = useIsMobile();
  const panel: React.CSSProperties = {
    background: "rgba(15,5,24,0.85)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 0 30px rgba(139,92,246,0.08), inset 0 1px 0 rgba(255,0,255,0.05)",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(12px)",
  };

  const panelTitle: React.CSSProperties = {
    fontFamily: "'Orbitron',monospace",
    fontSize: 12, fontWeight: 700,
    letterSpacing: 3, textTransform: "uppercase",
    color: "#ff00ff",
    marginBottom: 20,
    display: "flex", alignItems: "center", gap: 10,
    textShadow: "0 0 10px rgba(255,0,255,0.5)",
  };

  const accentBar: React.CSSProperties = {
    width: 3, height: 16,
    background: "linear-gradient(180deg,#ff00ff,#00ffff)",
    borderRadius: 2,
    boxShadow: "0 0 8px #ff00ff",
  };

  const topLine: React.CSSProperties = {
    position: "absolute",
    top: 0, left: 0, right: 0, height: 1,
    background: "linear-gradient(90deg,transparent,#ff00ff,#00ffff,transparent)",
    opacity: 0.5,
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", position:"relative" }}>

      {/* HEADER */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 32px",
        borderBottom:"1px solid rgba(139,92,246,0.3)",
        background:"rgba(15,5,24,0.9)",
        backdropFilter:"blur(16px)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <img src="https://raw.githubusercontent.com/00impera/Cyberlux-Multi-Token-Staking/9517371315835ca1b8a1a3bf5a2478a306aaef30/cyberlux_bot.gif" alt="Cyberlux" style={{ height:42, width:42, borderRadius:8, objectFit:"cover", flexShrink:0 }} />
          <div>
            <div style={{
              fontFamily:"'Orbitron',monospace", fontSize:18, fontWeight:900,
              background:"linear-gradient(90deg,#ff00ff,#00ffff,#8b5cf6,#ff1493,#ff00ff)",
              backgroundSize:"400%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text",
              animation:"shimmer 6s linear infinite",
              letterSpacing:3,
            }}>CYBERLUX</div>
            <div style={{
              fontFamily:"'Share Tech Mono',monospace", fontSize:9,
              color:"#00ffff", letterSpacing:4, opacity:0.8,
            }}>MULTI TOKEN STAKING</div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{
            display:"flex", alignItems:"center", gap:6,
            background:"rgba(0,255,255,0.08)",
            border:"1px solid rgba(0,255,255,0.3)",
            padding:"6px 14px", borderRadius:6,
            fontFamily:"'Share Tech Mono',monospace", fontSize:10,
            color:"#00ffff",
          }}>
            <div style={{
              width:7, height:7, borderRadius:"50%",
              background:"#00ffff", boxShadow:"0 0 8px #00ffff",
              animation:"blink 1.5s ease-in-out infinite",
            }} />
            MONAD MAINNET
          </div>
          <ConnectButton client={thirdwebClient} chain={monadMainnet} />
        </div>
      </header>

      {/* STATS BAR */}
      <div style={{ position:"relative", zIndex:2, background:"rgba(10,5,20,0.85)", borderBottom:"1px solid rgba(139,92,246,0.25)" }}>
        <dl style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", margin:0, padding:0 }}>
          {([
            ["BTC",      fmt(prices.BTC),  "#f7931a", "+2.4%"],
            ["ETH",      fmt(prices.ETH),  "#627eea", "+1.8%"],
            ["MON",      fmt(prices.MON),  "#00ffff", "+5.2%"],
            ["USDC",     fmt(prices.USDC), "#2775ca", "stable"],
            ["Contract", "0xE964…4B", "#8b5cf6", "verified ✓"],
            ["Chain ID", "143",            "#ff00ff", "monad"],
          ] as [string,string,string,string][]).map(([label,val,color,sub], i) => (
            <div key={label} style={{ position:"relative", padding:"16px 20px", overflow:"hidden", borderRight: i < 5 ? "1px solid rgba(139,92,246,0.15)" : "none" }}>
              <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 20% 50%, " + color + "09 0%, transparent 70%)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:"linear-gradient(90deg,transparent," + color + "55,transparent)" }} />
              <dt style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:color, opacity:0.55, marginBottom:6 }}>{label}</dt>
              <dd style={{ margin:0 }}>
                <div style={{ fontFamily:"'Orbitron',monospace", fontSize:15, fontWeight:700, color:color, letterSpacing:1 }}>{val}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:9, color:color, opacity:0.4, marginTop:3 }}>{sub}</div>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* MAIN GRID */}
      <div style={{
        position:"relative", zIndex:2,
        display:"grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 360px",
        gap:20, padding: isMobile ? "16px" : "24px 32px", flex:1,
      }}>

        {/* COL 1 — STAKE + BUY tabs */}
        <div style={panel}>
          <div style={topLine} />
          <div style={panelTitle}>
            <div style={accentBar} />
            {mainTab === "stake" ? "Staking Interface" : "Buy Tokens"}
          </div>

          {/* Main tab switcher */}
          <div style={{ display:"flex", gap:6, marginBottom:20 }}>
            {([["stake","Stake"],["buy","Buy with Card"],["swap","Swap"]] as const).map(([id,label]) => (
              <button
                key={id}
                onClick={() => setMainTab(id)}
                style={{
                  padding:"7px 16px",
                  border: mainTab===id ? "1px solid rgba(255,0,255,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius:20,
                  background: mainTab===id ? "rgba(255,0,255,0.12)" : "transparent",
                  fontFamily:"'Inter','Rajdhani',sans-serif",
                  fontSize:12, fontWeight:600,
                  color: mainTab===id ? "#ff00ff" : "rgba(255,255,255,0.4)",
                  cursor:"pointer",
                  transition:"all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {mainTab === "stake" && <StakePanel onToast={addToast} />}
          {mainTab === "buy"   && <BuyPanel />}
          {mainTab === "swap"  && <SwapPanel />}
        </div>

        {/* COL 2 — ORACLE + APR */}
        <div style={{ ...panel, display:"flex", flexDirection:"column", gap:20 }}>
          <div style={topLine} />
          <div style={panelTitle}>
            <div style={accentBar} />
            Oracle Prices
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              ["BTC","#f7931a", prices.BTC],
              ["ETH","#627eea", prices.ETH],
              ["MON","#00ffff", prices.MON],
              ["USDC","#2775ca",prices.USDC],
            ].map(([sym,color,price]) => (
              <div key={sym as string} style={{
                background:"rgba(0,0,0,0.3)",
                border:`1px solid ${color}33`,
                borderRadius:10, padding:14,
                position:"relative", overflow:"hidden",
              }}>
                <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:`linear-gradient(90deg,transparent,${color},transparent)` }} />
                <div style={{ fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,color:color as string,textShadow:`0 0 8px ${color}` }}>{sym}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:14,color:"#FFE566",margin:"4px 0" }}>{fmt(price as number)}</div>
                <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#00ffff",opacity:0.6 }}>Chainlink • live</div>
              </div>
            ))}
          </div>

          <div style={panelTitle}>
            <div style={accentBar} />
            Token APR Table
          </div>

          <div style={{ overflowY:"auto", maxHeight:300, paddingRight:4 }}>
            {[
              { cat:"Stablecoins", color:"#2775ca", tokens:[["USDC",12],["USDT0",12],["AUSD",10],["USD1",10],["LVUSD",10]] },
              { cat:"Major",       color:"#f7931a", tokens:[["WMON",25],["WETH",20],["WBTC",20],["cbBTC",20]] },
              { cat:"Liquid Staking",color:"#00ffff",tokens:[["sMON",30],["shMON",28],["aprMON",28],["gMON",28],["wstETH",25]] },
              { cat:"Degen",       color:"#ff00ff", tokens:[["CHOG",40],["DUST",35],["Cake",30],["LVMON",30]] },
            ].map(({ cat,color,tokens }) => (
              <div key={cat} style={{ marginBottom:14 }}>
                <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:9,color,letterSpacing:3,textTransform:"uppercase",marginBottom:6,opacity:0.8 }}>{cat}</div>
                {tokens.map(([sym,apr]) => (
                  <div key={sym as string} style={{ display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:11,color:"rgba(255,255,255,0.7)" }}>{sym}</span>
                    <span style={{ fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,color:color,textShadow:`0 0 6px ${color}` }}>{apr}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* COL 3 — NFT */}
        <div style={panel}>
          <div style={topLine} />
          <div style={panelTitle}>
            <div style={accentBar} />
            NFT Card Viewer
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:3,textTransform:"uppercase",color:"#00ffff",opacity:0.7,marginBottom:6,display:"block" }}>
              View Token ID
            </label>
            <div style={{ display:"flex", gap:8 }}>
              <input
                type="number" min="1" placeholder="Token ID"
                value={inputId} onChange={e=>setInputId(e.target.value)}
                style={{ flex:1,background:"rgba(0,0,0,0.4)",border:"1px solid rgba(139,92,246,0.3)",borderRadius:8,padding:"11px 14px",fontFamily:"'Share Tech Mono',monospace",fontSize:13,color:"#fff",outline:"none" }}
              />
              <button
                onClick={()=>{ if(inputId){ setViewId(Number(inputId)); if(navigator.vibrate) navigator.vibrate(12); }}}
                style={{ padding:"0 16px",background:"linear-gradient(135deg,#ff00ff22,#00ffff22)",border:"1px solid rgba(0,255,255,0.4)",borderRadius:8,fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,color:"#00ffff",cursor:"pointer",letterSpacing:2 }}
              >LOAD</button>
            </div>
          </div>

          <NFTCard tokenId={viewId} />

          <div style={{ marginTop:24 }}>
            <div style={{ fontFamily:"'Orbitron',monospace", fontSize:12, fontWeight:700, letterSpacing:3, textTransform:"uppercase", color:"#ff00ff", marginBottom:16, display:"flex", alignItems:"center", gap:10, textShadow:"0 0 10px rgba(255,0,255,0.5)" }}>
              <div style={{ width:3, height:16, background:"linear-gradient(180deg,#ff00ff,#00ffff)", borderRadius:2, boxShadow:"0 0 8px #ff00ff" }} />
              Ecosystem
            </div>
            <EcosystemPanel />
          </div>
        </div>

      </div>
      <Footer />

      {/* TOASTS */}
      <div style={{ position:"fixed",bottom:24,right:24,zIndex:999,display:"flex",flexDirection:"column",gap:10 }}>
        {toasts.map(t=>(
          <div key={t.id} style={{
            background:"rgba(15,5,24,0.97)",
            border:`1px solid ${t.err?"#ff1493":"#00ffff"}`,
            borderRadius:10, padding:"12px 18px",
            fontFamily:"'Share Tech Mono',monospace", fontSize:12,
            color:t.err?"#ff1493":"#00ffff",
            boxShadow:`0 0 20px ${t.err?"rgba(255,20,147,0.3)":"rgba(0,255,255,0.3)"}`,
            maxWidth:300, animation:"slideInRight 0.3s ease",
          }}>
            {t.msg}
          </div>
        ))}
      </div>

    </div>
  );
}
