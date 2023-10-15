import { News } from "./useGetNews.types";

export const getNews = async () => {
  const res: News[] = await fetch(`${process.env.NEXT_PUBLIC_URL}news`).then((res) => res.json());
  return res;
};
