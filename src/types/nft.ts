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
