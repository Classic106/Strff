import { error } from "~/utils/error";
import { success } from "~/utils/success";

export const state = () => ({
  user: null,
});

export const actions = {
  logout({ commit }) {
    this.$axios.setHeader("Authorization", null);
    this.$cookies.remove("token");

    commit("setUser", null);
  },
  async login({ commit }, login) {
    try {
      //console.log(this.$axios.defaults.baseURL)
      const { jwt, user } = await this.$axios.$post("auth/local", login);

      this.$axios.setHeader("Authorization", `Bearer ${jwt}`);
      this.$cookies.set("token", jwt);

      commit("setUser", user);
    } catch (e) {
      error(e);
    }
  },
  async loginByToken({ commit }) {
    try {
      const { data } = await this.$axios.get(`users/me`);
      commit("setUser", data);
    } catch (e) {
      this.$cookies.remove("token");
      error(e);
    }
  },
  async changeUserPassword({ commit, state }, newPassword) {
    const { password, passwordConfirmation } = newPassword;
    const { user } = state;

    if (
      password !== "" &&
      passwordConfirmation !== "" &&
      password !== passwordConfirmation
    ) {
      error("Passwords must be coincidence");
      return;
    }

    if (user) {
      try {
        const { id, username, email } = user;

        const requestData = { ...newPassword, id, username, email };
        const { data } = await this.$axios.post(
          "/auth/reset-password",
          requestData
        );

        const { jwt, user: newUser } = data;

        this.$axios.setHeader("Authorization", `Bearer ${jwt}`);
        this.$cookies.set("token", jwt);

        commit("setUser", newUser);
        success("Password was succesfully change");
      } catch (e) {
        error(e);
      }
      return;
    }
    error("User is undefined");
  },
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
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
