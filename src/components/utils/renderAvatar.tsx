import Image from "next/image";

const renderAvatar = (items: any[]) => {
  const number: number = items.length;
  const len: number = Math.floor(number / 3);
  if(number == 0) return ;
  if (number == 1) {
    return (
      <div className="flex justify-center items-center w-[50px] h-[50px] ml-[50px]">
        <Image
          src={items[0].avatar}
          width={500}
          height={500}
          className="rounded-full w-full h-full aspect-square object-cover"
          alt="avatar"
        />
      </div>
    );
  }
  else if (number == 2) {
    return (
      <div className="flex ">
        <div className="h-[50px] w-[50px]">
          <Image
            src={items[0].avatar}
            width={300}
            height={300}
            className="rounded-full aspect-square h-full w-full  object-cover"
            alt="avatar"
            sizes="100vw"
          />
        </div>
        <div className="-ml-2 h-[50px] w-[50px]">
          <Image
            src={items[1].avatar}
            width={300}
            height={300}
            className="rounded-full aspect-square h-full w-full  object-cover"
            alt="avatar"
            sizes="100vw"
          />
        </div>
      </div>
    );
  }
  else if (number == 3) {
    return (
      <div>
        <div className="">
          <div className="h-[50px] w-[50px] ml-[25px]">
            <Image
              src={items[2].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="flex -mt-2">
          <div className="h-[50px] w-[50px]">
            <Image
              src={items[0].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full  object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
          <div className="h-[50px] w-[50px]">
            <Image
              src={items[1].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    );
  }
  else if (number == 4) {
    return (
      <div>
        <div className="">
          <div className="h-[50px] w-[50px] ml-[25px]">
            <Image
              src={items[2].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="flex -mt-3">
          <div className="h-[50px] w-[50px]">
            <Image
              src={items[0].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
          <div className="h-[50px] w-[50px]">
            <Image
              src={items[1].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="-mt-3">
          <div className="h-[50px] w-[50px] ml-[25px] ">
            <Image
              src={items[3].avatar}
              width={300}
              height={300}
              className="rounded-full aspect-square h-full w-full object-cover"
              alt="avatar"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    );
  }
  else if (number % 3 == 2) {
    return (
      <div>
        <div className="flex">
          {Array.from({ length: len + 1 }, (_, i) => (
            <div key={i} className="h-[50px] w-[50px] ml-[10px]">
              <Image
                src={items[i].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="flex -mt-3">
          {Array.from({ length: len }, (_, i) => (
            <div
              key={i}
              className={`h-[50px] w-[50px] ${!i ? "ml-[40px]" : "ml-[10px]"}`}
            >
              <Image
                src={items[len + i + 1].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="flex -mt-3">
          {Array.from({ length: len + 1 }, (_, i) => (
            <div key={i} className="h-[50px] w-[50px] ml-[10px]">
              <Image
                src={items[2 * len + i + 1].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  else if (number % 3 == 0) {
    // Handle case when number is divisible by 3
    return (
      <div>
        <div className="flex ml-[30px]">
          {Array.from({ length: len}, (_, i) => (
            <div key={i} className="h-[50px] w-[50px] ml-[10px]">
              <Image
                src={items[i].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="flex -mt-3">
          {Array.from({ length: len}, (_, i) => (
            <div
              key={i}
              className={`h-[50px] w-[50px] ${!i ? "ml-[10px]" : "ml-[10px]"}`}
            >
              <Image
                src={items[len + i].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="flex -mt-3 ml-[30px]">
          {Array.from({ length: len}, (_, i) => (
            <div key={i} className="h-[50px] w-[50px] ml-[10px]">
              <Image
                src={items[2 * len + i].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  else if (number % 3 == 1) {
    // Handle case when number modulo 3 is 1
    return (
      <div>
        <div className="flex ml-[30px]">
          {Array.from({ length: len}, (_, i) => (
            <div key={i} className="h-[50px] w-[50px] ml-[10px]">
              <Image
                src={items[i].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="flex -mt-3">
          {Array.from({ length: len + 1}, (_, i) => (
            <div
              key={i}
              className={`h-[50px] w-[50px] ${!i ? "ml-[10px]" : "ml-[10px]"}`}
            >
              <Image
                src={items[len + i].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="flex -mt-3 ml-[30px]">
          {Array.from({ length: len}, (_, i) => (
            <div key={i} className="h-[50px] w-[50px] ml-[10px]">
              <Image
                src={items[2 * len + i + 1].avatar}
                width={300}
                height={300}
                className="rounded-full aspect-square h-full w-full object-cover"
                alt="avatar"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default renderAvatar;
