const CONTRACT = "0xE96462daA04464036b24f48B2c43d47f9072c34B";
const RPC = "https://monad-mainnet.g.alchemy.com/v2/Uwb7T0DbXMQHjiJBNf9_b005qYjLmJqk";

async function ethCall(selector: string, tokenId: bigint): Promise<string> {
  const data = selector + tokenId.toString(16).padStart(64, "0");
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "eth_call",
      params: [{ to: CONTRACT, data }, "latest"],
    }),
  });
  const json: { result: string } = await res.json();
  return json.result;
}

function decodeString(hex: string): string {
  const c = hex.startsWith("0x") ? hex.slice(2) : hex;
  const len = parseInt(c.slice(128, 192), 16);
  let s = "";
  for (let i = 0; i < len * 2; i += 2)
    s += String.fromCharCode(parseInt(c.slice(192 + i, 194 + i), 16));
  return s;
}

function parseUint(hex: string, offset: number): bigint {
  const c = hex.startsWith("0x") ? hex.slice(2) : hex;
  return BigInt("0x" + c.slice(offset * 64, offset * 64 + 64));
}

function parseAddress(hex: string, offset: number): string {
  const c = hex.startsWith("0x") ? hex.slice(2) : hex;
  return "0x" + c.slice(offset * 64 + 24, offset * 64 + 64);
}

function parseBool(hex: string, offset: number): boolean {
  return parseUint(hex, offset) !== 0n;
}

const SEL_STAKE   = "0x8df82800";
const SEL_REWARDS = "0xf40f0f52";
const SEL_LED     = "0x6b5b9f6b";
const SEL_STATUS  = "0x35a7014a";
const SEL_PROG    = "0xf3b2c5b7";

export const onRequestGet: PagesFunction = async (ctx) => {
  try {
    const url = new URL(ctx.request.url);
    const tokenId = BigInt(url.searchParams.get("tokenId") ?? "0");

    const [stakeHex, rewardHex, ledHex, statusHex, progHex] = await Promise.all([
      ethCall(SEL_STAKE,   tokenId),
      ethCall(SEL_REWARDS, tokenId),
      ethCall(SEL_LED,     tokenId),
      ethCall(SEL_STATUS,  tokenId),
      ethCall(SEL_PROG,    tokenId),
    ]);

    const token      = parseAddress(stakeHex, 0);
    const amount     = parseUint(stakeHex, 1);
    const lockedAt   = parseUint(stakeHex, 2);
    const unlockTime = parseUint(stakeHex, 3);
    const withdrawn  = parseBool(stakeHex, 4);
    const rewards    = parseUint(rewardHex, 0);
    const led        = decodeString(ledHex);
    const status     = decodeString(statusHex);
    const progress   = Number(parseUint(progHex, 0));

    return Response.json({
      tokenId: Number(tokenId),
      token, amount: amount.toString(),
      lockedAt: Number(lockedAt),
      unlockTime: Number(unlockTime),
      withdrawn, rewards: rewards.toString(),
      led, status, progress,
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return Response.json({ error: msg }, { status: 500 });
  }
};
