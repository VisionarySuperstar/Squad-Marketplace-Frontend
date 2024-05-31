import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { IGROUP } from "@/types";

export default function useAllGroups() {
  const api = useAPI();
  const [allGroups, setGroups] = useState<IGROUP[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await api.get("api/getAllGroup");
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  return allGroups;
}
