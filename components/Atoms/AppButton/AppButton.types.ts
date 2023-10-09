import { ReactNode } from "react";

export type AppButtonVariants =
  | "default"
  | "alternative"
  | "dark"
  | "light"
  | "green"
  | "red"
  | "yellow"
  | "purple";

export interface AppButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: AppButtonVariants;
  disabled?: boolean;
}
