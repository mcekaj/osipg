import { ReactNode } from "react";

export type AppButtonVariants = "primary" | "outlined";

export interface AppButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  variant?: AppButtonVariants;
  disabled?: boolean;
  fullWidth?: boolean;
}
