<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <BIconSearch class="search-icon d-flex position-absolute" />
    <SelectWithSearch
      :data="customers"
      :filter="filterCustomers"
      :clickItem="addCustomer"
      :placeholder="'Serch bundles'"
      class="mb-3"
    >
      <template v-slot:item="customers">
        <div class="row p-3 w-100">
          <div class="text-ellipsis col-6">
            {{ getCustomerName(customers.item) }}
          </div>
          <div class="text-ellipsis col-3">{{ customers.item.state }}</div>
          <div class="text-ellipsis col-3">{{ customers.item.cellphone }}</div>
        </div>
      </template>
    </SelectWithSearch>
    <div class="w-100 row" v-if="customer">
      <div class="text-ellipsis col-6">
        {{ getCustomerName(customer) }}
      </div>
      <div class="text-ellipsis col-2">{{ customer.state }}</div>
      <div class="text-ellipsis col-3">{{ customer.cellphone }}</div>
      <div
        class="col-1 d-flex justify-content-center align-items-start"
        v-on:click="deleteCustomer"
      >
        <BIconX />
      </div>
    </div>
    <AddCustomerModal v-on:addCustomer="addCustomer" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import AddCustomerModal from "./AddCustomerModal.vue";

export default {
  name: "CustomersBlock",
  components: { SelectWithSearch, AddCustomerModal },
  data: () => ({
    customers: [],
    customer: null,
  }),
  methods: {
    ...mapActions({ getCustomers: "admin_orders/getCustomers" }),
    filterCustomers: function (text, data) {
      return data.filter(
        (item) =>
          item.firstName.toLowerCase().includes(text.toLowerCase()) ||
          item.lastName.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase()) ||
          item.cellphone.toLowerCase().includes(text.toLowerCase())
      );
    },
    addCustomer: function (customer) {
      this.customer = customer;
      this.$emit("setCustomer", customer);
    },
    deleteCustomer: function () {
      this.customer = null;
      this.$emit("setCustomer", null);
    },
    getCustomerName: function (customer) {
      const { firstName, lastName } = customer;
      return `${firstName} ${lastName}`;
    },
  },
  async beforeMount() {
    this.customers = await this.getCustomers();
  },
};
</script>

<style scoped>
</style>