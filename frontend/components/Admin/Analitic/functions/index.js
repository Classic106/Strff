import {
  search_US_City_coordinates,
  search_US_State_coordinates,
} from "~/utils/search_US";

export function by_state_or_city(by_state, acc, { city, state }, tmp) {
  const content = by_state ? state : city;

  const latlng = (() => {
    if (tmp[content]) {
      return tmp[content];
    } else {
      let latlng = null;

      if (by_state) {
        latlng = search_US_State_coordinates(content);
      } else {
        latlng = search_US_City_coordinates(content);
      }

      if (latlng) {
        const [content, latitude, longitude] = latlng;
        tmp[content] = [latitude, longitude];
        return tmp[content];
      }
      return null;
    }
  })();

  if (latlng) {
    let index = -1;

    if (by_state) {
      index = acc.findIndex((item) => item.state === content);
    } else {
      index = acc.findIndex((item) => item.city === content);
    }

    if (index !== -1) {
      acc[1][index].count++;
    } else {
      const id = content;
      const count = 1;
      acc[1].push({ id, content, latlng, count });
    }
  } else {
    acc[0]++;
  }

  return [acc, tmp];
}
