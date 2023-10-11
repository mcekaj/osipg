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

let locations1 = [
  { id: 1, lat: 42.442575, lng: 19.262203, name: "Podgorica University" },
  { id: 2, lat: 42.441499, lng: 19.265312, name: "Podgorica City Library" },
  { id: 3, lat: 42.445785, lng: 19.266962, name: "Royal Montenegro Museum" },
  { id: 4, lat: 42.443277, lng: 19.258827, name: "Podgorica Central Hospital" },
  { id: 5, lat: 42.439922, lng: 19.262976, name: "National Theater of Montenegro" },
  { id: 6, lat: 42.437849, lng: 19.268731, name: "Podgorica Art Gallery" },
  { id: 7, lat: 42.444512, lng: 19.271454, name: "City Hall of Podgorica" },
  { id: 8, lat: 42.442079, lng: 19.273512, name: "Podgorica Cultural Center" },
  { id: 9, lat: 42.440301, lng: 19.259735, name: "Montenegro Sports Arena" },
  { id: 10, lat: 42.446859, lng: 19.269053, name: "Montenegro Business Hub" },
  { id: 11, lat: 42.438759, lng: 19.264708, name: "Podgorica Science Center" },
  { id: 12, lat: 42.445015, lng: 19.253858, name: "Podgorica Children's Park" },
  { id: 13, lat: 42.447604, lng: 19.256299, name: "Montenegro History Archive" },
  { id: 14, lat: 42.44027, lng: 19.267587, name: "Podgorica Contemporary Art Museum" },
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
  const [filteredLocations, setFilteredLocations] = useState(locations1);

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
      setFilteredLocations(filtered);

      if (filtered.length === 0) {
        setSearchError("No matching results found.");
      } else {
        setSearchError(null);

        // If there's a matching result, zoom to it
        if (map) {
          if (filtered.length === 1) {
            // If there's a single matching result, pan and zoom to it
            map.panTo({ lat: filtered[0].lat, lng: filtered[0].lng });
            map.setZoom(15); // Adjust the zoom level as needed
          } else {
            // If there are multiple matches, adjust the viewport to encompass all of them
            const bounds = new window.google.maps.LatLngBounds();
            filtered.forEach((loc) => {
              bounds.extend({ lat: loc.lat, lng: loc.lng });
            });
            map.fitBounds(bounds);
          }
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
    setFilteredLocations(locations1);

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
