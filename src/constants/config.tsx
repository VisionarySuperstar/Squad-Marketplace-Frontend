export const NetworkId = {
  POLYGON: 137,
  ETHEREUM: 1,
  ETHERGEM: 1987,
  SEPOLIA: 11155111,
};

export const supportedChainIds = [
  NetworkId.POLYGON,
  NetworkId.ETHEREUM,
  NetworkId.SEPOLIA,
];

export const Marketplace_ADDRESSES = {
  [NetworkId.SEPOLIA]: "0x0b57F4BC4019880b4C45D53b3CDEaeb528201f7B", //verified
};
export const Factory_ADDRESSES = {
  [NetworkId.SEPOLIA]: "0x9f8F5e9dc62148D8F908A7eF715967A8e451Eb43", //verified
};

export const USDC_ADDRESS = {
  [NetworkId.SEPOLIA]: "0xEAE389018d303feEAC3a659cc1eBeFB6392A4E7e", //verified
  [NetworkId.ETHEREUM]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", //verified
  [NetworkId.POLYGON]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", //verified
};

export const webSocketURL =
  process.env.NEXT_PUBLIC_API_WS_URL || "ws://37.60.229.95:8080/";
export const baseURL =
  process.env.NEXT_PUBLIC_API_HTTP_URL || "http://37.60.229.95:8080/";

export const IMGBB_API_KEY = "cef3855d197b6e623e08088e854ed444";
export const PINATA_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0NmEzMjQ5ZC1iMzhlLTQxMTQtODgzYi1jOTgwYzBlMDBlNGYiLCJlbWFpbCI6ImRhbmllbGluc29saXM5NDA1MTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImVhNzQ5YzAyMThlYjc3ZTkwMmU4Iiwic2NvcGVkS2V5U2VjcmV0IjoiZTdhZjI1MGI5MjZjZDRmYzBjNGU2ZDhkNDk5N2MyMmY5ODA5Y2E1MDMwM2I0NTdlYTBjMTg5YjVmZWNjNzhmNiIsImlhdCI6MTcxNTIzNDgwMX0.1YN9H0AJJOfBUaePXu_flXNzogaVkUChV-nvYUM0meo";
export const REAL_KEY = "ea749c0218eb77e902e8";
