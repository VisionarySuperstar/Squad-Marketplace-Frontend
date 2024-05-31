import { useState } from "react";
import useAPI from "../useAPI";
import { INFT } from "@/types";

export function useNftsByGroupAndStatus(id: string) {
  const api = useAPI();
  const [soldNfts, setSoldNfts] = useState<INFT[]>([]);
  const [listedNfts, setListedNfts] = useState<INFT[]>([]);
  const [mintedNfts, setMintedNfts] = useState<INFT[]>([]);

  const getNFTData = async () => {
    const soldNftResponse = await api.post("/api/getNftByGroupAndStatus", {
      id,
      status: "sold",
    });
    setSoldNfts(soldNftResponse?.data);
    const listNftResponse = await api.post("/api/getNftByGroupAndStatus", {
      id,
      status: "list",
    });
    setListedNfts(listNftResponse?.data);
    const mintNftResponse = await api.post("/api/getNftByGroupAndStatus", {
      id,
      status: "mint",
    });
    setMintedNfts(mintNftResponse?.data);
  };

  return { soldNfts, listedNfts, mintedNfts, getNFTData };
}
