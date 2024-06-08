"use client";

const ToggleComponent = () => {
  return (
    <>
      <div
        className="relative w-[58px] h-[30px] appearance-none border border-chocolate-main p-2
                 bg-white rounded-full
                 peer-checked:after:translate-x-full
                 rtl:peer-checked:after:-translate-x-full
                 after:absolute after:top-[1px] after:start-[2px]
                 after:border-gray-300 after:border after:rounded-full
                 after:content-[''] after:bg-black-main
                 after:h-[26px] after:w-[26px] after:transition-all"
      ></div>
    </>
  );
};

export default ToggleComponent;
