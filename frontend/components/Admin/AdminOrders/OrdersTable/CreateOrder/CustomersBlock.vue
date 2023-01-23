<template>
  <div class="d-flex flex-column align-items-center position-relative">
    <div v-if="!user" class="d-flex flex-column w-100">
      <input
        v-model="search"
        class="form-control"
        type="text"
        placeholder="Search customers"
      />
      <div
        v-if="loadingCustomers"
        class="d-flex w-100 justify-content-center p-5"
      >
        <Loader />
      </div>
      <p v-else-if="users.length === 0" class="text-center p-5">
        Nothing not found
      </p>
      <div v-else>
        <BPagination
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          aria-controls="my-table"
          class="m-0"
          :class="currentPage < 2 && total < perPage && 'd-none'"
        ></BPagination>
        <div
          class="row p-3 w-100 m-0"
          v-for="user in users"
          :key="user.id"
          v-on:click="addCustomer(user)"
        >
          <div class="col-6">
            <p class="text-ellipsis">{{ getCustomerName(user) }}</p>
            <p class="text-ellipsis">{{ user.email }}</p>
          </div>
          <div class="col-6">
            <p class="text-ellipsis">{{ user.state }}</p>
            <p class="text-ellipsis">{{ user.contact_no }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="w-100 row" v-if="user">
      <div class="text-ellipsis col-6">
        {{ getCustomerName(user) }}
      </div>
      <div class="text-ellipsis col-2">{{ user.state }}sss</div>
      <div class="text-ellipsis col-3">{{ user.contact_no }}ssss</div>
      <div
        class="col-1 d-flex justify-content-end align-items-start"
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

import AddCustomerModal from "./AddCustomerModal.vue";
import Loader from "@/components/common/Loader.vue";

export default {
  name: "CustomersBlock",
  components: { AddCustomerModal, Loader },
  data: () => ({
    perPage: 5,
    currentPage: 1,
    search: "",
    users: [],
    user: null,
    total: 0,
    timer: null,
    loadingCustomers: false,
  }),
  watch: {
    search: async function () {
      const { search } = this;

      if (search) {
        clearInterval(this.timer);
        this.timer = null;

        this.timer = setTimeout(async () => {
          await this.getCust();
        }, 1000);
      } else {
        clearInterval(this.timer);
        this.timer = null;

        await this.getCust();
      }
    },
  },
  methods: {
    ...mapActions({ getCustomers: "admin_orders/getCustomers" }),
    addCustomer: function (user) {
      this.user = user;
      this.$emit("setCustomer", user);
    },
    deleteCustomer: function () {
      this.user = null;
      this.$emit("setCustomer", null);
    },
    getCust: async function () {
      const { search, currentPage, perPage } = this;

      this.loadingCustomers = true;
      const { customers, total } = await this.getCustomers({
        search,
        currentPage,
        perPage,
      });

      this.users = customers;
      this.total = total;

      this.loadingCustomers = false;
    },
    getCustomerName: function (user) {
      const { first_name, last_name, username } = user;

      if (first_name) {
        return `${first_name} ${last_name}`;
      }
      return username;
    },
  },
  async mounted() {
    await this.getCust();
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped>
input {
  max-width: 100%;
}
</style>