import { getCities } from "./useGetCities.utils";

const useGetCities = async () => {
  const cities = await getCities();
  return { cities: cities };
};
export default useGetCities;
