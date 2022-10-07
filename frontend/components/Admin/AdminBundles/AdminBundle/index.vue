<template>
  <vueCustomScrollbar
    class="w-100 h-100 overflow-auto d-flex justify-content-center"
    :settings="scrollSettings"
  >
    <div class="row w-100 justify-content-center">
      <div class="d-flex flex-column col-md-8 col-12">
        <div class="d-flex align-items-start my-3">
          <button v-on:click="clearBundles()" class="button">
            <BIconArrowLeft />
          </button>
          <div class="w-100 px-3">
            <h6 class="m-0 px-2 font-weight-bold">{{ currentBundle.title }}</h6>
          </div>
          <button
            class="border-left"
            v-on:click="setPreviousBundle"
            :disabled="!previous"
          >
            <BIconChevronLeft />
          </button>
          <button
            class="border-right"
            v-on:click="setNextBundle"
            :disabled="!next"
          >
            <BIconChevronRight />
          </button>
        </div>
        <div class="block mb-3 p-3">
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
            <div v-if="selectedProducts.length">
              <ul class="d-flex flex-column p-0">
                <li
                  v-for="product in selectedProducts"
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
                    class="
                      col-1
                      d-flex
                      justify-content-center
                      align-items-start
                      p-0
                    "
                    v-on:click="deleteProduct(product.id)"
                  >
                    <BIconX />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button class="btn btn-success mb-3" v-on:click="save">
          Save bundle
        </button>
      </div>
    </div>
  </vueCustomScrollbar>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

import { getStrapiMedia } from "~/utils/medias";
import { prevCurrNextItems } from "~/helpers";

import PreloaderImage from "~/components/common/PreloaderImage.vue";
import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import BundleItem from "./BundleItem.vue";

export default {
  name: "AdminBundle",
  components: { PreloaderImage, SelectWithSearch, BundleItem },
  data: () => ({
    currentBundle: null,
    products: [],
    selectedProducts: [],
    scrollSettings: {
      suppressScrollX: true,
      wheelPropagation: false,
    },
  }),
  computed: {
    ...mapGetters({
      bundles: "admin_bundles/bundles",
      previous: "admin_bundles/previous",
      selected: "admin_bundles/selected",
      next: "admin_bundles/next",
    }),
  },
  methods: {
    getStrapiMedia,
    prevCurrNextItems,
    ...mapMutations({
      clearBundles: "admin_bundles/clearBundles",
      setSelectedBundles: "admin_bundles/setSelectedBundles",
    }),
    filterProducts: function (text, data) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    },
    addProduct: function (item) {
      this.selectedProducts.push(item);
    },
    deleteProduct: function (id) {
      this.selectedProducts = this.selectedProducts.filter(
        (product) => product.id != id
      );
    },
    setNextBundle: function () {
      const index = this.findCurrentIndex();
      const result = this.prevCurrNextItems(
        this.bundles[index + 1],
        this.bundles
      );

      this.setSelectedBundles(result);
    },
    setPreviousBundle: function () {
      const index = this.findCurrentIndex();
      const result = this.prevCurrNextItems(
        this.bundles[index - 1],
        this.bundles
      );

      this.setSelectedBundles(result);
    },
    findCurrentIndex: function () {
      return this.bundles.findIndex((item) => item.id === this.selected.id);
    },
    setSelected: function (data) {
      this.selectedProducts = data;
    },
    parseDate: function (date) {
      const options = { month: "long" };

      const d = new Date(date);

      const month = new Intl.DateTimeFormat("en-US", options).format(d);
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = d.getMinutes();

      return `${month} ${day}, at ${hours}: ${minutes}`;
    },
    save: function () {
      this.currentBundle.products = this.selectedProducts.map((p) => p.id);
      console.log(this.currentBundle);
    },
  },
  async beforeMount() {
    //console.log(this.selected);
    this.currentBundle = { ...this.selected };
    this.selectedProducts = [...this.currentBundle.products];
    this.products = await this.$strapi.find("products");
    //console.log(this.products);
  },
};
</script>

<style scoped>
.button {
  border-radius: 5px;
  background: none;
}

.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
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