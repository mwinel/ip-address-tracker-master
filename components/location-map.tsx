"use client";

import { useEffect, useState, useRef } from "react";
import Map, { MapRef, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

interface Location {
  lat: number;
  lng: number;
}

export function LocationMap({ location }: { location: Location }) {
  const { lat, lng } = location;
  const [viewState, setViewState] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 16,
  });
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    setViewState({
      longitude: lng,
      latitude: lat,
      zoom: 16,
    });
  }, [lng, lat]);

  return (
    <Map
      {...viewState}
      style={{
        height: `calc(100vh - ${window.innerWidth < 768 ? "20rem" : "16rem"})`,
        width: "100%",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      ref={mapRef}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      <Marker longitude={lng} latitude={lat}>
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
          <path
            fill-rule="evenodd"
            d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"
          />
        </svg>
      </Marker>
    </Map>
  );
}
