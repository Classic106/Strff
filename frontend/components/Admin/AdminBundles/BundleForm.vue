<template>
  <form
    id="add-bundle-form"
    v-on:submit.stop.prevent="submit"
    class="was-validated"
    ref="form"
  >
    <div class="mb-2">
      <label class="d-flex" for="title"> Title </label>
      <input
        id="title"
        type="text"
        placeholder="Enter title"
        v-model.trim="currentBundle.title"
        required
        pattern="^[a-zA-Z\s.,-:]{10,100}$"
        autofocus="true"
        class="form-control w-100"
      />
      <div class="invalid-feedback">
        <div class="d-flex align-items-center">
          Title must be from 10 to 100 symbols and may contain &nbsp;
          <h6>. , - :</h6>
        </div>
      </div>
    </div>
    <div class="mb-2">
      <label class="d-flex" for="description"> Description </label>
      <input
        id="description"
        type="text"
        placeholder="Enter description"
        v-model.trim="currentBundle.description"
        autofocus="true"
        pattern="^[a-zA-Z\s.,-:]{10,100}$"
        class="w-100"
        :class="currentBundle.description ? 'form-control' : 'bts_input_style '"
      />
      <div class="invalid-feedback">
        <div class="d-flex align-items-center">
          Description must be from 10 to 100 symbols and may contain &nbsp;
          <h6>. , - :</h6>
        </div>
      </div>
    </div>
    <div class="mb-2">
      <label class="d-flex" for="price"> Price </label>
      <InputMoney
        id="price"
        class="form-control w-100"
        :price="currentBundle.price"
        v-on:setPrice="setPrice"
        required
      />
      <div class="invalid-feedback">Price mustn't be zero</div>
    </div>
    <div class="d-flex flex-column mb-2">
      <label class="d-flex" for="published_at">Status</label>
      <select id="published_at" required v-model="status" class="form-control">
        <option value="published">published</option>
        <option value="null">draft</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="d-flex"> Products </label>
      <SelectWithSearch
        :data="products"
        :filter="filterProducts"
        :clickItem="addProduct"
        :placeholder="'Serch products'"
        class="mb-3"
      >
        <template v-slot:item="products">
          <ProductCard class="w-100 m-0 mb-2" :product="products.item" />
        </template>
      </SelectWithSearch>
      <div v-if="currentBundle.products.length">
        <ul class="p-0">
          <li
            v-for="product in currentBundle.products"
            :key="product.id"
            class="row w-100 mb-2 m-0 justify-content-between"
          >
            <div class="col-11 p-0">
              <ProductCard class="w-100 m-0" :product="product" />
            </div>
            <div
              class="col-1 d-flex justify-content-center align-items-start p-0"
              v-on:click="deleteProduct(product.id)"
            >
              <BIconX />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { warn } from "~/utils/warn";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import ProductCard from "~/components/Admin/common/ProductCard.vue";
import InputMoney from "~/components/Admin/common/InputMoney.vue";

export default {
  name: "BundleForm",
  components: {
    SelectWithSearch,
    ProductCard,
    ProductCard,
    InputMoney,
  },
  props: {
    bundle: Object,
  },
  data: () => ({
    status: "null",
    currentBundle: {
      products: [],
      title: "",
      desription: "",
      price: 0,
    },
    products: [],
  }),
  watch: {
    status: function () {
      const { published_at } = this.currentBundle;

      if (this.status === "null") {
        this.currentBundle.published_at = null;
      } else if (this.status !== null && published_at === null) {
        this.currentBundle.published_at = new Date();
      }

      this.$emit("getBundle", this.currentBundle);
    },
    currentBundle: {
      handler() {
        const { published_at } = this.currentBundle;

        if (this.status === "null") {
          this.currentBundle.published_at = null;
        } else if (this.status !== null && published_at === null) {
          this.currentBundle.published_at = new Date();
        }

        this.$emit("getBundle", this.currentBundle);
      },
      deep: true,
    },
    bundle: function () {
      this.currentBundle = this.bundle;
    },
  },
  methods: {
    ...mapActions({ createBundle: "admin_bundles/createBundle" }),
    filterProducts: function (text, data) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    },
    setPrice: function (val) {
      this.currentBundle.price = val;
    },
    addProduct: function (item) {
      const index = this.currentBundle.products.findIndex(
        (p) => p.id === item.id
      );
      if (index === -1) {
        this.currentBundle.products.push(item);
        return;
      }

      warn("Product is selected already");
    },
    deleteProduct: function (id) {
      this.currentBundle.products = this.currentBundle.products.filter(
        (product) => product.id != id
      );
    },
    submit: async function () {
      if (this.currentBundle.products.length < 2) {
        this.$notify({
          group: "all",
          type: "error",
          text: "Chose 2 products",
        });
        return;
      }

      const products = this.currentBundle.products.map((item) => item.id);
      const bundle = { ...this.currentBundle, products };
      await this.createBundle(bundle);
      this.$refs.form.reset();
      this.currentBundle.products = [];
    },
  },
  async beforeMount() {
    if (this.bundle) {
      this.currentBundle = this.bundle;
      if (this.currentBundle.published_at) {
        this.status = "published";
      }
    }
    this.products = await this.$strapi.find("products");
  },
};
</script>

<style scoped>
</style>