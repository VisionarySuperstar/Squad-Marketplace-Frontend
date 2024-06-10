import { Dropdown } from "flowbite-react";
import RecentIcon from "../svgs/recent_icon";
import FilterElement from "./FilterElement";
import DropdownItem from "./DropdownItem";

export type SortDropdownItemProps = {
  title: string;
  icon: React.FC;
  selector: string;
};

type SortMenuProps = {
  items: SortDropdownItemProps[];
  onItemSelected?: (item: string) => void;
};

export default function SortMenu({ items, onItemSelected }: SortMenuProps) {
  return (
    <div className="cursor-pointer h-[30px] flex items-center font-Maxeville">
      <Dropdown
        className="bg-white dark:bg-white border ms-[40px]"
        label="SORT"
        renderTrigger={() => (
          <div className="text-md flex gap-2 items-center ">
            <RecentIcon />
            <FilterElement>SORT</FilterElement>
          </div>
        )}
      >
        {items.map((item) => (
          <DropdownItem
            key={item.selector}
            Icon={item.icon}
            text={item.title}
            onClick={() => onItemSelected && onItemSelected(item.selector)}
          />
        ))}
      </Dropdown>
    </div>
  );
}
