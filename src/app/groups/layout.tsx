"use client";

import React from "react";
import NewGroupModal from "@/components/main/modals/groups/newGroupModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";
import {
  useNavbarCurrent,
  useNavbarShow,
  useNavbarBackgound,
  useNavbarBackBtn,
  useNavbarGroupBtn,
} from "@/hooks/ui/useNavbar";
import { useEndLoadingState } from "@/hooks/ui/useEndLoadingState";

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const createGroupModalState = useGroupUIControlStore(
    (state) => state.createGroupModal
  );
  useNavbarCurrent("groups");
  useNavbarShow(true);
  useNavbarBackgound(true);
  useNavbarBackBtn(false);
  useNavbarGroupBtn(true);
  useEndLoadingState();
  return (
    <div>
      {children}
      {createGroupModalState && <NewGroupModal />}
    </div>
  );
}
