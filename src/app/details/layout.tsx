"use client";

import React, { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

import useLoadingControlStore from "@/store/UI_control/loading";

export default function Detail({ children }: { children: React.ReactNode }) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  useEffect(() => {
    setNavbarshow(true);
  }, [setNavbarshow]);
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    setLoadingState(false);
  }, [setLoadingState]);
  return <div>{children}</div>;
}
