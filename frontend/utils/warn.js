import Vue from "vue";

export function warn(text) {
  Vue.notify({
    group: "all",
    type: "warn",
    text: text,
  });
}
