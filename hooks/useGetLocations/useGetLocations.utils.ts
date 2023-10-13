import { Location } from "./useGetLocations.types";

export const getLocations = async (categoryId?: number) => {
  let baseEndpoint = `${process.env.NEXT_PUBLIC_URL}locations`;
  if (categoryId) {
    baseEndpoint = `${baseEndpoint}?categoryId=${categoryId}`;
  }

  const data: Location[] = await fetch(baseEndpoint).then((res) => res.json());
  return data;
};

export const getLocation = async (id?: number) => {
  const data: Location = await fetch(`${process.env.NEXT_PUBLIC_URL}locations/${id}`).then((res) =>
    res.json(),
  );
  return data;
};
