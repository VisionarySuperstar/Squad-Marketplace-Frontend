/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { INFT } from "@/types";

export default function useAllNfts() {
  const api = useAPI();
  const [allNfts, setAllNfts] = useState<INFT[]>([]);

  useEffect(() => {
    const fetchNFTS = async () => {
      const response = await api.get("api/getAllNft");
      setAllNfts(response.data);
    };

    fetchNFTS();
  }, []);

  return allNfts;
}
