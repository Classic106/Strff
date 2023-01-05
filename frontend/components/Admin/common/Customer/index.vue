<template>
  <Loader
    v-if="loading"
    class="w-100 h-100 d-flex align-items-center justify-content-center"
  />
  <div v-else>
    <AddOrder v-if="isAddOrder" v-on:closeCreateOrder="isAddOrder = false" />
    <CustomerMain
      v-else
      v-on:openAddOrder="isAddOrder = true"
      :back="back"
      :customer="customer"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import AddOrder from "./AddOrder.vue";
import CustomerMain from "./CustomerMain.vue";
import Loader from "~/components/common/Loader.vue";

export default {
  name: "Customer",
  props: {
    id: Number,
    back: Function,
  },
  components: {
    AddOrder,
    CustomerMain,
    Loader,
  },
  data: () => ({
    isAddOrder: false,
    customer: null,
    loading: true,
  }),
  methods: {
    ...mapActions({
      getCustomer: "admin_customers/getCustomer",
    }),
  },
  watch: {
    isAddOrder: async function () {
      if (!this.isAddOrder) {
        this.loading = true;
        this.customer = await this.getCustomer(this.id);
        this.loading = false;
      }
    },
  },
  async mounted() {
    this.loading = true;
    this.customer = await this.getCustomer(this.id);
    this.loading = false;
  },
};
</script>

<style scoped>
</style>