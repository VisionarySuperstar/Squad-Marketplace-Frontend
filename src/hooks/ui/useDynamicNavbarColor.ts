import useNavbarUIControlStore from "@/store/UI_control/navbar";
import { useEffect } from "react";
import useMeasure from "react-use-measure";

export default function useDynamicNavbarColor() {
  const updateNavbarBackground = useNavbarUIControlStore(
    (state) => state.updateIsBackground
  );

  const [ref, { height: headerHeight }] = useMeasure();

  useEffect(() => {
    const handleScroll = () => {
      if (headerHeight === 0) return;
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition >= headerHeight) {
        updateNavbarBackground(true);
      } else {
        updateNavbarBackground(false);
      }
    };

    handleScroll();

    // Add event listener for window resize
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, [updateNavbarBackground, headerHeight]);

  return ref;
}
