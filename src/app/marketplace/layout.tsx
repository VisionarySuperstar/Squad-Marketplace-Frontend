"use client";

import React from "react";

import Footer from "@/components/main/footer/footer";
import { useScrollHandler } from "@/hooks/ui/useScreenHandler";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";
import {
  useNavbarCurrent,
  useNavbarShow,
  useNavbarBackgound,
  useNavbarBackBtn,
  useNavbarGroupBtn,
} from "@/hooks/ui/useNavbar";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useNavbarCurrent("marketplace");
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
