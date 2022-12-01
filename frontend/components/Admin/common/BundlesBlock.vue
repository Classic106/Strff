<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <BIconSearch class="search-icon d-flex position-absolute" />
    <SelectWithSearch
      :data="bundles"
      :filter="filterBundles"
      :clickItem="addBundle"
      :placeholder="'Serch bundles'"
      class="mb-3"
    >
      <template v-slot:item="bundles">
        <BundleCard :bundle="bundles.item" class="w-100 m-0 p-0" />
      </template>
    </SelectWithSearch>
    <div class="w-100" v-if="selectedBundles.length">
      <ul class="d-flex flex-column p-0 w-100 m-0">
        <li
          v-for="(item, index) in selectedBundles"
          :key="item.bundle.id"
          class="row w-100 mb-2 mx-auto justify-content-center"
        >
          <BundleCard :bundle="item.bundle" class="col-11 m-0 p-0" />
          <div
            class="col-1 d-flex justify-content-center align-items-start p-0"
            v-on:click="deleteProduct(index)"
          >
            <BIconX />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "~/utils/filters";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import BundleCard from "./BundleCard.vue";

export default {
  name: "BundlesBlock",
  components: { SelectWithSearch, BundleCard },
  data: () => ({
    bundles: [],
    selectedBundles: [],
  }),
  methods: {
    filterBundles: function (text, data) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
    },
    addBundle: function (item) {
      const index = this.selectedBundles.findIndex((p) => p.id === item.id);

      if (index === -1) {
        const obj = { bundle: item };
        this.selectedBundles.push(obj);
      }
      this.$emit("setBundles", this.selectedBundles);
    },
    deleteProduct: function (index) {
      this.selectedBundles.splice(index, 1);
      this.$emit("setBundles", this.selectedBundles);
    },
  },
  async beforeMount() {
    this.bundles = await this.$strapi.find("bundles");
  },
};
</script>

<style scoped>
</style>