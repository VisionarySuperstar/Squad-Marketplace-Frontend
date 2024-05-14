"use client";
import React, { useState, useEffect, Suspense } from "react";
import Sort from "@/components/groups/groupSearch/sort";
import ViewProgress from "@/components/groups/groupSearch/viewProgress";
import Recruiting from "@/components/groups/groupSearch/recruiting";
import Image from "next/image";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import EyeIcon from "@/components/svgs/eye_icon";
import HeartIcon from "@/components/svgs/heart_icon";
import ImageHero from "@/components/main/image_hero";
import NftCard from "@/components/main/cards/nftCard";
import { useRouter } from "next/navigation";

import NFTs from "@/data/nfts.json";

export default function Home() {
  const [scale, setScale] = React.useState<number>(60);
  const [enableScale, setEnableScale] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const updateNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );

  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );

  useEffect(() => {
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
        console.log(carouselElement.clientHeight);
      }
      const currentScrollPosition = window.scrollY;
      console.log("scroll_position", currentScrollPosition);
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

  useEffect(() => {
    setEnableScale(screenWidth > 1000);
  }, [screenWidth]);

  const router = useRouter();
  return (
    <>
      <ImageHero />
      <div className="font-Maxeville">
        <div className="page_container_p40 p-[20px] lg:flex items-center justify-between sm:grid sm:grid-cols-1 sticky top-[100px] z-10 bg-white/95 border-b-[1px]">
          <div className="flex justify-between w-[60%] mt-2">
            <Sort />
            {enableScale && (
              <div className="ps-[15px] w-full max-w-[300px]">
                <ViewProgress scale={scale} setScale={setScale} />
              </div>
            )}
            <div>{/* <Recruiting /> */}</div>
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
        {enableScale && (
          <div className="page_container_p40 mt-5">
            <div
              className={`gap-3 grid xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
              style={{
                gridTemplateColumns: `repeat(${Math.floor(
                  (100 - scale) / 10 + 1
                )}, 1fr)`,
              }}
            >
              {NFTs.map((item, index) => (
                <div
                  key={index}
                  className="relative text-md content-card cursor-pointer drop-shadow-lg"
                  onClick={() => {
                    router.push(`/details/public/${item.id}`);
                  }}
                >
                  <NftCard
                    avatar={item.avatar}
                    collectionName={""}
                    collectionId={0}
                    price={0}
                    seen={0}
                    favorite={0}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {!enableScale && (
          <div className="page_container_p40 mt-5">
            <div
              className={`gap-3 grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
            >
              {NFTs.map((item, index) => (
                <div
                  key={index}
                  className="relative text-md content-card cursor-pointer drop-shadow-lg"
                  onClick={() => router.push(`/details/public/${item.id}`)}
                >
                  <div className="absolute top-0 content-card-menu opacity-0 transition-all text-white bg-chocolate-main/80 w-full h-full rounded-lg">
                    <div>
                      <div className="absolute left-4 top-4">COLLECTION ID</div>
                      <div className="absolute left-4 bottom-4">3000 USDC</div>
                      <div className="absolute right-4 bottom-4 flex items-center gap-1 sm:gap-2 xs:hidden">
                        <EyeIcon props="white" />
                        200
                        <HeartIcon props="white" />
                        20
                      </div>
                    </div>
                  </div>
                  <Image
                    src={item.avatar}
                    className="w-full h-full aspect-square object-cover rounded-lg"
                    alt="market_nft"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="mt-[-400px] bg-cover bg-no-repeat h-[920px] w-full -z-10"
          style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
        ></div>
      </div>
    </>
  );
}
