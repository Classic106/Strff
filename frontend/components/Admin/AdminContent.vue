<template>
  <div class="d-flex justify-content-center">
    {{ page }}
  </div>
</template>

<script>
export default {
  name: "AdminContent",
  props: {
    page: String,
    default: "home",
  },
};
</script>

<style scoped>
</style>