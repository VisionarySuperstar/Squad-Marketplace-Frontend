export interface INFTCard {
  id: string;
  avatar: string;
  collectionName: string;
  collectionId: number;
  price: number;
  seen: number;
  favorite: number;
}

export interface INFT {
  id: string;
  avatar: string;
  owner: string;
  status: string;
  collectionaddress: string;
  collectionid: string;
  groupid: string;
  auctiontype: string;
  initialprice: string;
  saleperiod: string;
  currentprice: string;
  currentbidder: string;
  reducingrate: string;
  collectionname: string;
  listednumber: string;
  marketplacenumber: string;
  created_at: string;
  ranking: string;
}

export function nftToCard(nft: INFT): INFTCard {
  return {
    id: nft.id,
    avatar: nft.avatar,
    collectionName: nft.collectionname,
    collectionId: Number(nft.collectionid),
    price: Number(nft.currentprice),
    seen: 200,
    favorite: 20,
  };
}

export enum AuctionType {
  EnglishAuction = 0,
  DutchAuction = 1,
  Offering = 2,
}

export const auctionTypes = [
  AuctionType.EnglishAuction,
  AuctionType.DutchAuction,
  AuctionType.Offering,
];

export type NFTFilter = {
  group?: string;
  collection?: string;
  auctionType?: AuctionType;
  priceMin?: number;
  priceMax?: number;
  blockchain?: string;
};

export function auctionToString(auction: AuctionType): string {
  switch (auction) {
    case AuctionType.EnglishAuction:
      return "english auction";
    case AuctionType.DutchAuction:
      return "dutch auction";
    case AuctionType.Offering:
      return "offering";
  }
}
