<template>
  <Customers />
</template>

<script>
import Customers from "~/components/Admin/AdminCustomers";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Customers },
};
</script>

<style scoped>
</style>