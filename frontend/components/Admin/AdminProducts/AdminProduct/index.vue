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
        class="was-validated row w-100"
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
                pattern="^[a-zA-Z\s.,-:]{10,100}$"
                class="form-control"
                v-model.trim="currentProduct.title"
              />
              <div class="invalid-feedback">
                <div class="d-flex align-items-center">
                  Title must be from 10 to 100 symbols and may contain &nbsp;
                  <h6>. , - :</h6>
                </div>
              </div>
            </div>
            <div class="block d-flex flex-column p-2 mt-2">
              <label class="d-flex font-weight-bold" for="title"
                >Description</label
              >
              <textarea
                id="title"
                type="text"
                class="form-control"
                required
                pattern="^[a-zA-Z\s.,-:]{10,100}$"
                v-model.trim="currentProduct.description"
              />
              <div v-if="currentProduct.description" class="invalid-feedback">
                <div class="d-flex align-items-center">
                  Description must be from 10 to 100 symbols and may contain
                  &nbsp;
                  <h6>. , - :</h6>
                </div>
              </div>
            </div>
            <div class="block mt-2 p-2">
              <label class="d-flex font-weight-bold" for="price">
                Price $</label
              >
              <InputDecimal
                id="price"
                class="form-control w-100"
                :value="currentProduct.price"
                v-on:setDecimal="setPrice"
                required
              />
              <div class="invalid-feedback">Price mustn't be zero</div>
            </div>
            <ChoseColor
              class="block p-2 mt-2"
              :color="currentProduct.color"
              boldTitle
              v-on:setColor="setColor"
            />
            <ProductMedia class="mt-2" />
          </div>
        </div>
        <div class="col-3 d-flex flex-column p-0 pl-3">
          <div class="block d-flex flex-column p-2 mt-2">
            <label class="d-flex font-weight-bold" for="status"
              >Product status</label
            >
            <select id="status" required v-model="status" class="form-control">
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
              class="form-control"
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
          <div class="block p-2 mt-2">
            <label class="d-flex font-weight-bold">Sizes</label>
            <div class="mb-2">
              <label class="d-flex" for="title"> Dimension </label>
              <select
                v-model="currentProduct.dimension"
                required
                class="bts_input_style w-100"
              >
                <option value="cm">cm</option>
                <option value="inch">inch</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="d-flex" for="title"> Length </label>
              <input
                id="length"
                type="number"
                placeholder="Enter length"
                v-model.trim="currentProduct.lengthy"
                required
                min="1"
                max="100"
                autofocus="true"
                class="form-control w-100"
              />
            </div>
            <div class="mb-2">
              <label class="d-flex" for="width"> Width </label>
              <input
                id="width"
                type="number"
                placeholder="Enter width"
                v-model.trim="currentProduct.width"
                required
                min="1"
                max="100"
                autofocus="true"
                class="form-control w-100"
              />
            </div>
            <div class="mb-2">
              <label class="d-flex" for="height"> Height </label>
              <input
                id="height"
                type="number"
                placeholder="Enter height"
                v-model.trim="currentProduct.height"
                required
                min="1"
                max="100"
                autofocus="true"
                class="form-control w-100"
              />
            </div>
            <div class="mb-2">
              <label class="d-flex" for="volume"> Volume </label>
              <input
                id="volume"
                type="number"
                placeholder="Volume"
                v-model.trim="currentProduct.volume"
                disabled
                autofocus="false"
                class="form-control w-100"
              />
            </div>
            <div class="mb-2">
              <label class="d-flex" for="weight_dimension">
                Weight dimension
              </label>
              <select
                id="weight_dimension"
                v-model="currentProduct.weight_dimension"
                required
                class="bts_input_style w-100"
              >
                <option value="kilo">kilo</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
            <div class="mb-2">
              <label class="d-flex" for="weight"> Weight </label>
              <InputDecimal
                id="weight"
                class="form-control w-100"
                :value="currentProduct.weight"
                v-on:setDecimal="setWeight"
                required
              />
            </div>
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

import ConfirmModal from "~/components/Admin/common/ConfirmModal.vue";
import InputDecimal from "~/components/Admin/common/InputDecimal.vue";
import ChoseColor from "~/components/Admin/common/ChoseColor.vue";
import ProductMedia from "./ProductMedia.vue";

export default {
  name: "AdminProduct",
  components: { ProductMedia, ConfirmModal, InputDecimal, ChoseColor },
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
    currentProduct: {
      handler: function () {
        const { lengthy, width, height } = this.currentProduct;
        this.currentProduct.volume = lengthy * width * height;
      },
      deep: true,
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
    setColor: function (color) {
      this.currentProduct.color = color;
    },
    setPrice: function (val) {
      this.currentProduct.price = val;
    },
    setWeight: function (val) {
      this.currentProduct.weight = val;
    },
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