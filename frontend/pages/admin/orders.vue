<template>
  <Orders />
</template>

<script>
import Orders from "~/components/Admin/AdminOrders";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Orders },
};
</script>

<style scoped>
</style>