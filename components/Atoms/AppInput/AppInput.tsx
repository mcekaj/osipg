import { twMerge } from "tailwind-merge";
import { AppInputProps } from "./AppInput.types";

const AppInput = ({
  name,
  label,
  type,
  placeholder,
  className,
  value,
  onChange,
  ...props
}: AppInputProps) => {
  return (
    <div className="h-100">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        className={twMerge(
          "bg-blue-100 font-bold border placeholder:font-medium border-gray-300 text-blue-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className,
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
export default AppInput;
