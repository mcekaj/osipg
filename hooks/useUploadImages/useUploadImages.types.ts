import { TCreateLocationPayload } from "@/components/Molecules/AddLocationForm/AddLocationForm.types";

export type UseFileUploadReturn = {
  sendDataAndUploadImage: (file: File, payload: TCreateLocationPayload) => Promise<void>;
  response: UploadResponse;
  isLoading: boolean;
};

export type UploadResponse = {
  data?: any;
  error?: string;
};
