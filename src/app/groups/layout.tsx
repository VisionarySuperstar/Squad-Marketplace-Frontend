"use client";

import React from "react";
import NewGroupModal from "@/components/groups/modals/newGroupModal";
import useGroupUIControlStore from "@/store/UI_control/groupPage/newgroupPage";

export default function Home({ children }: { children: React.ReactNode }) {
  const createGroupModalState = useGroupUIControlStore(
    (state) => state.createGroupModal
  );
  return (
    <div>
      {children}
      {createGroupModalState && <NewGroupModal />}
    </div>
  );
}
