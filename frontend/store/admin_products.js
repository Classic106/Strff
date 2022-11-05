import qs from "qs";

export const state = () => ({
  total: 0,
  params: {
    sort: {
      field: "",
      type: "none",
    },
    search: "",
    page: 1,
    currentPerPage: 10,
  },
  products: [],
  selected: null,
  next: null,
  previous: null,
});

export const actions = {
  async getProducts({ commit, state }) {
    try {
      const token = this.$cookies.get("token");

      const { sort, search, page, currentPerPage } = state.params;
      const { field, type } = sort;

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
      };

      if (sort && type !== "none") {
        queryData._sort = `${field}:${type.toUpperCase()}`;
      }

      if (search) {
        if (!isNaN(+search)) {
          queryData.price = search;
        } else {
          queryData.title_containss = search;
        }
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/products/count?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const products = await this.$axios.get(`/products?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("setTotal", total.data);
      commit("setProducts", products.data);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async createProduct({ commit }, product) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { image } = product;

      const formData = new FormData();

      for (let i = 0; i < image.length; i++) {
        formData.append("files", image[i], image[i].name);
      }

      const { data } = await this.$axios
        .post("/upload", formData, headers)
        .then(({ data }) => {
          const ids = data.map((item) => item.id);
          return ids;
        })
        .then((ids) => {
          product.image = ids;

          return this.$axios.post(`/products`, product, headers);
        });

      commit("addProduct", data);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async updateProduct({ commit }, product) {
    try {
      const token = this.$cookies.get("token");

      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { id, image, files } = product;

      let newImages = [];

      if (files && Array.from(files.keys()).length) {
        newImages = await this.$axios
          .post("/upload", files, headers)
          .then(({ data }) => {
            const ids = data.map((item) => item.id);
            return ids;
          });
      }

      const curentIMages = image.map((image) => image.id);

      const updatedProduct = { ...product, image: curentIMages, newImages };

      const { data } = await this.$axios.put(
        `/products/${id}`,
        updatedProduct,
        headers
      );
      commit("updateProduct", data);
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
  async deleteProducts({ commit }, ids) {
    try {
      const token = this.$cookies.get("token");

      const { data } = await this.$axios.delete(`/products/${ids}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      commit("deleteProducts", ids);
      commit("clearSelectedProducts");
    } catch (e) {
      const { data } = e.response;
      const messge = data.message[0].messages[0].id;
      Vue.notify({
        group: "all",
        type: "error",
        text: messge,
      });
    }
  },
};

export const mutations = {
  setTotal(state, total) {
    state.total = total;
  },
  setParams(state, params) {
    state.params = params;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setSelectedProducts(state, data) {
    const { selected, previous, next } = data;

    state.selected = selected;
    state.previous = previous;
    state.next = next;
  },
  addProduct(state, product) {
    state.products.push(product);
  },
  updateProduct(state, product) {
    const index = state.products.findIndex((p) => p.id === product.id);
    state.products[index] = product;
    state.selected = product;
  },
  deleteProducts(state, ids) {
    const newProducts = state.products.reduce((acc, item) => {
      if (!ids.includes(item.id)) {
        acc.push(item);
      }
      return acc;
    }, []);
    state.products = newProducts;
  },
  clearSelectedProducts(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
  },
  clearProducts(state) {
    state.previous = null;
    state.selected = null;
    state.next = null;
    state.products = [];
    state.params = {
      sort: {
        field: "",
        type: "none",
      },
      search: "",
      page: 1,
      currentPerPage: 10,
    };
  },
};

export const getters = {
  total(state) {
    return state.total;
  },
  params(state) {
    return state.params;
  },
  products: (state) => {
    return state.products;
  },
  selected: (state) => {
    return state.selected;
  },
  next: (state) => {
    return state.next;
  },
  previous: (state) => {
    return state.previous;
  },
};
