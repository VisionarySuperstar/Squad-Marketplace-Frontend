"use client";
import useLoadingControlStore from "@/store/UI_control/loading";

const LoadingScreen = () => {
  const isLoading = useLoadingControlStore((state) => state.loading);
  return (
    <>
      {isLoading && (
        <div className="fixed w-full min-h-screen top-0 z-[9000] bg-transparent backdrop-blur-lg">
          Loading
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
