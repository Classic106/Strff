import Vue from "vue";

export function error(e) {
  const { data } = e.response;
  const { message } = data;
  console.log(message);

  if (!message.length) {
    Vue.notify({
      group: "all",
      type: "error",
      text: message,
    });
    return;
  }

  if (message.length) {
    const { id } = message[0].messages[0];

    Vue.notify({
      group: "all",
      type: "error",
      text: id,
    });
    return;
  }

  console.error(data);
}
