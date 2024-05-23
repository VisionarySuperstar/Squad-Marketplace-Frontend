import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { IActive_Bids } from "@/types";
import useAuth from "../useAuth";

export default function useActiveBids() {
  const api = useAPI();
  const [myBidState, setMyBidState] = useState<IActive_Bids[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await api.post("api/getBidState", {id:user?.id});
      setMyBidState(response.data);
      console.log("response.data", response.data) ;
    };

    fetchGroups();
  }, []);

  return myBidState;
}
