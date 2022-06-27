<template>
  <div class="px-3" v-on:click="$nuxt.$emit('rightSideMenu')">
    <span>&#8942;</span>
  </div>
</template>

<script>
export default {
  name: "Elipsis",
};
</script>

<style csoped>
</style>