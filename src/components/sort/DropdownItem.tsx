import { Dropdown } from "flowbite-react";
import FilterElement from "./FilterElement";

type DropdownItemProps = {
  Icon: React.FC;
  text: string;
  onClick?: () => void;
};

export default function DropdownItem({
  Icon,
  text,
  onClick,
}: DropdownItemProps) {
  return (
    <Dropdown.Item onClick={onClick}>
      <div className="text-md flex justify-start gap-2 items-center">
        <div className="w-[20px] flex justify-center">
          <Icon />
        </div>
        <FilterElement>{text}</FilterElement>
      </div>
    </Dropdown.Item>
  );
}
