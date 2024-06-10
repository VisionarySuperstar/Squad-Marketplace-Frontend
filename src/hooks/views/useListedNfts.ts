import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { INFT, IActive_Bids } from "@/types";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function useListedNfts() {
  const { user } = useAuth();
  const api = useAPI();
  const [ListedNftData, setListedNftData] = useState<INFT[]>([]);
  const [UserBidState, setUserBidState] = useState<IActive_Bids[]>([]);
  const [nftData, setNftData] = useState<INFT[]>([]);
  const getListedNftData = async () => {
    const result1 = await api
      .post("/api/getListedNft", { id: "mint" })
      .catch((error) => {
        toast.error(error.message);
      });
    setListedNftData(result1?.data);
    console.log("nftData ", result1?.data);
  };

  const getBidState = async () => {
    const result = await api
      .post("/api/getBidState", { id: user?.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setUserBidState(result?.data);
  };

  useEffect(() => {
    getListedNftData();
    getBidState();
  }, []);

  const getNftData = async () => {
    if (!ListedNftData) return;
    if (!UserBidState) return;
    console.log("ListedNftData", ListedNftData);
    const firstFilter = ListedNftData.filter(
      (_nft: INFT) =>
        !(_nft.status === "sold" && Number(_nft.auctiontype) === 1)
    );
    console.log("firstFilter", firstFilter);
    const secondFilter = firstFilter.filter((_nft: INFT) =>
      UserBidState.map(
        (_bidState: IActive_Bids) =>
          !(
            _bidState.nft === _nft.id &&
            _nft.status === "sold" &&
            _bidState.withdraw_amount === "0" &&
            Number(_nft.auctiontype) !== 1
          )
      )
    );
    console.log("secondFilter", secondFilter);
    setNftData(secondFilter);
  };

  useEffect(() => {
    if (!ListedNftData) return;
    if (!UserBidState) return;
    getNftData();
  }, [ListedNftData, UserBidState]);

  return nftData;
}
