"use client";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { CSSProperties, useCallback, useState } from "react";

const SingleMapLocator = ({
  options,
  position,
  style,
}: {
  options: google.maps.MarkerOptions | undefined;
  position: { lat: number; lng: number };
  style: CSSProperties | undefined;
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    // Create an empty LatLngBounds object to store the bounds of all markers
    const bounds = new window.google.maps.LatLngBounds();

    // Loop through the marker positions and extend the bounds for each position

    bounds.extend({
      lat: position.lat,
      lng: position.lng,
    });

    // Fit the map to the calculated bounds
    map.fitBounds(bounds);
  }, []);
  if (!isLoaded) return null;
  return (
    <GoogleMap onLoad={onLoad} mapContainerStyle={style}>
      <div>
        <MarkerF options={options} position={position} />
      </div>
    </GoogleMap>
  );
};
export default SingleMapLocator;
