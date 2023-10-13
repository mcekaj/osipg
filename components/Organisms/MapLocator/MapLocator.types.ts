import { Category } from "@/hooks/useGetCategories/useGetCategories.types";
import { Location } from "@/hooks/useGetLocations/useGetLocations.types";

export interface MapLocatorProps {
  locations: Location[];
  categories: Category[];
  accessibilityFeatures: AccessibilityFeature[];
}
