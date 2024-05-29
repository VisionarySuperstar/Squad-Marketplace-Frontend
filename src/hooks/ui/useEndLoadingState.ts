import useLoadingControlStore from "@/store/UI_control/loading";
import { useEffect } from "react";

export function useEndLoadingState() {
  const setLoadingState = useLoadingControlStore(
    (state) => state.updateLoadingState
  );
  useEffect(() => {
    setLoadingState(false);
  });
}
