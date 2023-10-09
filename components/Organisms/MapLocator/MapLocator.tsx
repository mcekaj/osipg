"use client";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import React from "react";

const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const locations1 = [
  { id: 1, lat: -31.56391, lng: 147.154312, name: "Golden Pines Meadow" },
  { id: 2, lat: -33.718234, lng: 150.363181, name: "Golden Cove" },
  { id: 3, lat: -33.727111, lng: 150.371124, name: "Golden Falls" },
  { id: 4, lat: -33.848588, lng: 151.209834, name: "Mystic Haven" },
  { id: 5, lat: -33.851702, lng: 151.216968, name: "Silver Moon Ridge" },
  { id: 6, lat: -34.671264, lng: 150.863657, name: "Emerald Isle Bay" },
  { id: 7, lat: -35.304724, lng: 148.662905, name: "Sunflower Valley" },
  { id: 8, lat: -36.817685, lng: 175.699196, name: "Enchanted Woods Hollow" },
  { id: 9, lat: -36.828611, lng: 175.790222, name: "Starlight Oasis" },
  { id: 10, lat: -37.75, lng: 145.116667, name: "Golden Sands Beach" },
  { id: 11, lat: -37.759859, lng: 145.128708, name: "Willowbrook Glen" },
  { id: 12, lat: -37.765015, lng: 145.133858, name: "Aurora Peaks" },
  { id: 13, lat: -37.770104, lng: 145.143299, name: "Tranquil Waterside Retreat" },
  { id: 14, lat: -37.7737, lng: 145.145187, name: "Wildflower Meadowlands" },
];
function MapLocator() {
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

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map); // Store the map instance
    setGeocoder(new window.google.maps.Geocoder()); // Initialize the geocoder instance

    // Create an empty LatLngBounds object to store the bounds of all markers
    const bounds = new window.google.maps.LatLngBounds();

    // Loop through the marker positions and extend the bounds for each position
    locations1.forEach((loc) => {
      bounds.extend(loc);
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
      const filtered = locations1.filter((loc) =>
        loc.name.toLowerCase().includes(filter.toLowerCase()),
      );

      if (filtered.length === 0) {
        setSearchError("No matching results found.");
      } else {
        setSearchError(null);

        // If there's a matching result, zoom to it
        if (map && filtered[0]) {
          map.panTo({ lat: filtered[0].lat, lng: filtered[0].lng });
          map.setZoom(15); // Adjust the zoom level as needed
        }
      }

      // Reset the active marker
      setActiveMarker(null);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchError("Error searching. Please try again later.");
    }
  };

  const handleClearFilters = () => {
    setFilter("");
    setSearchError(null);
    setActiveMarker(null);

    // Reset the map's center and zoom to fit all markers
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      locations1.forEach((loc) => {
        bounds.extend(loc);
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
      <input placeholder="Name" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <input
        placeholder="Address"
        value={customAddress}
        onChange={(e) => setCustomAddress(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClearFilters}>Clear filters</button>
      <button onClick={handleCustomAddressSearch}>Search Custom Address</button>
      {searchError && <p>{searchError}</p>}
      <GoogleMap
        center={defaultCenter}
        zoom={10}
        onLoad={onLoad}
        mapContainerStyle={{ width: 500, height: 500 }}
      >
        <MarkerClusterer options={{ minimumClusterSize: 2, enableRetinaIcons: true }}>
          {(clusterer) => (
            <div>
              {locations1.map((loc) => (
                <MarkerF
                  key={loc.id}
                  position={{ lat: loc.lat, lng: loc.lng }}
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
                      <>
                        <h3>Name: {loc.name}</h3>
                        <p>Lat: {loc.lat}</p>
                        <p>Lng: {loc.lng}</p>
                      </>
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
