// Import React hooks
import { useEffect, useRef, useState } from "react";

// Import MapLibre GL library and styles
import maplibregl from "maplibre-gl";
import "@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css"; // Geocoder styles
import "maplibre-gl/dist/maplibre-gl.css"; // MapLibre core styles
import "@stadiamaps/maplibre-search-box/dist/style.css"; // Search box styles

// Import assets
import OriginStep from "../assets/images/origin_step.svg"; // Image for the origin step indicator
import DestinationStep from "../assets/images/destination_step.svg"; // Image for the destination step indicator
import Logo from "../assets/logo2.png"; // Application logo

// Import constants
import { DIRECTION_ARROWS } from "../constants"; // Arrow constants for directions

// Import API functions
import { getRoute } from "../api/getRouteInfo"; // Function to fetch route information
import { getShortestRoute } from "../api/getShortestRoute"; // Function to fetch the shortest route
import { getDefaultRoute } from "../api/getValhallaRoute"; // Function to fetch the default route (Valhalla)

// Import utility functions
import decodePolyline from "../utils/decoder"; // Utility for decoding polylines
import { renderDirectionDetail } from "../utils/directionDetail"; // Utility for rendering detailed directions
import { renderAddressBox } from "../utils/inputHandler"; // Utility for rendering address input fields
import { addRouteLayer } from "../utils/MapUtils"; // Utility for adding route layers to the map

const MapWithGeocoder = () => {
  const [mapCenter, setMapCenter] = useState([]);

  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);

  const [route, setRoute] = useState(null);
  const [toggle, setToggle] = useState(true);

  const [originAddress, setOriginAddress] = useState({
    placeName: "",
    latitude: "",
    longitude: "",
  });
  const [destinationAddress, setDesitinationAddress] = useState({
    placeName: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/bright/style.json?key=u9EnL0tM9ZS24uoyFpL7",
      center: [9.145, 40.489673],

      zoom: 13,
    });
    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);
  useEffect(() => {
    if (map && originAddress.longitude && destinationAddress.longitude) {
      const getRoutes = async () => {
        const data = await getRoute(originAddress, destinationAddress);
        const route = data.routes[0];
        setRoute(route);
      };
      getRoutes();
    }
  }, [originAddress, destinationAddress, map]);

  useEffect(() => {
    if (map && originAddress.latitude && destinationAddress.longitude) {
      const getShortestPath = async () => {
        const data = await getShortestRoute(originAddress, destinationAddress);

        const route = data.routes[0];

        const geometry = route.geometry.coordinates; // Route geometry
        addRouteLayer(map, "red", geometry, "route1", 10, maplibregl);
      };
      getShortestPath();
    }
  }, [map, originAddress, destinationAddress]);

  useEffect(() => {
    if (map && destinationAddress.longitude && originAddress.longitude) {
      // Fetch the route
      const routeRequest = {
        locations: [
          { lat: originAddress.latitude, lon: originAddress.longitude },
          {
            lat: destinationAddress.latitude,
            lon: destinationAddress.longitude,
          },
        ],
        costing: "auto",
        directions_options: { units: "kilometers" },
      };

      const getValhallaRoute = async () => {
        const data = await getDefaultRoute(routeRequest);
        if (data && data.trip && data.trip.legs.length > 0) {
          const routeGeometry = data.trip.legs[0].shape;

          const coordinates = decodePolyline(routeGeometry);
          const geometry = coordinates;
          // add layer  and  marker for the layer
          addRouteLayer(map, "green", geometry, "route2", 10);
        } else {
          console.error("Invalid route data:", data);
        }
      };
      getValhallaRoute();
    }
  }, [map, originAddress, destinationAddress]);

  // Handler for manual input change in the origin address
  const handleManualOriginAddressInputChange = (event) => {
    const newOriginAddress = {
      ...originAddress,
      placeName: event.target.value,
    };
    setOriginAddress(newOriginAddress);
  };

  // Handler for manual input change in the destination address
  const handleManualDestinationAddressInputChange = (event) => {
    const newDestinationAddress = {
      ...destinationAddress,
      placeName: event.target.value,
    };
    setDesitinationAddress(newDestinationAddress);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100vh" }}
      className="flex"
    >
      <div className="address-box">
        {renderAddressBox(
          originAddress,
          destinationAddress,
          setDesitinationAddress,
          setOriginAddress,
          handleManualOriginAddressInputChange,
          handleManualDestinationAddressInputChange
        )}
      </div>

      <div
        ref={mapContainerRef}
        style={{ width: "70%", height: "100%" }}
        className="flex-1"
      />
      <button
        onClick={() => setToggle(!toggle)}
        className={`absolute ${
          toggle ? "top-6 right-[390px]" : "top-6 right-[30px]"
        }  bg-green-800 rounded-sm text-white p-3 z-40 `}
      >
        {" "}
        {toggle ? (
          <i className="pi pi-chevron-right cursor-pointer text-white"></i>
        ) : (
          <i className="pi pi-chevron-left cursor-pointer text-white"></i>
        )}
      </button>

      {toggle && (
        <div className="direction-detail">
          <div style={{ padding: 16 }} className="w-full">
            <img className="w-full h-[200px] " alt="Logo" src={Logo} />
            {renderDirectionDetail(
              route,
              OriginStep,
              setMapCenter,
              DIRECTION_ARROWS,
              DestinationStep
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithGeocoder;
