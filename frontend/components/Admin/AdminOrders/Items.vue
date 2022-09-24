<template>
  <span>{{ items.length }} items</span>
</template>

<script>
export default {
  name: "Items",
  props: {
    items: Array,
  },
};
</script>

<style scoped>
</style>