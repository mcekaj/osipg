import MapLocator from "@/components/Organisms/MapLocator/MapLocator";
import useGetLocations from "@/hooks/useGetLocations/useGetLocations";
import Head from "next/head";

export default async function Home() {
  const { locations } = await useGetLocations();
  if (!locations) {
    return null;
  }
  return (
    <div>
      <MapLocator locations={locations} />
    </div>
  );
}
