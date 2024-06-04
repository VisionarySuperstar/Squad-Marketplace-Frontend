"use client";
import React from "react";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";

export default function PublicGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEndLoadingState();
  return <div>{children}</div>;
}
