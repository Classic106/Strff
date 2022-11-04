<template>
  <div class="d-flex justify-content-center align-items-center">
    <h4 class="text-uppercase">Thank You</h4>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$emit("firstStep");
      this.$nuxt.$emit("rightSide");
    }, 2000);
  },
};
</script>

<style scoped>
div {
  width: 600px;
  height: 84vh;
}
</style>