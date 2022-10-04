<template>
  <div class="d-flex flex-column">
    <div class="block mb-3 d-flex flex-column p-3">
      <h6>Customer</h6>
      <p>{{ order.email }}</p>
    </div>
    <div class="block d-flex flex-column p-3">
      <h6>Default address</h6>
      <p>{{ getCustomerName() }}</p>
      <p>{{ order.address1 && order.address2 }}</p>
      <p>{{ order.state }}</p>
      <p>{{ order.cellphone }}</p>
    </div>
  </div>
</template>

<script>
import { states_hashes } from "@/data";

export default {
  name: "CustomerRightSide",
  props: {
    order: Object,
  },
  data: () => ({
    states_hashes,
  }),
  methods: {
    getCustomerName: function () {
      const { first_name, last_name } = this.order;

      return `${first_name} ${last_name}`;
    },
  },
};
</script>

<style scoped>
.block {
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #fff;
}
</style>