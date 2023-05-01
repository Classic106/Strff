<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <SelectWithSearch
      :data="products"
      :total="total"
      :currentPerPage="currentPerPage"
      :placeholder="'Serch products'"
      v-on:clickItem="addProduct"
      v-on:setPage="setPage"
      v-on:setSearchText="setSearchText"
      class="mb-3 w-100"
    >
      <template v-slot:item="products">
        <ProductCard class="w-100 m-0 p-0" :product="products.item" />
      </template>
    </SelectWithSearch>
    <div
      v-if="search.length && !selectedProducts.length"
      class="text-uppercase text-center p-3 w-100"
    >
      nothing not found
    </div>
    <div class="w-100" v-else-if="selectedProducts.length">
      <ul class="d-flex flex-column p-0 m-0">
        <li
          v-for="(item, index) in selectedProducts"
          :key="item.product.id"
          class="row w-100 mb-2 m-0 mx-auto justify-content-center"
        >
          <ProductQuantityItem
            v-if="quantity"
            :product="item.product"
            v-on:deleteProduct="deleteProduct(index)"
            v-on:updateProduct="updateProduct"
          />
          <ProductItem
            v-else
            :product="item.product"
            v-on:deleteProduct="deleteProduct(index)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import { warn } from "~/utils/warn";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import ProductQuantityItem from "./ProductQuantityItem.vue";
import ProductItem from "./ProductItem.vue";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductsBlock",
  components: {
    ProductCard,
    SelectWithSearch,
    ProductItem,
    ProductQuantityItem,
  },
  props: {
    quantity: Boolean,
  },
  data: () => ({
    selectedProducts: [],
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
      const { search } = this;

      if (search) {
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(async () => await this.getProds(), 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;

        await this.getProds();
      }
    },
  },
  methods: {
    ...mapActions({
      createBundle: "admin_bundles/createBundle",
      getProducts: "admin_products/getProducts",
    }),
    ...mapMutations({
      setParams: "admin_products/setParams",
      clearProducts: "admin_products/clearProducts",
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
    addProduct: function (item) {
      const index = this.selectedProducts.findIndex(
        ({ product }) => product.id === item.id
      );

      if (index === -1) {
        const obj = {
          total: item.price,
          price: item.price,
          product: item,
          quantity: 1,
        };
        this.selectedProducts.push(obj);
        this.$emit("setProducts", this.selectedProducts);
        return;
      }

      warn("Product is selected already");
    },
    deleteProduct: function (index) {
      this.selectedProducts.splice(index, 1);
      this.$emit("setProducts", this.selectedProducts);
    },
    updateProduct: function (data) {
      const index = this.selectedProducts.findIndex(
        ({ product }) => product.id === data.product.id
      );

      if (index !== -1) {
        this.selectedProducts[index] = data;
      }
    },
  },
  async beforeMount() {
    this.getProds();
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.clearProducts();
  },
};
</script>

<style scoped>
</style>