import cookieparser from "cookieparser";

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    let user = null;
    let order = null;

    if (req && req.headers && req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      user = (parsed.user && JSON.parse(parsed.user)) || null;
      order = parsed.order || null;
    }

    if (order !== null) {
      commit("order/setOrder", JSON.parse(order));
    }

    const categories = await this.$strapi.find("categories");
    const purchaseTypes = await this.$strapi.find("purchase-types");

    commit("categories/setCategories", categories);
    commit("purchase-types/setTypes", purchaseTypes);
  },
};
