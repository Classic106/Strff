<template>
  <div>
    <div v-if="username" class="w-100 d-flex flex-column">
      {{ username }}
      <button v-on:click="$emit('nextStep')">next</button>
    </div>
    <div v-else>
      <div v-if="!dontWantRegister">
        <Sign :isMenu="true" :isUp="true" />
        <button v-on:click="dontWantRegister = true">dont want register</button>
      </div>
      <div v-else>
        <UserForm />
        <button v-on:click="$emit('nextStep')">next</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sign from "@/components/Sign";
import UserForm from "@/components/UserForm";

export default {
  components: { Sign, UserForm },
  data: () => ({ dontWantRegister: false }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
};
</script>

<style scoped>
</style>