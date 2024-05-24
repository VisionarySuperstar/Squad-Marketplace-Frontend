import useAllCollections from "./useAllCollections";

export default function useTopCollections(count: number = 4) {
  const allCollections = useAllCollections();
  return allCollections.slice(0, count);
}
