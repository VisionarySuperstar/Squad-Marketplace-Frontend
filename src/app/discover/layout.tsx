"use client";

import React, { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

import Footer from "@/components/main/footer/footer";

export default function Home({ children }: { children: React.ReactNode }) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const setNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  const setNavbarBackBtn = useNavbarUIControlStore(
    (state) => state.updateIsBackbtn
  );
  const setNavbarGroupBtn = useNavbarUIControlStore(
    (state) => state.updateIsGroupBtn
  );
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  if (navbarCurrentUrl === "") setNavbarCurrent("discover");
  useEffect(() => {
    setNavbarshow(true);
    setNavbarBackground(false);
    setNavbarBackBtn(false);
    setNavbarGroupBtn(false);
  }, [setNavbarBackBtn, setNavbarBackground, setNavbarGroupBtn, setNavbarshow]);
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
