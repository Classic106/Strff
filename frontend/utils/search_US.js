const points = require("~/assets/US.json");
import { states } from "~/assets/states";
const geokdbush = require("geokdbush");
import KDBush from "kdbush";

export function variants_US_City(city) {
  if (!city) {
    return null;
  }

  return points.filter((item) =>
    item[0].toLowerCase().includes(city.toLowerCase())
  );
}

export function search_US_State_coordinates(state) {
  if (!state) {
    return null;
  }

  let coord = null;

  const index = states.findIndex(
    ({ name }) => name.toLowerCase() === state.toLowerCase()
  );

  if (index !== -1) {
    const { name, latitude, longitude } = states[index];
    coords = [name, latitude, longitude];
  }

  return coord;
}

export function search_US_City_coordinates(city) {
  if (!city) {
    return null;
  }

  let coord = null;

  const index = points.findIndex(
    (item) => item[0].toLowerCase() === city.toLowerCase()
  );

  if (index !== -1) {
    coord = points[index];
  }

  return coord;
}

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
