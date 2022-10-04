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
      const { firstName, lastName } = this.order;
      return `${firstName} ${lastName}`;
    },
  },
};
</script scoped>

<style>
</style>