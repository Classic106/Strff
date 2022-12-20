import cookieparser from "cookieparser";
import { error } from "../utils/error";

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    let order = null;
    let userInfo = {};
    let token = null;

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      order = parsed.order || null;
      token = parsed.token || null;
      userInfo = parsed.user_info || {};
    }

    if (order !== null) {
      try {
        const data = await this.$strapi.findOne("orders", order);
        commit("order/setOrder", data);
      } catch (e) {
        await dispatch("order/removeOrder", order);
        error(e);
      }
    }
    if (Object.keys(userInfo).length) {
      commit("userInfo/setUserInfo", JSON.parse(userInfo));
    }

    if (token) {
      await dispatch("auth/loginByToken");
    }
    await dispatch("categories/getCategories");
    await dispatch("articles/getArticles");
    await dispatch("purchase-types/getPurchaseTypes");
  },
};
