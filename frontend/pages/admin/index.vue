<template>
  <AdminHome />
</template>

<script>
import AdminHome from "~/components/Admin/AdminHome";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { AdminHome },
};
</script>

<style scoped>
</style>