import { twMerge } from "tailwind-merge";
import { AppSelectProps } from "./AppSelect.types";

const AppSelect = ({ label, name, className, options, selectPlaceholderTitle }: AppSelectProps) => {
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

      <select
        name={name}
        className={twMerge(
          "bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className,
        )}
      >
        <option disabled selected>
          {selectPlaceholderTitle}
        </option>

        {options.map((option) => (
          <option value={option.value}>{option.title}</option>
        ))}
      </select>
    </div>
  );
};
export default AppSelect;
