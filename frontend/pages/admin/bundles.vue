<template>
  <Admin>
    <template v-slot:page>
      <Bundles />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Bundles from "~/components/Admin/AdminBundles";
import Admin from "~/components/Admin";

export default {
  name: "AdminPage",
  layout: authLayout,
  components: { Admin, Bundles },
};
</script>

<style scoped>
</style>