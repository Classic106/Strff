<template>
  <Order v-if="!isCutomer" v-on:setCustomer="isCutomer = true" />
  <Customer v-else v-on:setCustomer="isCutomer = false" />
</template>

<script>
import Order from "./Order.vue";
import Customer from "./Customer";

export default {
  name: "AdminOrder",
  components: { Order, Customer },
  data: () => ({ isCutomer: false }),
};
</script>

<style scoped>
</style>