import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { IGROUP } from "@/types";
import useAuth from "../useAuth";

export default function useMyGroups() {
  const api = useAPI();
  const [myGroups, setGroups] = useState<IGROUP[]>([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await api.post("api/getGroupByUser", { id: user?.id });
      setGroups(response.data);
    };

    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return myGroups;
}
