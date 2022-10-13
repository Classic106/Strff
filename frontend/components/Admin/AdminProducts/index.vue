<template>
  <div class="w-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else class="w-100 h-100">
      <ProductTable v-if="!selected" />
      <AdminProduct v-else />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Loader from "~/components/common/Loader";
import ProductTable from "./ProductTable";
import AdminProduct from "./AdminProduct.vue";

export default {
  name: "AdminProducts",
  components: { Loader, ProductTable, AdminProduct },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters({ selected: "admin_products/selected" }),
  },
  methods: {
    ...mapActions({ getProducts: "admin_products/getProducts" }),
    ...mapMutations({
      clearProducts: "admin_products/clearProducts",
      setCurrentPage: "admin/setCurrentPage",
    }),
  },
  beforeMount() {
    const page = this.$route.path.replace("/admin/", "");
    this.setCurrentPage(page);
  },
  async mounted() {
    this.loading = true;
    await this.getProducts();
    this.loading = false;
  },
  destroyed() {
    this.clearProducts();
  },
};
</script>

<style scoped>
</style>