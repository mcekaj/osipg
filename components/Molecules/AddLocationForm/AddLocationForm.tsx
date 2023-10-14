"use client";

import { FormEvent, useReducer, useState, useEffect } from "react";
import AppButton from "../../Atoms/AppButton/AppButton";
import AppInput from "../../Atoms/AppInput/AppInput";
import AppSelect from "../../Atoms/AppSelect/AppSelect";
import AppMultipleSelect from "../../Atoms/AppMultipleSelect/AppMultipleSelect";
import { DropdownsData } from "../../Organisms/MapLocator/AddMapLocator.types";
import { TErrorType, validateFormData } from "./AddLocationForm.utils";
import useCreateLocation from "@/hooks/useCreateLocation/useCreateLocation";
import { TCreateLocationPayload, TInitialFormState } from "./AddLocationForm.types";
import { toast } from "react-toastify";

interface IAddLocationForm {
  lat: number | undefined;
  lng: number | undefined;
  dropdownsData: DropdownsData;
}

enum FORM_ACTIONS {
  HANDLE_INPUT_CHANGE,
  HANDLE_ACCESSIBILITY_FEATURES_CHANGE,
  RESET_STATE,
}
const initialFormState: TInitialFormState = {
  name: "",
  description: "",
  address: "",
  postalNumber: 0,
  categoryId: 0,
  cityId: 0,
};
function reducer(state: TInitialFormState, action: { type: FORM_ACTIONS; payload?: any }) {
  switch (action.type) {
    case FORM_ACTIONS.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case FORM_ACTIONS.RESET_STATE:
      return { ...state, ...initialFormState };
    default:
      return state;
  }
}
function AddLocationForm({
  lat,
  lng,
  dropdownsData: { categories, cities, accessibilityFeatures },
}: IAddLocationForm) {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const [selectedAccessibilityFeatures, setSelectedAccessibilityFeatures] = useState<string[]>([]);
  const { name, description, address, postalNumber } = formState;
  const [errors, setErrors] = useState<TErrorType>({});
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateFormData(formState, lat, lng, selectedAccessibilityFeatures);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    if (!lat || !lng) {
      return;
    }
    const payload: TCreateLocationPayload = {
      ...formState,
      categoryId: +formState.categoryId,
      cityId: +formState.cityId,
      postalNumber: +formState.postalNumber,
      latitude: lat,
      longitude: lng,
      accessibilityFeatureIds: selectedAccessibilityFeatures.map((featureId) => +featureId),
    };
    const { createdLocation } = await useCreateLocation(payload);
    dispatch({ type: FORM_ACTIONS.RESET_STATE });
    setSelectedAccessibilityFeatures((prev) => []);
    toast("Location successfully created");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: FORM_ACTIONS.HANDLE_INPUT_CHANGE,
      payload: {
        field: event.target.id,
        value: event.target.value,
      },
    });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: FORM_ACTIONS.HANDLE_INPUT_CHANGE,
      payload: {
        field: event.target.id,
        value: event.target.value,
      },
    });
  };
  return (
    <form className="md:flex md:flex-col md:gap-3 mb-3" onSubmit={handleFormSubmit}>
      <div className="md:flex md:justify-between ">
        <AppInput
          name="name"
          label="Name"
          value={name}
          onChange={handleInputChange}
          type="text"
          required
        />
        <AppInput
          name="description"
          label="Descripton"
          value={description}
          onChange={handleInputChange}
          type="text"
          required
        />
        <AppSelect
          name="categoryId"
          label="Categories"
          options={categories.map((category) => {
            return {
              title: category.name,
              value: category.id,
            };
          })}
          value={formState.categoryId}
          onChange={handleSelectChange}
          errorMessage={errors?.categoryId}
        />
        <div className="md:pt-7">
          <AppMultipleSelect
            togglerTitle="Accessibility Features"
            options={accessibilityFeatures.map((feature) => {
              return {
                label: feature.name,
                value: feature.id,
              };
            })}
            selectedOptions={selectedAccessibilityFeatures}
            setSelectedOptions={setSelectedAccessibilityFeatures}
            errorMessage={errors.accessibilityFeatures}
          />
        </div>
      </div>

      <div className="md:flex md:justify-between">
        <AppInput
          name="address"
          label="Address"
          value={address}
          onChange={handleInputChange}
          type="text"
          required
        />
        <AppSelect
          name="cityId"
          label="City"
          options={cities.map((city) => {
            return {
              title: city.name,
              value: city.id,
            };
          })}
          onChange={handleSelectChange}
          errorMessage={errors.cityId}
        />
        <AppInput
          name="postalNumber"
          label="Postal number"
          value={postalNumber}
          onChange={handleInputChange}
          type="number"
          required
          errorMessage={errors.postalNumber}
        />
        <AppInput
          name="latitude"
          label="Latitude"
          value={lat}
          disabled
          type="number"
          required
          placeholder="Please click on a map"
          errorMessage={errors.latitude}
        />
        <AppInput
          name="longitude"
          label="Longitude"
          value={lng}
          disabled
          type="number"
          required
          placeholder="Please click on a map"
          errorMessage={errors.longitude}
        />
      </div>
      <div className="mt-2 md:flex md:justify-end">
        <AppButton type="submit">Create new location</AppButton>
      </div>
    </form>
  );
}

export default AddLocationForm;
