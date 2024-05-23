"use client";

import ImageHero from "@/components/main/ImageHero";
import Section from "@/components/main/Section";

import GroupCard from "@/components/main/cards/groupCard";
import NftCard from "@/components/main/cards/nftCard";
import Carousel_Component from "@/components/main/carousel";
// import useDynamicNavbarColor from "@/hooks/ui/useDynamicNavbarColor";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";
import useAllGroups from "@/hooks/views/useAllGroups";
import useAllNfts from "@/hooks/views/useAllNfts";
import { INFT, groupToCard, nftToCard } from "@/types";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import {
  getNewlyMinted,
  getTopGroups,
  getTopNfts,
} from "@/utils/data-processing";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  // const headerRef = useDynamicNavbarColor();

  useEndLoadingState();

  const allGroups = useAllGroups();
  const topGroups = getTopGroups(allGroups);

  const allNfts = useAllNfts();
  const topNfts = getTopNfts(allNfts);
  const newlyMinted = getNewlyMinted(allNfts);
  const updateNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );

  useEffect(() => {
    const handleScroll = () => {
      const HeroElement = document.getElementById("imagehero");
      const carouselElement = document.getElementById("marketplace_carousel");
      let carouselHeight = 0;
      let heroHeight = 0;
      if (carouselElement) {
        carouselHeight = carouselElement.clientHeight;
      }
      if (HeroElement) {
        heroHeight = HeroElement.clientHeight;
      }

      const currentScrollPosition = window.scrollY;

      const PosterHeight = Math.max(heroHeight, carouselHeight);

      if (currentScrollPosition >= PosterHeight) {
        updateNavbarBackground(true);
      } else {
        updateNavbarBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Clean up
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, [updateNavbarBackground]);

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
            renderCard={(nft) => <NftCard {...nftToCard(nft)} />}
          />
          <Section
            title="TOP GROUPS"
            viewAllUrl="#"
            itemsPerRow={3}
            images={topGroups}
            renderCard={(group) => <GroupCard {...groupToCard(group)} />}
          />
          <Section
            title="NEWLY MINTED"
            viewAllUrl="#"
            itemsPerRow={4}
            images={newlyMinted}
            renderCard={(nft) => <NftCard {...nftToCard(nft)} />}
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
