type UseFileUploadReturn = {
  uploadFile: (file: File) => Promise<void>;
  response: UploadResponse;
  isLoading: boolean;
};

type UploadResponse = {
  data?: any;
  error?: string;
};
