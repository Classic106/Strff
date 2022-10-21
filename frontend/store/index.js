import cookieparser from "cookieparser";

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
        const data = await this.$strapi.findOne("orders", JSON.parse(order));
        commit("order/setOrder", data);
      } catch (e) {
        this.$cookies.remove("order");
      }
    }
    if (Object.keys(userInfo).length) {
      commit("userInfo/setUserInfo", JSON.parse(userInfo));
    }

    if (token) {
      dispatch("auth/loginByToken", token);
    }
    const categories = await this.$strapi.find("categories");
    const articles = await this.$strapi.find("articles");
    const purchaseTypes = await this.$strapi.find("purchase-types");

    commit("categories/setCategories", categories);
    commit("articles/setArticles", articles);
    commit("purchase-types/setTypes", purchaseTypes);
  },
};
