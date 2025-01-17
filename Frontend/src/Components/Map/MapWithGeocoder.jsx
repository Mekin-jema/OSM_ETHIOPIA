import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getRoute } from "../../api/getRouteInfo";
import { getShortestRoute } from "../../api/getShortestRoute";
import { getDefaultRoute } from "../../api/getValhallaRoute";
import decodePolyline from "../../utils/decoder";
import AddressBox from "./AddressBox";
import RouteDetails from "./RouteDetails";
import "./MapStyle.css";

const MapWithGeocoder = () => {
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [originAddress, setOriginAddress] = useState({});
  const [destinationAddress, setDestinationAddress] = useState({});
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/bright/style.json?key=u9EnL0tM9ZS24uoyFpL7",
      center: [9.145, 40.489673],
      zoom: 13,
    });
    setMap(mapInstance);
    return () => mapInstance.remove();
  }, []);

  // Add effects for fetching and displaying routes as needed...

  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="map" />
      <AddressBox
        originAddress={originAddress}
        setOriginAddress={setOriginAddress}
        destinationAddress={destinationAddress}
        setDestinationAddress={setDestinationAddress}
      />
      {route && <RouteDetails route={route} />}
    </div>
  );
};

export default MapWithGeocoder;
