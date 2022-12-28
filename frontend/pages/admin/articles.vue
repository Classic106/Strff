<template>
  <Articles />
</template>

<script>
import Articles from "~/components/Admin/Articles";

export default {
  name: "AdminArticles",
  layout: "admin",
  middleware: "isAdminAuthenticated",
  components: { Articles },
};
</script>

<style scoped>
</style>