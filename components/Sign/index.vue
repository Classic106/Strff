<template>
  <div>
    <SignIn v-if="is" />
    <SignUp v-else />
  </div>
</template>

<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default {
  props: ["isUp"],
  components: { SignIn, SignUp },
  data: () => ({ is: false }),
  mounted() {
    this.is = this.isUp;
    console.log(this.is);
  },
};
</script>

<style>
</style>