<template>
  <div class="d-flex justify-content-center align-items-center">
    <h4 class="text-uppercase">thank you</h4>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => this.$nuxt.$emit("rightSide", "close"), 2000);
  },
};
</script>

<style scoped>
div {
  height: 84vh;
}
</style>