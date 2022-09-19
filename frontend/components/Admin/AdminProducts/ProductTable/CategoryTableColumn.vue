<template>
  <div class="d-flex flex-column">
    <span v-for="category in categories" :key="category.id">{{
      category.name
    }}</span>
  </div>
</template>

<script>
export default {
  name: "CategoryTableColumn",
  props: {
    categories: Array,
  },
};
</script>

<style scoped>
</style>