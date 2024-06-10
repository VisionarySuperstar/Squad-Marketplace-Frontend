import React from "react";

interface IProps {
  setScale: React.Dispatch<React.SetStateAction<number>>;
  scale: number;
}

const ViewProgress: React.FC<IProps> = ({ setScale, scale }) => {
  return (
    <div className="flex gap-3 items-center w-full">
      <label className="text-md">VIEW</label>
      <input
        type="range"
        min="40"
        max="90"
        value={scale}
        onChange={(e) => setScale(Number(e.target.value))}
        className="appearance-none bg-transparent w-full border border-chocolate-main rounded-full p-[2px]
        [&::-webkit-slider-runnable-track]:rounded-full
         [&::-webkit-slider-runnable-track]:bg-white 
         [&::-webkit-slider-thumb]:appearance-none 
         [&::-webkit-slider-thumb]:h-[24px]
         [&::-webkit-slider-thumb]:w-[24px]
         [&::-webkit-slider-thumb]:rounded-full
       [&::-webkit-slider-thumb]:bg-black
       [&::-moz-range-track]:bg-white 
         [&::-moz-range-thumb]:appearance-none 
         [&::-moz-range-thumb]:h-[20px] 
         [&::-moz-range-thumb]:w-[20px] 
         [&::-moz-range-thumb]:rounded-full 
       [&::-moz-range-thumb]:bg-black"
      />
    </div>
  );
};

export default ViewProgress;
