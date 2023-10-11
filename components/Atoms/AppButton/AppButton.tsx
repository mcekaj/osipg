"use client";

import { twMerge } from "tailwind-merge";
import { AppButtonProps } from "./AppButton.types";
import { APP_BUTTON_VARIANTS } from "./AppButton.utils";

const AppButton = ({
  children,
  type = "button",
  onClick,
  className,
  variant = "primary",
  disabled,
  fullWidth,
}: AppButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={twMerge(
        `font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-4 dark:rounded dark:px-5 dark:py-2.5 dark:mr-2 dark:mb-2 dark:focus:ring-4 ${APP_BUTTON_VARIANTS[variant]}`,
        disabled && "opacity-50 cursor-not-allowed",
        fullWidth && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
};
export default AppButton;
