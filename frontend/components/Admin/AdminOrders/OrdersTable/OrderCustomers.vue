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
      const { customer, user } = this.order;

      if (customer) {
        const { first_name, last_name } = customer;
        return `${first_name} ${last_name}`;
      }

      if (user) {
        const { first_name, last_name } = user;
        return `${first_name} ${last_name}`;
      }

      return "undefined undefined";
    },
  },
};
</script>

<style scoped>
</style>