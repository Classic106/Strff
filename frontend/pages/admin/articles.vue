<template>
  <Admin>
    <template v-slot:page>
      <Articles />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Articles from "~/components/Admin/Articles";
import Admin from "~/components/Admin";

export default {
  name: "AdminArticles",
  layout: authLayout,
  components: { Admin, Articles },
};
</script>

<style scoped>
</style>