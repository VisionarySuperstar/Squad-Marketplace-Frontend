import React from "react";
import Card from "../myGroups/card";
import groups from "@/data/groups.json";

interface IProps {
  scale: number;
}

const AllGroup = ({ scale }: IProps) => {
  return (
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
            groupId={index}
            avatar={item.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default AllGroup;