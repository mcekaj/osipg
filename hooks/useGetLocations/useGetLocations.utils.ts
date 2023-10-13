import { Location } from "./useGetLocations.types";

export const getLocations = async () => {
  const data: Location[] = await fetch(`${process.env.NEXT_PUBLIC_URL}locations`).then((res) =>
    res.json(),
  );
  return data;
};

export const getLocation = async (id?: number) => {
  const data: Location = await fetch(`${process.env.NEXT_PUBLIC_URL}locations/${id}`).then((res) =>
    res.json(),
  );
  return data;
};
