<template>
  <div class="d-flex justify-content-center align-items-center">
    <h1 class="text-nowrap p-5">Thank you</h1>
  </div>
</template>

<script>
export default {
  name: "AppointmentFourthStep",
  mounted() {
    setTimeout(() => this.$emit("close"), 2000);
  },
};
</script>

<style scoped>
div {
  height: 88vh;
}
</style>