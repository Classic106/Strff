<template>
  <Types />
</template>

<script>
import Types from "~/components/Admin/Types";

export default {
  name: "AdminTypes",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Types },
};
</script>

<style scoped>
</style>