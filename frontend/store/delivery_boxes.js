import qs from "qs";
import { error } from "~/utils/error";
import { delivery_boxes } from "~/static/delivery_boxes_examples";

export const state = () => ({
  boxes: delivery_boxes,
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
