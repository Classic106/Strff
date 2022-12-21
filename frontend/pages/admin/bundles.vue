<template>
  <Bundles />
</template>

<script>
import Bundles from "~/components/Admin/AdminBundles";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Bundles },
};
</script>

<style scoped>
</style>