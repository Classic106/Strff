<template>
  <div>
    <div v-if="username" class="w-100 d-flex flex-column">
      {{ username }}
      <button v-on:click="$emit('nextStep')">next</button>
    </div>
    <div v-else>
      <div v-if="haveAccount">
        <Sign :isMenu="true" :isUp="true" />
        <button v-on:click="haveAccount = false">without registration</button>
      </div>
      <div v-else>
        <UserForm
          v-on:next="$emit('nextStep')"
          v-on:haveAccount="haveAccount = true"
        />
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
  data: () => ({ haveAccount: false }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
};
</script>

<style scoped>
</style>