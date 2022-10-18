<template>
  <Admin>
    <template v-slot:page>
      <AdminHome />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import AdminHome from "~/components/Admin/AdminHome";
import Admin from "~/components/Admin";

export default {
  name: "AdminPage",
  layout: authLayout,
  components: { Admin, AdminHome },
};
</script>

<style scoped>
</style>