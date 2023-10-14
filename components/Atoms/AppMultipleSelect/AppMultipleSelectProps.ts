export interface AppMultipleSelectProps {
  togglerTitle: string;
  options: {
    label: string;
    value: number;
  }[];
  selectedOptions: any;
  setSelectedOptions: any;
}
