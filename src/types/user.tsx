export interface IUSER {
  // map(arg0: (index: any, key: any) => import("react").JSX.Element): import("react").ReactNode;
  id: string;
  wallet: string
  name: string,
  email: string,
  avatar: string,
  join_at: string
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
  content:string;
}

export interface IRequest{
  id:string;
  groupid:string;
  userid:string;
  date:string;
}
