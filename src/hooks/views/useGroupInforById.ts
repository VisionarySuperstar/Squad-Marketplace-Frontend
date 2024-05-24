import { useState } from "react";
import useAPI from "../useAPI";
import { IGROUP } from "@/types";

export function useGroupInforById(id: string) {
  const api = useAPI();
  const [groupInfor, setGroupInfor] = useState<IGROUP>();

  const getGroupInforById = async () => {
    const response = await api.post("api/getGroupId", { id });
    setGroupInfor(response.data);
  };

  return { groupInfor, getGroupInforById };
}
