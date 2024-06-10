import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Tooltip } from "flowbite-react";

interface IProps {
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string;
  placeholder: string;
  message: string;
  isInvalid: boolean;
  info?: string;
}

const Input = ({
  title,
  className,
  onChange,
  value,
  placeholder,
  message,
  isInvalid,
  info = "info",
}: IProps) => {
  return (
    <div className={className}>
      <div className="px-1 py-1 font-bold truncate flex gap-1 items-center">
        {title}
        <Tooltip className="relative z-50" content={info}>
          <Icon
            icon="ep:info-filled"
            className="text-[#9A9FA5] cursor-pointer hover:opacity-60"
          />
        </Tooltip>
      </div>
      <div className="flex p-[1px] border rounded-[30px] border-chocolate-main/50 h-[30px] mt-2 ">
        <input
          className="w-full h-full bg-transparent  border border-none outline-none outline-[0px] px-[10px] text-black"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
      <p className="text-red-800 text-[11px] px-2 h-3">
        {isInvalid && !value ? message : ""}
      </p>
    </div>
  );
};

export default Input;
