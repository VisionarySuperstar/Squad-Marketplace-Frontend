"use client";

import React, { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import NavBar from "@/components/main/navbar";

export default function Detail({ children }: { children: React.ReactNode }) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  useEffect(() => {
    setNavbarshow(true);
  }, [setNavbarshow]);
  return (
    <div>
      {/* <NavBar /> */}
      {children}
    </div>
  );
}
