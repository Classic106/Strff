import qs from "qs";
import { error } from "~/utils/error";

export const state = () => ({
  boxes: [
    {
      h: 3,
      w: 2,
      l: 2,
      v: 12,
      weight: 21937,
    },
    {
      h: 6,
      w: 3,
      l: 2,
      v: 36,
      weight: 1513,
    },
    {
      h: 1,
      w: 3,
      l: 3,
      v: 9,
      weight: 11561,
    },
    {
      h: 19.375,
      w: 17.375,
      l: 14,
      v: 4712.96875,
      weight: 17475,
    },
    {
      h: 17.5,
      w: 12.5,
      l: 3,
      v: 656.25,
      weight: 22074,
    },
    {
      h: 38,
      w: 7.5,
      l: 6.5,
      v: 1852.5,
      weight: 24277,
    },
    {
      h: 13,
      w: 11,
      l: 2,
      v: 286,
      weight: 14514,
    },
    {
      h: 16,
      w: 11,
      l: 3,
      v: 528,
      weight: 1734,
    },
    {
      h: 18,
      w: 16,
      l: 3,
      v: 864,
      weight: 11002,
    },
  ],
});

export const actions = {
  async getBoxes({ commit }) {
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
      // const { data } = await this.$axios.get(`/products?${query}`);
      // commit("set_best_sellers", data);
      const boxes = data.map((box) => calculateVolume(box));
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
      console.log(data);
      commit("set_box", data);
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  set_boxes(state, boxes) {
    state.boxes = boxes;
  },
  set_box(state, box) {
    state.boxes.push(box);
  },
};

export const getters = {
  boxes(state) {
    // function randomIntFromInterval(min, max) {
    //   // min and max included
    //   return Math.floor(Math.random() * (max - min + 1) + min);
    // }

    // console.log(
    //   state.boxes.map((b) => ({
    //     ...b,
    //     weight: randomIntFromInterval(1000, 25000),
    //   }))
    // );
    return state.boxes;
  },
};
