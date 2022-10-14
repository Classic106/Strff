<template>
  <div class="w-100 h-100">
    <div
      v-if="loading"
      class="w-100 h-100 d-flex align-items-center justify-content-center"
    >
      <Loader />
    </div>
    <div v-else class="w-100 h-100">
      <CustomersTable v-if="!selected" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

import Loader from "~/components/common/Loader";
import CustomersTable from "./CustomersTable";

export default {
  name: "AdminCusmomers",
  components: { Loader, CustomersTable },
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters({ selected: "admin_customers/selected" }),
  },
  methods: {
    ...mapActions({ getCustomers: "admin_customers/getCustomers" }),
    ...mapMutations({
      clearCustomers: "admin_customers/clearCustomers",
    }),
  },
  async mounted() {
    this.loading = true;
    await this.getCustomers();
    this.loading = false;
  },
  destroyed() {
    this.clearCustomers();
  },
};
</script>

<style scoped>
</style>