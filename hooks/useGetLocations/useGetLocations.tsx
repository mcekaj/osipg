import { getLocation, getLocations } from "./useGetLocations.utils";

const useGetLocations = async ({
  locationId,
  categoryId,
}: {
  locationId?: number;
  categoryId?: number;
}) => {
  const locations = await getLocations(categoryId);
  const location = await getLocation(locationId);
  return { locations: locations, location: location };
};
export default useGetLocations;
