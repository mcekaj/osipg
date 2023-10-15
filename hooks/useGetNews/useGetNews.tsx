import { getNews } from "./useGetNews.utils";

const useGetNews = async () => {
  const news = await getNews();
  return {
    news: news,
  };
};
export default useGetNews;
