<template>
  <Admin>
    <template v-slot:page>
      <Categories />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Categories from "~/components/Admin/Categories";
import Admin from "~/components/Admin";

export default {
  name: "AdminPage",
  layout: authLayout,
  components: { Admin, Categories },
};
</script>

<style scoped>
</style>