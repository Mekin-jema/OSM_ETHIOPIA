import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { PMTiles, Protocol } from "pmtiles";
import { styles } from "../utils/styles";

const Demo = () => {
  // Refs for map container and instance
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  useEffect(() => {
    if (mapInstance.current) return; // Prevent re-initialization if map already exists

    // Register PMTiles protocol with MapLibre
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    // Initialize PMTiles source
    const pmtiles = new PMTiles("map.pmtiles");

    pmtiles.getHeader().then((header) => {
      console.log("Header information:", header); // Log header information
      protocol.add(pmtiles); // Register PMTiles with protocol

      // Create and configure the map instance
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current, // Container for the map
        // style: `https://api.maptiler.com/maps/bright/style.json?key=${apiKey} `, // Map style
        style: styles.default,
        center: [header.centerLon, header.centerLat], // Center from PMTiles metadata
        zoom: 10, // Initial zoom level
      });
    });
    // Cleanup the map when component unmounts
    return () => mapInstance.current?.remove();
  }, []);

  return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
};

export default Demo;
