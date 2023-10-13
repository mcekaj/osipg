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
    </div>
  );
};
export default Page;
