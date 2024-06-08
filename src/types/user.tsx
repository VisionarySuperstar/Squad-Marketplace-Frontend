export interface IUSER {
  // map(arg0: (index: any, key: any) => import("react").JSX.Element): import("react").ReactNode;
  id: string;
  wallet: string
  name: string,
  email: string,
  avatar: string,
  join_at: string,
  
};

export type TMsg = { 
  id: string, 
  message: string, 
  profileId: string 
}

export type TRegister = {
  name: string, 
  email: string, 
  avatar: string
}


export interface IOFFER_TRANSACTION{
  id: string;
  groupid: string;
  buyer: string;
  nftid:string;
  price:string,
  transactionid:string
}
export interface IActive_Bids{
  id:string;
  bidder:string;
  nft:string;
  withdraw_amount: string;
}
