"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/main/cards/groupCard";
import groups from "@/data/groups.json";

interface IProps {
  scale: number;
}

const AllGroup = ({ scale }: IProps) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [enableScale, setEnableScale] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screen width
    setScreenWidth(window.innerWidth);
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setEnableScale(screenWidth > 1000);
  }, [screenWidth]);
  return (
    <>
      {enableScale && (
        <div>
          <div
            className={`gap-3 flex-wrap grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
            style={{
              gridTemplateColumns: `repeat(${Math.floor(
                (100 - scale) / 10 + 1
              )}, 1fr)`,
            }}
          >
            {groups.map((item, index) => (
              <Card
                key={index}
                state={"1"}
                name={item.name}
                groupBio={item.bio}
                membercount={item.members.length}
                groupId={index}
                avatar={item.avatar}
              />
            ))}
          </div>
        </div>
      )}
      {!enableScale && (
        <div>
          <div
            className={`gap-3 flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5`}
          >
            {groups.map((item, index) => (
              <Card
                key={index}
                state={"1"}
                groupBio={item.bio}
                membercount={item.members.length}
                name={item.name}
                groupId={index}
                avatar={item.avatar}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AllGroup;
