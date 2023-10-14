import { Location, UseGetLocationsProps } from "./useGetLocations.types";
import { getLocation, getLocations } from "./useGetLocations.utils";

const useGetLocations = async ({
  locationId,
  locationParams,
}: {
  locationId?: number;
  locationParams: UseGetLocationsProps;
}) => {
  let locations: Location[] = [];
  if (locationParams) {
    locations = await getLocations(locationParams);
  }
  // const locations = await getLocations(locationParams);
  const location = await getLocation(locationId);
  return { locations: locations, location: location };
};
export default useGetLocations;
