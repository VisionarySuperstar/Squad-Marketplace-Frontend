import useAllGroups from "./useAllGroups";
import { getTopGroups } from "@/utils/data-processing";

export default function useTopGroups(count: number = 10) {
  const allGroups = useAllGroups();
  return getTopGroups(allGroups, count);
}
