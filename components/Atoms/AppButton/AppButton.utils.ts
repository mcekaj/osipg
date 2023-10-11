import { AppButtonProps, AppButtonVariants } from "./AppButton.types";

export const APP_BUTTON_VARIANTS: Record<AppButtonVariants, string> = {
  primary: "bg-blue-700 hover:bg-blue-800 text-white border border-blue-700",
  outlined: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 ",
} as const;
