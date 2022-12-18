import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import AdminCustomers from "@/components/Admin/AdminCustomers";
import CustomerTable from "@/components/Admin/AdminCustomers/CustomersTable/CustomerTable.vue";

Vue.use(Vuex);

describe("AdminCustomers", () => {
  test("AdminCustomers contains ProductTable if customers data is loaded", async () => {
    const getters = {
      "admin_customers/selected": () => null,
      "admin_customers/customers": () => null,
      "admin_customers/total": () => null,
    };
    const actions = { "admin_customers/getCustomers": jest.fn() };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(AdminCustomers, { store });
    await flushPromises();

    const customersTableTable = wrapper.findComponent(CustomerTable);
    expect(customersTableTable.exists()).toBe(true);
  });
});
