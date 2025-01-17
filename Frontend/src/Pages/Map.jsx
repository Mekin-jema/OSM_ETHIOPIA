import { useEffect, useRef, useState } from "react";
import maplibregl, { Color } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { PMTiles, Protocol } from "pmtiles";
//
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import "@maptiler/geocoding-control/style.css";

const Map = () => {
  // Refs for map container and map instance
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapInstance.current) return; // Prevent re-initialization

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const pmtiles = new PMTiles("map.pmtiles");
    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/bright/style.json?key=u9EnL0tM9ZS24uoyFpL7",
    });

    pmtiles.getHeader().then((header) => {
      protocol.add(pmtiles);

      // Add map controls
      mapInstance.current.addControl(
        new maplibregl.NavigationControl(),
        "top-right"
      );
      mapInstance.current.addControl(
        new maplibregl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        }),
        "top-left"
      );

      // Handle map click to show coordinates
      mapInstance.current.on("click", (e) => {
        const coordinates = e.lngLat;
        new maplibregl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `Coordinates: [${coordinates.lng.toFixed(
              5
            )}, ${coordinates.lat.toFixed(5)}]`
          )
          .addTo(mapInstance.current);
      });
    });

    return () => mapInstance.current?.remove();
  }, []);

  // Function to handle user input and plot route

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div ref={mapContainer} style={{ flex: 1 }} />
    </div>
  );
};

export default Map;
