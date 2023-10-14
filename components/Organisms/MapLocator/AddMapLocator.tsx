"use client";

import AddLocationForm from "@/components/Molecules/AddLocationForm/AddLocationForm";
import useGetAccessibilityFeatures from "@/hooks/useGetAccessibilityFeatures/useGetAccessibilityFeatures";
import useGetCategories from "@/hooks/useGetCategories/useGetCategories";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import React from "react";
import { Category } from "@/hooks/useGetCategories/useGetCategories.types";
import useGetCities from "@/hooks/useGetCities/useGetCities";
import { DropdownsData } from "./AddMapLocator.types";

function MapLocator() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userPin, setUserPin] = useState<null | { lat: number; lng: number }>(null);
  const [dropdownsData, setDropdownsData] = useState<DropdownsData>({
    categories: [],
    accessibilityFeatures: [],
    cities: [],
  });
  const MONTENEGRO_CENTER = { lat: 42.708678, lng: 19.37439 };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map); // Store the map instance
    const fetchDropdowns = async () => {
      const { categories: fetchedCategories } = await useGetCategories();
      const { accessibilityFeatures: fetchedAccessibilityFeatures } =
        await useGetAccessibilityFeatures();
      const { cities: fetchedCities } = await useGetCities();
      setDropdownsData({
        categories: fetchedCategories,
        accessibilityFeatures: fetchedAccessibilityFeatures,
        cities: fetchedCities,
      });
    };
    fetchDropdowns();
  }, []);

  const handlePinDrag = (event: google.maps.MapMouseEvent) => {
    // Update the user pin position after dragging ends
    if (event.latLng !== null) {
      setUserPin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };
  const handleClickOnMap = (event: google.maps.MapMouseEvent) => {
    // set pin position after clicking on a map
    if (event.latLng !== null) {
      setUserPin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return isLoaded ? (
    <>
      <AddLocationForm lat={userPin?.lat} lng={userPin?.lng} dropdownsData={dropdownsData} />
      <GoogleMap
        center={userPin || MONTENEGRO_CENTER}
        onClick={handleClickOnMap}
        zoom={10}
        onLoad={onLoad}
        mapContainerStyle={{ width: "100%", height: 650 }}
      >
        {userPin && (
          <MarkerF
            position={userPin}
            clickable={true}
            draggable={true} // Allow the user to drag the pin if desired
            onDragEnd={handlePinDrag}
          />
        )}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default MapLocator;
