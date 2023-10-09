import { AppButtonProps, AppButtonVariants } from "./AppButton.types";

export const APP_BUTTON_VARIANTS: Record<AppButtonVariants, string> = {
  alternative: "bg-white text-gray-900 hover:bg-gray-100 hover:text-blue-700",
  dark: "bg-gray-800 text-white hover:bg-gray-900",
  light: "bg-white text-gray-900 hover:bg-gray-100",
  green: "bg-green-700 text-white hover:bg-green-800",
  red: "bg-red-700 text-white hover:bg-red-800",
  yellow: "bg-yellow-400 text-white hover:bg-yellow-500",
  purple: "bg-purple-700 text-white hover:bg-purple-800",
  default: "bg-blue-700 text-white hover:bg-blue-800",
} as const;
