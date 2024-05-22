import useLoadingControlStore from "@/store/UI_control/loading";
import { useEffect } from "react";

export function useEndLoadingState() {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    document.body.style.overflow = "auto";
    setLoadingState(false);
  });
}
