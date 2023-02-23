import qs from "qs";
import { error } from "~/utils/error";

export const state = () => ({
  boxes: [
    {
      w: 3,
      l: 2,
      h: 2,
      v: 12,
      weight: 21937,
    },
    {
      w: 6,
      l: 6,
      h: 6,
      v: 216,
      weight: 21937,
    },
    {
      w: 6,
      l: 6,
      h: 8,
      v: 288,
      weight: 21937,
    },
    {
      w: 8,
      l: 8,
      h: 8,
      v: 512,
      weight: 21937,
    },
    {
      w: 6,
      l: 3,
      h: 2,
      v: 36,
      weight: 1513,
    },
    {
      w: 1,
      l: 3,
      h: 3,
      v: 9,
      weight: 11561,
    },
    {
      w: 19.375,
      l: 17.375,
      h: 14,
      v: 4712.96875,
      weight: 17475,
    },
    {
      w: 17.5,
      l: 12.5,
      h: 3,
      v: 656.25,
      weight: 22074,
    },
    {
      w: 38,
      l: 7.5,
      h: 6.5,
      v: 1852.5,
      weight: 24277,
    },
    {
      w: 13,
      l: 11,
      h: 2,
      v: 286,
      weight: 14514,
    },
    {
      w: 16,
      l: 11,
      h: 3,
      v: 528,
      weight: 1734,
    },
    {
      w: 18,
      l: 16,
      h: 3,
      v: 864,
      weight: 11002,
    },
  ],
});

export const actions = {
  async getBoxes({ commit }, boxes) {
    try {
      const calculateVolume = (box) => {
        const { h, w, l } = box;
        return { ...box, v: h * w * l };
      };
      // const queryData = {
      //   _sort: `sales:DESC`,
      //   _limit: 4,
      // };
      // const query = qs.stringify(queryData);
      // const { data } = await this.$axios.get(`/boxes?${query}`);
      // const boxes = data.map((box) => calculateVolume(box));
      commit("set_boxes", boxes);
    } catch (e) {
      error(e);
    }
  },
  async setBox({ commit }, data) {
    try {
      // const queryData = {
      //   _sort: `sales:DESC`,
      //   _limit: 4,
      // };
      // const query = qs.stringify(queryData);
      // const { data } = await this.$axios.get(`/products?${query}`);
      // commit("set_best_sellers", data);
      // console.log(data);
      // commit("set_box", data);
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  set_boxes(state, boxes = []) {
    state.boxes = boxes;
  },
  set_box(state, box) {
    state.boxes.push(box);
  },
};

export const getters = {
  boxes(state) {
    return state.boxes;
  },
};
