<template>
  <span class="icon cursor-pointer" v-on:click.self="$emit('close')"></span>
</template>

<script>
export default {
  name: "CloseButton",
};
</script>

<style scoped>
span {
  color: #fff;
  width: 16px;
  height: 24px;
  background-image: url("../../assets/icons/xmark-solid.svg");
}
</style>