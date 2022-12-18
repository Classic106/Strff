import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import AdminProducts from "@/components/Admin/AdminProducts";
import ProductsTable from "@/components/Admin/AdminProducts/ProductTable/ProductsTable.vue";

Vue.use(Vuex);

describe("AdminProducts", () => {
  test("AdminProducts contains ProductTable if product data is loaded", async () => {
    const getters = {
      "admin_products/selected": () => null,
      "admin_products/products": () => null,
      "admin_products/total": () => null,
    };
    const actions = { "admin_products/getProducts": jest.fn() };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(AdminProducts, { store });
    await flushPromises();

    const productTable = wrapper.findComponent(ProductsTable);
    expect(productTable.exists()).toBe(true);
  });
});
