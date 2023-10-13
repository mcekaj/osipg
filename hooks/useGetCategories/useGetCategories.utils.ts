import { Category } from "./useGetCategories.types";

export const getCategories = async () => {
  const res: Category[] = await fetch(`${process.env.NEXT_PUBLIC_URL}categories`).then((res) =>
    res.json(),
  );
  return res;
};
