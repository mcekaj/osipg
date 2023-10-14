import { City } from "./useGetCities.types";

export const getCities = async () => {
  const res: City[] = await fetch(`${process.env.NEXT_PUBLIC_URL}cities`).then((res) => res.json());
  return res;
};
