<template>
  <div class="d-flex justify-content-center">
    <AdminProducts v-if="currentPage === 'products'" />
    <span v-else>{{ currentPage }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AdminProducts from "./AdminProducts";

export default {
  name: "AdminContent",
  components: { AdminProducts },
  computed: {
    ...mapGetters({ currentPage: "admin/currentPage" }),
  },
};
</script>

<style scoped>
</style>