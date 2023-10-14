"use client";

import { ChangeEventHandler, FormEvent, useReducer } from "react";
import AppButton from "../Atoms/AppButton/AppButton";
import AppInput from "../Atoms/AppInput/AppInput";

interface IAddLocationForm {
  lat: number | undefined;
  lng: number | undefined;
}
enum FORM_ACTIONS {
  HANDLE_INPUT_CHANGE,
  SET_LAT_LNG,
}
function reducer(state: typeof initialFormState, action: { type: FORM_ACTIONS; payload: any }) {
  switch (action.type) {
    case FORM_ACTIONS.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case FORM_ACTIONS.SET_LAT_LNG:
      return { ...state, latitude: action.payload.lat, longitude: action.payload.lng };
    default:
      return state;
  }
}
const initialFormState = {
  name: "",
  description: "",
  address: "",
  postalNumber: 0,
  latitude: 0,
  longitude: 0,
};
function AddLocationForm({ lat, lng }: IAddLocationForm) {
  const [formState, dispatch] = useReducer(reducer, initialFormState);
  const { name, description, address, postalNumber } = formState;
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: FORM_ACTIONS.SET_LAT_LNG,
      payload: {
        latitude: lat,
        longitude: lng,
      },
    });
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    dispatch({
      type: FORM_ACTIONS.HANDLE_INPUT_CHANGE,
      payload: {
        field: event.target.id,
        value: event.target.value,
      },
    });
  };
  return (
    <form className="md:flex md:flex-col mb-3" onSubmit={handleFormSubmit}>
      <div className="md:flex gap-3">
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
      </div>
      <div className="md:flex gap-3">
        <AppInput
          name="address"
          label="Address"
          value={address}
          onChange={handleInputChange}
          type="text"
          required
        />
        <AppInput
          name="postalNumber"
          label="Postal number"
          value={postalNumber}
          onChange={handleInputChange}
          type="number"
          required
        />
      </div>
      <div className="md:flex gap-3">
        <AppInput name="latitude" label="Latitude" value={lat} disabled type="number" required />
        <AppInput name="longitude" label="Longitude" value={lng} disabled type="number" required />
      </div>
      <div className="mt-2">
        <AppButton type="submit">Create new location</AppButton>
      </div>
    </form>
  );
}

export default AddLocationForm;
