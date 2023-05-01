<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <SelectWithSearch
      :data="customers"
      :total="total"
      :currentPerPage="currentPerPage"
      :placeholder="'Search customers'"
      v-on:clickItem="addCustomer"
      v-on:setPage="setPage"
      v-on:setSearchText="setSearchText"
      class="mb-3 w-100"
    >
      <template v-slot:item="customers">
        <CustomerCard :customer="customers.item" class="w-100 m-0 p-0" />
      </template>
    </SelectWithSearch>
    <div
      v-if="search.length && !selectedCustomers.length"
      class="text-uppercase text-center p-3 w-100"
    >
      nothing not found
    </div>
    <ul class="w-100 p-0" v-else-if="selectedCustomers.length">
      <li
        class="w-100 row m-0 justify-content-between"
        v-for="(customer, index) in selectedCustomers"
        :key="customer.id"
      >
        <CustomerCard :customer="customer" class="col-10 w-100 m-0 p-0" />
        <div
          class="col-1 d-flex justify-content-end align-items-start"
          v-on:click="deleteCustomer(index)"
        >
          <BIconX />
        </div>
      </li>
    </ul>
    <AddCustomerModal v-on:addCustomer="addCustomer" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

import { warn } from "~/utils/warn";

import SelectWithSearch from "~/components/common/SelectWithSearch.vue";
import AddCustomerModal from "../AdminOrders/OrdersTable/CreateOrder/AddCustomerModal.vue";
import Loader from "@/components/common/Loader.vue";
import CustomerCard from "./CustomerCard.vue";

export default {
  name: "CustomersBlock",
  components: { AddCustomerModal, Loader, SelectWithSearch, CustomerCard },
  props: {
    one: Boolean,
  },
  data: () => ({
    currentPerPage: 5,
    currentPage: 1,
    search: "",
    selectedCustomers: [],
    page: 1,
    timer: null,
  }),
  computed: {
    ...mapGetters({
      customers: "admin_customers/customers",
      total: "admin_customers/total",
    }),
  },
  watch: {
    search: async function () {
      const { search } = this;

      if (search) {
        clearInterval(this.timer);
        this.timer = null;
        this.timer = setTimeout(async () => await this.getCust(), 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;

        await this.getCust();
      }
    },
  },
  methods: {
    ...mapActions({
      getCustomers: "admin_customers/getCustomers",
    }),
    ...mapMutations({
      setParams: "admin_customers/setParams",
      clearCustomers: "admin_customers/clearCustomers",
    }),
    addCustomer: function (customer) {
      const { one, selectedCustomers } = this;

      if (one && selectedCustomers[0]) {
        const { id } = selectedCustomers[0];

        if (id !== customer.id) {
          this.selectedCustomers = [customer];
          this.$emit("setCustomer", customer);
        }

        return;
      }

      if (one && !selectedCustomers[0]) {
        this.selectedCustomers.push(customer);
        this.$emit("setCustomer", customer);
      } else if (!one) {
        const index = this.selectedCustomers.findIndex(
          ({ id }) => customer.id === id
        );

        if (index === -1) {
          this.selectedCustomers.push(customer);
          this.$emit("setCustomers", this.selectedCustomers);
        } else {
          warn("Customer is selected already");
        }
      }
    },
    deleteCustomer: function (index) {
      this.selectedCustomers.splice(index, 1);

      if (this.one) {
        this.$emit("setCustomer", null);
      } else {
        this.$emit("setCustomers", this.selectedCustomers);
      }
    },
    getCust: async function () {
      const { search, page, currentPerPage } = this;

      this.setParams({ search, page, currentPerPage });

      await this.getCustomers();
    },
    setSearchText: function (text) {
      this.search = text;
    },
    setPage: function (page) {
      this.page = page;
    },
  },
  async mounted() {
    await this.getCust();
  },
  destroyed() {
    this.clearCustomers();

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped>
</style>