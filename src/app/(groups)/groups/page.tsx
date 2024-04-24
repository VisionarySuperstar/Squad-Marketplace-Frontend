"use client";
import React from "react";

import Sort from "@/components/groups/groupSearch/sort";
import MyGroup from "@/components/groups/myGroups";
import ViewProgress from "@/components/groups/groupSearch/viewProgress";
import Recruiting from "@/components/groups/groupSearch/recruiting";
import SearchInput from "@/components/groups/groupSearch/search";
import AllGroup from "@/components/groups/allGroups";
import GeneralButton from "@/components/groups/share/generalButton";
export default function Home() {
  const [scale, setScale] = React.useState<number>(50);

  return (
    <>
      <div className="flex justify-between w-full fixed bg-white top-[0px] h-[70px] border-b items-center p-3 z-10">
        <div></div>
        <div>
          <button className="border-2 border-black rounded-full px-5">
            NEW GROUP
          </button>
        </div>
      </div>
      <div className="grouppage_container pt-[80px]">
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mb-3 mt-5"
        ></div>
        <MyGroup />
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <h1 className="mb-3 text-lg">GROUP SEARCH</h1>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-3 mb-3"
        ></div>
        <div className=" mb-5 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-0 lg:grid-cols-[10%_15%_35%_40%] items-center justify-around">
          <Sort />
          <ViewProgress scale={scale} setScale={setScale} />
          <Recruiting />
          <div className="flex p-[1px] border rounded-[30px] border-black  h-[30px]">
            <input
              className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
              placeholder="SEARCH"
            ></input>
            <button className="bg-chocolate-main text-white w-[100px] rounded-[30px] font-Maxeville hover:opacity-60">
              ENTER
            </button>
          </div>
        </div>
        <AllGroup scale={scale} />
        <div className="flex items-center justify-center mt-5">
          <GeneralButton name={"LOAD  MORE"} />
        </div>
      </div>
    </>
  );
}
