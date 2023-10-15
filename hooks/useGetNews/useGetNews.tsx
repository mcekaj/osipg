import { getNews, getSingleNews } from "./useGetNews.utils";

const useGetNews = async ({ slug }: { slug?: string } = {}) => {
  const news = await getNews();
  const singleNews = await getSingleNews(slug);
  return {
    news: news,
    singleNews: singleNews,
  };
};
export default useGetNews;
