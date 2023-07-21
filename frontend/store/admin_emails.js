import { error } from "~/utils/error";
import { success } from "~/utils/success";

export const state = () => ({});

export const actions = {
  async checkEmail(_, { email, save }) {
    try {
      const { data } = await this.$axios.post("/emails/check", { email, save });
      return data;
    } catch (e) {
      error(e);
    }
  },
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

      const result = await this.$axios.post("/emails/upload", data);

      if (result.data) {
        success("Emails successfully uploaded");
      } else {
        error("Try again");
      }

      return result.data;
    } catch (e) {
      error(e);
    }
  },
  async deleteEmail(_, email) {
    try {
      const { data } = await this.$axios.delete(`/emails/${email}`);
      return data;
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {};
export const getters = {};