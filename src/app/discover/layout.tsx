"use client";

import React from "react";
import Footer from "@/components/main/footer/footer";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";
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
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
