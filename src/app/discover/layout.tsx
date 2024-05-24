"use client";

import React from "react";
import Footer from "@/components/main/footer/footer";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";
import useScrollHandler from "@/hooks/ui/useScrollHandler";
import {
  useNavbarCurrent,
  useNavbarShow,
  useNavbarBackgound,
  useNavbarBackBtn,
  useNavbarGroupBtn,
} from "@/hooks/ui/useNavbar";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useNavbarCurrent("discover");
  useNavbarShow(true);
  useNavbarBackgound(false);
  useNavbarBackBtn(false);
  useNavbarGroupBtn(false);
  useEndLoadingState();
  useScrollHandler();
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
