import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { createPublicClient, http } from "viem";
import ABI from "../abi/CyberluxStaking.json";

export const thirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export const monadMainnet = defineChain({
  id: 143,
  name: "Monad Mainnet",
  nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
  rpc: import.meta.env.VITE_RPC_URL,
  blockExplorers: [{ name: "MonadScan", url: "https://monadscan.com" }],
});

export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as `0x${string}`;

export const stakingContract = getContract({
  client: thirdwebClient,
  chain: monadMainnet,
  address: CONTRACT_ADDRESS,
  abi: ABI as never,
});

export const publicClient = createPublicClient({
  chain: {
    id: 143,
    name: "Monad Mainnet",
    nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
    rpcUrls: {
      default: { http: [import.meta.env.VITE_RPC_URL] },
    },
  },
  transport: http(import.meta.env.VITE_RPC_URL),
});

export type TokenInfo = {
  symbol: string;
  address: `0x${string}`;
  apr: number;
  decimals: number;
  category: "stable" | "major" | "liquid" | "gold" | "degen";
};

export const TOKENS: TokenInfo[] = [
  { symbol: "USDC",   address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603", apr: 12, decimals: 6,  category: "stable" },
  { symbol: "USDT0",  address: "0xe7cd86e13AC4309349F30B3435a9d337750fC82D", apr: 12, decimals: 6,  category: "stable" },
  { symbol: "AUSD",   address: "0x00000000eFE302BEAA2b3e6e1b18d08D69a9012a", apr: 10, decimals: 6,  category: "stable" },
  { symbol: "USD1",   address: "0x111111d2bf19e43C34263401e0CAd979eD1cdb61", apr: 10, decimals: 6,  category: "stable" },
  { symbol: "LVUSD",  address: "0xFD44B35139Ae53FFF7d8F2A9869c503D987f00d1", apr: 10, decimals: 18, category: "stable" },
  { symbol: "WMON",   address: "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A", apr: 25, decimals: 18, category: "major"  },
  { symbol: "WETH",   address: "0xEE8c0E9f1BFFb4Eb878d8f15f368A02a35481242", apr: 20, decimals: 18, category: "major"  },
  { symbol: "WBTC",   address: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c", apr: 20, decimals: 8,  category: "major"  },
  { symbol: "cbBTC",  address: "0xd18B7EC58Cdf4876f6AFebd3Ed1730e4Ce10414b", apr: 20, decimals: 8,  category: "major"  },
  { symbol: "sMON",   address: "0xA3227C5969757783154C60bF0bC1944180ed81B9", apr: 30, decimals: 18, category: "liquid" },
  { symbol: "shMON",  address: "0x1B68626dCa36c7fE922fD2d55E4f631d962dE19c", apr: 28, decimals: 18, category: "liquid" },
  { symbol: "aprMON", address: "0x0c65A0BC65a5D819235B71F554D210D3F80E0852", apr: 28, decimals: 18, category: "liquid" },
  { symbol: "gMON",   address: "0x8498312A6B3CbD158bf0c93AbdCF29E6e4F55081", apr: 28, decimals: 18, category: "liquid" },
  { symbol: "wstETH", address: "0x10Aeaf63194db8d453d4D85a06E5eFE1dd0b5417", apr: 25, decimals: 18, category: "liquid" },
  { symbol: "XAUt0",  address: "0x01bFF41798a0BcF287b996046Ca68b395DbC1071", apr: 8,  decimals: 6,  category: "gold"   },
  { symbol: "CHOG",   address: "0x350035555E10d9AfAF1566AaebfCeD5BA6C27777", apr: 40, decimals: 18, category: "degen"  },
  { symbol: "DUST",   address: "0xAD96C3dffCD6374294e2573A7fBBA96097CC8d7c", apr: 35, decimals: 18, category: "degen"  },
  { symbol: "Cake",   address: "0xF59D81cd43f620E722E07f9Cb3f6E41B031017a3", apr: 30, decimals: 18, category: "degen"  },
  { symbol: "LVMON",  address: "0x91b81bfbe3A747230F0529Aa28d8b2Bc898E6D56", apr: 30, decimals: 18, category: "degen"  },
];

export async function readPendingRewards(tokenId: bigint): Promise<bigint> {
  const result = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI as never,
    functionName: "pendingRewards",
    args: [tokenId],
  });
  return result as bigint;
}

export async function readStakeData(tokenId: bigint) {
  const result = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI as never,
    functionName: "getStakeData",
    args: [tokenId],
  });
  const [token, amount, lockedAt, unlockTime, withdrawn] = result as [
    `0x${string}`, bigint, bigint, bigint, boolean
  ];
  return { token, amount, lockedAt, unlockTime, withdrawn };
}

export async function readLEDColor(tokenId: bigint): Promise<string> {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI as never,
    functionName: "getLEDColor",
    args: [tokenId],
  }) as Promise<string>;
}

export async function readTimeProgress(tokenId: bigint): Promise<bigint> {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: ABI as never,
    functionName: "getTimeProgress",
    args: [tokenId],
  }) as Promise<bigint>;
}
