import { useState, useCallback, useRef, useEffect } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, toWei, getContract } from "thirdweb";
import { stakingContract, TOKENS, type TokenInfo, thirdwebClient, monadMainnet, CONTRACT_ADDRESS } from "../lib/contract";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sc = stakingContract as any;

const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
  padding: "10px 14px", fontFamily: "'Share Tech Mono', monospace",
  fontSize: 13, color: "#ffffff", outline: "none",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "'Share Tech Mono', monospace", fontSize: 10,
  letterSpacing: 2, textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)", marginBottom: 6, display: "block",
};


function aprColor(apr: number): string {
  if (apr >= 35) return "#ff00ff";
  if (apr >= 25) return "#8b5cf6";
  if (apr >= 18) return "#00ffff";
  return "#39FF14";
}

function TokenSelect({ value, onChange }: { value: TokenInfo; onChange: (t: TokenInfo) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const color = aprColor(value.apr);
  return (
    <div ref={ref} style={{ position: "relative", userSelect: "none" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 14px", cursor: "pointer", transition: "border-color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, boxShadow: "0 0 6px " + color, flexShrink: 0, display: "inline-block" }} />
          <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: 13, color: "#fff", fontWeight: 700 }}>{value.symbol}</span>
          <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>{value.category}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: 12, color: color, fontWeight: 700 }}>{value.apr}% APR</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 99, background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.6)", maxHeight: 280, overflowY: "auto" }}>
          {TOKENS.map((t) => {
            const c = aprColor(t.apr);
            const active = t.address === value.address;
            return (
              <button
                key={t.address}
                onClick={() => { onChange(t); setOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", cursor: "pointer", border: "none", background: active ? "rgba(255,255,255,0.07)" : "transparent", borderLeft: active ? "3px solid " + c : "3px solid transparent", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = active ? "rgba(255,255,255,0.07)" : "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: "0 0 5px " + c, flexShrink: 0, display: "inline-block" }} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: 12, color: "#fff", fontWeight: 700 }}>{t.symbol}</div>
                    <div style={{ fontFamily: "Share Tech Mono, monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{t.category}</div>
                  </div>
                </div>
                <span style={{ fontFamily: "Share Tech Mono, monospace", fontSize: 11, color: c, fontWeight: 700 }}>{t.apr}% APR</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div style={{ marginBottom: 16 }}><label style={labelStyle}>{label}</label>{children}</div>;
}

function BtnPrimary({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={() => { onClick(); if (navigator.vibrate) navigator.vibrate(18); }}
      style={{ width:"100%", padding:"12px 20px", background:"#ffffff", border:"none", borderRadius:8, fontFamily:"'Inter','Rajdhani',sans-serif", fontSize:13, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#0a0a0a", cursor:"pointer", transition:"opacity 0.15s" }}
      onMouseEnter={e=>(e.currentTarget.style.opacity="0.85")}
      onMouseLeave={e=>(e.currentTarget.style.opacity="1")}
    >{children}</button>
  );
}

function BtnSecondary({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={() => { onClick(); if (navigator.vibrate) navigator.vibrate(12); }}
      style={{ width:"100%", padding:"11px 20px", marginTop:10, background:"transparent", border:"1px solid rgba(255,255,255,0.18)", borderRadius:8, fontFamily:"'Inter','Rajdhani',sans-serif", fontSize:12, fontWeight:600, letterSpacing:1, textTransform:"uppercase", color:"rgba(255,255,255,0.7)", cursor:"pointer" }}
      onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.4)"; e.currentTarget.style.color="#fff"; }}
      onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"; e.currentTarget.style.color="rgba(255,255,255,0.7)"; }}
    >{children}</button>
  );
}

function BtnDanger({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={() => { onClick(); if (navigator.vibrate) navigator.vibrate(18); }}
      style={{ width:"100%", padding:"12px 20px", background:"transparent", border:"1px solid rgba(239,68,68,0.5)", borderRadius:8, fontFamily:"'Inter','Rajdhani',sans-serif", fontSize:13, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:"#ef4444", cursor:"pointer" }}
      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor="#ef4444"; }}
      onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(239,68,68,0.5)"; }}
    >{children}</button>
  );
}

type Tab = "stake"|"withdraw"|"claim"|"early";

export default function StakePanel({ onToast }: { onToast: (msg: string, err?: boolean) => void }) {
  const account = useActiveAccount();
  const { mutateAsync: sendTx } = useSendTransaction();
  const [tab, setTab]               = useState<Tab>("stake");
  const [selToken, setSelToken]     = useState<TokenInfo>(TOKENS[0]);
  const [stakeAmt, setStakeAmt]     = useState("");
  const [lockDays, setLockDays]     = useState(30);
  const [withdrawId, setWithdrawId] = useState("");
  const [claimId, setClaimId]       = useState("");
  const [earlyId, setEarlyId]       = useState("");
  const [penalty, setPenalty]       = useState(500);

  const estReward = stakeAmt && Number(stakeAmt) > 0
    ? ((Number(stakeAmt) * selToken.apr / 100 * lockDays) / 365).toFixed(4) : "0.0000";

  const doApprove = useCallback(async () => {
    if (!account) return onToast("Connect wallet first!", true);
    if (!stakeAmt || Number(stakeAmt) <= 0) return onToast("Enter amount", true);
    try {
      const tokenContract = getContract({ client: thirdwebClient, chain: monadMainnet, address: selToken.address });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tx = prepareContractCall({ contract: tokenContract as any, method: "function approve(address spender, uint256 amount) returns (bool)", params: [CONTRACT_ADDRESS, toWei(stakeAmt)] });
      await sendTx(tx);
      onToast(`✅ Approved ${selToken.symbol}`);
    } catch (e: unknown) { onToast((e as Error).message?.slice(0, 80) ?? "Error", true); }
  }, [account, selToken, stakeAmt, sendTx, onToast]);

  const doStake = useCallback(async () => {
    if (!account) return onToast("Connect wallet first!", true);
    if (!stakeAmt || Number(stakeAmt) <= 0) return onToast("Enter amount", true);
    try {
      const tx = prepareContractCall({ contract: sc, method: "function stake(address token, uint256 amount, uint256 lockDays)", params: [selToken.address, toWei(stakeAmt), BigInt(lockDays)] });
      await sendTx(tx);
      onToast(`✅ Staked ${stakeAmt} ${selToken.symbol} — NFT minted!`);
    } catch (e: unknown) { onToast((e as Error).message?.slice(0, 80) ?? "Error", true); }
  }, [account, selToken, stakeAmt, lockDays, sendTx, onToast]);

  const doWithdraw = useCallback(async () => {
    if (!account) return onToast("Connect wallet first!", true);
    if (!withdrawId) return onToast("Enter Token ID", true);
    try {
      const tx = prepareContractCall({ contract: sc, method: "function withdraw(uint256 tokenId)", params: [BigInt(withdrawId)] });
      await sendTx(tx);
      onToast(`✅ Withdrawn — Token #${withdrawId}`);
    } catch (e: unknown) { onToast((e as Error).message?.slice(0, 80) ?? "Error", true); }
  }, [account, withdrawId, sendTx, onToast]);

  const doClaim = useCallback(async () => {
    if (!account) return onToast("Connect wallet first!", true);
    if (!claimId) return onToast("Enter Token ID", true);
    try {
      const tx = prepareContractCall({ contract: sc, method: "function claimRewards(uint256 tokenId)", params: [BigInt(claimId)] });
      await sendTx(tx);
      onToast(`✅ Rewards claimed — Token #${claimId}`);
    } catch (e: unknown) { onToast((e as Error).message?.slice(0, 80) ?? "Error", true); }
  }, [account, claimId, sendTx, onToast]);

  const doEarly = useCallback(async () => {
    if (!account) return onToast("Connect wallet first!", true);
    if (!earlyId) return onToast("Enter Token ID", true);
    try {
      const tx = prepareContractCall({ contract: sc, method: "function earlyWithdraw(uint256 tokenId, uint256 penaltyPercent)", params: [BigInt(earlyId), BigInt(penalty)] });
      await sendTx(tx);
      onToast(`⚠ Early exit — ${penalty / 100}% penalty applied`);
    } catch (e: unknown) { onToast((e as Error).message?.slice(0, 80) ?? "Error", true); }
  }, [account, earlyId, penalty, sendTx, onToast]);

  const TABS: { id: Tab; label: string }[] = [
    { id:"stake", label:"Stake" }, { id:"withdraw", label:"Withdraw" },
    { id:"claim", label:"Claim" }, { id:"early", label:"Early Exit" },
  ];

  return (
    <div>
      <div style={{ display:"flex", gap:6, marginBottom:24, flexWrap:"wrap" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"7px 16px", border: tab===t.id ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.08)", borderRadius:20, background: tab===t.id ? "rgba(255,255,255,0.1)" : "transparent", fontFamily:"'Inter','Rajdhani',sans-serif", fontSize:12, fontWeight:600, color: tab===t.id ? "#ffffff" : "rgba(255,255,255,0.4)", cursor:"pointer", transition:"all 0.2s", letterSpacing:0.5 }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab==="stake" && (
        <div className="animate-fade-in">
          <Field label="Select Token">
            <TokenSelect value={selToken} onChange={setSelToken} />
          </Field>
          <Field label="Amount">
            <input type="number" min="0" step="any" placeholder="0.00" style={inputStyle} value={stakeAmt} onChange={e=>setStakeAmt(e.target.value)} />
          </Field>
          <Field label={`Lock Period: ${lockDays} days`}>
            <input type="range" min="7" max="365" value={lockDays} onChange={e=>setLockDays(Number(e.target.value))} style={{ width:"100%", accentColor:"#ffffff" }} />
          </Field>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:1 }}>Est. reward @ {selToken.apr}% APR</span>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:15, fontWeight:700, color:"#ffffff" }}>{estReward} {selToken.symbol}</span>
          </div>
          <BtnPrimary onClick={doStake}>Stake &amp; Mint NFT</BtnPrimary>
          <BtnSecondary onClick={doApprove}>Approve Token First</BtnSecondary>
        </div>
      )}

      {tab==="withdraw" && (
        <div className="animate-fade-in">
          <Field label="NFT Token ID">
            <input type="number" min="1" placeholder="e.g. 42" style={inputStyle} value={withdrawId} onChange={e=>setWithdrawId(e.target.value)} />
          </Field>
          <BtnPrimary onClick={doWithdraw}>Withdraw Full Balance</BtnPrimary>
        </div>
      )}

      {tab==="claim" && (
        <div className="animate-fade-in">
          <Field label="NFT Token ID">
            <input type="number" min="1" placeholder="e.g. 42" style={inputStyle} value={claimId} onChange={e=>setClaimId(e.target.value)} />
          </Field>
          <BtnPrimary onClick={doClaim}>Claim Rewards</BtnPrimary>
        </div>
      )}

      {tab==="early" && (
        <div className="animate-fade-in">
          <Field label="NFT Token ID">
            <input type="number" min="1" placeholder="e.g. 42" style={inputStyle} value={earlyId} onChange={e=>setEarlyId(e.target.value)} />
          </Field>
          <Field label={`Penalty: ${(penalty/100).toFixed(0)}% (min 5% — max 50%)`}>
            <input type="range" min={500} max={5000} step={100} value={penalty} onChange={e=>setPenalty(Number(e.target.value))} style={{ width:"100%", accentColor:"#ef4444" }} />
          </Field>
          <div style={{ background:"rgba(239,68,68,0.05)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, padding:"12px 16px", marginBottom:16 }}>
            <span style={{ fontFamily:"'Share Tech Mono',monospace", fontSize:11, color:"#ef4444" }}>You will lose {(penalty/100).toFixed(0)}% of staked amount</span>
          </div>
          <BtnDanger onClick={doEarly}>Confirm Early Exit</BtnDanger>
        </div>
      )}
    </div>
  );
}
