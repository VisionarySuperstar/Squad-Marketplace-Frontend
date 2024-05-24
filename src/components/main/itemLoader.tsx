"use client";

import { useEffect } from "react";

const ItemLoaderComponent = (props: any) => {
  const { data } = props;
  useEffect(() => {
    console.log("asdasdasdasdasdlength", data?.length);
  }, [data]);
  return (
    <>
      <div
        className={`w-full flex items-center justify-center min-h-[100px] ${
          data?.length || data?.length == 0 ? "hidden" : ""
        }`}
      >
        LOADING...
      </div>
      {data?.length == 0 && (
        <div className="w-full flex items-center justify-center min-h-[100px]">
          NO RESULT
        </div>
      )}
    </>
  );
};

export default ItemLoaderComponent;
