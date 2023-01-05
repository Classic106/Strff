import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import Vuex from "vuex";

import AdminHome from "@/components/Admin/AdminHome";
import RightSide from "@/components/Admin/AdminHome/RightSide";

Vue.use(Vuex);

describe("AdminHome", () => {
  test("AdminHome has exist RightSide and contains 'There were no products sold during this time' in TopProducts if topproducts data is empty", async () => {
    const mockGetList = [
      {
        id: 62,
        title:
          " Roll over image to zoom in Beard Wash & Beard Conditioner Set w/Argan & Jojoba Oils - Softens & Strengthens - Natural Sandalwood Scent - Beard Shampoo w/Beard Oil (5oz)",
        price: 15.88,
        image: [
          {
            id: 114,
            url: "/uploads/81_NNA_2_TM_8u_L_SY_879_f021f82e3d.jpg",
          },
        ],
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                id: 114,
                url: "/uploads/81_NNA_2_TM_8u_L_SY_879_f021f82e3d.jpg",
              },
            ],
          }),
      })
    );

    const getters = {
      "admin_visitors/count_visitors": () => 0,
      "admin_visitors/count_connected_visitors": () => 0,
      "admin_visitors/visitors": () => [],
      "admin_orders/todayOrders": () => [],
      "best_sellers/best_sellers": () => mockGetList,
    };
    const actions = {
      "best_sellers/getBestSellers": jest.fn(),
      "admin_visitors/getCountVisitors": jest.fn(),
      "admin_visitors/getCountConnectedCountVisitors": jest.fn(),
      "admin_visitors/getVisitors": jest.fn(),
      "admin_orders/getCountOrders": jest.fn(),
      "admin_orders/getTodayOrders": jest.fn(),
      "admin_orders/getOrdersByTime": jest.fn(() => []),
    };
    const store = new Vuex.Store({ getters, actions });

    const wrapper = mount(AdminHome, {
      store,
      mocks: {
        $config: {
          strapi: {
            url: "",
          },
        },
      },
    });
    await flushPromises();

    const rightSide = wrapper.findComponent(RightSide);
    expect(rightSide.exists()).toBe(true);
    const topProducts = wrapper.findComponent({ name: "TopProducts" });
    expect(topProducts.find("span").text()).toBe(
      "There were no products sold during this time"
    );
  });
});
