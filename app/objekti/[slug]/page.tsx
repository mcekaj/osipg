import useGetLocations from "@/hooks/useGetLocations/useGetLocations";
import Image from "next/image";

const Page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { location } = await useGetLocations(Number(params.slug));
  if (!location) return null;
  return (
    <div>
      <p>ID:{location.id}</p>
      <h1>Name:{location.name}</h1>
      <p>Description{location.description}</p>
      <p>Kategorija: {location.category.name}</p>
      <Image
        alt={location.category.name}
        width={50}
        height={50}
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${location.category.relativeUrl}`}
      />
    </div>
  );
};
export default Page;
