const RPC = "https://monad-mainnet.g.alchemy.com/v2/Uwb7T0DbXMQHjiJBNf9_b005qYjLmJqk";

const FEEDS: Record<string, string> = {
  BTC:  "0xc1d4C3331635184fA4C3c22fb92211B2Ac9E0546",
  ETH:  "0x1B1414782B859871781bA3E4B0979b9ca57A0A04",
  MON:  "0xBcD78f76005B7515837af6b50c7C52BCf73822fb",
  USDC: "0xf5F15f188AbCb0d165D1Edb7f37F7d6fA2fCebec",
};

const SEL = "0xfeaf968c";

async function getPrice(feedAddr: string): Promise<number> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "eth_call",
      params: [{ to: feedAddr, data: SEL }, "latest"],
    }),
  });
  const data: { result: string } = await res.json();
  const hex = data.result.startsWith("0x") ? data.result.slice(2) : data.result;
  const answer = BigInt("0x" + hex.slice(64, 128));
  return Number(answer) / 1e8;
}

export const onRequestGet: PagesFunction = async (ctx) => {
  try {
    const env = ctx.env as { CYBERLUX_KV: KVNamespace };

    const cached = await env.CYBERLUX_KV.get("oracle:prices");
    if (cached) {
      return new Response(cached, {
        headers: { "Content-Type": "application/json", "X-Cache": "HIT" },
      });
    }

    const prices = await Promise.all(
      Object.entries(FEEDS).map(async ([sym, addr]) => {
        try {
          const price = await getPrice(addr);
          return [sym, price];
        } catch {
          return [sym, null];
        }
      })
    );

    const result = Object.fromEntries(prices);
    const body = JSON.stringify({ prices: result, updatedAt: Date.now() });

    await env.CYBERLUX_KV.put("oracle:prices", body, { expirationTtl: 60 });

    return new Response(body, {
      headers: { "Content-Type": "application/json", "X-Cache": "MISS" },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: msg }, { status: 500 });
  }
};
