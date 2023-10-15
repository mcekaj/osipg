import SwiperCard from "@/components/Atoms/Card/SwiperCard";
import useGetNews from "@/hooks/useGetNews/useGetNews";

const Page = async () => {
  const { news } = await useGetNews();
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="my-10 text-4xl text-center">Vijesti</h1>
      <div className="grid grid-cols-3 gap-5">
        {news.map((news) => {
          return (
            <SwiperCard
              className="h-72"
              bgImage={`${process.env.NEXT_PUBLIC_BASE_URL}/${news.imageRelativeUri}`}
              linkHref={`vijesti/${news.slug}`}
              linkTitle="Procitaj vise"
              title={news.title}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Page;
