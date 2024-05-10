"use client";

import React, { useEffect } from "react";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

import Footer from "@/components/main/footer/footer";
import NavBar from "@/components/main/navbar";
export default function Home({ children }: { children: React.ReactNode }) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  if (navbarCurrentUrl === "") setNavbarCurrent("marketplace");
  useEffect(() => {
    setNavbarshow(true);
  }, [setNavbarshow]);
  return (
    <div>
      {/* <NavBar/> */}
      {children}
      <Footer />
    </div>
  );
}