import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/bright/style.json?key=u9EnL0tM9ZS24uoyFpL7",
      center: [11.413507, 47.270537],
      zoom: 13,
    });

    map.on("load", () => {
      const start = [11.393712, 47.259938];
      const end = [11.430896, 47.28187];

      // Valhalla routing request payload
      const routeRequest = {
        locations: [
          { lat: start[1], lon: start[0] },
          { lat: end[1], lon: end[0] },
        ],
        costing: "auto",
        directions_options: { units: "kilometers" },
      };

      fetch("https://valhalla1.openstreetmap.de/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(routeRequest),
      })
        .then((response) => response.json())
        .then((data) => {
          const routeGeometry = data.trip.legs[0].shape;

          const coordinates = decodePolyline(routeGeometry);

          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: coordinates,
                },
              },
            },
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#2a3561",
              "line-width": 5,
            },
          });

          // End marker
          new maplibregl.Marker()
            .setLngLat(coordinates[coordinates.length - 1])
            .addTo(map);
        });
    });

    return () => map.remove();
  }, []);

  // Polyline decoder for Valhalla
  function decodePolyline(encoded) {
    let coordinates = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lat += result & 1 ? ~(result >> 1) : result >> 1;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      lng += result & 1 ? ~(result >> 1) : result >> 1;

      coordinates.push([lng / 1e6, lat / 1e6]);
    }
    return coordinates;
  }

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapComponent;
