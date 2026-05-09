import { PayEmbed } from "thirdweb/react";
import { thirdwebClient, monadMainnet } from "../lib/contract";

const USDC_ADDRESS = "0x754704Bc059F8C67012fEd69BC8A327a5aafb603";

export default function SwapPanel() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <PayEmbed
        client={thirdwebClient}
        theme="dark"
        style={{ width:"100%", borderRadius:12 }}
        payOptions={{
          mode: "fund_wallet",
          prefillBuy: {
            chain: monadMainnet,
            token: { address: USDC_ADDRESS },
            allowEdits: {
              chain: false,
              token: false,
              amount: true,
            },
          },
        }}
      />
    </div>
  );
}
