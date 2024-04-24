"use client";

import React, { useState } from "react";

import GroupDescription from "@/components/groups/share/groupDescription";
import Image from "next/image";
import MyGroups from "@/data/mygroups.json";
import Nfts from "@/data/nfts.json";
const ShareGroupProfile = ({ params }: { params: { id: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const seletedGroup = MyGroups[Number(params.id)];
  const memebers_of_selectedGroup = seletedGroup.members;
  return (
    <>
      <div className="flex justify-between w-full fixed bg-white top-[0px] h-[70px] border-b items-center p-3 z-10">
        <div>
          <button className="border-2 border-black rounded-full px-5">
            BACK
          </button>
        </div>
        <div></div>
      </div>
      <div className="grouppage_container pt-[80px]">
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex">
          <div>
            <div className="gap-4 xl:grid grid-cols-2 lg:grid grid-cols-1 xl:w-[50%] xl:min-w-[920px]">
              <div className="editGroup xs:text-white md:text-white xl:text-black lg:text-black ">
                <a className="cursor-pointer">EDIT GROUP PROFILE </a>
              </div>
              <div className=" mt-5">
                <Image
                  src={seletedGroup.avatar}
                  className="w-full aspect-square"
                  alt="group_avatar"
                  width={300}
                  height={300}
                />
              </div>
              <div className="group_info mt-5">
                <GroupDescription users={memebers_of_selectedGroup} />
              </div>
            </div>
          </div>
        </div>
        <nav className="bg-white border-b-[5px] sticky top-[70px] z-10">
          <div>
            <div className="flex items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">{/* Logo */}</div>
                <div className="hidden lg:block">
                  <div className="flex items-baseline space-x-4">
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 py-2 text-lg"
                    >
                      PROFILE
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      NFTS (23)
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      OFFERS (3)
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      CREATE
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      NOTIFICATIONS (2)
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      CHAT (1)
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      NEWS
                    </a>
                    <a
                      href="#"
                      className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                    >
                      MANAGE
                    </a>
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex justify-between lg:hidden w-full">
                <div></div>
                <button
                  type="button"
                  className=" inline-flex items-center justify-center p-2 outline-none rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="#000000"
                      stroke-width="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`${isOpen ? "block" : "hidden"} lg:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Navigation links */}
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                PROFILE
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                NFTS (23)
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                CREATE
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                NOTIFICATIONS (2)
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                CHAT (1)
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                NEWS
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                MANAGE
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                PROFILE
              </a>
              {/* Other links */}
            </div>
          </div>
        </nav>
        <div className="flex justify-between text-xl mt-[20px]">
          <div>MEMBERS</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5 xl:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 mb-[20px]">
          {memebers_of_selectedGroup.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div className="bg-gray-500 aspect-square rounded-full">
                <Image
                  src={item.avatar}
                  className="rounded-full aspect-square object-cover"
                  alt="mebers"
                  width={200}
                  height={200}
                />
              </div>
              <div className="mt-3">MEMBER NAME {item.name}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xl mt-3">
          <div>NFTs (23)</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
          {Nfts.map((item, index) => (
            <div key={index} className="items-center justify-center">
              <div className="border bg-gray-200">
                <Image
                  src={item.avatar}
                  className="w-full aspect-square object-cover"
                  width={300}
                  height={300}
                  alt="NFT"
                />
              </div>
              <div className="mt-3">{item.name}</div>
            </div>
          ))}
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-md mt-3">
          <div>LISTED (12)</div>
          <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
          {Nfts.map((item, index) => (
            <div key={index} className="items-center justify-center">
              <div className="border bg-gray-200">
                <Image
                  src={item.avatar}
                  className="w-full aspect-square object-cover"
                  width={300}
                  height={300}
                  alt="NFT"
                />
              </div>
              <div className="mt-3">{item.name}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-lg">
          <div>NEWS</div>
          <div className="border-b-2 border-indigo-500">VIEW ALL</div>
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3 w-[26%]"
        ></div>
        <div className="w-[50%]">
          {[1, 2].map((item: number) => (
            <div key={item}>
              <div className="flex text-lg gap-5">
                <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
                  <Image
                    src="/user.png"
                    className="w-full h-full rounded-full"
                    alt="news_avatar"
                    width={100}
                    height={100}
                  />
                </div>
                <div>We are looking for a talented photographer.</div>
                <div className="text-gray-400">NEW</div>
              </div>
              <div
                style={{ borderBottom: "3px solid #ccc" }}
                className="mt-5 mb-3 w-[52%]"
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShareGroupProfile;
