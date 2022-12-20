import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";

import AdminLayout from "~/layouts/admin.vue";
import AdminHeader from "~/components/Admin/AdminHeader";
import AdminMenu from "~/components/Admin/AdminMenu.vue";
import LightBox from "@/components/common/LightBox.vue";

Vue.use(Vuex);

describe("Adminlayout", () => {
  test("Adminlayout has header, menu, lightbox", () => {
    const getters = {
      "auth/user": jest.fn(),
      "cool_light_box/images": () => [],
      "cool_light_box/imageIndex": jest.fn(),
    };

    const store = new Vuex.Store({ getters });

    const wrapperLayout = mount(AdminLayout, {
      store,
      stubs: {
        Nuxt: {
          template: `<div>Nuxt</div>`,
        },
      },
    });

    const wrapperHeader = wrapperLayout.findComponent(AdminHeader);
    expect(wrapperHeader.exists()).toBe(true);

    const wrapperMenu = wrapperLayout.findComponent(AdminMenu);
    expect(wrapperMenu.exists()).toBe(true);

    const wrapperBox = wrapperLayout.findComponent(LightBox);
    expect(wrapperBox.exists()).toBe(true);
  });
});
