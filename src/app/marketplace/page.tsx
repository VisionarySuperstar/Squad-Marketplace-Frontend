/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Sort from "@/components/marketplace/Sort";
import ViewProgress from "@/components/groups/groupSearch/viewProgress";
import Carousel from "@/components/main/carousel";
import NftCard from "@/components/main/cards/nftCard";
import useListedNfts from "@/hooks/views/useListedNfts";
import FooterBG from "@/components/main/footerbg";
import { INFT, NFTFilter } from "@/types";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import { filterNFTS, sortNFTSBy } from "@/utils/data-processing";
import FilterPanel from "@/components/marketplace/FilterPanel";
import useTopGroups from "@/hooks/views/useTopGroups";

export default function MarketplacePage() {
  const [scale, setScale] = React.useState<number>(65);
  const [enableScale, setEnableScale] = useState<boolean>(true);

  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [availableState, setAvailableState] = useState<boolean>(false);

  const listedNftData = useListedNfts();
  const [displayedNftData, setDisplayedNftData] =
    useState<INFT[]>(listedNftData);
  const api = useAPI();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setEnableScale(screenWidth > 1000);
  }, [screenWidth]);
  const [showFilter, setShowFilter] = useState(false);

  const [sortBy, setSortBy] = useState<string>("recent");
  const [filter, setFilter] = useState<NFTFilter>({});
  const [pendingFilter, setPendingFilter] = useState<NFTFilter>({});

  const onFilterClick = () => {
    if (showFilter) {
      setFilter(pendingFilter);
    }
    setShowFilter(!showFilter);
  };

  const topGroups = useTopGroups(4);

  useEffect(() => {
    setDisplayedNftData(sortNFTSBy(filterNFTS(listedNftData, filter), sortBy));
  }, [sortBy, filter, listedNftData]);

  return (
    <>
      <Carousel hasCaption={false} />
      <div className="font-Maxeville">
        <div className="page_container_p40 p-[20px] sticky top-[100px] bg-white/95 border-b-[1px] z-20 flex flex-col gap-10">
          <div className="lg:flex items-center justify-between sm:grid sm:grid-cols-1">
            <div className="flex justify-between w-[60%] mt-2">
              <Sort onItemSelected={(item) => setSortBy(item)} />
              <button
                onClick={() => onFilterClick()}
                className={`font-Maxeville text-md px-5 ${
                  showFilter ? "bg-black text-white rounded-full" : ""
                }`}
              >
                {showFilter ? "APPLY" : "FILTER"}
              </button>
              {enableScale && (
                <div className="ps-[15px] w-full max-w-[300px]">
                  <ViewProgress scale={scale} setScale={setScale} />
                </div>
              )}
            </div>
            <div className="flex p-[1px] border rounded-full border-black h-[30px] lg:w-[35%] lg:mt-0 sm:w-full mt-[20px]">
              <input
                className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-black"
                placeholder="SEARCH"
              ></input>
              <button className="bg-black text-white w-[100px] rounded-[30px] font-Maxeville hover:opacity-60">
                ENTER
              </button>
            </div>
          </div>
          {showFilter && (
            <div className="page_container_p40 ">
              <FilterPanel
                filter={pendingFilter}
                setFilter={setPendingFilter}
                groups={topGroups}
              />
            </div>
          )}
        </div>

        <div className="min-h-[600px]">
          {enableScale && (
            <div className="page_container_p40 mt-5">
              <div
                className={`gap-[30px] grid xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4`}
                style={{
                  gridTemplateColumns: `repeat(${Math.floor(
                    (100 - scale) / 10 + 1
                  )}, 1fr)`,
                }}
              >
                {displayedNftData?.map((item, index) => (
                  <NftCard
                    key={index}
                    id={item.id}
                    content={item.content}
                    name={item.name}
                    description={item.description}
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
                {displayedNftData.map((item, index) => (
                  <NftCard
                    key={index}
                    id={item.id}
                    content={item.content}
                    name={item.name}
                    description={item.description}
                    price={parseInt(item.currentprice)}
                    seen={200}
                    favorite={20}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <FooterBG />
      </div>
    </>
  );
}
