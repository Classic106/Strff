import Vue from "vue";
var numeral = require("numeral");

Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0.00");
});

Vue.filter("formatDate", function(value) {
  if (value.toString().length === 1) {
    return `0${value}`;
  }
  return value;
});

Vue.filter("parseMonth", function(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[+month].slice(0, 3);
});
