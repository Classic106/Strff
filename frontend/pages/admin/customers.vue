<template>
  <Admin>
    <template v-slot:page>
      <Customers />
    </template>
  </Admin>
</template>

<script>
import authLayout from "~/middleware/authLayout";

import Customers from "~/components/Admin/AdminCustomers";
import Admin from "~/components/Admin";

export default {
  name: "AdminPage",
  layout: authLayout,
  components: { Admin, Customers },
};
</script>

<style scoped>
</style>