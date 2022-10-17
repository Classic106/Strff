<template>
  <Admin>
    <template v-slot:page>
      <Products />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Products from "~/components/Admin/AdminProducts";
import Admin from "~/components/Admin";

export default {
  name: "AdminPage",
  layout: authLayout,
  components: { Admin, Products },
};
</script>

<style scoped>
</style>