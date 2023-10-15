import { Category } from "@/hooks/useGetCategories/useGetCategories.types";
import { City } from "@/hooks/useGetCities/useGetCities.types";
export interface DropdownsData {
  categories: Category[];
  accessibilityFeatures: AccessibilityFeature[];
  cities: City[];
}
