<template>
  <div class="text-ellipsis">{{ getCustomer() }}</div>
</template>

<script>
export default {
  name: "OrderCustomers",
  props: {
    order: Object,
  },
  methods: {
    getCustomer: function () {
      const { first_name, last_name, user } = this.order;

      if (!user) {
        return `${first_name} ${last_name}`;
      } else {
        const { first_name, last_name } = user;
        return `${first_name} ${last_name}`;
      }
    },
  },
};
</script scoped>

<style>
</style>