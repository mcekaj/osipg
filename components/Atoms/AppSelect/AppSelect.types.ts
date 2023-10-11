import { SelectHTMLAttributes } from "react";

interface AppSelectOptionProps {
  value: string;
  title: string;
}
export interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  selectPlaceholderTitle: string;
  options: AppSelectOptionProps[];
}
