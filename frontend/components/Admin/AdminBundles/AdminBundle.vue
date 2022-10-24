<template>
  <div class="row w-100 justify-content-center">
    <div class="d-flex flex-column col-md-8 col-12">
      <div class="d-flex align-items-start my-3">
        <button v-on:click="clearSelectedBundles" class="button">
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
      <BundleForm
        class="block mb-3 p-3"
        :bundle="currentBundle"
        v-on:getBundle="getBundle"
      />
      <button class="btn btn-success mb-3" v-on:click="save">
        Save bundle
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import { getStrapiMedia } from "~/utils/medias";
import { prevCurrNextItems } from "~/helpers";

import BundleForm from "./BundleForm";

export default {
  name: "AdminBundle",
  components: { BundleForm },
  data: () => ({
    currentBundle: null,
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
    ...mapActions({
      updateBundle: "admin_bundles/updateBundle",
    }),
    ...mapMutations({
      clearSelectedBundles: "admin_bundles/clearSelectedBundles",
      setSelectedBundles: "admin_bundles/setSelectedBundles",
    }),
    setNextBundle: function () {
      const index = this.findCurrentIndex();
      const result = this.prevCurrNextItems(
        this.bundles[index + 1],
        this.bundles
      );

      this.setSelectedBundles(result);
      this.currentBundle = { ...this.selected };
    },
    setPreviousBundle: function () {
      const index = this.findCurrentIndex();
      const result = this.prevCurrNextItems(
        this.bundles[index - 1],
        this.bundles
      );

      this.setSelectedBundles(result);
      this.currentBundle = { ...this.selected };
    },
    findCurrentIndex: function () {
      return this.bundles.findIndex((item) => item.id === this.selected.id);
    },
    getBundle: function (data) {
      this.currentBundle = data;
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
    save: async function () {
      const products = this.currentBundle.products.map((item) => item.id);
      const bundle = { ...this.currentBundle, products };
      await this.updateBundle(bundle);
    },
  },
  async beforeMount() {
    this.currentBundle = { ...this.selected };
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