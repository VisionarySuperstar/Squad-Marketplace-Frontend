import React from "react";
import Card from "@/components/groups/share/groupCard";

const MyGroup: React.FC = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg">MY GROUPS</h1>
      <div className="gap-3 flex-wrap grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((item: number) => (
          <Card
            key={item}
            state={"2"}
            name={"Group Name " + item}
            groupId={item}
            avatar="/user.png"
          />
        ))}
        <Card state={"0"} name={"New Group"} groupId={-1} avatar="/user.png" />
      </div>
    </div>
  );
};

export default MyGroup;
