<template>
  <AddOrder v-if="isAddOrder" v-on:closeCreateOrder="isAddOrder = false" />
  <OrderMain v-else v-on:openAddOrder="isAddOrder = true" />
</template>

<script>
import AddOrder from "./AddOrder";
import OrderMain from "./OrderMain.vue";

export default {
  name: "Customer",
  components: {
    AddOrder,
    OrderMain,
  },
  data: () => ({
    isAddOrder: false,
  }),
};
</script>

<style scoped>
</style>