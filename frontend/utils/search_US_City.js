const points = require("~/assets/US.json");
const geokdbush = require("geokdbush");
import KDBush from "kdbush";

export function search_US_City({ coords }) {
  const { latitude, longitude } = coords;

  const lat = typeof latitude !== "number" ? parseFloat(latitude) : latitude;
  const lon = typeof longitude !== "number" ? parseFloat(longitude) : longitude;

  if (isNaN(lat) || isNaN(lon)) {
    return null;
  }

  const index = new KDBush(
    points,
    (p) => p[2],
    (p) => p[1],
    64
  );

  const cities = geokdbush
    .around(index, longitude, latitude, 1, 1000)
    .map((city) => {
      const [name, lat, lon, state] = city;

      return {
        city: name,
        latitude: lat,
        longitude: lon,
        state,
      };
    });

  if (cities.length) {
    return cities[0];
  }
  return null;
}
