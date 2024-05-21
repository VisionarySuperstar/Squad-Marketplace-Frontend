import { IGROUP, INFT } from "@/types";

export function getTopNfts(nfts: INFT[], count: number = 3): INFT[] {
  return nfts.slice(0, count);
}

export function getNewlyMinted(nfts: INFT[], count: number = 6): INFT[] {
  return nfts
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
    .slice(0, count);
}

export function getTopGroups(groups: IGROUP[], count: number = 3): IGROUP[] {
  return groups.slice(0, count);
}
