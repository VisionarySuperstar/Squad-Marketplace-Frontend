/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

const useScrollHandler = () => {
  const updateNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateNavbarBackground]);
};

export default useScrollHandler;
