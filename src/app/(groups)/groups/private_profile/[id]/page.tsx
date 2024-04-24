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
  const _renderAvatar = (items: any[], index: number, len: number) => {
    if (index % 3 === 0 && index < len) {
      return (
        <div className="absolute left-[120%] top-[-117%] w-10 bg-gray-500 aspect-square rounded-full">
          <Image
            src="/rabbit.jpg"
            className="w-full h-full rounded-full object-cover"
            width={30}
            height={30}
            alt="avatar"
          />
          {_renderAvatar(items.slice(1, items.length), index + 1, len)}
        </div>
      );
    } else if (index % 3 === 1 && index < len) {
      return (
        <div className="absolute left-[60%] top-[60%] w-10 bg-gray-500 aspect-square rounded-full">
          <Image
            src="/rabbit.jpg"
            className="w-full h-full rounded-full object-cover"
            width={30}
            height={30}
            alt="avatar"
          />
          {_renderAvatar(items.slice(1, items.length), index + 1, len)}
        </div>
      );
    } else if (index % 3 === 2 && index < len) {
      return (
        <div className="absolute left-[-60%] top-[60%] w-10 bg-gray-500 aspect-square rounded-full">
          <Image
            src="/rabbit.jpg"
            className="w-full h-full rounded-full object-cover"
            width={30}
            height={30}
            alt="avatar"
          />
          {_renderAvatar(items.slice(1, items.length), index + 1, len)}
        </div>
      );
    }
  };
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
        <div className="flex justify-between text-xl mt-3">
          <div>NFTs (23)</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="flex justify-between text-md mt-3">
          <div>SOLD (4)</div>
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
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-md mt-3">
          <div>NOT LISTED (7)</div>
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
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-lg">
          <div>OFFERS (3)</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="justify-start gap-2 mt-3">
          {[1, 2, 3].map((item: number) => (
            <div key={item}>
              <div className="min-w-[50%] flex gap-3">
                <div>
                  <Image
                    src="/rabbit.jpg"
                    className="aspect-square object-cover"
                    width={300}
                    height={300}
                    alt="offer"
                  />
                </div>
                <div className="flex flex-col ">
                  <div className="flex gap-2">
                    <div>John</div>
                    <div className="text-gray-400">OFFERED</div>
                    <div>1000 USDC</div>
                    <div className="text-gray-400">FOR</div>
                    <div>TITLE</div>
                  </div>
                  <div className="text-gray-400 mt-5 text-md">
                    CONFIRMED BY 3/6
                  </div>
                  <div className="relative w-0 mt-5">
                    {_renderAvatar([1, 2, 3], 0, 3)}
                  </div>

                  <div className="flex flex-col w-full mt-[100px] gap-5">
                    <button className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg">
                      CONFIRM
                    </button>
                    <button className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg">
                      EXECUTE
                    </button>
                  </div>
                </div>
              </div>
              {item !== 3 && (
                <div
                  style={{ borderBottom: "3px solid #ccc" }}
                  className="mt-5 mb-3 w-[50%]"
                ></div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-xl">
          <div>CREATE</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="flex justify-between text-md mt-3">
          <div>UPLOADED CONTENTS</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2">
          {[1, 2, 3, 4, 5].map((item: number) => (
            <div key={item} className="flex flex-col">
              <div>
                <div className="content-card border bg-gray-200 relative ">
                  {item === 5 && (
                    <div className="w-full aspect-square flex justify-center items-center">
                      <div>UPLOAD NEW</div>
                    </div>
                  )}
                  {item !== 5 && (
                    <Image
                      src="/rabbit.jpg"
                      className="w-full h-full aspect-square object-cover"
                      width={300}
                      height={300}
                      alt="uploaded content"
                    />
                  )}
                  {item !== 5 && (
                    <div className="content-card-menu hidden justify-center gap-1 flex-col items-center absolute top-0 w-full h-full bg-chocolate-main/50">
                      <button className="border bg-[#322A44] text-white rounded-full pt-2 pb-2 pl-3 pr-3 w-1/2 text-lg">
                        MINT
                      </button>
                      <button className="border bg-[#EF2121] text-white rounded-full pt-2 pb-2 pl-3 pr-3 w-1/2 text-lg">
                        DELETE
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {item !== 5 && (
                <div className="mt-3">{item === 1 ? "UNTITLED" : "TITLE"}</div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-center items-center mt-5">
          <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg">
            UPLOAD NEW +
          </button>
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>

        <div className="flex justify-between text-xl">
          <div>NEWS</div>
          <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
        </div>
        <div className="flex w-[40%] items-top mt-5 gap-5">
          <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
            <img src="/rabbit.jpg" className="w-full h-full rounded-full" />
          </div>
          <div className="text-xl w-[60%]">
            We are looking for a talented photographer!
          </div>
          <div className="text-gray-400 w-[40%] text-right">2/14/24</div>
        </div>
        <div className="flex w-[40%] items-top mt-5 gap-5">
          <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
            <img src="/rabbit.jpg" className="w-full h-full rounded-full" />
          </div>
          <div className="text-xl w-[60%]">
            We just sold 10 pieces! Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
          <div className="text-gray-400 w-[40%] text-right">1/26/24</div>
        </div>
        <div className="flex w-[40%] items-top mt-5 gap-5">
          <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
            <img src="/rabbit.jpg" className="w-full h-full rounded-full" />
          </div>
          <div className="text-xl w-[70%] border border-black rounded-xl">
            <textarea
              rows={4}
              className="w-[70%] p-4 border-0 outline-none"
              placeholder="Write a message to share with those outside your group."
            />
          </div>
          <div className="text-gray-400 w-[40%] text-right">
            <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[102px] text-lg">
              SEND
            </button>
          </div>
        </div>
        <div className="flex items-center text-xl mt-5">
          <input
            id="default-radio-2"
            type="radio"
            value=""
            name="default-radio"
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            id="default-radio-2"
            className="ms-2  font-medium text-gray-900 dark:text-gray-300"
          >
            ACTIVELY RECRUITING
          </label>
        </div>
        <div className="text-gray-400">
          Looking to fill a role? set “actively recruiting” so users can find
          your group!
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-xl">
          <div>MANAGE</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="mt-5">
          <h1 className="border-b-2 border-gray-400 w-[9.5%]">
            SET A NEW DIRECTOR
          </h1>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-5 xl:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3">
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
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-xl">
          <div>Withdraw</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="flex items-center mt-5 gap-5 text-xl">
          <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
            <img src="/rabbit.jpg" className="w-full h-full rounded-full" />
          </div>
          <div>AMOUNT</div>
          <div className="flex border-2 border-black items-center justify-center pl-5 pr-5 rounded-[10%] text-gray-400">
            1500
          </div>
          <div>USDC</div>
          <div>
            <button className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg">
              Withdraw
            </button>
          </div>
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-xl">
          <div>Withdraw From Marketplace</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="flex items-center mt-5 gap-5 text-xl">
          <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
            <img
              src="/group_profile.jpg"
              className="w-full h-full rounded-full"
            />
          </div>
          <div>AMOUNT</div>
          <div className="flex border-2 border-black items-center justify-center pl-5 pr-5 rounded-[10%] text-gray-400">
            3000
          </div>
          <div>USDC</div>
          <div>
            <button className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg">
              Withdraw
            </button>
          </div>
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
        <div className="flex justify-between text-xl">
          <div>Change Confirm Number</div>
          <div className="border-b-2 border-indigo-500"></div>
        </div>
        <div className="flex items-center mt-5 gap-5 text-xl">
          <div className="w-10 h-10 bg-gray-500 aspect-square rounded-full">
            <img
              src="/group_profile.jpg"
              className="w-full h-full rounded-full"
            />
          </div>
          <div>Current Confirm Number</div>
          <div className="flex border-2 border-black items-center justify-center pl-5 pr-5 rounded-[10%] text-gray-400">
            3
          </div>
          <div>
            <input type="string" className="border-2 border-black " />
          </div>
          <div>
            <button className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg">
              EXECUTE
            </button>
          </div>
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>

        <div className="flex justify-center items-center mt-5">
          <button className="border bg-[#FF0000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg">
            LEAVE THIS GROUP
          </button>
        </div>
        <div
          style={{ borderBottom: "3px solid #ccc" }}
          className="mt-5 mb-3"
        ></div>
      </div>
    </>
  );
};

export default ShareGroupProfile;
