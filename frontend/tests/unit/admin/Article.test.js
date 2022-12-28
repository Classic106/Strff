import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import Articles from "@/components/Admin/Articles";
import ArticlesTable from "@/components/Admin/Articles/ArticlesTable/ArticlesTable.vue";

Vue.use(Vuex);

describe("AdminArticles", () => {
  test("AdminArticles contains ProductTable if product data is loaded", async () => {
    const getters = {
      "admin_articles/selected": () => null,
      "admin_articles/articles": () => null,
      "admin_articles/total": () => null,
    };
    const actions = { "admin_articles/getArticles": jest.fn() };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(Articles, { store });
    await flushPromises();

    const articlesTableTable = wrapper.findComponent(ArticlesTable);
    expect(articlesTableTable.exists()).toBe(true);
  });
});
