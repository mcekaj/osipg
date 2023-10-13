"use client";

import { useState } from "react";
import { AppMultipleSelectProps } from "./AppMultipleSelectProps";
import ArrowDown from "@/styles/assets/arrowDown.svg";

const AppMultipleSelect = ({ togglerTitle, options }: AppMultipleSelectProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex justify-between items-center bg-blue-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {togglerTitle}
        <ArrowDown className="w-3 h-3 ml-2.5" />
      </button>
      <div
        className={`z-10 ${
          !showDropdown ? "hidden" : "absolute"
        }  bg-white rounded-lg shadow w-full dark:bg-gray-700`}
      >
        <ul
          className="bg-blue-100 p-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {options.map((option) => (
            <li key={option.value}>
              <div className="flex items-center p-2 rounded hover:bg-blue-200 dark:hover:bg-gray-600 ">
                <input
                  id={option.label}
                  type="checkbox"
                  value={option.value}
                  className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={option.label}
                  className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AppMultipleSelect;
