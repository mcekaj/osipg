import { SelectHTMLAttributes } from "react";

interface AppSelectOptionProps {
  value: number;
  title: string;
}
export interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  selectPlaceholderTitle?: string;
  options: AppSelectOptionProps[];
  errorMessage?: string;
}
