"use client";
import React, { useState } from "react";

interface RecruitingInterface {
  name: string;
  recruitingState: boolean;
  setRecruitingState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Recruiting = ({
  recruitingState,
  setRecruitingState,
  name,
}: RecruitingInterface) => {
  return (
    <div className="flex gap-3 px-[10px]">
      <label className="inline-flex items-center cursor-pointer">
        <div className="text-md lg:min-w-[180px] me-[10px] flex items-center justify-end">
          {name}
        </div>
        <input
          type="checkbox"
          checked={recruitingState}
          onChange={() => setRecruitingState(!recruitingState)}
          className="sr-only peer"
        />
        <div
          className="relative w-[58px] h-[30px] appearance-none border border-chocolate-main p-2
                 bg-white rounded-full
                 peer-checked:after:translate-x-full
                 rtl:peer-checked:after:-translate-x-full
                 after:absolute after:top-[1px] after:start-[2px]
                 after:border-gray-300 after:border after:rounded-full
                 after:content-[''] after:bg-chocolate-main
                 after:h-[26px] after:w-[26px] after:transition-all"
        ></div>
      </label>
    </div>
  );
};

export default Recruiting;
