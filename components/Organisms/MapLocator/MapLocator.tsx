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
import { useCallback, useState } from "react";
import React from "react";
import Link from "next/link";
import { MapLocatorProps } from "./MapLocator.types";
import AppMultipleSelect from "@/components/Atoms/AppMultipleSelect/AppMultipleSelect";
import useGetLocations from "@/hooks/useGetLocations/useGetLocations";
import Cluster1 from "@/styles/assets/cluster-1.png";
import Cluster2 from "@/styles/assets/cluster-2.png";
import Cluster3 from "@/styles/assets/cluster-3.png";
import Cluster4 from "@/styles/assets/cluster-4.png";
import Cluster5 from "@/styles/assets/cluster-5.png";

function MapLocator({ locations, categories, accessibilityFeatures }: MapLocatorProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [customAddress, setCustomAddress] = useState<string>(""); // State for custom address input
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // State for custom address input
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

  const handleSearch = async () => {
    try {
      // if (filter.trim() === "") {
      //   setSearchError("Please enter a search term.");
      //   return;
      // }
      const { locationsByCategoryId } = await useGetLocations({
        categoryId: selectedCategory,
      });

      // Find locations that match the filter
      const filtered = locationsByCategoryId.filter((loc) =>
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
    handleCustomAddressSearch();
  };

  const iconArray = [Cluster1, Cluster2, Cluster3, Cluster4, Cluster5];
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
          options={categories.map((category) => {
            return {
              title: category.name,
              value: category.id,
            };
          })}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(+e.target.value)}
          selectPlaceholderTitle="First select"
        />
        <AppMultipleSelect
          togglerTitle="Tagovi"
          options={accessibilityFeatures.map((feature) => {
            return {
              label: feature.name,
              value: feature.name,
            };
          })}
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
      <GoogleMap zoom={10} onLoad={onLoad} mapContainerStyle={{ width: "100%", height: 800 }}>
        <MarkerClusterer
          options={{
            minimumClusterSize: 2,
            enableRetinaIcons: true,
            gridSize: 60,

            calculator: (markers, numStyles) => {
              const clusterSize = markers.length;
              let index = 0;

              // Determine the index of the icon based on the cluster size
              if (clusterSize >= 10) {
                index = 4;
              } else if (clusterSize >= 5) {
                index = 3;
              } else if (clusterSize >= 2) {
                index = 2;
              } else if (clusterSize === 1) {
                index = 1;
              }

              const icon = iconArray[index]; // Get the appropriate icon from the iconArray

              // Create a custom HTML for the cluster icon
              const customHtml = `<div style="position:relative;width:80px; height:80px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <img src="${icon.src}" width="80" height="80" />
              <p style="position:absolute;font-size:20px;color:blue">${clusterSize}</p>
            </div>`;

              return {
                text: clusterSize.toString(),
                index,
                title: "",
                html: customHtml, // Use the custom HTML for the cluster icon
              };
            },
          }}
        >
          {(clusterer) => (
            <div>
              {filteredLocations.map((loc) => (
                <MarkerF
                  options={{
                    icon: {
                      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${loc.category.relativeUrl}`,
                    },
                  }}
                  key={loc.id}
                  position={{ lat: loc.latitude, lng: loc.longitude }}
                  clusterer={clusterer}
                  onClick={() => {
                    setActiveMarker(loc.id);
                  }}
                >
                  {process.env.NEXT_PUBLIC_BASE_URL}
                  {loc.category.relativeUrl}
                  {activeMarker === loc.id && (
                    <InfoWindowF
                      onCloseClick={() => {
                        setActiveMarker(null);
                      }}
                    >
                      <div className="flex flex-col gap-3 lg:flex-row">
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
