<template>
  <div class="row w-100 justify-content-center m-0 mt-3">
    <div class="d-flex flex-column align-items-center col-10 p-0">
      <div class="d-flex align-items-center justify-content-between w-100">
        <button v-on:click="clearSelectedProducts()" class="button">
          <BIconArrowLeft />
        </button>
        <p class="text-ellipsis m-0 ml-2">{{ currentProduct.title }}</p>
        <div class="d-flex">
          <button
            class="border-left"
            v-on:click="setPreviousProduct"
            :disabled="!previous"
          >
            <BIconChevronLeft />
          </button>
          <button
            class="border-right"
            v-on:click="setNextProduct"
            :disabled="!next"
          >
            <BIconChevronRight />
          </button>
        </div>
      </div>
      <form
        class="row w-100"
        id="admin-product-form"
        v-on:submit.stop.prevent="update"
      >
        <div class="col-9 p-0">
          <div class="d-flex flex-column">
            <div class="block d-flex flex-column p-2 mt-2">
              <label class="d-flex font-weight-bold" for="title">Title</label>
              <textarea
                id="title"
                type="text"
                required
                v-model.trim="currentProduct.title"
              />
            </div>
            <div class="block d-flex flex-column p-2 mt-2">
              <label class="d-flex font-weight-bold" for="title"
                >Description</label
              >
              <textarea
                id="title"
                type="text"
                required
                v-model.trim="currentProduct.description"
              />
            </div>
            <ProductMedia class="mt-2" />
          </div>
        </div>
        <div class="col-3 d-flex flex-column p-0 pl-3">
          <div class="block d-flex flex-column p-2 mt-2">
            <label class="d-flex font-weight-bold" for="status"
              >Product status</label
            >
            <select id="status" required v-model="status">
              <option value="published">published</option>
              <option value="null">draft</option>
            </select>
          </div>
          <div class="block d-flex flex-column p-2 mt-2">
            <label class="d-flex font-weight-bold" for="categories"
              >Categories</label
            >
            <select
              id="categories"
              multiple
              v-model="currentProduct.categories"
            >
              <option
                :value="category.id"
                v-for="category in categories"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </form>
      <div class="row justify-content-between w-100">
        <button
          class="col-8 btn btn-success text-uppercase my-2"
          type="submit"
          form="admin-product-form"
        >
          update
        </button>
        <button
          class="col-3 btn btn-danger text-uppercase my-2"
          v-on:click="deleteProduct"
        >
          delete
        </button>
      </div>
    </div>
    <ConfirmModal :id="'confirm-delete-product'" v-on:confirm="confirm" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import { prevCurrNextItems } from "~/helpers";

import ProductMedia from "./ProductMedia.vue";
import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";

export default {
  name: "AdminProduct",
  components: { ProductMedia, ConfirmModal },
  data: () => ({
    status: "null",
    currentProduct: null,
  }),
  computed: {
    ...mapGetters({
      products: "admin_products/products",
      previous: "admin_products/previous",
      selected: "admin_products/selected",
      next: "admin_products/next",
      params: "admin_products/params",
      total: "admin_products/total",
      categories: "categories/categories",
    }),
  },
  watch: {
    selected: function () {
      this.currentProduct = JSON.parse(JSON.stringify(this.selected));

      const { published_at } = this.currentProduct;

      if (published_at) {
        this.status = "published";
      }
    },
  },
  methods: {
    prevCurrNextItems,
    ...mapActions({
      updateProduct: "admin_products/updateProduct",
      deleteProducts: "admin_products/deleteProducts",
      getProducts: "admin_products/getProducts",
    }),
    ...mapMutations({
      setParams: "admin_products/setParams",
      clearSelectedProducts: "admin_products/clearSelectedProducts",
      setSelectedProducts: "admin_products/setSelectedProducts",
      setImages: "cool_light_box/setImages",
      setImageIndex: "cool_light_box/setImageIndex",
    }),
    setNextProduct: async function () {
      const index = this.findIndex();

      const { page, currentPerPage } = this.params;

      let isMax = false;

      if (
        this.total / currentPerPage - page <= 0 &&
        index === this.products.length - 2
      ) {
        isMax = true;
      }

      const { selected, next, previous } = this.prevCurrNextItems(
        this.products[index + 1],
        this.products
      );

      if (!isMax && !next) {
        const { page } = this.params;

        this.setParams({ ...this.params, page: page + 1 });

        await this.getProducts();

        const result = this.prevCurrNextItems(this.products[0], [
          selected,
          ...this.products,
        ]);

        this.setSelectedProducts(result);
      } else {
        this.setSelectedProducts({ selected, next, previous });
      }
    },
    setPreviousProduct: async function () {
      const index = this.findIndex();

      const { page } = this.params;

      const { selected, next, previous } = this.prevCurrNextItems(
        this.products[index - 1],
        this.products
      );

      let isMin = false;

      if (page >= 1 && index === 1) {
        isMin = true;
      }

      if (!isMin && !previous) {
        const { page } = this.params;
        this.setParams({ ...this.params, page: page - 1 });

        await this.getProducts();

        const result = this.prevCurrNextItems(
          this.products[this.products.length - 1],
          [...this.products, selected]
        );
        this.setSelectedProducts(result);
      } else {
        this.setSelectedProducts({ selected, next, previous });
      }
    },
    findIndex: function () {
      return this.products.findIndex((item) => item.id === this.selected.id);
    },
    update: async function () {
      const { published_at } = this.currentProduct;

      if (this.status === "null") {
        this.currentProduct.published_at = null;
      } else if (this.status !== null && published_at === null) {
        this.currentProduct.published_at = new Date();
      }

      await this.updateProduct(this.currentProduct);
    },
    deleteProduct: function () {
      this.$root.$emit("bv::show::modal", "confirm-delete-product");
    },
    confirm: async function () {
      const { id } = this.currentProduct;
      await this.deleteProducts([id]);
    },
  },
  beforeMount() {
    const { image, published_at } = this.selected;
    this.currentProduct = JSON.parse(JSON.stringify(this.selected));
    this.currentProduct.categories = this.currentProduct.categories.map(
      (item) => item.id
    );
    this.images = [...image];

    if (published_at) {
      this.status = "published";
    }
  },
  async destroyed() {
    this.setParams({ ...this.params, page: 1 });
    await this.getProducts();
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.border-left {
  border-radius: 5px 0 0 5px;
  border: 1px solid #000;
}

.border-right {
  border-radius: 0 5px 5px 0;
  border: 1px solid #000;
}
</style>