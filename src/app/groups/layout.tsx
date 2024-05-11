"use client";

import React, { useEffect } from "react";
import NewGroupModal from "@/components/main/modals/groups/newGroupModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import useNavbarUIControlStore from "@/store/UI_control/navbar";
import CreateProfileModal from "@/components/main/modals/createProfileModal";
export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const createGroupModalState = useGroupUIControlStore(
    (state) => state.createGroupModal
  );
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  const setNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  const navbarCurrentUrl = useNavbarUIControlStore((state) => state.url);
  const profileModalState = useGroupUIControlStore((state) => state.profileModal);

  if (navbarCurrentUrl === "") setNavbarCurrent("groups");
  useEffect(() => {
    setNavbarshow(true);
    setNavbarBackground(true);
  }, [setNavbarBackground, setNavbarshow]);
  return (
    <div>
      {children}
      {createGroupModalState && <NewGroupModal />}
      {profileModalState && <CreateProfileModal />}
    </div>
  );
}
