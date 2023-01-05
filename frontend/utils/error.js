import Vue from "vue";

export function error(e) {
  const { data } = e.response;
  const { message } = data;

  if (typeof message === "string" || !message.length) {
    showError(message);
    return;
  }

  if (message[0]) {
    const { messages } = message[0];
    const { message: msg } = messages[0];

    showError(msg);
    return;
  }

  function showError(text) {
    Vue.notify({
      group: "all",
      type: "error",
      text: text,
    });
  }
  console.error(data);
}
