import React, {useState, useEffect} from "react";
import Card from "@/components/main/cards/groupCard";
//import data
import data from "@/data/groups.json";
import useAPI from "@/hooks/useAPI";
import { IGROUP } from "@/types";
import useAuth from "@/hooks/useAuth";


const MyGroup = () => {
  const { signIn, isAuthenticated, user } = useAuth();
  const [allGroupData, setAllGroupData] = useState<IGROUP[]>([]) ;
  const api = useAPI();
  const getAllGroupData = async () => {
    const { data: Data } = await api.post(`/api/getGroup`, {id : user?.id});
    setAllGroupData(Data) ;
  }
  useEffect(() => {
    getAllGroupData();
  }, [user]) ;



  return (
    <div>
      <h1 className="my-5 text-lg">MY GROUPS</h1>
      <div className="gap-3 flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {allGroupData.map((item, index) => (
          <Card
            key={index}
            state={"2"}
            name={item.name}
            groupBio={item.description}
            membercount={item.member.length}
            groupId={item.id}
            avatar={item.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default MyGroup;
