import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import AdminLogin from "~/components/Admin/AdminLogin.vue";

Vue.use(Vuex);

describe("Login", () => {
  let getters;
  let actions;
  let store;
  let wrapper;

  const mockRoute = { path: "/bundles" };
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    getters = {
      "auth/user": () => ({
        role: {
          type: "",
        },
      }),
    };
    actions = { "auth/login": jest.fn() };

    store = new Vuex.Store({ getters, actions });

    wrapper = mount(AdminLogin, {
      store,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });
  });

  test("Is router call 0 time if user isn`t auntificated", () => {
    expect(mockRouter.push).toHaveBeenCalledTimes(0);
  });

  test("Is router call 1 time if user auntificated", () => {
    getters = {
      "auth/user": () => ({
        role: {
          type: "authenticated",
        },
      }),
    };

    store = new Vuex.Store({ getters, actions });
    wrapper = mount(AdminLogin, {
      store,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/admin");
  });

  test("Is router call 1 time if user click submit button", async () => {
    getters = {
      "auth/user": () => null,
    };
    actions = {
      "auth/login": () => ({
        role: {
          type: "authenticated",
        },
      }),
    };

    store = new Vuex.Store({ getters, actions });
    wrapper = mount(AdminLogin, {
      store,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });

    await wrapper.get("button").trigger("click");
    await flushPromises();

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith("/admin");
  });
});
