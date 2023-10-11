"use client";

import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import React from "react";

function MapLocator() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [customAddress, setCustomAddress] = useState<string>(""); // State for custom address input
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null); // Geocoder instance
  const [customMarker, setCustomMarker] = useState<google.maps.Marker | null>(null); // Custom marker
  const [searchError, setSearchError] = useState<string | null>(null);
  const [userPin, setUserPin] = useState<null | {lat: number, lng: number}>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map); // Store the map instance
    setGeocoder(new window.google.maps.Geocoder()); // Initialize the geocoder instance
  }, []);



  const handleClearFilters = () => {


    // Reset the map's center and zoom to fit all markers
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
    }
  };
  
  const MONTENEGRO_CENTER = { lat: 42.708678, lng: 19.374390 };

  const handleCustomAddressSearch = () => {
    if (!geocoder || !customAddress.trim()) {
      return;
    }

    geocoder.geocode({ address: customAddress }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const { location } = results[0].geometry;

        // Remove the previous custom marker if it exists
        if (customMarkesetSearchErrorr) {
          customMarker.setMap(null);
        }

        const marker = new window.google.maps.Marker({
          position: location,
          map,
          title: customAddress,
        });

        // Pan and zoom to the custom marker
        map?.panTo(location);
        map?.setZoom(15);

        // Set the new custom marker
        setCustomMarker(marker);
      } else {
        setSearchError("Custom address not found.");
      }
    });
  };

  const handleClick = (event: google.maps.MapMouseEvent) => {
    if(event.latLng !== null){
      setUserPin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };
  return isLoaded ? (
    <>
      <input type="text" value={userPin?.lat}/>
      <input type="text" value={userPin?.lng}/>
      <GoogleMap  center={MONTENEGRO_CENTER} onClick={(e)=>handleClick(e)} zoom={10} onLoad={onLoad} mapContainerStyle={{ width: "100%", height: 500 }}>
      {userPin && (
        <MarkerF
            position={userPin}
            clickable={true}
            draggable={true}  // Allow the user to drag the pin if desired
            onDragEnd={(event) => {
                // Update the user pin position after dragging ends
                setUserPin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            }}
        />
    )}
      </GoogleMap>
      
    </>
  ) : (
    <></>
  );
}

export default MapLocator;
