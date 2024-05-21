"use client";
import ImageHero from "@/components/main/ImageHero";
import Section from "@/components/main/Section";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import React, { useEffect, useState } from "react";

import Carousel_Component from "@/components/main/carousel";
import useAllGroups from "@/hooks/views/useAllGroups";
import useAllNfts from "@/hooks/views/useAllNfts";
import {
  imageWithCaptionFromGroup,
  imageWithCaptionFromNFT,
} from "@/types/images";
import {
  getNewlyMinted,
  getTopGroups,
  getTopNfts,
} from "@/utils/data-processing";
import Link from "next/link";

export default function Home() {
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
      const imageHero = document.getElementById("imagehero");
      let carouselHeight = 0;
      let imageHeroHeight = 0;
      if (carouselElement) {
        carouselHeight = carouselElement.clientHeight;
      }
      if (imageHero) {
        imageHeroHeight = imageHero.clientHeight;
      }
      let limitHeight = 0;
      limitHeight = Math.max(carouselHeight, imageHeroHeight);
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition >= limitHeight) {
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
      window.addEventListener("scroll", handleScroll);
    };
  }, [updateNavbarBackground]);

  useEffect(() => {
    setEnableScale(screenWidth > 1000);
  }, [screenWidth]);

  const allGroups = useAllGroups();
  const topGroups = getTopGroups(allGroups).map(imageWithCaptionFromGroup);

  const allNfts = useAllNfts();
  const topNfts = getTopNfts(allNfts).map(imageWithCaptionFromNFT);
  const newlyMinted = getNewlyMinted(allNfts).map(imageWithCaptionFromNFT);

  return (
    <>
      <div className="hidden lg:block image-hero">
        <ImageHero />
      </div>
      <div className="block lg:hidden carousel">
        <Carousel_Component hasCaption={true} />
      </div>
      <div
        className="font-Maxeville  w-full bg-no-repeat bg-bottom pb-10"
        style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}
      >
        <div className="page_container_p40 mt-5 min-h-[920px]">
          <Section
            title="TOP NFTS"
            viewAllUrl="#"
            itemsPerRow={3}
            images={topNfts}
          />
          <Section
            title="TOP GROUPS"
            viewAllUrl="#"
            itemsPerRow={3}
            images={topGroups}
          />
          <Section
            title="NEWLY MINTED"
            viewAllUrl="#"
            itemsPerRow={4}
            images={newlyMinted}
          />
        </div>
        <div className="text-center">
          <Link
            href="/marketplace"
            className="inline-block px-6 py-3 text-white bg-chocolate-main rounded-3xl hover:opacity-60"
          >
            GO TO MARKETPLACE
          </Link>
        </div>
      </div>
    </>
  );
}
