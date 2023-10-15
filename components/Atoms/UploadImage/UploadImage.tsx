"use client";
import { SetStateAction} from "react";

const UploadImage = ({
  image,
  setImage,
}: {
  image: File | null;
  setImage: React.Dispatch<SetStateAction<File | null>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      setImage(null);
    }
  };

  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="file_input"
      >
        Upload file
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        onChange={(event) => handleImageChange(event)}
      />

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-3" id="file_input_help">
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>
    </div>
  );
};

export default UploadImage;
