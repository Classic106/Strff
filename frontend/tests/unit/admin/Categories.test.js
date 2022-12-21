import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import Categories from "@/components/Admin/Categories";

Vue.use(Vuex);

describe("Categories", () => {
  test("Categories has the same data after data is loaded", async () => {
    const mockGetList = [
      { id: 84, name: "Beard1", slug: "beard1" },
      { id: 8, name: "Beard", slug: "beard" },
    ];

    const getters = {
      "categories/categories": () => mockGetList,
    };
    const actions = {
      "categories/getCategories": jest.fn(() => []),
    };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(Categories, { store });

    await flushPromises();
    expect(wrapper.vm.$data.currentCategories.length).toBe(2);
  });
});
