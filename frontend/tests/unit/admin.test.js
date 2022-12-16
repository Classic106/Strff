import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";

import Admin from "@/components/Admin";
import Loader from "@/components/common/Loader.vue";

Vue.use(Vuex);

describe("Admin", () => {
  let getters;
  let store;

  const mockRoute = { path: "/orders" };
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    getters = {
      "auth/user": () => ({
        role: {
          type: "",
        },
      }),
    };

    store = new Vuex.Store({ getters });
  });

  test("Admin returns Loader", () => {
    const wrapperAdmin = mount(Admin, {
      store,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
    });
    const wrapperLoader = mount(Loader);
    expect(wrapperAdmin.html()).toContain(wrapperLoader.html());
  });

  test("Admin without authenticated user", () => {
    expect(mockRouter.push).toHaveBeenCalledWith("/admin/login");
  });

  test("Admin with authenticated user", () => {
    getters = {
      "auth/user": () => ({
        role: {
          type: "authenticated",
        },
      }),
    };

    store = new Vuex.Store({ getters });
    expect(mockRouter.push).toHaveBeenCalledWith("/admin/login");
  });
});
