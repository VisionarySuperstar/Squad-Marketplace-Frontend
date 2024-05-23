import LogoIcon from "@/components/svgs/logo_icon";
import SortMenu, { SortDropdownItemProps } from "../../sort/SortMenu";
import RecentIcon from "../../svgs/recent_icon";
import TrendingIconSmall from "../../svgs/trending_icon_small";

type SortProps = {
  onItemSelected?: (item: string) => void;
};

export default function Sort({ onItemSelected }: SortProps) {
  const items: SortDropdownItemProps[] = [
    { icon: RecentIcon, title: "Recent", selector: "recent" },
    { icon: TrendingIconSmall, title: "Trending", selector: "trending" },
    { icon: LogoIcon, title: "Member count", selector: "member" },
  ];

  return <SortMenu items={items} onItemSelected={onItemSelected} />;
}
