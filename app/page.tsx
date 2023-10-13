import MapLocator from "@/components/Organisms/MapLocator/MapLocator";
import useGetAccessibilityFeatures from "@/hooks/useGetAccessibilityFeatures/useGetAccessibilityFeatures";
import useGetCategories from "@/hooks/useGetCategories/useGetCategories";
import useGetLocations from "@/hooks/useGetLocations/useGetLocations";

export default async function Home() {
  const { locations } = await useGetLocations();
  const { categories } = await useGetCategories();
  const { accessibilityFeatures } = await useGetAccessibilityFeatures();
  if (!locations) {
    return null;
  }
  return (
    <div>
      <MapLocator
        locations={locations}
        categories={categories}
        accessibilityFeatures={accessibilityFeatures}
      />
    </div>
  );
}
