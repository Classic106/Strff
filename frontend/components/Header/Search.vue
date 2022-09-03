<template>
  <div class="d-flex">
    <span
      class="icon-search mr-3"
      v-on:click="$nuxt.$emit('rightSide', 'search')"
    ></span>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.icon-search {
  display: inline-block;
  min-width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
  background-size: cover;
  background-image: url("../../assets/icons/iconmonstr-search-thin.svg");
}
</style>