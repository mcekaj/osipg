import { Location } from "@/hooks/useGetLocations/useGetLocations.types";

export type TInitialFormState = {
  name: string;
  description: string;
  address: string;
  postalNumber: number;
  categoryId: number;
  cityId: number;
};
export type TCreateLocationPayload = TInitialFormState & {
  latitude: number;
  longitude: number;
  accessibilityFeatureIds: number[];
  slug:string
};
export interface ICreatedLocationType extends Location {
  address: string;
  postalNumber: number;
}
