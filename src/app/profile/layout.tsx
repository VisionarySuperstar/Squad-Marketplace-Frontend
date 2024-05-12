"use client";

import React, { useEffect } from "react";
import useLoadingControlStore from "@/store/UI_control/loading";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import CreateProfileModal from "@/components/main/modals/createProfileModal";

export default function Home({ children }: { children: React.ReactNode }) {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  }, [setLoadingState]);
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  const profileModalState = useGroupUIControlStore(
    (state) => state.profileModal
  );

  if (navbarCurrentUrl === "") setNavbarCurrent("user");
  useEffect(() => {
    setNavbarshow(true);
  }, [setNavbarshow]);
  return (
    <div>
      {children}
      {profileModalState && <CreateProfileModal />}
    </div>
  );
}
