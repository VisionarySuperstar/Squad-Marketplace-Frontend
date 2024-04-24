import React from "react";
import Card from "./card";
import data from "@/data/mygroups.json";

const MyGroup: React.FC = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg">MY GROUPS</h1>
      <div className="gap-3 flex-wrap grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.map((item, index) => (
          <Card
            key={index}
            state={"2"}
            name={item.name}
            groupId={index}
            avatar={item.avatar}
          />
        ))}
        <Card state={"0"} name={"New Group"} groupId={-1} avatar={""} />
      </div>
    </div>
  );
};

export default MyGroup;
