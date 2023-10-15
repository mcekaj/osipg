import { Location, UseGetLocationsProps } from "./useGetLocations.types";
import { getLocation, getLocations } from "./useGetLocations.utils";

const useGetLocations = async ({
  slug,
  locationParams,
}: {
  slug?: string;
  locationParams?: UseGetLocationsProps;
}) => {
  let locations: Location[] = [];
  if (locationParams) {
    locations = await getLocations(locationParams);
  }
  const location = await getLocation(slug);
  return { locations: locations, location: location };
};
export default useGetLocations;
