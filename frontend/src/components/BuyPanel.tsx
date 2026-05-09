import { PayEmbed } from "thirdweb/react";
import { thirdwebClient, monadMainnet } from "../lib/contract";

export default function BuyPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <PayEmbed
        client={thirdwebClient}
        theme="dark"
        style={{ width: "100%", borderRadius: 12 }}
        payOptions={{
          mode: "fund_wallet",
          prefillBuy: {
            chain: monadMainnet,
            allowEdits: {
              chain: false,
              token: true,
              amount: true,
            },
          },
        }}
      />
    </div>
  );
}
