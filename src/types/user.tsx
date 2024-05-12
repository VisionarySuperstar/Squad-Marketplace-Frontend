export interface IUSER {
  // map(arg0: (index: any, key: any) => import("react").JSX.Element): import("react").ReactNode;
  id: string;
  wallet: string
  name: string,
  email: string,
  avatar: string,
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
export interface IGROUP {
  id: string,
  name: string,
  description: string,
  avatar: string,
  director: string,
  requiredconfirmnumber:string,
  member: [
    {
       id: string
     }
  ],
  mintnumber: string,
  soldnumber:string,
  earning:string,
  address:string
}


export interface INFT {
  id: string ;
  avatar: string;
  owner: string;
  status: string;
  collectionaddress: string;
  collectionid:string;
  groupid:string;
  auctiontype: string;
  initialprice: string;
  saleperiod:string;
  currentprice:string;
  currentbidder:string;
  reducingrate:string;
  collectionname:string;
  listednumber:string;
}

export interface ICOLLECTION {
  id: string;
  name:string;
  symbol:string;
  description:string;
  address:string;
  nft:[
    {
      id: string;
    }
  ]
}
export interface IOFFER_TRANSACTION{
  id: string;
  groupid: string;
  buyer: string;
  nftid:string;
  confirm_member:[
    {
      id:string
    }
  ],
  price:string,
  transactionid:string
}

export interface IDIRECTOR_TRANSACTION{
  id: string;
  groupid: string;
  new_director:string;
  suggester: string;
  confirm_member:[
    {
      id:string
    }
  ]
  transaction_id: string;
}

export interface IPOST_NEWS{
  id: string;
  groupid:string;
  post_time:string;
  content:Text;
}