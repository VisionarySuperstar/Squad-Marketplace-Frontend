"use client";
import React from "react";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";

export default function PrivateGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEndLoadingState();
  return <div>{children} </div>;
}
