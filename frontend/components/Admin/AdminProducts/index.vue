<template>
  <ProductTable v-if="!selected" />
  <AdminProduct v-else />
</template>

<script>
import { mapGetters } from "vuex";

import ProductTable from "./ProductTable";
import AdminProduct from "./AdminProduct.vue";

export default {
  name: "AdminProducts",
  components: { ProductTable, AdminProduct },
  computed: {
    ...mapGetters({ selected: "admin_products/selected" }),
  },
};
</script>

<style scoped>
</style>