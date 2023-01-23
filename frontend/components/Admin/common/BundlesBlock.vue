<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <SelectWithSearch
      :data="bundles"
      :total="total"
      :currentPerPage="currentPerPage"
      :placeholder="'Serch bundles'"
      v-on:clickItem="addBundle"
      v-on:setPage="setPage"
      v-on:setSearchText="setSearchText"
      class="mb-3 w-100"
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
import { mapActions, mapGetters, mapMutations } from "vuex";

import { warn } from "~/utils/warn";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import BundleCard from "./BundleCard.vue";

export default {
  name: "BundlesBlock",
  components: { SelectWithSearch, BundleCard },
  data: () => ({
    currentPerPage: 10,
    page: 1,
    search: "",
    selectedBundles: [],
  }),
  computed: {
    ...mapGetters({
      bundles: "admin_bundles/bundles",
      total: "admin_bundles/total",
    }),
  },
  watch: {
    page: async function () {
      await this.getBnds();
    },
    search: async function () {
      await this.getBnds();
    },
  },
  methods: {
    ...mapActions({ getBundles: "admin_bundles/getBundles" }),
    ...mapMutations({
      setParams: "admin_bundles/setParams",
    }),
    getBnds: async function () {
      const { search, page, currentPerPage } = this;

      this.setParams({ search, page, currentPerPage });
      await this.getBundles({
        search,
        page,
        currentPerPage,
      });
    },
    setSearchText: function (text) {
      this.search = text;
    },
    setPage: function (page) {
      this.page = page;
    },
    addBundle: function (item) {
      const index = this.selectedBundles.findIndex(
        (p) => p.bundle.id === item.id
      );

      if (index === -1) {
        const obj = { bundle: item };
        this.selectedBundles.push(obj);

        this.$emit("setBundles", this.selectedBundles);
        return;
      }

      warn("Bundle is selected already");
    },
    deleteProduct: function (index) {
      this.selectedBundles.splice(index, 1);
      this.$emit("setBundles", this.selectedBundles);
    },
  },
  async mounted() {
    this.getBnds();
  },
};
</script>

<style scoped>
</style>