"use client";

import ImageHero from "@/components/main/ImageHero";
import Section from "@/components/main/Section";

import GroupCard from "@/components/main/cards/groupCard";
import NftCard from "@/components/main/cards/nftCard";
import Carousel_Component from "@/components/main/carousel";

import useAllNfts from "@/hooks/views/useAllNfts";

import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";
import useTopGroups from "@/hooks/views/useTopGroups";
import { groupToCard, nftToCard } from "@/types";
import { getNewlyMinted, getTopNfts } from "@/utils/data-processing";
import Link from "next/link";
import FooterBG from "@/components/main/footerbg";

export default function DiscoverPage() {
  const topGroups = useTopGroups();
  const allNfts = useAllNfts();
  const topNfts = getTopNfts(allNfts);
  const newlyMinted = getNewlyMinted(allNfts);

  return (
    <>
      <div className="hidden lg:block image-hero">
        <ImageHero />
      </div>
      <div className="block lg:hidden carousel">
        <Carousel_Component hasCaption={true} />
      </div>

      <div>
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
            title="NEWLY LISTED"
            viewAllUrl="#"
            itemsPerRow={4}
            images={newlyMinted}
            renderCard={(nft) => <NftCard {...nftToCard(nft)} />}
          />
        </div>
        <div className="text-center">
          <Link
            href="/marketplace"
            className="inline-block px-6 py-3 text-white bg-black-main rounded-3xl hover:opacity-60"
          >
            GO TO MARKETPLACE
          </Link>
        </div>
        <FooterBG />
      </div>
    </>
  );
}
