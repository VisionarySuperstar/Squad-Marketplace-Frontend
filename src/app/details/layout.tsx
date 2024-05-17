"use client";

import React, { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

import useLoadingControlStore from "@/store/UI_control/loading";

export default function Detail({ children }: { children: React.ReactNode }) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarBg = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    setLoadingState(false);
    setNavbarshow(true);
    setNavbarBg(true);
  }, []);
  return <div>{children}</div>;
}
