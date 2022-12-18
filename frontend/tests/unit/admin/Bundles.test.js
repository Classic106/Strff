import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import AdminBundles from "@/components/Admin/AdminBundles";
import BundleTable from "@/components/Admin/AdminBundles/BundlesTable/BundleTable.vue";

Vue.use(Vuex);

describe("AdminBundles", () => {
  test("AdminBundles contains BundleTable if bundle data is loaded", async () => {
    const getters = {
      "admin_bundles/selected": () => null,
      "admin_bundles/bundles": () => null,
      "admin_bundles/total": () => null,
    };
    const actions = { "admin_bundles/getBundles": jest.fn() };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(AdminBundles, { store });
    await flushPromises();

    const bundleTable = wrapper.findComponent(BundleTable);
    expect(bundleTable.exists()).toBe(true);
  });
});
