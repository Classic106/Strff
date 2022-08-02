import cookieparser from "cookieparser";

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let user = null;
    let order = null;
    let userInfo = {};

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      order = parsed.order || null;
      userInfo = parsed.user_info || {};
    }

    if (order !== null) {
      commit("order/setOrder", JSON.parse(order));
    }

    if (Object.keys(userInfo).length) {
      commit("userInfo/setUserInfo", JSON.parse(userInfo));
    }

    const categories = await this.$strapi.find("categories");
    const purchaseTypes = await this.$strapi.find("purchase-types");

    commit("categories/setCategories", categories);
    commit("purchase-types/setTypes", purchaseTypes);
  },
};
