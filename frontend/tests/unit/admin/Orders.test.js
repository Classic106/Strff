import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import AdminOrders from "@/components/Admin/AdminOrders";
import OrderTable from "@/components/Admin/AdminOrders/OrdersTable/OrderTable.vue";

Vue.use(Vuex);

describe("AdminOrders", () => {
  test("AdminOrders contains OrderTable if orders data is loaded", async () => {
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
