"use client";

import React, { useEffect } from "react";
import NewGroupModal from "@/components/main/modals/groups/newGroupModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useNavbarUIControlStore from "@/store/UI_control/navbar";

export default function Groups({ children }: { children: React.ReactNode }) {
  const createGroupModalState = useGroupUIControlStore(
    (state) => state.createGroupModal
  );
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  if (navbarCurrentUrl === "") setNavbarCurrent("groups");
  useEffect(() => {
    setNavbarshow(true);
  }, [setNavbarshow]);
  return (
    <div>
      {children}
      {createGroupModalState && <NewGroupModal />}
    </div>
  );
}
