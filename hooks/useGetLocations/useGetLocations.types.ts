export interface Location {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  category: {
    id: number;
    name: string;
    relativeUrl: string;
  };
  accessibilityFeatures: [
    {
      id: number;
      name: string;
    },
  ];
}
