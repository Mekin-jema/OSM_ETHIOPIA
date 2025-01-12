import React, { useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [results, setResults] = useState("");
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json", // MapLibre demo style
      center: [38.75, 9.03], // Default center [lng, lat]
      zoom: 12,
    });

    mapInstance.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      setLat(lat);
      setLng(lng);
      reverseGeocoding(lng, lat);
    });

    mapInstance.on("load", () => {
      const { lng, lat } = mapInstance.getCenter();
      setLat(lat);
      setLng(lng);
    });

    setMap(mapInstance);
  }, []);

  const reverseGeocoding = async (lng, lat) => {
    if (!lng || !lat) {
      setResults("");
    } else {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lon=${lng}&lat=${lat}`
      );
      const data = await response.json();
      setResults(JSON.stringify(data, null, 2));

      if (marker) {
        marker.setLngLat([lng, lat]);
      } else {
        const newMarker = new maplibregl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
        setMarker(newMarker);
      }

      map.flyTo({
        center: [lng, lat],
        essential: true,
        zoom: 15,
      });
    }
  };

  const handleSearch = () => {
    const lngValue = parseFloat(lng);
    const latValue = parseFloat(lat);
    reverseGeocoding(lngValue, latValue);
  };

  return (
    <div>
      <div
        id="map"
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      ></div>
      <div
        className="coordinates"
        style={{
          position: "relative",
          top: 5,
          left: 5,
          zIndex: 1000,
        }}
      >
        <div className="mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </div>
        <div className="mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <pre
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "50%",
          overflow: "auto",
          background: "rgba(255, 255, 255, 0.8)",
          color: "black",
          fontSize: "0.8em",
        }}
      >
        {results}
      </pre>
    </div>
  );
};

export default MapComponent;
