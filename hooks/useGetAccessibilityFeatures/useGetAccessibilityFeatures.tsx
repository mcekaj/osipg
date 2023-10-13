import { getAccessibilityFeatures } from "./useGetAccessibilityFeatures.utils";

const useGetAccessibilityFeatures = async () => {
  const accessibilityFeatures = await getAccessibilityFeatures();
  return { accessibilityFeatures: accessibilityFeatures };
};
export default useGetAccessibilityFeatures;
