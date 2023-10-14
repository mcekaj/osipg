import {
  ICreatedLocationType,
  TCreateLocationPayload,
} from "@/components/Molecules/AddLocationForm/AddLocationForm.types";

export const createLocation = async (payload: TCreateLocationPayload) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}locations`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ICreatedLocationType = await res.json();
  return data;
};
