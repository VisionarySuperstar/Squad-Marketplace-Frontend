import React, { useState } from "react";
import { Icon } from "@iconify/react";
interface CollapseInterface {
  title: string;
  children: React.ReactNode;
}

const Collapse = ({ title, children }: CollapseInterface) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md">
      <div
        className="flex justify-between items-center py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg">{title}</h3>
        <span className="relative">
          <Icon className="absolute left-[-10px]" icon="fe:minus" />
          <Icon
            icon="fe:minus"
            className={`absolute left-[-10px] transition-transform duration-300 ${
              !isOpen ? "rotate-90" : ""
            }`}
          />
        </span>
      </div>
      <div
        className={`px-4 transition-max-height duration-300 ${
          isOpen ? "max-h-auto" : "!h-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapse;
