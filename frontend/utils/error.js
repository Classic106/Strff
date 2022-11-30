import Vue from "vue";

export function error(e) {
  if (e.response) {
    const { data } = e.response;
    const messge = data.message[0].messages[0].id;
    Vue.notify({
      group: "all",
      type: "error",
      text: messge,
    });
    return;
  }
  console.warn(e);
}
