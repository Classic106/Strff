<template>
  <div class="text-ellipsis">{{ getCustomerName() }}</div>
</template>

<script>
export default {
  name: "OrderCustomers",
  props: {
    order: Object,
  },
  methods: {
    getCustomerName: function () {
      const { customer } = this.order;

      if (customer) {
        const { firstName, lastName } = customer;
        return `${firstName} ${lastName}`;
      }

      return "undefined undefined";
    },
  },
};
</script>

<style scoped>
</style>