export interface INFTCard {
  id: string;
  content: string;
  name: string;
  description: string;
  price: number;
  seen: number;
  favorite: number;
}

export interface INFT {
  id: string;
  name: string,
  description: string,
  content: string;
  owner: string;
  status: string;
  collectionaddress:string;
  collectionid: string;
  groupid: string;
  auctiontype: string;
  initialprice: string;
  saleperiod: string;
  currentprice: string;
  currentbidder: string;
  reducingrate: string;
  listednumber: string;
  marketplacenumber: string;
  created_at: string;
  ranking: string;
}

export function nftToCard(nft: INFT): INFTCard {
  return {
    id: nft.id,
    content: nft.content,
    name: nft.name,
    description: nft.description,
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
