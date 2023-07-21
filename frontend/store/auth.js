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

      if (jwt) {
        this.$axios.setHeader("Authorization", `Bearer ${jwt}`);
        this.$cookies.set("token", jwt);
      }

      if (user) {
        const { role } = user;
        const { type } = role;

        if (type === "authenticated") {
          this.$router.push("/admin");
        }

        if (type === "customer") {
          this.$router.push("/profile");
        }

        commit("setUser", user);
      }

      return user;
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
  async createCustomer({ commit }, customer) {
    try {
      const { data } = await this.$axios.post("/auth/local/register", {
        ...customer,
        confirmed: false,
        blocked: false,
        role: 3, //customer role
      });

      const { user, jwt } = data;

      this.$axios.setHeader("Authorization", `Bearer ${jwt}`);
      this.$cookies.set("token", jwt);

      this.$router.push("/profile");

      commit("setUser", user);
    } catch (e) {
      error(e);
    }
  },
  async updateUser({ commit }, updatedUser) {
    try {
      const { id } = updatedUser;
      const { data } = await this.$axios.put(`/users/${id}`, updatedUser);
      const { user, jwt } = data;

      this.$axios.setHeader("Authorization", `Bearer ${jwt}`);
      this.$cookies.set("token", jwt);

      commit("setUser", user);
      success("User was succesfully updated");
    } catch (e) {
      error(e);
    }
  },
  async checkUser(_, { username, email }) {
    try {
      const { data } = await this.$axios.post("/users/check_user", {
        username,
        email,
      });

      return data;
    } catch (e) {
      error(e);
    }
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
