<template>
  <div class="d-flex justify-content-center">
    <AdminProducts v-if="page === 'products'" />
    <span v-else>{{ page }}</span>
  </div>
</template>

<script>
import AdminProducts from "./AdminProducts/index.vue";

export default {
  name: "AdminContent",
  props: {
    page: String,
    default: "home",
  },
  components: { AdminProducts },
};
</script>

<style scoped>
</style>