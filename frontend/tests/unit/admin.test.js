import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import Admin from "@/components/Admin";
import Loader from "@/components/common/Loader.vue";
import AdminOrders from "@/components/Admin/AdminOrders";
import OrderTable from "@/components/Admin/AdminOrders/OrdersTable/OrderTable.vue";

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

  test("AdminOrders", async () => {
    const getters = {
      "admin_orders/selected": () => null,
      "admin_orders/orders": () => null,
      "admin_orders/total": () => null,
    };
    const actions = { "admin_orders/getOrders": jest.fn() };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(AdminOrders, { store });
    await flushPromises();

    const orderTable = wrapper.findComponent(OrderTable);
    expect(orderTable.exists()).toBe(true);
  });

  test("AdminOrders", async () => {
    const getters = {
      "admin_orders/selected": () => null,
      "admin_orders/orders": () => null,
      "admin_orders/total": () => null,
    };
    const actions = { "admin_orders/getOrders": jest.fn() };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(AdminOrders, { store });
    await flushPromises();

    const orderTable = wrapper.findComponent(OrderTable);
    expect(orderTable.exists()).toBe(true);
  });
});
