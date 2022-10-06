<template>
  <div class="w-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else class="w-100 h-100">
      <BundlesTable v-if="!selected" />
      <AdminBundle v-else />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Loader from "~/components/common/Loader";
import BundlesTable from "./BundlesTable";
import AdminBundle from "./AdminBundle";

export default {
  name: "AdminBundles",
  components: { Loader, BundlesTable, AdminBundle },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters({ selected: "admin_bundles/selected" }),
  },
  methods: {
    ...mapActions({ getBundles: "admin_bundles/getBundles" }),
    ...mapMutations({ clearBundles: "admin_bundles/clearBundles" }),
  },
  async mounted() {
    this.loading = true;
    await this.getBundles();
    this.loading = false;
  },
  destroyed() {
    this.clearBundles();
  },
};
</script>

<style scoped>
</style>