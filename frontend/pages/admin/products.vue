<template>
  <Products />
</template>

<script>
import Products from "~/components/Admin/AdminProducts";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Products },
};
</script>

<style scoped>
</style>