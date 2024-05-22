import { IGROUP, INFT } from "@/types";

export function getTopNfts(nfts: INFT[], count: number = 3): INFT[] {
  return nfts
  .filter((_nft:INFT) => _nft.ranking)
  .sort((a, b) => Number(a.ranking) - Number(b.ranking));
}

export function getNewlyMinted(nfts: INFT[], count: number = nfts.length > 30 ? 30 : nfts.length): INFT[] {
  return nfts
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
    .slice(0, count);
}

export function getTopGroups(groups: IGROUP[], count: number = 3): IGROUP[] {
  return groups
  .filter((_group:IGROUP) => _group.ranking)
  .sort((a, b) => Number(a.ranking) - Number(b.ranking));
}
