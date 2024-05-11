"use client";

import React, { useEffect } from "react";
import NewGroupModal from "@/components/main/modals/groups/newGroupModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import NavBar from "@/components/main/navbar";
import CreateProfileModal from "@/components/main/modals/createProfileModal";
export default function Groups({ children }: { children: React.ReactNode }) {
  const createGroupModalState = useGroupUIControlStore(
    (state) => state.createGroupModal
  );
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  const profileModalState = useGroupUIControlStore((state) => state.profileModal);

  if (navbarCurrentUrl === "") setNavbarCurrent("groups");
  useEffect(() => {
    setNavbarshow(true);
  }, [setNavbarshow]);
  return (
    <div>
      {/* <NavBar/> */}
      {children}
      {createGroupModalState && <NewGroupModal />}
      {profileModalState && <CreateProfileModal />}
    </div>
  );
}
