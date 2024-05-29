"use client";

import React from "react";

import { useNavbarShow, useNavbarBackgound } from "@/hooks/ui/useNavbar";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";

export default function Detail({ children }: { children: React.ReactNode }) {
  useNavbarShow(true);
  useNavbarBackgound(true);
  useEndLoadingState();
  return <div>{children}</div>;
}
