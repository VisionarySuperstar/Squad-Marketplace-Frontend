"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import NewGroupModal from "@/components/main/modals/groups/newGroupModal";
import Image from "next/image";
import NFT_DATA from "@/data/nfts.json";
import GROUPS_DATA from "@/data/mygroups.json";
import NftCard from "@/components/main/cards/nftCard";
import Footer from "@/components/main/footer/footer";
import GroupCard from "@/components/main/cards/groupCard";
import Split_line from "@/components/main/split_line";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const createGroupModalState = useGroupUIControlStore(
    (state) => state.createGroupModal
  );
  function scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: elementTop - 180 + windowScrollTop,
        behavior: "smooth",
      });
    }
  }
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div className="font-Maxeville">
          {createGroupModalState && <NewGroupModal />}

          <div className="page_container_p40 mt-[130px] font-Maxeville p-5">
            <div className="flex justify-between" id="profile">
              <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5">
                <div className="h-[160px] w-[160px]">
                  <Image
                    src={user.avatar}
                    className="w-full h-full aspect-square rounded-full"
                    alt="user_avatar"
                    height={160}
                    width={160}
                  />
                </div>
                <div className="flex flex-col ">
                  <div>
                    <div className="text-gray-400">USERNAME</div>
                    <div>{user.name}</div>
                  </div>
                  <div className="mt-5">
                    <div className="text-gray-400">HANDLE</div>
                    <div>{user.email}</div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div>
                    <div className="text-gray-400">JOINED ON</div>
                    <div>APRIL 3RD, 2024</div>
                  </div>
                  <div className="mt-5">
                    <div className="text-gray-400">TOTAL COLLECTED</div>
                    <div>28</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div>
                    <div className="text-gray-400">SMART WALLETS</div>
                    <div className="flex gap-3">
                      <img src="/metamask.svg"></img>
                      <div className=" text-ellipsis max-w-[150px] overflow-hidden">
                        {user.wallet}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="underline cursor-pointer"
                onClick={() => router.push("/profile/create")}
              >
                EDIT_PROFILE
              </div>
            </div>
          </div>
          <div className="sticky top-[100px] z-10 hidden md:block">
            <nav className="bg-white bg-opacity-95 border-b-[1px] page_container_p40 font-Maxeville">
              <div>
                <div className="flex items-center h-16">
                  <div className="flex items-center cursor-pointer">
                    <div className="flex-shrink-0">{/* Logo */}</div>
                    <div className="">
                      <div className="flex items-baseline space-x-4">
                        <a
                          onClick={() => {
                            scrollToElement("profile");
                          }}
                          className="border-b-2 border-transparent hover:border-gray-400 py-2 text-lg"
                        >
                          PROFILE
                        </a>
                        <a
                          onClick={() => {
                            scrollToElement("active_bid");
                          }}
                          className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                        >
                          ACTIVE BIDS (5)
                        </a>
                        <a
                          onClick={() => {
                            scrollToElement("groups");
                          }}
                          className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                        >
                          GROUPS (3)
                        </a>
                        <a
                          onClick={() => {
                            scrollToElement("collected");
                          }}
                          className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                        >
                          COLLECTED
                        </a>
                        <a
                          onClick={() => {
                            scrollToElement("liked");
                          }}
                          className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                        >
                          LIKED
                        </a>
                        <a
                          onClick={() => {
                            scrollToElement("setting");
                          }}
                          className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                        >
                          SETTINGS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="page_container_p40">
            <div className="mt-5" id="active_bid">
              <h1 className="text-[18px]">ACTIVE BIDS (5)</h1>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 mb-5 mt-5">
                {NFT_DATA.map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                  >
                    <NftCard
                      avatar={item.avatar}
                      collectionName={item.collectionName}
                      collectionId={1}
                      seen={200}
                      favorite={20}
                      price={
                        item.currentPrice
                          ? item.currentPrice
                          : item.initialPrice
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <Split_line />
            <div className="mt-5" id="groups">
              <h1 className="text-[18px]">GROUPS (5)</h1>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 mb-5 mt-5">
                {GROUPS_DATA.map((item, index) => (
                  <GroupCard
                    key={index}
                    state={"2"}
                    name={item.name}
                    groupBio={item.bio}
                    membercount={item.members.length}
                    groupId={index.toString()}
                    avatar={item.avatar}
                  />
                ))}
              </div>
            </div>
            <Split_line />
            <div className="mt-5" id="collected">
              <div className="flex justify-between">
                <h1 className="text-[18px]">COLLECTED (28)</h1>
                <h1 className="text-[18px] underline">VIEW ALL +</h1>
              </div>

              <div className="flex p-[1px] border rounded-[30px] border-black h-[30px] md:w-[472px] xs:w-full mt-5">
                <input
                  className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
                  placeholder="SEARCH"
                ></input>
                <button className="bg-chocolate-main text-white w-[100px] rounded-[30px] font-Maxeville hover:opacity-60">
                  ENTER
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 mb-5 mt-5">
                {NFT_DATA.map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                  >
                    <NftCard
                      avatar={item.avatar}
                      collectionName={item.collectionName}
                      collectionId={1}
                      seen={200}
                      favorite={20}
                      price={
                        item.currentPrice
                          ? item.currentPrice
                          : item.initialPrice
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <Split_line />
            <div className="mt-5" id="liked">
              <div className="flex gap-3">
                <img src="/favorite.svg"></img>
                <h1 className="text-[18px]">LIKED</h1>
              </div>
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 mb-5 mt-5">
                {NFT_DATA.map((item, index) => (
                  <div
                    key={index}
                    className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                  >
                    <NftCard
                      avatar={item.avatar}
                      collectionName={item.collectionName}
                      collectionId={1}
                      seen={200}
                      favorite={20}
                      price={
                        item.currentPrice
                          ? item.currentPrice
                          : item.initialPrice
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <Split_line />
            <div className="mt-5 mb-5" id="setting">
              <div className="">
                <h1 className="text-[18px]">SETTINGS</h1>
              </div>
              <div className="mt-5">
                <div className=" text-gray-400">NOTIFICATIONS</div>
                <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 w-2/5">
                  <div className="p-[10px]">
                    <div className="text-md flex items-center">SALES</div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
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
                  <div className="p-[10px]">
                    <div className="text-md flex items-center">SALES</div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
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

                  <div className="p-[10px]">
                    <div className="text-md flex items-center">OFFERS</div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
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
                  <div className="p-[10px]">
                    <div className="text-md flex items-center">CHAT</div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
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
                  <div className="p-[10px]">
                    <div className="text-md flex items-center">REQUEST</div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
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
                </div>
              </div>
              <div className="mt-5">
                <div className="text-gray-400">WALLETS</div>
                <div className="flex flex-col mt-2">
                  <div className="text-[12px] text-gray-400">NEWS</div>
                  <div className="flex gap-5 items-center mt-2">
                    <img src="/metamask.svg"></img>
                    <div>0X111...222</div>
                    <div className="underline text-[12px]">REMOVE</div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="text-gray-400">PRIVACY</div>
                <div className="flex items-center text-xl">
                  <input
                    id="default-radio"
                    type="checkbox"
                    value=""
                    name="default-radio"
                    className="appearance-none outline-none w-5 h-5 rounded-full border-2 border-chocolate-main checked:bg-chocolate-main checked:border-transparent"
                  />
                  <label
                    htmlFor="default-radio"
                    className="ms-2 text-chocolate-main text-[18px] dark:text-gray-300"
                  >
                    MAKE MY PROFILE PRIVATE
                  </label>
                </div>
                <div className="text-[18px] text-gray-400 mt-2">
                  on `private`other users can only see your name and when you
                  joined.
                </div>
              </div>
              <div className="mt-5">
                <div className="text-gray-400">ACCOUNT</div>
                <div className="text-[12px] text-gray-400 mt-3">EMAIL</div>
                <div className="flex gap-3 mt-2">
                  <div>Z@ZAK.LLC</div>
                  <div className="underline text-[12px]">CHANGE</div>
                </div>
                <div className="text-[12px] underline mt-2">DELETE ACCOUNT</div>
              </div>
            </div>
          </div>
          <div
            className="mt-[-400px] bg-cover bg-no-repeat h-[920px] w-full -z-10"
            style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
          ></div>
          <Footer />
        </div>
      )}
    </>
  );
}
