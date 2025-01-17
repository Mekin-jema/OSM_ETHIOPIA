export const getRoute = async (originAddress, destinationAddress) => {
  try {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originAddress.longitude},${originAddress.latitude};${destinationAddress.longitude},${destinationAddress.latitude}?overview=false&alternatives=true&steps=true&geometries=geojson`;

    const response = await fetch(osrmUrl); // Await the fetch call
    if (!response.ok) {
      throw new Error(`OSRM API Error: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON response
    return data; // Return the parsed data
  } catch (error) {
    console.error("There was an error while fetching the route:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};

export const getShortestRoute = async (originAddress, destinationAddress) => {
  try {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${originAddress.longitude},${originAddress.latitude};${destinationAddress.longitude},${destinationAddress.latitude}?overview=full&geometries=geojson`;

    const response = await fetch(osrmUrl);
    if (!response.ok) {
      throw new Error(`OSRM API Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was an error while fetching the route:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};
