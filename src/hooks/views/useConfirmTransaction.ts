import { useState } from "react";
import useAPI from "../useAPI";
import {
  IDIRECTOR_TRANSACTION,
  INFT,
  IOFFER_TRANSACTION,
  IRequest,
} from "@/types";

export function useConfirmTransaction(id: string) {
  const api = useAPI();
  const [offerTransactions, setOfferTransactions] = useState<
    IOFFER_TRANSACTION[]
  >([]);
  const [directorTransactions, setDirectorTransactions] = useState<
    IDIRECTOR_TRANSACTION[]
  >([]);
  const [joinRequestsTransactions, setJoinRequestTransactions] = useState<
    IRequest[]
  >([]);

  const getOfferingTransaction = async () => {
    const offeringResponse = await api.post("/api/getOffering", { id });
    setOfferTransactions(offeringResponse?.data);
  };

  const getDerectorSettingTransaction = async () => {
    const directorSettingResponse = await api.post("/api/getDirector", { id });
    setDirectorTransactions(directorSettingResponse?.data);
  };

  const getJoinRequestTransaction = async () => {
    const result_requests = await api.post("/api/getJoinRequestByGroupId", {
      id,
    });
    setJoinRequestTransactions(result_requests?.data);
  };

  return {
    offerTransactions,
    directorTransactions,
    joinRequestsTransactions,
    getOfferingTransaction,
    getDerectorSettingTransaction,
    getJoinRequestTransaction,
  };
}
