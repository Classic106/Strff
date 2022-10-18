<template>
  <Admin>
    <template v-slot:page>
      <Orders />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Orders from "~/components/Admin/AdminOrders";
import Admin from "~/components/Admin";

export default {
  name: "AdminPage",
  layout: authLayout,
  components: { Admin, Orders },
};
</script>

<style scoped>
</style>