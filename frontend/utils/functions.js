import { isValidPhoneNumber } from "libphonenumber-js";
import parsePhoneNumber from "libphonenumber-js";

export function getApiUrl() {
  return this.$config.strapi.url;
}

export function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export function convertSizes(box) {
  const { dimension, weight_dimension } = box;

  let sizes = {};

  if (dimension === "inch") {
    const width = box.width * 2.54;
    const lengthy = box.lengthy * 2.54;
    const height = box.height * 2.54;
    const volume = box.volume * 2.54;

    sizes = { width, lengthy, height, volume };
  }

  if (weight_dimension === "lbs") {
    const weight = box.weight * 0.453592;
    sizes = { ...sizes, weight };
  }

  return { ...box, ...sizes };
}

function isObj(a) {
  if (!!a && a.constructor === Object) {
    return true;
  }
  return false;
}

function _st(z, g) {
  return "" + (g != "" ? "[" : "") + z + (g != "" ? "]" : "");
}

export function convertObjectToQueryUrl(params, skipobjects, prefix) {
  if (skipobjects === void 0) {
    skipobjects = false;
  }
  if (prefix === void 0) {
    prefix = "";
  }
  var result = "";
  if (typeof params != "object") {
    return prefix + "=" + encodeURIComponent(params) + "&";
  }
  for (var param in params) {
    var c = "" + prefix + _st(param, prefix);
    if (isObj(params[param]) && !skipobjects) {
      result += convertObjectToQueryUrl(params[param], false, "" + c);
    } else if (Array.isArray(params[param]) && !skipobjects) {
      params[param].forEach(function (item, ind) {
        result += convertObjectToQueryUrl(item, false, c + "[" + ind + "]");
      });
    } else {
      result += c + "=" + encodeURIComponent(params[param]) + "&";
    }
  }
  return result;
}

export function isValidPhone(phone) {
  const isValidPhone = isValidPhoneNumber(phone, "US");
  const result = parsePhoneNumber(phone, "US");

  return isValidPhone && result && result.country === "US";
}
