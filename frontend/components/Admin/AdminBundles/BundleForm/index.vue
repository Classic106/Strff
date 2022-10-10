<template>
  <div class="mb-3 p-3">
    <div class="mb-2">
      <label class="d-flex" for="first-name"> Title </label>
      <input
        id="title"
        type="text"
        placeholder="Enter title"
        v-model="currentBundle.title"
        required
        autofocus="true"
        class="w-100"
      />
    </div>
    <div class="mb-2">
      <label class="d-flex" for="first-name"> Description </label>
      <input
        id="description"
        type="text"
        placeholder="Enter description"
        v-model="currentBundle.description"
        required
        autofocus="true"
        class="w-100"
      />
    </div>
    <div class="mb-2">
      <label class="d-flex" for="first-name"> Price </label>
      <input
        id="price"
        type="number"
        placeholder="Enter price"
        v-model="currentBundle.price"
        required
        autofocus="true"
        class="w-100"
      />
    </div>
    <div class="mb-2">
      <label class="d-flex"> Products </label>
      <SelectWithSearch
        :data="products"
        :filter="filterProducts"
        :clickItem="addProduct"
        class="mb-3"
      >
        <template v-slot:item="products">
          <BundleItem :item="products.item" />
        </template>
      </SelectWithSearch>
      <div v-if="currentBundle.products.length">
        <ul class="d-flex flex-column p-0">
          <li
            v-for="product in currentBundle.products"
            :key="product.id"
            class="row w-100 mb-2 mx-auto"
          >
            <div class="wrap-img col-2">
              <PreloaderImage :image="product.image[0].url" />
            </div>
            <div class="text-ellipsis col-7 d-flex align-items-center">
              {{ product.title }}
            </div>
            <div class="col-2 d-flex align-items-center text-nowrap">
              $ {{ product.price }}
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
  </div>
</template>

<script>
import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import PreloaderImage from "~/components/common/PreloaderImage.vue";
import BundleItem from "./BundleItem.vue";

export default {
  name: "BundleForm",
  components: { PreloaderImage, SelectWithSearch, BundleItem },
  props: {
    bundle: Object,
  },
  data: () => ({
    currentBundle: {
      products: [],
      title: "",
      desription: "",
      price: 0,
    },
    products: [],
  }),
  watch: {
    currentBundle: {
      handler() {
        this.$emit("getBundle", this.currentBundle);
      },
      deep: true,
    },
    bundle: function () {
      this.currentBundle = this.bundle;
    },
  },
  methods: {
    filterProducts: function (text, data) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    },
    addProduct: function (item) {
      const index = this.currentBundle.products.findIndex(
        (p) => p.id === item.id
      );
      if (index === -1) {
        this.currentBundle.products.push(item);
      }
    },
    deleteProduct: function (id) {
      this.currentBundle.products = this.currentBundle.products.filter(
        (product) => product.id != id
      );
    },
  },
  async beforeMount() {
    if (this.bundle) {
      this.currentBundle = this.bundle;
    }
    this.products = await this.$strapi.find("products");
  },
};
</script>

<style scoped>
</style>