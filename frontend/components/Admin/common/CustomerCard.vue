<template>
  <div class="row w-100 m-0 mt-2">
    <div class="col-6">
      <p class="text-ellipsis">{{ getCustomerName(customer) }}</p>
      <p class="text-ellipsis">{{ customer.email || "undefined" }}</p>
    </div>
    <div class="col-6">
      <p class="text-ellipsis">{{ customer.state || "undefined" }}</p>
      <p class="text-ellipsis">
        {{ customer.contact_no || "undefined" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerCard",
  props: {
    customer: Object,
  },
  methods: {
    getCustomerName: function () {
      const { first_name, last_name, username } = this.customer;

      if (first_name) {
        return `${first_name} ${last_name}`;
      }
      return username;
    },
  },
};
</script>

<style scoped>
</style>