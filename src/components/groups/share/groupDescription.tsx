import React from "react";
import TrendingIcon from "@/components/svgs/trending_icon";
import renderAvatar from "@/components/utils/renderAvatar";
import { IUSER, IGROUP } from "@/types";

interface GroupDescriptionProps {
  users: IUSER[];
  myGroupData: IGROUP;
  totalEarning: string;
}



const GroupDescription: React.FC<GroupDescriptionProps> = ({
  users,
  myGroupData,
  totalEarning,
}) => {
  // console.log("users-------->", users) ;
  return (
    <>
      <div className="">
        <div className="flex gap-3">
          <div>{myGroupData.name}</div>
          <div className="flex gap-2 items-center">
            <TrendingIcon />
          </div>
        </div>
        <div className="mt-5 text-gray-400">
          <div>MEMBERS ({users.length})</div>
          <div className="my-[15px]">{renderAvatar(users)}</div>
        </div>
        <div className="flex">
          <div className="mt-5 me-5">
            <div className="text-gray-400">TOTAL MINTED</div>
            <div>{myGroupData.mintnumber ? myGroupData.mintnumber : "0"}</div>
          </div>
          <div className="mt-5 me-5">
            <div className="text-gray-400">TOTAL SOLD</div>
            <div>{myGroupData.soldnumber ? myGroupData.soldnumber : "0"}</div>
          </div>
          <div className="mt-5 me-5">
            <div className="text-gray-400">TOTAL EARNINGS</div>
            <div>{totalEarning ? totalEarning : "0"} USDC</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDescription;
