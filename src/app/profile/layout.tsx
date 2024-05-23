"use client";

import React, { useEffect } from "react";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

export default function Home({ children }: { children: React.ReactNode }) {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  }, [setLoadingState]);
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const setNavarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);

  if (navbarCurrentUrl === "") setNavbarCurrent("user");
  useEffect(() => {
    setNavbarshow(true);
    setNavarBackground(true);
  }, [setNavarBackground, setNavbarshow]);
  return <div>{children}</div>;
}
