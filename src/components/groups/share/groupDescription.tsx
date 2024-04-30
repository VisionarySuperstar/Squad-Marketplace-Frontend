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
  const _renderAvatar = (items: any[]) => {
    const number: number = items.length;
    const len: number = Math.floor(number / 3);
    if (number == 1) {
      return (
        <div className="flex justify-center items-center w-[50px] h-[50px] ml-[50px]">
          <Image
            src={items[0].avatar}
            width={500}
            height={500}
            className="rounded-full w-full h-full aspect-square object-cover"
            alt="avatar"
          />
        </div>
      );
    }
    if (number == 2) {
      return (
        <div className="flex ">
          <div className="h-[50px] w-[50px]">
            <Image
              src={items[0].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full  object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
          <div className="-ml-2 h-[50px] w-[50px]">
            <Image
              src={items[1].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full  object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
        </div>
      );
    }
    if (number == 3) {
      return (
        <div>
          <div className="">
            <div className="h-[50px] w-[50px] ml-[25px]">
              <Image
                src={items[2].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="flex -mt-2">
            <div className="h-[50px] w-[50px]">
              <Image
                src={items[0].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full  object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
            <div className="h-[50px] w-[50px]">
              <Image
                src={items[1].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      );
    }
    if (number == 4) {
      return (
        <div>
          <div className="">
            <div className="h-[50px] w-[50px] ml-[25px]">
              <Image
                src={items[2].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="flex -mt-3">
            <div className="h-[50px] w-[50px]">
              <Image
                src={items[0].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full  object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
            <div className="h-[50px] w-[50px]">
              <Image
                src={items[1].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          </div>
          <div className="-mt-3">
            <div className="h-[50px] w-[50px] ml-[25px] ">
              <Image
                src={items[3].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      );
    }
    if (number % 3 == 2) {
      return (
        <div>
          <div className="flex">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div key={i} className="h-[50px] w-[50px] ml-[10px]">
                <Image
                  src={items[i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex -mt-3">
            {Array.from({ length: len }, (_, i) => (
              <div
                key={i}
                className={`h-[50px] w-[50px] ${
                  !i ? "ml-[40px]" : "ml-[10px]"
                }`}
              >
                <Image
                  src={items[len + i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex -mt-3">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div key={i} className="h-[50px] w-[50px] ml-[10px]">
                <Image
                  src={items[2 * len + i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (number % 3 == 0) {
      // Handle case when number is divisible by 3
      return (
        <div>
          <div className="flex ml-[30px]">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div key={i} className="h-[50px] w-[50px] ml-[10px]">
                <Image
                  src={items[i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex -mt-3">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div
                key={i}
                className={`h-[50px] w-[50px] ${
                  !i ? "ml-[10px]" : "ml-[10px]"
                }`}
              >
                <Image
                  src={items[len + i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex -mt-3 ml-[30px]">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div key={i} className="h-[50px] w-[50px] ml-[10px]">
                <Image
                  src={items[2 * len + i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (number % 3 == 1) {
      // Handle case when number modulo 3 is 1
      return (
        <div>
          <div className="flex ml-[30px]">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div key={i} className="h-[50px] w-[50px] ml-[10px]">
                <Image
                  src={items[i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex -mt-3">
            {Array.from({ length: len + 2 }, (_, i) => (
              <div
                key={i}
                className={`h-[50px] w-[50px] ${
                  !i ? "ml-[10px]" : "ml-[10px]"
                }`}
              >
                <Image
                  src={items[len + i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="flex -mt-3 ml-[30px]">
            {Array.from({ length: len + 1 }, (_, i) => (
              <div key={i} className="h-[50px] w-[50px] ml-[10px]">
                <Image
                  src={items[2 * len + i].avatar}
                  width={300}
                  height={300}
                  className="rounded-full aspect-square h-full w-full object-cover"
                  alt="avatar"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
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
        <div className="mt-5 text-gray-400">
          <div>MEMBERS ({users.length})</div>
          <div className="my-[15px]">{_renderAvatar(users)}</div>
        </div>
        <div className="flex">
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
