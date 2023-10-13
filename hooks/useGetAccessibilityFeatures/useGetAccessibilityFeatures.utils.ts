export const getAccessibilityFeatures = async () => {
  const res: AccessibilityFeature[] = await fetch(
    `${process.env.NEXT_PUBLIC_URL}accessibility-features`,
  ).then((res) => res.json());
  return res;
};
