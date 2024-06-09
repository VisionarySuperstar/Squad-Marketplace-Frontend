/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

//import component
import Card from "@/components/main/cards/groupCard";
//import hook
import useAPI from "@/hooks/useAPI";
import useAuth from "@/hooks/useAuth";
//import types
import { IGROUP } from "@/types";
//import store
import useCreatGroupState from "@/store/createGroupStatus";
import toast from "react-hot-toast";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import Split_line from "@/components/main/split_line";

const MyGroup = () => {
  //use state
  const [MyGroupData, setMyGroupData] = useState<IGROUP[]>([]);
  //use auth
  const { user } = useAuth();
  //use api
  const api = useAPI();
  //zustand
  const createGroupState = useCreatGroupState((state) => state.state);
  const updateCreateGroupState = useCreatGroupState(
    (state) => state.updateState
  );
  //func
  const getJoinedGroupData = async () => {
    const response = await api
      .post(`/api/getGroupByUser`, { id: user?.id })
      .catch((error) => {
        toast.error(error.message);
      });
    setMyGroupData(response?.data);
    updateCreateGroupState("ready");
  };
  //use effect
  useEffect(() => {
    getJoinedGroupData();
  }, [user]);

  useEffect(() => {
    if (createGroupState == "just_created") getJoinedGroupData();
  }, [createGroupState]);
  const setCreateGroupModalState = useGroupUIControlStore(
    (state) => state.updateCreateGroupModal
  );
  return (
    <div>
      {user && (
        <>
          <Split_line />
          <h1 className="my-5 text-lg">MY GROUPS({MyGroupData?.length})</h1>
          {MyGroupData?.length ? (
            <>
              <div className="gap-3 flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {MyGroupData?.map((item, index) => (
                  <Card
                    key={index}
                    state={"2"}
                    name={item.name}
                    groupBio={item.description}
                    membercount={item.member.length}
                    groupId={item.id}
                    avatar={item.avatar}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center mt-5 min-h-[150px]">
              <button
                onClick={() => setCreateGroupModalState(true)}
                className="border border-black rounded-full pl-4 pr-4 w-[350px] text-[18px] mb-[5px] text-center flex items-center justify-center bg-white text-black-main hover:bg-black-main hover:text-white transition-all"
              >
                CREATE NEW GROUP
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyGroup;
