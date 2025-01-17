export const addRouteLayer = (
  map,
  color = "red",

  geometry,
  name,
  thickness,
  maplibregl
) => {
  // Remove the previous route layer before adding a new one
  if (map.getLayer(name)) map.removeLayer(name);
  if (map.getSource(name)) map.removeSource(name);

  // Add the normal route layer (default path)
  map.addSource(name, {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: geometry,
      },
    },
  });

  map.addLayer({
    id: name,
    type: "line",
    source: name,
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": color,
      "line-width": thickness,
    },
  });

  const markersData = [
    {
      label: "1",
      color: "green",
      coordinates: geometry[0],
    },
    {
      label: "2",
      color: "red",
      coordinates: geometry[geometry.length - 1],
    },
  ];

  markersData.forEach((markerData) => {
    new maplibregl.Marker({ color: markerData.color })
      .setLngLat(markerData.coordinates)
      .addTo(map);
  });
};
