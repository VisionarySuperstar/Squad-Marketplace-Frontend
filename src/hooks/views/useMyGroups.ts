import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { IGROUP } from "@/types";

export default function useMyGroups() {
  const api = useAPI();
  const [myGroups, setGroups] = useState<IGROUP[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await api.post("api/getGroup", {});
      setGroups(response.data);
    };

    fetchGroups();
  }, []);

  return myGroups;
}
