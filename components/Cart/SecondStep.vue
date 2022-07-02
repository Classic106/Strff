<template>
  <div>
    <Sign v-if="username" :isMenu="true" :isUp="true" />
    <div v-else><button v-on:click="$emit('nextStep')">btn</button></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sign from "@/components/Sign";

export default {
  components: { Sign },
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
};
</script>

<style scoped>
</style>