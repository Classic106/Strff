<template>
  <CustomerTable v-if="isTable" v-on:setIsTable="isTable = false" />
  <AddCustomer v-else v-on:setIsTable="isTable = true" />
</template>

<script>
import CustomerTable from "./CustomerTable.vue";
import AddCustomer from "./AddCustomer.vue";

export default {
  name: "CustomersTable",
  components: { AddCustomer, CustomerTable },
  data: () => ({
    isTable: true,
  }),
};
</script>

<style scoped>
</style>