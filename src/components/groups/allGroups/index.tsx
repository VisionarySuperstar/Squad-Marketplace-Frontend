/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/main/cards/groupCard";
import useAPI from "@/hooks/useAPI";
import { IGROUP } from "@/types";
import useCreatGroupState from "@/store/createGroupStatus";
import toast from "react-hot-toast";

interface IProps {
  scale: number;
  recruitingState: boolean;
  searchFilter: string;
}

const AllGroup = ({ scale, recruitingState, searchFilter }: IProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [enableScale, setEnableScale] = useState<boolean>(true);
  const [allGroupData, setAllGroupData] = useState<IGROUP[]>();
  const createGroupState = useCreatGroupState((state) => state.state);
  const updateCreateGroupState = useCreatGroupState(
    (state) => state.updateState
  );
  const api = useAPI();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screen width
    setScreenWidth(window.innerWidth);
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getAllGroupData = async () => {
    const response = await api.get(`/api/getAllGroup`).catch((error) => {
      toast.error(error.message);
    });
    setAllGroupData(response?.data);
    updateCreateGroupState("ready");
  };

  const filterAllGroupData_state = async () => {
    if (!allGroupData) return;
    if (recruitingState) {
      const _groupdata = allGroupData.filter(
        (_group: IGROUP) => _group.is_actively_recruiting === recruitingState
      );
      setAllGroupData(_groupdata);
    } else {
      getAllGroupData();
    }
  };

  const filterAllGroupData_search = async () => {
    if (!allGroupData) return;
    if (searchFilter) {
      const _groupdata = allGroupData.filter((_group: IGROUP) =>
        _group.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
      setAllGroupData(_groupdata);
    } else {
      getAllGroupData();
    }
  };

  useEffect(() => {
    filterAllGroupData_state();
  }, [recruitingState]);

  useEffect(() => {
    filterAllGroupData_search();
  }, [searchFilter]);

  useEffect(() => {
    getAllGroupData();
  }, []);

  useEffect(() => {
    if (createGroupState == "just_created") getAllGroupData();
  }, [createGroupState]);

  useEffect(() => {
    setEnableScale(screenWidth > 1000);
  }, [screenWidth]);

  return (
    <>
      {enableScale && (
        <div>
          <div
            className={`gap-3 flex-wrap grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
            style={{
              gridTemplateColumns: `repeat(${Math.floor(
                (100 - scale) / 10 + 1
              )}, 1fr)`,
            }}
          >
            {allGroupData &&
              allGroupData?.map((item, index) => (
                <Card
                  key={index}
                  state={"1"}
                  name={item.name}
                  groupBio={item.description}
                  membercount={item.member.length}
                  groupId={item.id}
                  avatar={item.avatar}
                />
              ))}
          </div>
        </div>
      )}
      {!enableScale && (
        <div>
          <div
            className={`gap-3 flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5`}
          >
            {allGroupData?.map((item, index) => (
              <Card
                key={index}
                state={"1"}
                groupBio={item.description}
                membercount={item.member.length}
                name={item.name}
                groupId={item.id}
                avatar={item.avatar}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllGroup;
