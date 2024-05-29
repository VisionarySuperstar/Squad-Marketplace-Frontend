import { useEffect, useState } from "react";
import useAPI from "../useAPI";
import { ICOLLECTION } from "@/types";

export default function useAllGroups() {
  const api = useAPI();
  const [allCollections, setCollections] = useState<ICOLLECTION[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await api.get("api/getCollection");
      setCollections(response.data);
    };

    fetchCollections();
  }, []);

  return allCollections;
}
