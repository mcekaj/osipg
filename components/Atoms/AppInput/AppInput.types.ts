import { InputHTMLAttributes } from "react";

export interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
