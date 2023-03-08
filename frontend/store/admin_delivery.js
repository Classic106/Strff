import qs from "qs";

import { error } from "~/utils/error";
import { success } from "~/utils/success";

export const state = () => ({
  boxes: null,
  deliveries: null,
  selectedBox: null,
  selectedDelivery: null,
});

export const actions = {
  async getDeliveries({ commit, state }) {
    try {
      const queryData = {
        _sort: "title:ASC",
        _limit: -1,
      };
      const query = qs.stringify(queryData);

      const { data } = await this.$axios.get(`/deliveries?${query}`);
      commit("set_deliveries", data);

      if (state.selected) {
        const { id } = state.selected;
        const index = data.findIndex((delivery) => delivery.id === id);

        commit("set_selected", data[index]);
      }
    } catch (e) {
      error(e);
    }
  },
  async setDelivery({ commit }, delivery) {
    try {
      const { file } = delivery;

      let newDelivery;

      if (file) {
        const formData = new FormData();
        formData.append("files", file, file.name);

        newDelivery = await this.$axios
          .post("/upload", formData)
          .then(({ data }) => data[0]?.id)
          .then(async (logo) => {
            const { data } = await this.$axios.post(`/deliveries`, {
              ...delivery,
              logo,
            });
            return data;
          });
      } else {
        const { data } = await this.$axios.post(`/deliveries`, {
          ...delivery,
          logo: null,
        });
        newDelivery = data;
      }

      commit("set_delivery", newDelivery);
      success("Delivery successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateDelivery({ commit }, delivery) {
    try {
      const { id, file } = delivery;

      let updatedDelivery;

      if (file) {
        const formData = new FormData();
        formData.append("files", file, file.name);

        updatedDelivery = await this.$axios
          .post("/upload", formData)
          .then(({ data }) => data[0]?.id)
          .then(async (logo) => {
            const { data } = await this.$axios.put(`/deliveries/${id}`, {
              ...delivery,
              logo,
            });
            return data;
          });
      } else {
        const { data } = await this.$axios.put(`/deliveries/${id}`, {
          ...delivery,
        });
        updatedDelivery = data;
      }

      commit("update_delivery", updatedDelivery);
      success("Delivery successfully updated");
    } catch (e) {
      console.log(e);
      error(e);
    }
  },
  async deleteDelivery({ commit }, id) {
    try {
      const { data } = await this.$axios.delete(`/deliveries/${id}`);

      commit("deleteDelivery", id);
      success("Delivery successfully deleted");
    } catch (e) {
      error(e);
    }
  },
  async getBoxes({ commit }) {
    try {
      const { data } = await this.$axios.get(`/boxes`);
      commit("set_boxes", data);
    } catch (e) {
      error(e);
    }
  },
  async setBox({ commit }, box) {
    try {
      const { data } = await this.$axios.post("/boxes", box);
      commit("set_box", data);
      success("Box successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateBox({ commit, dispatch, state }, box) {
    try {
      const { id } = box;
      const { data } = await this.$axios.put(`/boxes/${id}`, box);

      commit("update_box", data);

      if (state.deliveries) {
        dispatch("getDeliveries");
      }

      success("Box successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteBox({ commit }, id) {
    try {
      const { data } = await this.$axios.delete(`/boxes/${id}`);

      commit("deleteBox", id);
      success("Box successfully deleted");
    } catch (e) {
      error(e);
    }
  },
};

export const mutations = {
  set_deliveries(state, deliveries = []) {
    state.deliveries = deliveries;
  },
  set_delivery(state, delivery) {
    state.deliveries.push(delivery);
  },
  set_selected_delivery(state, selected = null) {
    state.selectedDelivery = selected;
  },
  update_delivery(state, delivery) {
    const { id } = delivery;

    if (state.deliveries) {
      const index = state.deliveries.findIndex(
        (delivery) => delivery.id === id
      );
      state.deliveries.splice(index, 1, delivery);
    }
  },
  deleteDelivery(state, id) {
    const newDeliveries = state.deliveries.reduce((acc, item) => {
      if (id !== item.id) {
        acc.push(item);
      }
      return acc;
    }, []);
    state.deliveries = newDeliveries;
  },
  set_boxes(state, boxes = []) {
    state.boxes = boxes;
  },
  set_box(state, box) {
    state.boxes.push(box);
  },
  set_selected_box(state, selected = null) {
    state.selectedBox = selected;
  },
  update_box(state, box) {
    const { id } = box;

    if (state.boxes) {
      const index = state.boxes.findIndex((box) => box.id === id);
      state.boxes.splice(index, 1, box);
    }
  },
  deleteBox(state, id) {
    const newBoxes = state.boxes.reduce((acc, item) => {
      if (id !== item.id) {
        acc.push(item);
      }
      return acc;
    }, []);
    state.boxes = newBoxes;
  },
};

export const getters = {
  selectedDelivery(state) {
    return state.selectedDelivery;
  },
  selectedBox(state) {
    return state.selectedBox;
  },
  deliveries(state) {
    return state.deliveries;
  },
  boxes(state) {
    return state.boxes;
  },
};
