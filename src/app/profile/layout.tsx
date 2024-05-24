"use client";

import React, { useEffect } from "react";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import {
  useNavbarCurrent,
  useNavbarShow,
  useNavbarBackgound,
  useNavbarBackBtn,
  useNavbarGroupBtn,
} from "@/hooks/ui/useNavbar";

export default function Home({ children }: { children: React.ReactNode }) {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  }, [setLoadingState]);

  useNavbarCurrent("user");
  useNavbarShow(true);
  useNavbarBackgound(true);
  useNavbarBackBtn(false);
  useNavbarGroupBtn(false);

  return <div>{children}</div>;
}
