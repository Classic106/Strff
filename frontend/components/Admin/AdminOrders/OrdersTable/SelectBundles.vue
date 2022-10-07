<template>
  <OrderTable v-if="isTable" v-on:setIsTable="isTable = false" />
  <CreateOrder v-else v-on:setIsTable="isTable = true" />
</template>

<script>
import OrderTable from "./OrderTable.vue";
import CreateOrder from "./CreateOrder.vue";

export default {
  name: "OrdersTable",
  components: { OrderTable, CreateOrder },
  data: () => ({
    isTable: true,
  }),
};
</script>

<style scoped>
</style>