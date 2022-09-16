<template>
  <div>{{ page }}</div>
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