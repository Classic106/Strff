<template >
  <div v-on:toggle="toggle">
    <SignIn v-if="is" :isMenu="isMenu" :toggle="toggle" />
    <SignUp v-else :isMenu="isMenu" :toggle="toggle" />
  </div>
</template>

<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default {
  components: { SignIn, SignUp },
  props: { isUp: Boolean, isMenu: Boolean },
  data: () => ({ is: false }),
  methods: {
    toggle() {
      this.is = !this.is;
    },
  },
  mounted() {
    this.is = this.isUp;
  },
};
</script>

<style>
</style>