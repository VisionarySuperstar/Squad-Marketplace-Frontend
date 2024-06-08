import {
  IGROUP,
  NFTFilter,
  auctionToString,
  auctionTypes,
} from "@/types";
import React from "react";

interface ListItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

const ListItem = ({ text, selected, onClick }: ListItemProps) => {
  const selectedClass = selected ? "bg-chocolate-main" : "";
  return (
    <div className="flex gap-2.5 mt-5 items-center">
      <button
        onClick={onClick}
        className={`shrink-0 rounded-full border border-solid border-slate-800 h-[13px] stroke-[1px] w-[13px] mb-[3px] ${selectedClass}`}
      ></button>
      <label className="select-none cursor-pointer" onClick={onClick}>
        {text}
      </label>
    </div>
  );
};

type SectionItem<T> = {
  key: T;
  text: string;
};

interface SectionProps<T> {
  title: string;
  items: SectionItem<T>[];
  selected?: T;
  onSelected: (selected?: T) => void;
}

const Section = <T extends { toString: () => string }>({
  title,
  items,
  selected,
  onSelected,
}: SectionProps<T>) => (
  <section className="flex flex-col">
    <h2 className="text-xs font-Maxeville text-slate-800 text-opacity-70">
      {title}
    </h2>
    {items.map((item, index) => (
      <ListItem
        key={index}
        text={item.text}
        onClick={() =>
          selected === item.key ? onSelected(undefined) : onSelected(item.key)
        }
        selected={selected === item.key}
      />
    ))}
  </section>
);

type PriceInputProps = {
  value?: number;
  placeholder: string;
  onChange: (value?: number) => void;
};

const PriceInput = ({ placeholder, value, onChange }: PriceInputProps) => {
  return (
    <input
      className="justify-center py-2 pl-2.5 rounded-md border border-solid border-slate-800"
      type="text"
      placeholder={placeholder}
      value={value?.toString() || ""}
      onChange={(e) =>
        onChange(e.target.value ? Number(e.target.value) : undefined)
      }
    />
  );
};

type FilterPanelProps = {
  filter: NFTFilter;
  setFilter: (filter: NFTFilter) => void;
  groups: IGROUP[];
};

const FilterPanel = ({
  filter,
  setFilter,
  groups,
}: FilterPanelProps) => {
  const handleFilterUpdate = <T extends keyof NFTFilter>(
    key: T,
    value: NFTFilter[T]
  ) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
  };

  const auctionItems = auctionTypes.map((type) => ({
    key: type,
    text: auctionToString(type),
  }));

  const blockchainItems = [
    { key: "ethereum", text: "Ethereum" },
    { key: "polygon", text: "Polygon" },
  ];
  const groupItems = groups.map((group) => ({
    key: group.id,
    text: group.name,
  }));

  return (
    <div className="flex justify-between items-start text-lg leading-6 uppercase text-slate-800 max-md:flex-wrap">
      <section className="flex flex-col px-5 max-md:max-w-full">
        <h2 className="max-md:max-w-full">SALE METHOD</h2>
        <div className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:mt-10">
          <Section
            title=""
            items={auctionItems.slice(0, 3)}
            selected={filter.auctionType}
            onSelected={(selected) =>
              handleFilterUpdate("auctionType", selected)
            }
          />
          {auctionItems.length > 3 && (
            <Section
              title=""
              items={auctionItems.slice(3)}
              selected={filter.auctionType}
              onSelected={(selected) =>
                handleFilterUpdate("auctionType", selected)
              }
            />
          )}
        </div>
      </section>

      <section className="flex flex-col px-5 text-xs">
        <h2 className="text-lg">PRICE range</h2>
        <div className="flex gap-5 justify-between mt-5 max-md:flex-wrap max-md:mt-10">
          USDC
        </div>
        <form className="mt-5">
          <label htmlFor="priceMin" className="sr-only">
            Min Price
          </label>
          <PriceInput
            value={filter.priceMin}
            placeholder="Min"
            onChange={(value) => handleFilterUpdate("priceMin", value)}
          />

          <span className="my-auto text-slate-800 mx-5">To</span>
          <label htmlFor="priceMax" className="sr-only">
            Max Price
          </label>
          <PriceInput
            value={filter.priceMax}
            placeholder="Max"
            onChange={(value) => handleFilterUpdate("priceMax", value)}
          />
          {filter.priceMin &&
            filter.priceMax &&
            filter.priceMin > filter.priceMax && (
              <div className="text-red-500 mt-1">
                Min price should be less than max price
              </div>
            )}
        </form>
      </section>

      <section className="flex flex-col self-stretch px-5">
        <h2>Blockchain</h2>
        <div className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:mt-10">
          <Section
            title=""
            items={blockchainItems}
            selected={filter.blockchain}
            onSelected={(selected) =>
              handleFilterUpdate("blockchain", selected)
            }
          />
        </div>
      </section>
    </div>
  );
};

export default FilterPanel;
