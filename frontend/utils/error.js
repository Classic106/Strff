import Vue from "vue";

export function error(e) {
  const { data } = e.response;
  const { message } = data;

  if (data || message) {
    Vue.notify({
      group: "all",
      type: "error",
      text: data || message,
    });
    return;
  }

  console.error(data);
}
