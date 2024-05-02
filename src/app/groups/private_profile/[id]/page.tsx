"use client";

import React, { useState, useEffect } from "react";

import GroupDescription from "@/components/groups/share/groupDescription";
import Image from "next/image";
import Split_line from "@/components/main/split_line";
import Footer from "@/components/main/footer/footer";
import MintModal from "@/components/main/modals/groups/mintModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import { useRouter } from "next/navigation";
import renderAvatar from "@/components/utils/renderAvatar";
import useLoadingControlStore from "@/store/UI_control/loading";

//import data
import Groups from "@/data/groups.json";
import SoldNfts from "@/data/sold_nfts.json";
import listedNfts from "@/data/listed_nfts.json";
import MintedNfts from "@/data/minted_nfts.json";
import NftCard from "@/components/main/cards/nftCard";

const ShareGroupProfile = ({ params }: { params: { id: string } }) => {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  }, [setLoadingState]);
  const router = useRouter();
  const seletedGroup = Groups[Number(params.id)];
  const memebers_of_selectedGroup = seletedGroup.members;
  const mintModalState = useGroupUIControlStore((state) => state.mintModal);
  const setMintModalState = useGroupUIControlStore(
    (state) => state.updateMintModal
  );
  const [uploadId, setUploadId] = useState<number>(-1);

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

  return (
    <>
      {mintModalState && (
        <MintModal uploadId={uploadId} groupId={parseInt(params.id)} />
      )}
      <div className="pt-[100px] h-full">
        <div className="grouppage_container flex font-Maxeville" id="profile">
          <div>
            <div className="gap-4 grid xl:grid-cols-2 lg:grid-cols-1 xl:w-[50%] xl:min-w-[920px] xs:w-full xs:h-full">
              <div className="mt-5 xs:w-full xs:h-full">
                <Image
                  src={seletedGroup.avatar}
                  className="w-full aspect-square object-cover"
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
        <div className="sticky top-[100px] z-10 hidden md:block">
          <nav className="bg-white bg-opacity-95 border-b-[1px] grouppage_container font-Maxeville">
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
                          scrollToElement("nfts");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        NFTS (23)
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("offers");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        OFFERS (3)
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("create");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        CREATE
                      </a>
                      <a
                        onClick={() => {
                          scrollToElement("withdraw");
                        }}
                        className="border-b-2 border-transparent hover:border-gray-400 px-3 py-2 text-lg"
                      >
                        WITHDRAW
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="grouppage_container font-Maxeville">
          <div className="flex justify-between text-xl mt-5" id="nfts">
            <div>NFTs (23)</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="flex justify-between text-md mt-3">
            <div>SOLD (4)</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {SoldNfts.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                onClick={() => router.push(`/details/private/sold/${item.id}`)}
              >
                <NftCard name={item.name} avatar={item.avatar} />
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>LISTED (12)</div>
            <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {listedNfts.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                onClick={() => router.push(`/details/private/sold/${item.id}`)}
              >
                <NftCard name={item.name} avatar={item.avatar} />
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-md mt-3">
            <div>NOT LISTED (7)</div>
            <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
          </div>
          <div className="grid grid-cols-6 gap-4 mt-5 xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 mb-[50px]">
            {MintedNfts.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square text-md content-card cursor-pointer drop-shadow-md"
                onClick={() => router.push(`/details/private/sold/${item.id}`)}
              >
                <NftCard name={item.name} avatar={item.avatar} />
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-lg" id="offers">
            <div>OFFERS (3)</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="justify-start gap-2 mt-3 lg:grid lg:grid-cols-2 xs:grid xs:grid-cols-1">
            {[1, 2, 3].map((item: number) => (
              <div key={item}>
                <div className="min-w-[50%] flex mt-[30px] gap-5">
                  <div>
                    <Image
                      src="/temp.jpg"
                      className="aspect-square object-cover rounded-lg"
                      width={300}
                      height={300}
                      alt="offer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-[5px]">John</div>
                    <div className="xs:grid xs:grid-cols-1 lg:grid lg:grid-cols-1 xl:grid xl:grid-cols-3">
                      <div className="flex me-[5px]">
                        <div className="text-gray-400">OFFERED</div>
                        <div className="ms-[5px]">1000 USDC</div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-400">FOR</div>
                        <div className="ms-[5px]">TITLE</div>
                      </div>
                    </div>
                    <div className="text-gray-400 mt-5 text-md">
                      CONFIRMED BY 3/6
                    </div>
                    <div className="my-[20px]">
                      {renderAvatar(memebers_of_selectedGroup)}
                    </div>
                    <div className="flex flex-col w-full">
                      <button className="border border-black rounded-full pl-4 pr-4 w-[200px] text-[18px] mb-[5px]">
                        CONFIRM
                      </button>
                      <button className="border border-black rounded-full pl-4 pr-4 w-[200px] text-[18px]">
                        EXECUTE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-between text-xl" id="create">
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
                  <div className="content-card relative ">
                    <Image
                      src="/temp.jpg"
                      className="w-full h-full aspect-square object-cover rounded-lg"
                      width={300}
                      height={300}
                      alt="uploaded content"
                    />
                    <div className="content-card-menu hidden justify-center gap-1 flex-col items-center absolute top-0 w-full h-full bg-chocolate-main/80 rounded-lg">
                      <button
                        className="border bg-[#322A44] text-white rounded-full w-[75%] text-[18px] h-[30px]"
                        onClick={() => {
                          setMintModalState(true);
                          setUploadId(item);
                        }}
                      >
                        MINT
                      </button>
                      <button className="border bg-[#EF2121] text-white rounded-full w-[75%] text-[18px] h-[30px]">
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
                {item !== 5 && (
                  <div className="mt-3">
                    {item === 1 ? "UNTITLED" : "TITLE"}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Split_line />
          <div className="flex justify-center items-center mt-5">
            <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[380px] text-lg">
              UPLOAD NEW
            </button>
          </div>
          <Split_line />

          <div className="flex justify-between text-xl">
            <div>NEWS</div>
            <div className="border-b-2 border-indigo-500">VIEW ALL +</div>
          </div>
          <div className="mt-5 gap-5 grid lg:grid-cols-2 xs:grid-cols-1">
            <div>
              <textarea
                rows={4}
                className="p-4 outline-none border w-full border-chocolate-main rounded-lg"
                placeholder="Write a message to share with those outside your group."
              />
              <div className="text-gray-400 text-right">
                <button className="border bg-[#322A44] text-white rounded-full pl-4 pr-4 w-[102px] text-lg">
                  SEND
                </button>
              </div>
            </div>
            <div></div>
          </div>
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
              className="ms-2  font-medium text-gray-900 dark:text-gray-300"
            >
              ACTIVELY RECRUITING
            </label>
          </div>
          <div className="text-gray-400">
            Looking to fill a role? set “actively recruiting” so users can find
            your group!
          </div>
          <Split_line />
          <div className="flex justify-between text-xl">
            <div>MANAGE</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="mt-5">
            <h1>SET A NEW DIRECTOR</h1>
          </div>
          <div className="grid grid-cols-8 mt-5 xl:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3">
            {memebers_of_selectedGroup.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center"
              >
                <div className="aspect-square rounded-full">
                  <Image
                    src={item.avatar}
                    className="rounded-full aspect-square object-cover"
                    alt="mebers"
                    width={160}
                    height={160}
                  />
                </div>
                <div className="mt-3 justify-center">
                  <p className="flex justify-center">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
          <Split_line />
          <div className="text-xl" id="withdraw">
            <div className="text-md">Withdraw</div>
            <div className="border-b-2 border-indigo-500"></div>
          </div>
          <div className="mt-5 text-lg lg:flex">
            <div className="flex gap-5">
              <div className="flex items-center h-[32px]">AMOUNT</div>
              <div className="flex border-2 border-black items-center justify-center pl-5 pr-5 rounded-lg text-gray-400">
                1500
              </div>
              <div className="flex items-center h-[32px]">USDC</div>
            </div>
            <div className="lg:block xs:flex xs:justify-center xs:mt-5 lg:mt-0 lg:ms-[25px]">
              <button className="border border-black rounded-full pl-4 pr-4 w-[190px] text-lg hover:bg-chocolate-main hover:text-white transition-all">
                Withdraw
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <button className="border bg-[#FF0000] text-white rounded-full pl-4 pr-4 w-[380px] text-lg">
              LEAVE THIS GROUP
            </button>
          </div>
          <Split_line />
        </div>
        <div
          className="mt-[-400px] bg-cover bg-no-repeat h-[920px] w-full -z-10"
          style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
        ></div>
        <Footer />
      </div>
    </>
  );
};

export default ShareGroupProfile;
