"use client";

type Props<T> = {
  title: string;
  viewAllUrl: string;
  itemsPerRow: number;
  images: T[];
  renderCard: (image: T) => JSX.Element;
};

const Section = <T,>({
  title,
  viewAllUrl,
  itemsPerRow,
  images,
  renderCard,
}: Props<T>) => {
  const fillerElementsCount =
    (itemsPerRow - (images.length % itemsPerRow)) % itemsPerRow;
  const fillerArray = Array(fillerElementsCount).fill(0);
  const containerClassName = `max-w-full flex-grow-0 flex-shrink-0 sm:basis-1 ${
    itemsPerRow === 3 ? "md:basis-[31%]" : "md:basis-[23%]"
  }`;

  return (
    <div className="my-5">
      <div id="top" className="flex justify-between mb-2">
        <h2>{title}</h2>
        <h2>
          <a href={viewAllUrl}>VIEW ALL</a>
        </h2>
      </div>

      {title === "TOP NFTS" || title === "TOP GROUPS" ? (
        <div className="grid gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className={containerClassName}>
              {renderCard(image)}
            </div>
          ))}
          {fillerArray.map((_, index) => (
            <div key={index} className={`${containerClassName} invisible`} />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className={containerClassName}>
              {renderCard(image)}
            </div>
          ))}
          {fillerArray.map((_, index) => (
            <div key={index} className={`${containerClassName} invisible`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Section;
