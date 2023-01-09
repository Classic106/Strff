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

import BundleForm from "./BundleForm.vue";

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
      params: "admin_products/params",
      total: "admin_products/total",
    }),
  },
  watch: {
    selected: function () {
      this.currentBundle = JSON.parse(JSON.stringify(this.selected));
    },
  },
  methods: {
    getStrapiMedia,
    prevCurrNextItems,
    ...mapActions({
      updateBundle: "admin_bundles/updateBundle",
      getBundles: "admin_bundles/getBundles",
    }),
    ...mapMutations({
      setParams: "admin_bundles/setParams",
      clearSelectedBundles: "admin_bundles/clearSelectedBundles",
      setSelectedBundles: "admin_bundles/setSelectedBundles",
    }),
    setNextBundle: async function () {
      const index = this.findIndex();

      const { page, currentPerPage } = this.params;

      let isMax = false;

      if (
        this.total / currentPerPage - page <= 0 &&
        index === this.bundles.length - 2
      ) {
        isMax = true;
      }

      const { selected, next, previous } = this.prevCurrNextItems(
        this.bundles[index + 1],
        this.bundles
      );

      if (!isMax && !next) {
        const { page } = this.params;

        this.setParams({ ...this.params, page: page + 1 });

        await this.getBundles();

        const result = this.prevCurrNextItems(this.bundles[0], [
          selected,
          ...this.bundles,
        ]);

        this.setSelectedBundles(result);
      } else {
        this.setSelectedBundles({ selected, next, previous });
      }
    },
    setPreviousBundle: async function () {
      const index = this.findIndex();

      const { page } = this.params;

      const { selected, next, previous } = this.prevCurrNextItems(
        this.bundles[index - 1],
        this.bundles
      );

      let isMin = false;

      if (page >= 1 && index === 1) {
        isMin = true;
      }

      if (!isMin && !previous) {
        const { page } = this.params;
        this.setParams({ ...this.params, page: page - 1 });

        await this.getBundles();

        const result = this.prevCurrNextItems(
          this.bundles[this.bundles.length - 1],
          [...this.bundles, selected]
        );

        this.setSelectedBundles(result);
      } else {
        this.setSelectedBundles({ selected, next, previous });
      }
    },
    findIndex: function () {
      return this.bundles.findIndex((item) => item.id === this.selected.id);
    },
    getBundle: function (data) {
      this.currentBundle = data;
    },
    save: async function () {
      const products = this.currentBundle.products.map((item) => item.id);
      const bundle = { ...this.currentBundle, products };
      await this.updateBundle(bundle);
    },
  },
  async beforeMount() {
    this.currentBundle = JSON.parse(JSON.stringify(this.selected));
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