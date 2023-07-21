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
      const { user } = this.order;

      if (user) {
        const { username, first_name, last_name } = user;

        if (first_name) {
          return `${first_name} ${last_name}`;
        }
        return username;
      }

      return "undefined";
    },
  },
};
</script>

<style scoped>
</style>