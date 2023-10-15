import { TInitialFormState } from "./AddLocationForm.types";

export const isLatitudeInMNE = (lat: number) => {
  if (lat >= 41.92936 && lat <= 43.3567) {
    return true;
  }
  return false;
};
export const isLongitudeInMNE = (lng: number) => {
  if (lng >= 18.5375 && lng <= 20.16652) {
    return true;
  }
  return false;
};
export type TErrorType = {
  [key: string]: string;
};
export const validateFormData = (
  formData: TInitialFormState,
  lat: number | undefined,
  lng: number | undefined,
  selectedAccessibilityFeatures: string[],
) => {
  let errors: TErrorType = {};
  if (formData.categoryId <= 0) {
    errors.categoryId = "Category must be selected";
  }
  if (formData.cityId <= 0) {
    errors.cityId = "City must be selected";
  }
  if (+formData.postalNumber <= 0) {
    errors.postalNumber = "Please enter a valid postal code";
  }
  if (selectedAccessibilityFeatures.length === 0) {
    errors.accessibilityFeatures = "Please select at least one accessibility feature";
  }

  if (lat && !isLatitudeInMNE(lat)) {
    errors.latitude = "Latitude must be in Montenegro";
  }
  if (lng && !isLongitudeInMNE(lng)) {
    errors.longitude = "Longitude must be in Montenegro";
  }
  if (!lat) {
    errors.latitude = "Latitude must be selected";
  }
  if (!lng) {
    errors.longitude = "Latitude must be selected";
  }
  return errors;
};
