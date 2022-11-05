import Vue from "vue";
var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0.00");
});

Vue.filter("formatDay", function (value) {
  if (value.toString().length === 1) {
    return `0${value}`;
  }
  return value;
});

Vue.filter("formatDate", function (date) {
  const options = { month: "long" };

  const d = new Date(date);

  const month = new Intl.DateTimeFormat("en-US", options).format(d);
  const day = d.getDate();
  let hours = d.getHours();
  let minutes = d.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${month} ${day}, at ${hours}: ${minutes}`;
});

Vue.filter("parseMonth", function (month) {
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
