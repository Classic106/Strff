<template>
  <Categories />
</template>

<script>
import Categories from "~/components/Admin/Categories";

export default {
  name: "AdminPage",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Categories },
};
</script>

<style scoped>
</style>