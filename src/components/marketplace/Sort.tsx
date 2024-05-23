import SortMenu, { SortDropdownItemProps } from "../sort/SortMenu";
import { HeartIconFull } from "../svgs/heart_icon_full";
import RecentIcon from "../svgs/recent_icon";
import StarIcon from "../svgs/star_icon";
import TrendingIconSmall from "../svgs/trending_icon_small";
import TriangleLeftIcon from "../svgs/triangle_left_icon";
import TriangleRightIcon from "../svgs/triangle_right_icon";

type SortProps = {
  onItemSelected?: (item: string) => void;
};

export default function Sort({ onItemSelected }: SortProps) {
  const items: SortDropdownItemProps[] = [
    { icon: RecentIcon, title: "Recent", selector: "recent" },
    { icon: TrendingIconSmall, title: "Trending", selector: "trending" },
    { icon: StarIcon, title: "Top (All time)", selector: "top" },
    {
      icon: TriangleRightIcon,
      title: "Price (Low to high)",
      selector: "priceAsc",
    },
    {
      icon: TriangleLeftIcon,
      title: "Price (High to low)",
      selector: "priceDesc",
    },
    { icon: HeartIconFull, title: "Most likes", selector: "likes" },
  ];

  return <SortMenu items={items} onItemSelected={onItemSelected} />;
}
