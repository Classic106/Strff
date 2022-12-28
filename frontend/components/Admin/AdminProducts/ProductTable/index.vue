<template>
  <ProductsTable v-if="isTable" v-on:setIsTable="isTable = false" />
  <CreateProduct v-else v-on:setIsTable="isTable = true" />
</template>

<script>
import CreateProduct from "./CreateProduct.vue";
import ProductsTable from "./ProductsTable.vue";

export default {
  name: "ProductTable",
  components: { CreateProduct, ProductsTable },
  data: () => ({
    isTable: true,
  }),
};
</script>

<style scoped>
</style>