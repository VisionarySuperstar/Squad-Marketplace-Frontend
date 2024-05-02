import React from "react";
import Card from "@/components/main/cards/groupCard";

//import states
import useUserStore from "@/store/user_infor/userinfor";
//import data
import data from "@/data/groups.json";

const MyGroup = () => {
  const userid = useUserStore((state) => state.userid);
  /* groups filtering */
  const JoinedGroups = data.filter((group) =>
    group.members.some((member) => member.id === userid)
  );

  return (
    <div>
      <h1 className="my-5 text-lg">MY GROUPS</h1>
      <div className="gap-3 flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {JoinedGroups.map((item, index) => (
          <Card
            key={index}
            state={"2"}
            name={item.name}
            groupBio={item.bio}
            membercount={item.members.length}
            groupId={index}
            avatar={item.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGroup;
