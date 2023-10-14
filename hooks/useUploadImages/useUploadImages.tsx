import { useState } from "react";

export const useUploadImages = (endpoint: string, fileKey: string): UseFileUploadReturn => {
  const [response, setResponse] = useState<UploadResponse>({});
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append(fileKey, file);
    console.log(formData);
    const url = `${process.env.NEXT_PUBLIC_URL}${endpoint}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResponse({ data });
    } catch (error) {
      setResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadFile, response, isLoading };
};
