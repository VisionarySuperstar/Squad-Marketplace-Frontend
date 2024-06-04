import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { INFT } from "@/types";
import toast from "react-hot-toast";

export default function useListedNfts() {
  const api = useAPI();
  const [ListedNftData, setListedNftData] = useState<INFT[]>([]);
  const getListedNftData = async () => {
    const result1 = await api
      .post("/api/getListedNft", { id: "mint" })
      .catch((error) => {
        toast.error(error.message);
      });
    setListedNftData(result1?.data);
    console.log("nftData ", result1?.data);
  };

  useEffect(() => {
    getListedNftData();
  }, []);

  return ListedNftData;
}
