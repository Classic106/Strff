<template>
  <div>
    <ul class="d-flex flex-column">
      <li v-on:click="$emit('setPage', 'home')">Home</li>
      <li v-on:click="$emit('setPage', 'orders')">Orders</li>
      <li v-on:click="$emit('setPage', 'products')">Products</li>
      <li v-on:click="$emit('setPage', 'customers')">Customers</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AdminMenu",
};
</script>

<style scoped>
</style>