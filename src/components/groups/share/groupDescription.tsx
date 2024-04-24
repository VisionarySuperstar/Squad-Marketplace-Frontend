import React from "react";
import Image from "next/image";
import TrendingIcon from "@/components/svgs/trending_icon";

interface User {
  name: string;
  avatar: string;
}

interface GroupDescriptionProps {
  users: User[];
}

const GroupDescription: React.FC<GroupDescriptionProps> = ({ users }) => {
  const _renderAvatar = (items: User[], index: number, len: number) => {
    if (index % 3 === 0 && index < len) {
      return (
        <div className="absolute left-[120%] top-[-117%] w-[70px] bg-gray-500 aspect-square rounded-full">
          <Image
            src={items[0].avatar}
            className="w-full h-full rounded-full object-cover"
            width={100}
            height={100}
            alt="avatar"
          />
          {_renderAvatar(items.slice(1, items.length), index + 1, len)}
        </div>
      );
    } else if (index % 3 === 1 && index < len) {
      return (
        <div className="absolute left-[60%] top-[60%] w-[70px] bg-gray-500 aspect-square rounded-full">
          <Image
            src={items[0].avatar}
            className="w-full h-full rounded-full object-cover"
            width={100}
            height={100}
            alt="avatar"
          />
          {_renderAvatar(items.slice(1, items.length), index + 1, len)}
        </div>
      );
    } else if (index % 3 === 2 && index < len) {
      return (
        <div className="absolute left-[-60%] top-[60%] w-[70px] bg-gray-500 aspect-square rounded-full">
          <Image
            src={items[0].avatar}
            className="w-full h-full rounded-full object-cover"
            width={100}
            height={100}
            alt="avatar"
          />
          {_renderAvatar(items.slice(1, items.length), index + 1, len)}
        </div>
      );
    }
  };
  return (
    <>
      <div className="">
        <div className="flex gap-3">
          <div>032C</div>
          <div className="flex gap-2 items-center">
            <TrendingIcon />
          </div>
        </div>
        <div className="mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div className="mt-5 text-gray-400">
          <div>MEMBERS ({users.length})</div>
          <div className="relative w-0 mt-5">
            {_renderAvatar(users, 0, users.length)}
          </div>
        </div>
        <div className="flex mt-[170px]">
          <div className="mt-5 me-5">
            <div className="text-gray-400">TOTAL MINTED</div>
            <div>32</div>
          </div>
          <div className="mt-5 me-5">
            <div className="text-gray-400">TOTAL SOLD</div>
            <div>20</div>
          </div>
          <div className="mt-5 me-5">
            <div className="text-gray-400">TOTAL EARNINGS</div>
            <div>10000 USDC</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupDescription;
