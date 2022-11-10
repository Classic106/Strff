<template>
  <Admin>
    <template v-slot:page>
      <Types />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Types from "~/components/Admin/Types";
import Admin from "~/components/Admin";

export default {
  name: "AdminTypes",
  layout: authLayout,
  components: { Admin, Types },
};
</script>

<style scoped>
</style>