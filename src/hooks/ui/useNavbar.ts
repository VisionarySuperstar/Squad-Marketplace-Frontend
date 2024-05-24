import useNavbarUIControlStore from "@/store/UI_control/navbar";
import { useEffect } from "react";

export function useNavbarCurrent(current: string) {
  const setNavbarCurrent = useNavbarUIControlStore((state) => state.updateUrl);
  useEffect(() => {
    setNavbarCurrent(current);
  });
}

export function useNavbarShow(value: boolean) {
  const setNavbarshow = useNavbarUIControlStore((state) => state.updateIsShow);
  useEffect(() => {
    setNavbarshow(value);
  });
}

export function useNavbarBackgound(value: boolean) {
  const setNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );
  useEffect(() => {
    setNavbarBackground(value);
  });
}

export function useNavbarBackBtn(value: boolean) {
  const setNavbarBackBtn = useNavbarUIControlStore(
    (state) => state.updateIsBackbtn
  );
  useEffect(() => {
    setNavbarBackBtn(value);
  });
}

export function useNavbarGroupBtn(value: boolean) {
  const setNavbarGroupBtn = useNavbarUIControlStore(
    (state) => state.updateIsGroupBtn
  );
  useEffect(() => {
    setNavbarGroupBtn(value);
  });
}
