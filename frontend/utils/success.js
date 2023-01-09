import Vue from "vue";

export function success(text) {
  Vue.notify({
    group: "all",
    type: "success",
    text,
  });
}
