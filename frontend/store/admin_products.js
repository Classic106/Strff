import qs from "qs";
import { error } from "../utils/error";
import { success } from "../utils/success";

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

      const queryData = {
        _start: (page - 1) * currentPerPage,
        _limit: currentPerPage,
        _publicationState: token ? "preview" : "live",
      };

      if (sort) {
        const { field, type } = sort;

        if (type !== "none") {
          queryData._sort = `${field}:${type.toUpperCase()}`;
        }
      }

      if (search) {
        if (!isNaN(+search)) {
          queryData.price = search;
        } else {
          queryData.title_containss = search;
        }
      }

      const query = qs.stringify(queryData);

      const total = await this.$axios.get(`/products/count?${query}`);
      const products = await this.$axios.get(`/products?${query}`);

      commit("setTotal", total.data);
      commit("setProducts", products.data);
    } catch (e) {
      console.log(e);
    }
  },
  async createProduct({ commit }, product) {
    try {
      const { image } = product;

      let newProduct;

      if (image && typeof image !== "string" && image[0]) {
        const formData = new FormData();

        for (let i = 0; i < image.length; i++) {
          formData.append("files", image[i], image[i].name);
        }

        newProduct = await this.$axios
          .post("/upload", formData)
          .then(({ data }) => {
            const ids = data.map((item) => item.id);
            return ids;
          })
          .then(async (image) => {
            const { data } = await this.$axios.post(`/products`, {
              ...product,
              image,
            });
            return data;
          });
      } else {
        const { data } = await this.$axios.post(`/products`, {
          ...product,
          image: null,
        });
        newProduct = data;
      }
      commit("addProduct", newProduct);
      success("Product successfully created");
    } catch (e) {
      error(e);
    }
  },
  async updateProduct({ commit }, product) {
    try {
      const { id, image, files } = product;

      let updatedProduct;

      if (files && Array.from(files.keys()).length) {
        updatedProduct = await this.$axios
          .post("/upload", files)
          .then(({ data }) => {
            const ids = data.map((item) => item.id);
            return ids;
          })
          .then(async (newImages) => {
            const curentIMages = image.map((image) => image.id);

            const { data } = await this.$axios.put(`/products/${id}`, {
              ...product,
              image: curentIMages,
              newImages,
            });
            return data;
          });
      } else {
        const curentIMages = image.map((image) => image.id);

        const { data } = await this.$axios.put(`/products/${id}`, {
          ...product,
          image: curentIMages,
        });
        updatedProduct = data;
      }

      commit("updateProduct", updatedProduct);
      success("Product successfully updated");
    } catch (e) {
      error(e);
    }
  },
  async deleteProducts({ commit }, ids) {
    try {
      const { data } = await this.$axios.delete(`/products/${ids}`);

      commit("deleteProducts", ids);
      commit("clearSelectedProducts");
      success("Product(s) successfully deleted");
    } catch (e) {
      error(e);
    }
  },
  async statusProducts({ dispatch }, { products, status }) {
    try {
      const result = await Promise.all(
        products.map(async ({ id, image }) => {
          const product = {
            id,
            image: image.map(({ id }) => id),
            published_at: status === "publish" ? new Date() : null,
          };
          return await this.$axios.put(`/products/${id}`, product);
        })
      );

      dispatch("getProducts");
    } catch (e) {
      error(e);
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
