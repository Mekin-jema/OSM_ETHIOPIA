import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css";
import MaplibreGeocoder from "@maplibre/maplibre-gl-geocoder";
import "maplibre-gl/dist/maplibre-gl.css";
// Autocomplete Search Box for MapLibre GL JS
import { MapLibreSearchControl } from "@stadiamaps/maplibre-search-box";
import "@stadiamaps/maplibre-search-box/dist/style.css";
// map directions
import MapLibreGlDirections, {
  LoadingIndicatorControl,
} from "@maplibre/maplibre-gl-directions";
const MapWithGeocoder = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [transportMode, setTransportMode] = useState("auto");

  useEffect(() => {
    // Initialize the map
    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/bright/style.json?key=u9EnL0tM9ZS24uoyFpL7",
      center: [11.413507, 47.270537],
      zoom: 13,
    });
    setMap(mapInstance);

    const control = new MapLibreSearchControl({
      onResultSelected: (feature) => {
        // You can add code here to take some action when a result is selected.
        console.log(feature.geometry.coordinates);
      },
      // You can also use our EU endpoint to keep traffic within the EU using the basePath option:
      // baseUrl: "https://api-eu.stadiamaps.com",
    });
    mapInstance.addControl(control, "top-left");
    // Import the plugin

    // Make sure to create a MapLibreGlDirections instance only after the map is loaded
    mapInstance.on("load", () => {
      // Create an instance of the default class
      const directions = new MapLibreGlDirections(mapInstance);

      // Enable interactivity (if needed)
      directions.interactive = true;

      // Optionally add the standard loading-indicator control
      map.addControl(new LoadingIndicatorControl(directions));

      // Set the waypoints programmatically
      directions.setWaypoints([
        [-73.8271025, 40.8032906],
        [-73.8671258, 40.82234996],
      ]);

      // Remove waypoints
      directions.removeWaypoint(0);

      // Add waypoints
      directions.addWaypoint([-73.8671258, 40.82234996], 0);

      // Remove everything plugin-related from the map
      directions.clear();
    });

    // Custom geocoder API
    const geocoderApi = {
      forwardGeocode: async (config) => {
        const features = [];
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${config.query}&format=geojson&polygon_geojson=1&addressdetails=1`
          );
          const geojson = await response.json();

          for (const feature of geojson.features) {
            const center = [
              feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
              feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
            ];
            features.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: center,
              },
              place_name: feature.properties.display_name,
              properties: feature.properties,
              text: feature.properties.display_name,
              place_type: ["place"],
              center,
            });
          }
        } catch (e) {
          console.error("Geocoding error:", e);
        }
        return { features };
      },
    };

    // Add geocoder controls
    const geocoder1 = new MaplibreGeocoder(geocoderApi, {
      maplibregl,
      placeholder: "Enter Starting Point",
    });
    const geocoder2 = new MaplibreGeocoder(geocoderApi, {
      maplibregl,
      placeholder: "Enter Ending Point",
    });
    mapInstance.addControl(geocoder1, "top-left");
    mapInstance.addControl(geocoder2, "top-left");

    geocoder1.on("result", (event) => {
      setStartPoint(event.result.geometry.coordinates);
    });

    geocoder2.on("result", (event) => {
      setEndPoint(event.result.geometry.coordinates);
    });

    return () => {
      mapInstance.remove();
    };
  }, []);
  // Function to create a custom marker with a label

  useEffect(() => {
    if (map && startPoint && endPoint) {
      // Fetch the route
      const routeRequest = {
        locations: [
          { lat: startPoint[1], lon: startPoint[0] },
          { lat: endPoint[1], lon: endPoint[0] },
        ],
        costing: transportMode,
        directions_options: { units: "kilometers" },
      };
      // Optionally, define mode-specific options if necessary
      if (transportMode === "truck") {
        routeRequest.costing_options = {
          truck: {
            height: 4.0,
            weight: 20.0,
            width: 2.5,
          },
        };
      } else if (transportMode === "bicycle") {
        routeRequest.costing_options = {
          bicycle: {
            use_roads: 0.2,
            use_hills: 0.3,
          },
        };
      }

      fetch("https://valhalla1.openstreetmap.de/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(routeRequest),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.trip && data.trip.legs.length > 0) {
            const routeGeometry = data.trip.legs[0].shape;
            console.log(routeGeometry);
            // console.log(data);
            const coordinates = decodePolyline(routeGeometry);
            console.log(coordinates);
            // Extract distance and time from the response (in kilometers and seconds)
            const distanceInKm = data.trip.legs[0].summary.length; // Convert meters to kilometers
            console.log(distanceInKm);
            const timeInMinutes = data.trip.legs[0].summary.time / 3600; // Convert seconds to minutes

            // Function to display the notification
            function showRouteInfoNotification(distanceInKm, timeInMinutes) {
              // Create the notification div
              const labelElement = document.createElement("div");

              // Apply the styles to the label
              labelElement.style.position = "absolute";
              labelElement.style.top = "10px"; // Position the label at the top of the screen
              labelElement.style.left = "50%"; // Center horizontally
              labelElement.style.transform = "translateX(-50%)"; // Center the label properly
              labelElement.style.backgroundColor = "#28a745"; // Beautiful green background
              labelElement.style.color = "white";
              labelElement.style.padding = "15px";
              labelElement.style.borderRadius = "10px";
              labelElement.style.fontSize = "18px";
              labelElement.style.fontWeight = "bold";
              labelElement.style.zIndex = "1000";

              // Create the content for the notification
              const routeInfo = `Distance: ${distanceInKm.toFixed(
                2
              )} km <br> Time: ${timeInMinutes.toFixed(2)} hr`;
              labelElement.innerHTML = `<strong>Route Information</strong><br>${routeInfo}`;

              // Append the label to the body (or your map container)
              document.body.appendChild(labelElement);

              // Set a timeout to remove the notification after 5 seconds
              setTimeout(() => {
                labelElement.style.display = "none"; // Hide the notification
              }, 10000); // Set to 5000 milliseconds (5 seconds)
            }

            // Example usage: Show the notification after 3 seconds (you can trigger this based on some event)
            setTimeout(() => {
              // Example time
              showRouteInfoNotification(distanceInKm, timeInMinutes);
            }, 3000); // Show after 3 seconds

            // Remove existing route layer if present
            if (map.getLayer("route")) map.removeLayer("route");
            if (map.getSource("route")) map.removeSource("route");

            // Add the route layer
            map.addSource("route", {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: coordinates,
                },
              },
            });

            map.addLayer({
              id: "route",
              type: "line",
              source: "route",
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "green",
                "line-width": 5,
              },
            });

            // Create custom markers for the start and end points using the sample approach
            const markersData = [
              {
                label: "1",
                color: "blue",
                coordinates: coordinates[0],
              },
              {
                label: "2",
                color: "blue",
                coordinates: coordinates[coordinates.length - 1],
              },
            ];

            markersData.forEach((markerData) => {
              const el = document.createElement("div");
              el.className = "marker";
              el.style.backgroundColor = markerData.color;
              el.style.color = "white";
              el.style.width = "30px";
              el.style.height = "30px";
              el.style.borderRadius = "50%";
              el.style.display = "flex";
              el.style.alignItems = "center";
              el.style.justifyContent = "center";
              el.style.fontSize = "16px";
              el.style.fontWeight = "bold";
              el.style.textAlign = "center"; // Ensures the text is centered
              el.innerText = markerData.label;

              // Add marker to map
              new maplibregl.Marker({ element: el })
                .setLngLat(markerData.coordinates)
                .addTo(map);
            });
          } else {
            console.error("Invalid route data:", data);
          }
        })
        .catch((error) => console.error("Routing error:", error));
    }
  }, [map, startPoint, endPoint, transportMode]);

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
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div style={{ position: "absolute", zIndex: 1, top: 10, right: 10 }}>
        <select
          value={transportMode}
          onChange={(e) => setTransportMode(e.target.value)}
        >
          <option value="auto">Car</option>
          <option value="truck">Truck</option>
          <option value="bicycle">Bicycle</option>
          <option value="bus">Bus</option>
          <option value="pedestrian">Pedestrian</option>
          <option value="motorcycle">MotorCycle</option>
        </select>
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MapWithGeocoder;
