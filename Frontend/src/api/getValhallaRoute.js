export const getDefaultRoute = async (routeRequest) => {
  const valhallaUrl = "https://valhalla1.openstreetmap.de/route";
  try {
    const response = await fetch(valhallaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(routeRequest),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error("There was an error while fetching the route:", error);
    throw error; // Re-throw the error so the calling function can handle it
  }
};
