"use client";

import React from "react";

import { useNavbarShow, useNavbarBackgound } from "@/hooks/ui/useNavbar";

export default function Detail({ children }: { children: React.ReactNode }) {
  useNavbarShow(true);
  useNavbarBackgound(true);
  return <div>{children}</div>;
}
