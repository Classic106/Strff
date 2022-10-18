<template>
  <AdminLogin v-if="user" />
  <div v-else>
    <slot name="page"></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AdminLogin from "./AdminLogin.vue";

export default {
  name: "Admin",
  components: { AdminLogin },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>

<style scoped>
</style>