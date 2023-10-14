import { TCreateLocationPayload } from "@/components/Molecules/AddLocationForm/AddLocationForm.types";
import { createLocation } from "./useCreateLocation.utils";

const useCreateLocation = async (payload: TCreateLocationPayload) => {
  const createdLocation = await createLocation(payload);
  return { createdLocation: createdLocation };
};
export default useCreateLocation;
