import { Category } from "@/hooks/useGetCategories/useGetCategories.types";
import { City } from "@/hooks/useGetCities/useGetCities.types";
import { Location } from "@/hooks/useGetLocations/useGetLocations.types";

export interface MapLocatorProps {
  defaultLocations: Location[];
  categories: Category[];
  accessibilityFeatures: AccessibilityFeature[];
  cities: City[];
}
