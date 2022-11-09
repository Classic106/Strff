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
        const { data } = e.response;
        const messge = data.message[0].messages[0].id;
        Vue.notify({
          group: "all",
          type: "error",
          text: messge,
        });
      }
    }
    if (Object.keys(userInfo).length) {
      commit("userInfo/setUserInfo", JSON.parse(userInfo));
    }

    if (token) {
      await dispatch("auth/loginByToken", token);
    }
    await dispatch("categories/getCategories");
    await dispatch("articles/getArticles");
    await dispatch("purchase-types/getPurchaseTypes");
  },
};
