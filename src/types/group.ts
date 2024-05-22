export interface IGROUP {
  id: string;
  name: string;
  description: string;
  avatar: string;
  director: string;
  requiredconfirmnumber: string;
  member: [
    {
      id: string;
    }
  ];
  mintnumber: string;
  soldnumber: string;
  earning: string;
  address: string;
  is_actively_recruiting: boolean;
  ranking: string;
}

export interface IGroupCard {
  state: string;
  name: string;
  membercount: number;
  groupBio: string;
  groupId: string;
  avatar: string;
}

export function groupToCard(group: IGROUP): IGroupCard {
  return {
    state: "1",
    name: group.name,
    membercount: group.member.length,
    groupBio: group.description,
    groupId: group.id,
    avatar: group.avatar,
  };
}
