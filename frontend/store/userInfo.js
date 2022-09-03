export const state = () => ({
  userInfo: {},
});

export const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
    this.$cookies.set("user_info", JSON.stringify(state.userInfo));
  },
};

export const getters = {
  userInfo: (state) => {
    return state.userInfo;
  },
};
