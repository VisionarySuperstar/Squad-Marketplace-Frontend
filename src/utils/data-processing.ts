import { IGROUP, INFT } from "@/types";

export function getTopNfts(nfts: INFT[], count: number = 3): INFT[] {
  return nfts
    .filter((_nft: INFT) => _nft.ranking)
    .sort((a, b) => Number(a.ranking) - Number(b.ranking))
    .slice(0, count);
}

export function getNewlyMinted(nfts: INFT[], count: number = 30): INFT[] {
  return nfts
    .sort((a, b) => Number(b.created_at) - Number(a.created_at))
    .slice(0, count);
}

export function getTopGroups(groups: IGROUP[], count: number = 3): IGROUP[] {
  return groups
    .filter((_group: IGROUP) => _group.ranking)
    .sort((a, b) => Number(a.ranking) - Number(b.ranking))
    .slice(0, count);
}

export function sortNFTSBy(nfts: INFT[], sortBy: string): INFT[] {
  const sortFunctions: { [key: string]: (a: INFT, b: INFT) => number } = {
    recent: (a, b) => Number(b.created_at) - Number(a.created_at),
    trending: (a, b) => Number(a.ranking) - Number(b.ranking), // TODO: revisit this when API is updated
    top: (a, b) => Number(a.ranking) - Number(b.ranking),
    priceAsc: (a, b) => Number(a.currentprice) - Number(b.currentprice),
    priceDesc: (a, b) => Number(b.currentprice) - Number(a.currentprice),
    likes: (a, b) => Number(a.ranking) - Number(b.ranking), // TODO: replace with likes when API is updated
  };
  return [...nfts].sort(sortFunctions[sortBy]);
}

export function sortGroupsBy(groups: IGROUP[], sortBy: string): IGROUP[] {
  const sortFunctions: { [key: string]: (a: IGROUP, b: IGROUP) => number } = {
    recent: (a, b) => Number(b.created_at) - Number(a.created_at),
    trending: (a, b) => Number(a.ranking) - Number(b.ranking), // TODO: revisit this when API is updated
    top: (a, b) => Number(a.ranking) - Number(b.ranking),
  };
  return [...groups].sort(sortFunctions[sortBy]);
}
