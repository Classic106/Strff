<template>
  <div>
    <div>user profile</div>
    <div>{{user}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "club",
  name: "Profile",
  computed: {
    ...mapGetters({ user: "auth/user" }),
  },
};
</script>

<style scoped>
</style>