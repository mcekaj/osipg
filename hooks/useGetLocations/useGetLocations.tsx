import { getLocation, getLocations } from "./useGetLocations.utils";

const useGetLocations = async (locationId?: number) => {
  const locations = await getLocations();
  const location = await getLocation(locationId);
  return { locations: locations, location: location };
};
export default useGetLocations;
