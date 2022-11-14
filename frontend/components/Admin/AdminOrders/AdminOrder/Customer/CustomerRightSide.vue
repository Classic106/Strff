<template>
  <div class="d-flex flex-column">
    <div class="block mb-3 d-flex flex-column p-3">
      <h6>Customer</h6>
      <p>{{ customer.email }}</p>
    </div>
    <div class="block d-flex flex-column p-3">
      <h6>Default address</h6>
      <p>{{ customer.address1 && customer.address2 }}</p>
      <p>{{ customer.state }}</p>
      <p>{{ customer.cellphone }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerRightSide",
  props: {
    customer: Object,
  },
};
</script>

<style scoped>
</style>