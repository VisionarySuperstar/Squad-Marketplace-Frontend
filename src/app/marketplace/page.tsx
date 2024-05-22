/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Sort from "@/components/groups/groupSearch/sort";
import ViewProgress from "@/components/groups/groupSearch/viewProgress";
import Recruiting from "@/components/groups/groupSearch/recruiting";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import Carousel from "@/components/main/carousel";
import { useRouter } from "next/navigation";
import NftCard from "@/components/main/cards/nftCard";
import { INFT } from "@/types";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";

export default function Home() {
  const [scale, setScale] = React.useState<number>(65);

  const [enableScale, setEnableScale] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  const updateNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );

  const [allNftData, setAllNftData] = useState<INFT[]>([]);
  const api = useAPI();

  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  }, [setLoadingState]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    const handleScroll = () => {
      const carouselElement = document.getElementById("marketplace_carousel");
      let carouselHeight = 0;
      if (carouselElement) {
        carouselHeight = carouselElement.clientHeight;
      }
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition >= carouselHeight) {
        updateNavbarBackground(true);
      } else {
        updateNavbarBackground(false);
      }
    };
    // Set initial screen width
    setScreenWidth(window.innerWidth);
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updateNavbarBackground]);

  const getAllNftData = async () => {
    const result1 = await api
      .post("/api/getListedNft", { id: "mint" })
      .catch((error) => {
        toast.error(error.message);
      });
    setAllNftData(result1?.data);
    console.log("nftData ", result1?.data);
  };
  useEffect(() => {
    getAllNftData();
  }, []);

  useEffect(() => {
    setEnableScale(screenWidth > 1000);
  }, [screenWidth]);
  const router = useRouter();
  const [availableState, setAvailableState] = useState<boolean>(false);

  return (
    <>
      <Carousel hasCaption={false} />
      <div className="font-Maxeville">
        <div className="page_container_p40 p-[20px] lg:flex items-center justify-between sm:grid sm:grid-cols-1 sticky top-[100px] z-10 bg-white/95 border-b-[1px]">
          <div className="flex justify-between w-[60%] mt-2">
            <Sort />
            {enableScale && (
              <div className="ps-[15px] w-full max-w-[300px]">
                <ViewProgress scale={scale} setScale={setScale} />
              </div>
            )}
            <div>
              <Recruiting
                recruitingState={availableState}
                setRecruitingState={setAvailableState}
                name="AVAILABLE"
              />
            </div>
          </div>
          <div className="flex p-[1px] border rounded-full border-black h-[30px] lg:w-[35%] lg:mt-0 sm:w-full mt-[20px]">
            <input
              className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-chocolate-main"
              placeholder="SEARCH"
            ></input>
            <button className="bg-chocolate-main text-white w-[100px] rounded-[30px] font-Maxeville hover:opacity-60">
              ENTER
            </button>
          </div>
        </div>
        <div className="min-h-[600px]">
          {enableScale && (
            <div className="page_container_p40 mt-5">
              <div
                className={`gap-3 grid xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4`}
                style={{
                  gridTemplateColumns: `repeat(${Math.floor(
                    (100 - scale) / 10 + 1
                  )}, 1fr)`,
                }}
              >
                {allNftData?.map((item, index) => (
                  <NftCard
                    key={index}
                    id={item.id}
                    avatar={item.avatar}
                    collectionName={item.collectionname}
                    collectionId={parseInt(item.collectionid)}
                    price={parseInt(item.currentprice)}
                    seen={200}
                    favorite={20}
                  />
                ))}
              </div>
            </div>
          )}
          {!enableScale && (
            <div className="page_container_p40 mt-5">
              <div
                className={`gap-3 grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2`}
              >
                {allNftData.map((item, index) => (
                  <NftCard
                    key={index}
                    id={item.id}
                    avatar={item.avatar}
                    collectionName={item.collectionname}
                    collectionId={parseInt(item.collectionid)}
                    price={parseInt(item.currentprice)}
                    seen={200}
                    favorite={20}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div
          className="mt-[-400px] bg-cover bg-no-repeat h-[920px] w-full -z-10"
          style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
        ></div>
      </div>
    </>
  );
}
