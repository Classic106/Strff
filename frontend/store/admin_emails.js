import { error } from "~/utils/error";
import { success } from "~/utils/success";

export const state = () => ({});

export const actions = {
  async setEmails(_, emails) {
    try {
      const isString = typeof emails === "string";
      let data;

      if (!isString) {
        const formData = new FormData();

        formData.append("files", emails[0], `${emails[0].name}_emails`);

        data = formData;
      } else {
        data = emails;
      }

      await this.$axios.post("/emails/upload", data);

      success("Emails successfully uploaded");
    } catch (e) {
      console.log(e);
      error(e);
    }
  },
};

export const mutations = {};
export const getters = {};
