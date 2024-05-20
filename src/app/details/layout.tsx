"use client";

import React, { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

export default function Detail({ children }: { children: React.ReactNode }) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarBg = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  useEffect(() => {
    setNavbarshow(true);
    setNavbarBg(true);
  }, []);
  return <div>{children}</div>;
}
