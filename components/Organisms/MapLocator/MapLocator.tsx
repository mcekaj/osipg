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
import { useCallback, useEffect, useState } from "react";
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
import { toast } from "react-toastify";

function MapLocator({
  defaultLocations,
  categories,
  accessibilityFeatures,
  cities,
}: MapLocatorProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "",
  });
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [cityId, setCityId] = useState<number | null>(null); // State for custom address input
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // State for custom address input
  const [selectedAccessabilityFeatures, setSelectedAccessabilityFeatures] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState(defaultLocations);

  const displayError = () => toast(searchError);
  useEffect(() => {
    displayError();
  }, [searchError]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map); // Store the map instance

    // Create an empty LatLngBounds object to store the bounds of all markers
    const bounds = new window.google.maps.LatLngBounds();

    // Loop through the marker positions and extend the bounds for each position

    defaultLocations.forEach((loc) => {
      bounds.extend({
        lat: loc.latitude,
        lng: loc.longitude,
      });
    });

    // Fit the map to the calculated bounds
    map.fitBounds(bounds);
  }, []);

  const handleClearFilters = () => {
    setName("");
    setCityId(null);
    setSelectedCategory(null);
    setSelectedAccessabilityFeatures([]);
    setSearchError(null);
    setActiveMarker(null);
    setFilteredLocations(defaultLocations);

    // Reset the map's center and zoom to fit all markers
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      defaultLocations.forEach((loc) => {
        bounds.extend({
          lat: loc.latitude,
          lng: loc.longitude,
        });
      });
      map.fitBounds(bounds);
    }
  };

  const handleSearch = async () => {
    try {
      const { locations } = await useGetLocations({
        locationParams: {
          categoryId: selectedCategory,
          cityId: cityId,
          featureIds: selectedAccessabilityFeatures,
          name: name,
        },
      });

      // Find locations that match the filter

      setFilteredLocations(locations);

      if (locations.length === 0) {
        setSearchError("No matching results found.");
        setFilteredLocations(defaultLocations);
      } else {
        setSearchError(null);

        // If there's a matching result, zoom to it
        if (map) {
          if (locations.length >= 1) {
            // If there's a single matching result, pan and zoom to it
            map.panTo({ lat: locations[0].latitude, lng: locations[0].longitude });
            map.setZoom(15); // Adjust the zoom level as needed
          } else {
            // If there are multiple matches, adjust the viewport to encompass all of them
            const bounds = new window.google.maps.LatLngBounds();
            locations.forEach((loc) => {
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

  const iconArray = [Cluster1, Cluster2, Cluster3, Cluster4, Cluster5];

  return isLoaded ? (
    <>
      <div className="grid lg:grid-cols-5 gap-5 py-3 w-100">
        <AppInput
          placeholder="Ime objekta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="Name"
        />
        <AppSelect
          name="cities"
          options={cities.map((city) => {
            return {
              title: city.name,
              value: city.id,
            };
          })}
          value={cityId || 0}
          onChange={(e) => setCityId(Number(e.target.value))}
          selectPlaceholderTitle="Grad"
        />
        <AppSelect
          name="kategorije"
          options={categories.map((category) => {
            return {
              title: category.name,
              value: category.id,
            };
          })}
          value={selectedCategory || 0}
          onChange={(e) => setSelectedCategory(+e.target.value)}
          selectPlaceholderTitle="Kategorije"
        />
        <AppMultipleSelect
          togglerTitle="Elementi pristupačnosti"
          options={accessibilityFeatures.map((feature) => {
            return {
              label: feature.name,
              value: feature.id,
            };
          })}
          selectedOptions={selectedAccessabilityFeatures}
          setSelectedOptions={setSelectedAccessabilityFeatures}
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
      {isLoaded ? (
        <GoogleMap zoom={10} onLoad={onLoad} mapContainerStyle={{ width: "100%", height: 600 }}>
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
                    {activeMarker === loc.id && (
                      <InfoWindowF
                        onCloseClick={() => {
                          setActiveMarker(null);
                        }}
                      >
                        <div className="flex flex-col gap-3 lg:flex-row items-center">
                          <div>
                            <img
                              width={200}
                              height={100}
                              src={`${process.env.NEXT_PUBLIC_BASE_URL}/${loc.thumbnailUrl}`}
                              alt={loc.category.name}
                            />
                          </div>
                          <div className="flex flex-col justify-between gap-3">
                            <h3 className="text-blue-800 text-lg">
                              <strong>{loc.name}</strong>
                            </h3>
                            <h3 className="text-gray-700 text-lg">{loc.address}</h3>
                            <Link href={`objekti/${loc.slug}`}>
                              <AppButton variant="outlined" fullWidth>
                                Opširnije
                              </AppButton>
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
      ) : (
        <div className="h-[600px]"></div>
      )}
    </>
  ) : (
    <></>
  );
}

export default MapLocator;
