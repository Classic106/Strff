<template>
  <span>{{ items.length }} items</span>
</template>

<script>
export default {
  name: "OrderItems",
  props: {
    items: Array,
  },
};
</script>

<style scoped>
</style>