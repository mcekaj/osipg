import { Location } from "./useGetLocations.types";
import { getLocation, getLocationByCategoryId, getLocations } from "./useGetLocations.utils";

const useGetLocations = async ({
  locationId,
  categoryId,
}: {
  locationId?: number;
  categoryId?: number;
}) => {
  let locations: Location[] = [];
  locations = await getLocations();
  let location = {};
  if (locationId) location = await getLocation(locationId);
  let locationsByCategoryId: Location[] = [];
  if (categoryId) locationsByCategoryId = await getLocationByCategoryId(categoryId);
  return { locations: locations, location: location, locationsByCategoryId };
};
export default useGetLocations;
