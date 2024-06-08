import { useState } from "react";
import useAPI from "../useAPI";
import { IGROUP } from "@/types";
import useAuth from "../useAuth";
import toast from "react-hot-toast";

export function useGroupInforById(id: string) {
  const api = useAPI();
  const { user } = useAuth();
  const [groupInfor, setGroupInfor] = useState<IGROUP>();
  const [isDirector, setIsDirector] = useState<boolean>(false);

  const getGroupInforById = async () => {
    const response = await api.post("api/getGroupById", { id });
    const data = response.data;
    await setGroupInfor(data);
    if (data?.director === user?.id) setIsDirector(true);
  };

  return { groupInfor, isDirector, getGroupInforById };
}
