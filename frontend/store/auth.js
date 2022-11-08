export const state = () => ({
  user: null,
});

export const actions = {
  logout({ commit }) {
    commit('setUser', null);
    commit('order/setOrder', null, { root: true })
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
    this.$cookies.set('user', user ? JSON.stringify(user) : null);
  },
};

export const getters = {
  user(state) {
    return state.user;
  },
  username: (state) => {
    return state.user && state.user.username;
  },
};
