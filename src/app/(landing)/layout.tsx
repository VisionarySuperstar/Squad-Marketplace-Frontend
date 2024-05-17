"use client";

import React, { useEffect } from "react";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );

  useEffect(() => {
    setLoadingState(false);
  }, [setLoadingState]);

  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  if (navbarCurrentUrl === "") setNavbarCurrent("user");
  const setNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  useEffect(() => {
    setNavbarshow(false);
    setNavbarBackground(true);
  }, [setNavbarshow, setNavbarBackground]);

  return <div>{children}</div>;
}