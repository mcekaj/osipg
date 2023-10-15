import useGetNews from "@/hooks/useGetNews/useGetNews";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { singleNews } = await useGetNews({ slug: params.slug });
  return (
    <div>
      <div>
        <img src={`${process.env.NEXT_PUBLIC_BASE_URL}/${singleNews.imageRelativeUri}`} />
        <h1>{singleNews.title}</h1>
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
