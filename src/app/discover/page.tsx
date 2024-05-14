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
import ImageHero from "@/components/main/ImageHero";
import ImageWithCaption from "@/components/main/ImageWithCaption";
import Section from "@/components/main/Section";
import NftCard from "@/components/main/cards/nftCard";
import { useRouter } from "next/navigation";

import NFTs from "@/data/nfts.json";
import { IImageWithCaption } from "@/types/images";
import Link from "next/link";
import Carousel_Component from "@/components/main/carousel";

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

  const topNfts: IImageWithCaption[] = [
    { src: "/assets/images/slide/image1.png", caption: "Image 1", alt: "image 1" },
    { src: "/assets/images/slide/image6.png", caption: "Image 2", alt: "image 2" },
    { src: "/assets/images/slide/image5.png", caption: "Image 3", alt: "image 3" },
  ];

  const topGroups: IImageWithCaption[] = [
    { src: "/assets/images/slide/image2.png", caption: "Image 1", alt: "image 1" },
    { src: "/assets/images/slide/image4.png", caption: "Image 2", alt: "image 2" },
    { src: "/assets/images/slide/image3.png", caption: "Image 3", alt: "image 3" },
  ];

  const newlyMinted: IImageWithCaption[] = [
    { src: "/assets/images/slide/image6.png", caption: "Image 1", alt: "image 1" },
    { src: "/assets/images/slide/image5.png", caption: "Image 2", alt: "image 2" },
    { src: "/assets/images/slide/image1.png", caption: "Image 3", alt: "image 3" },
    { src: "/assets/images/slide/image2.png", caption: "Image 4", alt: "image 4" },
    { src: "/assets/images/slide/image3.png", caption: "Image 5", alt: "image 5" },
    { src: "/assets/images/slide/image4.png", caption: "Image 6", alt: "image 6" },
  ];

  const router = useRouter();
  return (
    <>
      <div className="hidden lg:block image-hero">
        <ImageHero />
      </div>
      <div className="block lg:hidden carousel">
        <Carousel_Component hasCaption={true} />
      </div>
      <div className="font-Maxeville  w-full bg-no-repeat bg-bottom pb-10"
        style={{ backgroundImage: "url('/assets/bg-1.jpg')" }}>
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
            images={topGroups} />
          <Section
            title="NEWLY MINTED"
            viewAllUrl="#"
            itemsPerRow={4}
            images={newlyMinted} />
        </div>
        <div className="text-center">
          <Link href="/marketplace" className="inline-block px-6 py-3 text-white bg-chocolate-main rounded-3xl hover:opacity-60">GO TO MARKETPLACE</Link>
        </div>
      </div >
    </>
  );
}
