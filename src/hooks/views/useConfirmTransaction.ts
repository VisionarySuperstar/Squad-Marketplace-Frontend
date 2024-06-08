import { useState } from "react";
import useAPI from "../useAPI";
import {
  INFT,
  IOFFER_TRANSACTION,
} from "@/types";

export function useConfirmTransaction(id: string) {
  const api = useAPI();
  const [offerTransactions, setOfferTransactions] = useState<
    IOFFER_TRANSACTION[]
  >([]);

  const getOfferingTransaction = async () => {
    const offeringResponse = await api.post("/api/getOffering", { id });
    setOfferTransactions(offeringResponse?.data);
  };

  return {
    offerTransactions,
    getOfferingTransaction,
  };
}