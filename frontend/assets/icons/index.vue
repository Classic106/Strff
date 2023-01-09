<template>
  <svg
    v-if="icon === 'angle-up'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path
      d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"
    />
  </svg>
  <svg
    v-else-if="icon === 'angle-down'"
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path
      d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
    />
  </svg>
</template>

<script>
export default {
  name: "Icon",
  props: ["icon"],
};
</script>

<style scoped>
svg {
  width: 1.1rem;
  height: 1.1rem;
}

svg.md {
  width: 1.6rem;
  height: 1.6rem;
}

svg.lg {
  width: 2.1rem;
  height: 2.1rem;
}
</style>