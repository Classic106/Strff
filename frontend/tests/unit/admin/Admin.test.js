import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import Admin from "@/components/Admin";

Vue.use(Vuex);

describe("Admin", () => {
  let getters;
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

    store = new Vuex.Store({ getters });
    wrapper = mount(Admin, {
      store,
      mocks: {
        $route: mockRoute,
        $router: mockRouter,
      },
      slots: {
        page: "Main Content",
      },
    });
  });

  test("Admin after authenticated user with current slot", async () => {
    await flushPromises();
    expect(wrapper.html()).toContain(
      `<div class="w-100 h-100">Main Content</div>`
    );
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
