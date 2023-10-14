import MapLocator from "@/components/Organisms/MapLocator/MapLocator";
import useGetAccessibilityFeatures from "@/hooks/useGetAccessibilityFeatures/useGetAccessibilityFeatures";
import useGetCategories from "@/hooks/useGetCategories/useGetCategories";
import useGetLocations from "@/hooks/useGetLocations/useGetLocations";
import VladaIcon from "@/styles/assets/vlada.jpg";
import EUIcon from "@/styles/assets/eu.png";
import FaktIcon from "@/styles/assets/fakt.png";
import ArtgrafikaIcon from "@/styles/assets/artgrafika.png";
import MarkerIcon from "@/styles/assets/marker.png";
import Image from "next/image";
import useGetCities from "@/hooks/useGetCities/useGetCities";

export default async function Home() {
  const { locations } = await useGetLocations({
    locationParams: {
      categoryId: null,
      cityId: null,
      featureIds: [],
      name: "",
    },
  });
  const { categories } = await useGetCategories();
  const { accessibilityFeatures } = await useGetAccessibilityFeatures();
  const { cities } = await useGetCities();

  if (!locations) {
    return null;
  }
  return (
    <div>
      <MapLocator
        defaultLocations={locations}
        categories={categories}
        accessibilityFeatures={accessibilityFeatures}
        cities={cities}
      />
      <div className="text-center my-10">
        <h1 className="text-4xl mb-10">Partneri Organizacije</h1>
        <div className="flex items-center justify-between">
          <Image src={VladaIcon} alt="vlada" height={60} width={150} />
          <Image src={EUIcon} alt="eu" height={60} width={150} />
          <Image src={FaktIcon} alt="fakt" height={60} width={150} />
          <Image src={ArtgrafikaIcon} alt="artgrafika" height={60} width={150} />
          <Image src={MarkerIcon} alt="artgrafika" height={60} width={150} />
        </div>
      </div>
    </div>
  );
}
