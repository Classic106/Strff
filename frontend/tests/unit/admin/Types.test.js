import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import Types from "@/components/Admin/Types";
import SubscriptionTypes from "@/components/Admin/Types/SubscriptionTypes.vue";

Vue.use(Vuex);

describe("Types", () => {
  test("Types has the same data after data is loaded", async () => {
    const mockGetList = [
      {
        id: 1,
        title: "Weekly",
        purchase_type: {
          id: 2,
          title: "Subscription",
          description: "Save 5% on future orders, cancel anytime.",
          one_time: false,
        },
      },
      {
        id: 5,
        title: "Weekly",
        purchase_type: {
          id: 2,
          title: "Subscription",
          description: "Save 5% on future orders, cancel anytime.",
          one_time: false,
        },
      },
    ];

    const getters = {
      "purchase-types/subscriptionTypes": () => mockGetList,
      "purchase-types/getTypes": () => [],
    };
    const actions = {
      "purchase-types/getPurchaseTypes": jest.fn(() => []),
      "purchase-types/getSubscriptionTypes": jest.fn(() => mockGetList),
    };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(Types, { store });

    await flushPromises();

    const subscriptionTypes = wrapper.findComponent(SubscriptionTypes);
    expect(subscriptionTypes.exists()).toBe(true);
    expect(subscriptionTypes.vm.$data.currentTypes.length).toBe(2);
  });
});
