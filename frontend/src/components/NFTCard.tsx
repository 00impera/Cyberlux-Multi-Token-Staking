import { useEffect, useState } from "react";
import { readLEDColor, readStakeData, readTimeProgress, readPendingRewards, TOKENS } from "../lib/contract";

interface Props {
  tokenId: number | null;
}

export default function NFTCard({ tokenId }: Props) {
  const [led, setLed]           = useState("#39FF14");
  const [status, setStatus]     = useState("READY");
  const [progress, setProgress] = useState(0);
  const [amount, setAmount]     = useState<string | null>(null);
  const [rewards, setRewards]   = useState<string | null>(null);
  const [token, setToken]       = useState<string>("");
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (tokenId == null) return;
    setLoading(true);
    (async () => {
      try {
        const [ledColor, stakeData, prog, pRewards] = await Promise.all([
          readLEDColor(BigInt(tokenId)),
          readStakeData(BigInt(tokenId)),
          readTimeProgress(BigInt(tokenId)),
          readPendingRewards(BigInt(tokenId)),
        ]);
        setLed(ledColor);
        setProgress(Number(prog));
        const tokenInfo = TOKENS.find(t => t.address.toLowerCase() === stakeData.token.toLowerCase());
        const dec = tokenInfo?.decimals ?? 18;
        setToken(tokenInfo?.symbol ?? stakeData.token.slice(0, 6));
        setAmount((Number(stakeData.amount) / 10 ** dec).toFixed(4));
        setRewards((Number(pRewards) / 10 ** dec).toFixed(6));
        if (stakeData.withdrawn) setStatus("UNLOCKED");
        else if (stakeData.unlockTime <= BigInt(Math.floor(Date.now() / 1000))) setStatus("READY");
        else setStatus("LOCKED");
      } catch { setStatus("ERROR"); }
      finally { setLoading(false); }
    })();
  }, [tokenId]);

  const ledShadow = `0 0 24px ${led}, 0 0 48px ${led}66`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{
        width: "100%", aspectRatio: "1.586", borderRadius: 14,
        position: "relative", overflow: "hidden",
        background: "linear-gradient(135deg,#0a0a0a,#0d1a0d,#080808)",
        border: "1px solid rgba(255,215,0,0.2)",
        animation: "cardFloat 4s ease-in-out infinite",
        cursor: "pointer",
        boxShadow: "0 0 0 1px rgba(57,255,20,0.1),0 20px 60px rgba(0,0,0,0.8)",
      }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(57,255,20,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,0.06) 1px,transparent 1px)",backgroundSize:"20px 20px" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(162,89,255,0.05),rgba(0,234,255,0.05),rgba(255,110,199,0.05))",animation:"bgPulse 6s ease-in-out infinite alternate" }} />
        <div style={{ position:"absolute",top:16,right:16,width:18,height:18,borderRadius:"50%",background:led,boxShadow:ledShadow,animation:"ledPulse 2s ease-in-out infinite" }} />
        <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",textAlign:"center" }}>
          <div style={{ fontFamily:"'Orbitron',monospace",fontSize:22,fontWeight:900,background:"linear-gradient(90deg,#a259ff,#00eaff,#ff6ec7,#FFD700,#a259ff)",backgroundSize:"400%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"shimmer 5s linear infinite",letterSpacing:3 }}>CYBERLUX</div>
          {tokenId != null && <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#39FF14",opacity:0.7,letterSpacing:4,marginTop:4 }}>TOKEN #{tokenId}</div>}
        </div>
        <div style={{ position:"absolute",bottom:18,left:18,width:38,height:30,background:"linear-gradient(135deg,#C8960C,#FFD700)",borderRadius:4,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridTemplateRows:"1fr 1fr 1fr",gap:3,padding:5 }}>
          {Array(9).fill(0).map((_,i) => <div key={i} style={{ background:"rgba(0,0,0,0.45)",borderRadius:1 }} />)}
        </div>
        {tokenId != null && (
          <div style={{ position:"absolute",bottom:0,left:0,right:0,height:3,background:"rgba(0,0,0,0.5)" }}>
            <div style={{ height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,#003300,${led})`,boxShadow:`0 0 6px ${led}`,transition:"width 1s ease" }} />
          </div>
        )}
        {loading && (
          <div style={{ position:"absolute",inset:0,background:"rgba(5,10,14,0.75)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <div style={{ width:30,height:30,border:"2px solid rgba(255,215,0,0.2)",borderTop:"2px solid #FFD700",borderRadius:"50%",animation:"spin 0.8s linear infinite" }} />
          </div>
        )}
      </div>

      <div style={{ display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(0,0,0,0.4)",border:"1px solid rgba(57,255,20,0.2)",borderRadius:8 }}>
        <div style={{ width:12,height:12,borderRadius:"50%",background:led,boxShadow:ledShadow,animation:"ledPulse 2s infinite",flexShrink:0 }} />
        <div>
          <div style={{ fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,color:led }}>{status}</div>
          <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:9,opacity:0.5,letterSpacing:1,marginTop:2 }}>
            {status==="LOCKED"?"Lock period active":status==="READY"?"Ready to withdraw":status==="UNLOCKED"?"Withdrawn successfully":"Token not found"}
          </div>
        </div>
      </div>

      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
        {[["PCB","0.6mm"],["MCU","ATtiny85"],["LED","RGB"],["NFC","NTAG213"],["Battery","CR2016"],["Casing","Gold PVC"],["Firmware","v1.0.0"],["Token",token||"—"]].map(([type,value])=>(
          <div key={type} style={{ background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,215,0,0.1)",borderRadius:8,padding:"10px 12px" }}>
            <div style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:9,color:"#00eaff",opacity:0.7,letterSpacing:2,textTransform:"uppercase" }}>{type}</div>
            <div style={{ fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,color:"#FFE566",marginTop:3 }}>{value}</div>
          </div>
        ))}
      </div>

      {amount != null && (
        <div style={{ background:"rgba(0,0,0,0.4)",border:"1px solid rgba(255,215,0,0.15)",borderRadius:10,padding:16,display:"flex",flexDirection:"column",gap:10 }}>
          {[["Staked Amount",`${amount} ${token}`,"#FFD700"],["Pending Rewards",`${rewards} ${token}`,"#39FF14"],["Lock Progress",`${progress}%`,"#00eaff"]].map(([label,value,color])=>(
            <div key={label as string} style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <span style={{ fontFamily:"'Share Tech Mono',monospace",fontSize:10,color:"#39FF14",opacity:0.6,letterSpacing:2,textTransform:"uppercase" }}>{label}</span>
              <span style={{ fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,color:color as string }}>{value}</span>
            </div>
          ))}
          <div style={{ height:4,background:"rgba(255,255,255,0.08)",borderRadius:2,overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,#003300,${led})`,boxShadow:`0 0 6px ${led}`,transition:"width 1s ease",borderRadius:2 }} />
          </div>
        </div>
      )}
    </div>
  );
}
