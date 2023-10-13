import { getCategories } from "./useGetCategories.utils";

const useGetCategories = async () => {
  const categories = await getCategories();
  return { categories: categories };
};
export default useGetCategories;
