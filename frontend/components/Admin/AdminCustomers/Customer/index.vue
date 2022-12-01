<template>
  <AddOrder v-if="isAddOrder" v-on:closeCreateOrder="isAddOrder = false" />
  <CustomerMain v-else v-on:openAddOrder="isAddOrder = true" />
</template>

<script>
import AddOrder from "./AddOrder.vue";
import CustomerMain from "./CustomerMain.vue";

export default {
  name: "Customer",
  components: {
    AddOrder,
    CustomerMain,
  },
  data: () => ({
    isAddOrder: false,
  }),
};
</script>

<style scoped>
</style>