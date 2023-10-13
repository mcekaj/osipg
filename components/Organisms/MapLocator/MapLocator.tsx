"use client";
import AppButton from "@/components/Atoms/AppButton/AppButton";
import AppInput from "@/components/Atoms/AppInput/AppInput";
import AppSelect from "@/components/Atoms/AppSelect/AppSelect";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import Image from "next/image";
import { useCallback, useState } from "react";
import React from "react";
import { Location } from "./MapLocator.types";
import Link from "next/link";

function MapLocator({ locations }: { locations: Location[] }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [customAddress, setCustomAddress] = useState<string>(""); // State for custom address input
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null); // Geocoder instance
  const [customMarker, setCustomMarker] = useState<google.maps.Marker | null>(null); // Custom marker
  const [filteredLocations, setFilteredLocations] = useState(locations);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map); // Store the map instance
    setGeocoder(new window.google.maps.Geocoder()); // Initialize the geocoder instance

    // Create an empty LatLngBounds object to store the bounds of all markers
    const bounds = new window.google.maps.LatLngBounds();

    // Loop through the marker positions and extend the bounds for each position

    locations.forEach((loc) => {
      bounds.extend({
        lat: loc.latitude,
        lng: loc.longitude,
      });
    });

    // Fit the map to the calculated bounds
    map.fitBounds(bounds);
  }, []);

  const handleSearch = async () => {
    try {
      if (filter.trim() === "") {
        setSearchError("Please enter a search term.");
        return;
      }

      // Find locations that match the filter
      const filtered = locations.filter((loc) =>
        loc.name.toLowerCase().includes(filter.toLowerCase()),
      );
      setFilteredLocations(filtered);

      if (filtered.length === 0) {
        setSearchError("No matching results found.");
      } else {
        setSearchError(null);

        // If there's a matching result, zoom to it
        if (map) {
          if (filtered.length === 1) {
            // If there's a single matching result, pan and zoom to it
            map.panTo({ lat: filtered[0].latitude, lng: filtered[0].longitude });
            map.setZoom(15); // Adjust the zoom level as needed
          } else {
            // If there are multiple matches, adjust the viewport to encompass all of them
            const bounds = new window.google.maps.LatLngBounds();
            filtered.forEach((loc) => {
              bounds.extend({ lat: loc.latitude, lng: loc.longitude });
            });
            map.fitBounds(bounds);
          }
        }
      }

      // Reset the active marker
      setActiveMarker(null);
    } catch (error) {
      setSearchError("Error searching. Please try again later.");
    }
  };

  const handleClearFilters = () => {
    setFilter("");
    setSearchError(null);
    setActiveMarker(null);
    setFilteredLocations(locations);

    // Reset the map's center and zoom to fit all markers
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((loc) => {
        bounds.extend({
          lat: loc.latitude,
          lng: loc.longitude,
        });
      });
      map.fitBounds(bounds);
    }
  };

  const handleCustomAddressSearch = () => {
    if (!geocoder || !customAddress.trim()) {
      return;
    }

    geocoder.geocode({ address: customAddress }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const { location } = results[0].geometry;

        // Remove the previous custom marker if it exists
        if (customMarker) {
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

  return isLoaded ? (
    <>
      <div className="grid lg:grid-cols-4 gap-5 py-3 w-100">
        <AppInput
          placeholder="Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          name="Name"
        />
        <AppInput
          name="address"
          value={customAddress}
          onChange={(e) => setCustomAddress(e.target.value)}
          placeholder="Address"
        />
        <AppSelect
          name="First select"
          options={[{ title: "First", value: "first" }]}
          selectPlaceholderTitle="First select"
        />
        <div className="flex gap-3">
          <AppButton variant="primary" onClick={handleSearch} fullWidth>
            Search
          </AppButton>
          <AppButton variant="outlined" onClick={handleClearFilters} fullWidth>
            Clear
          </AppButton>
        </div>
      </div>
      {searchError && <p>{searchError}</p>}
      <GoogleMap zoom={10} onLoad={onLoad} mapContainerStyle={{ width: "100%", height: 500 }}>
        <MarkerClusterer options={{ minimumClusterSize: 2, enableRetinaIcons: true }}>
          {(clusterer) => (
            <div>
              {filteredLocations.map((loc) => (
                <MarkerF
                  key={loc.id}
                  position={{ lat: loc.latitude, lng: loc.longitude }}
                  clusterer={clusterer}
                  onClick={() => {
                    setActiveMarker(loc.id);
                  }}
                >
                  {activeMarker === loc.id && (
                    <InfoWindowF
                      onCloseClick={() => {
                        setActiveMarker(null);
                      }}
                    >
                      <div className="flex flex-col gap-3 lg:flex-row">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${loc.category.relativeUrl}`}
                          width={200}
                          height={200}
                          alt="dasda"
                        />
                        <div className="flex flex-col justify-between">
                          <h3 className="text-blue-800 text-lg">
                            <strong>{loc.name}</strong>
                          </h3>
                          <h3 className="text-gray-700 text-lg">
                            Mila jovovica 32, Podgorica Crna Gora
                          </h3>
                          <p>Lat: {loc.longitude}</p>
                          <p>Lng: {loc.latitude}</p>
                          <Link href={`objekti/${loc.id}`}>
                            <AppButton variant="outlined">Opširnije</AppButton>
                          </Link>
                        </div>
                      </div>
                    </InfoWindowF>
                  )}
                </MarkerF>
              ))}
            </div>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default MapLocator;
