import { Location, UseGetLocationsProps } from "./useGetLocations.types";

export const getLocations = async ({
  name,
  categoryId,
  cityId,
  featureIds,
}: UseGetLocationsProps) => {
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }

  if (categoryId) {
    params.append("categoryId", categoryId.toString());
  }

  if (cityId) {
    params.append("cityId", cityId.toString());
  }

  if (featureIds && featureIds.length > 0) {
    params.append("featureIds", featureIds.join(","));
  }

  const queryString = params.toString();
  const url = `${process.env.NEXT_PUBLIC_URL}locations${queryString ? `?${queryString}` : ""}`;

  const data: Location[] = await fetch(url).then((res) => res.json());
  return data;
};

export const getLocation = async (id?: number) => {
  const data: Location = await fetch(`${process.env.NEXT_PUBLIC_URL}locations/${id}`).then((res) =>
    res.json(),
  );
  return data;
};
