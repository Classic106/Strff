<template>
  <div class="d-flex justify-content-center">
    <AdminHome v-if="currentPage === 'home'" />
    <AdminProducts v-else-if="currentPage === 'products'" />
    <span v-else>{{ currentPage }}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AdminHome from "./AdminHome.vue";
import AdminProducts from "./AdminProducts";

export default {
  name: "AdminContent",
  components: { AdminHome, AdminProducts },
  computed: {
    ...mapGetters({ currentPage: "admin/currentPage" }),
  },
};
</script>

<style scoped>
</style>