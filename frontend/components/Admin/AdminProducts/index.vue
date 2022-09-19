<template>
  <ProductTable v-if="!selectedProduct" />
  <AdminProduct v-else :selectedProduct="selectedProduct" />
</template>

<script>
import { mapGetters } from "vuex";

import ProductTable from "./ProductTable";
import AdminProduct from "./AdminProduct.vue";

export default {
  name: "AdminProducts",
  components: { ProductTable, AdminProduct },
  computed: {
    ...mapGetters({ selectedProduct: "admin/selectedProduct" }),
  },
};
</script>

<style scoped>
</style>