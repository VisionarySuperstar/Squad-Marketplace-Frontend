"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/main/cards/groupCard";
import groups from "@/data/groups.json";
import useAPI from "@/hooks/useAPI";
import { IGROUP } from "@/types";



interface IProps {
  scale: number;
  // sortType:string;
  // activelyRecruiting:boolean;
  // searchContent:string;
}

const AllGroup = ({ scale}: IProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [enableScale, setEnableScale] = useState<boolean>(true);
  const [allGroupData, setAllGroupData] = useState<IGROUP[]>() ;
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
    const { data: Data } = await api.get(`/api/getAllGroup`);
    console.log("all Group Data------->", Data);
    setAllGroupData(Data) ;
    
  }

  useEffect(() => {
    getAllGroupData();
  }, []) ;

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
            {allGroupData && allGroupData.map((item, index) => (
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
            {allGroupData && allGroupData.map((item, index) => (
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
