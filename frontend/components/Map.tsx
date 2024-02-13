"use client";

import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { PinIcon } from "./Icons";
import { useRef, useState } from "react";

interface MapComponentProps {
  locations: {
    type: string;
    coordinates: number[];
    address: string;
    description: string;
    day: number;
  }[];
}

const MapComponent = ({ locations }: MapComponentProps) => {
  const [selectedMarker, setSelectedMarker] = useState<{
    loc: {
      type: string;
      coordinates: number[];
      address: string;
      description: string;
      day: number;
    };
    index: number;
  } | null>(null);

  const mapRef = useRef<any>(null);

  const zoomToSelectedLoc = (
    e: React.MouseEvent<HTMLButtonElement>,
    loc: {
      type: string;
      coordinates: number[];
      address: string;
      description: string;
      day: number;
    },
    index: number,
  ) => {
    e.stopPropagation();
    if (mapRef.current) {
      mapRef.current.getMap().flyTo({
        center: [loc.coordinates[0], loc.coordinates[1]],
        essential: true,
        zoom: 10,
      });
      setSelectedMarker({ loc, index });
    }
  };

  return (
    <>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: locations[0].coordinates[0],
          latitude: locations[0].coordinates[1],
          zoom: 3.5,
        }}
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          overflow: "hidden",
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {locations.map((loc, index) => {
          return (
            <Marker
              key={index}
              longitude={loc.coordinates[0]}
              latitude={loc.coordinates[1]}
              style={{ position: "absolute", top: "0", left: "0" }}
            >
              <button
                type="button"
                onClick={(e) => zoomToSelectedLoc(e, loc, index)}
              >
                <PinIcon className="text-red-500" width={40} height={40} />
              </button>
            </Marker>
          );
        })}

        {selectedMarker ? (
          <Popup
            longitude={selectedMarker.loc.coordinates[0]}
            latitude={selectedMarker.loc.coordinates[1]}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setSelectedMarker(null)}
            anchor="bottom"
            offset={10}
            style={{ position: "absolute", top: "0", left: "0" }}
          >
            <div className="bg-white p-2 text-black">
              {selectedMarker.loc.description}
            </div>
          </Popup>
        ) : null}
      </Map>
    </>
  );
};

export default MapComponent;
