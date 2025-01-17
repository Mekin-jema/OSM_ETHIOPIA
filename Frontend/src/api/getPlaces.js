// console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKE);
const token =
  "pk.eyJ1IjoibWVraW5qZW1hbCIsImEiOiJjbTV6djdrdWYwNTR1MmtzZ3FrdnJvN2V6In0.5OtQaE1mqvEce8hZvvLgfw";
export default async function getPlaces(query) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${token}`
    );

    return response.json();
  } catch (error) {
    console.error("There was an error while fetching places:", error);
  }
}
