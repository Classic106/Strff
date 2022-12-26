<template>
  <AdminProfile />
</template>

<script>
import AdminProfile from "~/components/Admin/AdminProfile";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { AdminProfile },
};
</script>

<style scoped>
</style>