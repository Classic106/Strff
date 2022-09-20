<template>
  <div class="menu">
    <ul class="d-flex flex-column mr-md-0 mr-5">
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
@media (max-width: 768px) {
  .menu {
    color: #000 !important;
    background-color: #fff;
  }
}

.menu {
  z-index: 20;
  color: #fff;
}
</style>