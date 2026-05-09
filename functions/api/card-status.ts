const CONTRACT = "0xE96462daA04464036b24f48B2c43d47f9072c34B";
const RPC = "https://monad-mainnet.g.alchemy.com/v2/Uwb7T0DbXMQHjiJBNf9_b005qYjLmJqk";

async function ethCall(method: string, params: unknown[]): Promise<string> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params }),
  });
  const data: { result: string } = await res.json();
  return data.result;
}

function encodeUint256(n: bigint): string {
  return n.toString(16).padStart(64, "0");
}

function decodeString(hex: string): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  const lenHex = clean.slice(128, 192);
  const len = parseInt(lenHex, 16);
  const strHex = clean.slice(192, 192 + len * 2);
  let str = "";
  for (let i = 0; i < strHex.length; i += 2)
    str += String.fromCharCode(parseInt(strHex.slice(i, i + 2), 16));
  return str;
}

function decodeUint256(hex: string): bigint {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  return BigInt("0x" + clean.slice(0, 64));
}

const SEL_LED    = "0x6b5b9f6b";
const SEL_STATUS = "0x35a7014a";
const SEL_PROG   = "0xf3b2c5b7";

export const onRequestPost: PagesFunction = async (ctx) => {
  try {
    const body: { tokenId: number } = await ctx.request.json();
    const tokenId = BigInt(body.tokenId);
    const encoded = encodeUint256(tokenId);

    const [ledHex, statusHex, progressHex] = await Promise.all([
      ethCall("eth_call", [{ to: CONTRACT, data: SEL_LED + encoded }, "latest"]),
      ethCall("eth_call", [{ to: CONTRACT, data: SEL_STATUS + encoded }, "latest"]),
      ethCall("eth_call", [{ to: CONTRACT, data: SEL_PROG + encoded }, "latest"]),
    ]);

    const led      = decodeString(ledHex);
    const status   = decodeString(statusHex);
    const progress = Number(decodeUint256(progressHex));

    await (ctx.env as { CYBERLUX_KV: KVNamespace }).CYBERLUX_KV.put(
      `card:${tokenId}`,
      JSON.stringify({ led, status, progress }),
      { expirationTtl: 30 }
    );

    return Response.json({ tokenId: body.tokenId, led, status, progress });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: msg }, { status: 500 });
  }
};
