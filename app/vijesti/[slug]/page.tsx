import useGetNews from "@/hooks/useGetNews/useGetNews";
import LocationIcon from "@/styles/assets/smallLocationIcon.svg";
import TagIcon from "@/styles/assets/tagIcon.svg";
import TimeIcon from "@/styles/assets/timeIcon.svg";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { singleNews } = await useGetNews({ slug: params.slug });
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10">
      <div>
        <h1 className="text-4xl my-5">{singleNews.title}</h1>
        <div className="flex gap-3 my-5">
          <div className="flex gap-2">
            <TimeIcon />
            <p>{singleNews.createdAt}</p>
          </div>
          <div className="flex gap-2">
            <LocationIcon />
            <p>{singleNews.id}</p>
          </div>
          <div className="flex gap-2">
            <TagIcon />
            <div className="flex gap-2">
              {singleNews.tags.map((item) => (
                <p>{item.name}</p>
              ))}
            </div>
          </div>
        </div>
        <div>
          <img
            className="rounded-md h-1/4"
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${singleNews.imageRelativeUri}`}
          />
        </div>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: singleNews.content,
        }}
      />
    </div>
  );
};
export default Page;
