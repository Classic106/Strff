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
      <InputDecimal
        id="price"
        class="form-control w-100"
        :value="currentBundle.price"
        v-on:setDecimal="setPrice"
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
      <div class="d-flex">
        <SelectWithSearch
          :data="products"
          :total="total"
          :currentPerPage="currentPerPage"
          :placeholder="'Serch products'"
          v-on:clickItem="addProduct"
          v-on:setPage="setPage"
          v-on:setSearchText="setSearchText"
          class="w-100"
        >
          <template v-slot:item="products">
            <ProductCard class="w-100 m-0 mb-2" :product="products.item" />
          </template>
        </SelectWithSearch>
      </div>
      <div v-if="currentBundle.products.length" class="mt-3">
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
import { mapActions, mapGetters, mapMutations } from "vuex";

import { warn } from "~/utils/warn";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import ProductCard from "~/components/Admin/common/ProductCard.vue";
import InputDecimal from "~/components/Admin/common/InputDecimal.vue";

export default {
  name: "BundleForm",
  components: {
    SelectWithSearch,
    ProductCard,
    ProductCard,
    InputDecimal,
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
    currentPerPage: 10,
    page: 1,
    search: "",
    timer: null,
  }),
  computed: {
    ...mapGetters({
      products: "admin_products/products",
      total: "admin_products/total",
    }),
  },
  watch: {
    page: async function () {
      await this.getProds();
    },
    search: async function () {
      await this.getProds();
    },
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
    ...mapActions({
      createBundle: "admin_bundles/createBundle",
      getProducts: "admin_products/getProducts",
    }),
    ...mapMutations({
      setParams: "admin_products/setParams",
    }),
    getProds: async function () {
      const { search, page, currentPerPage } = this;

      this.setParams({ search, page, currentPerPage });
      await this.getProducts();
    },
    setSearchText: function (text) {
      this.search = text;
    },
    setPage: function (page) {
      this.page = page;
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
    this.getProds();
  },
};
</script>

<style scoped>
</style>