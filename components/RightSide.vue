<template>
  <div
    class="menu h-100 w-100 position-fixed d-flex justify-content-end"
    :class="isOpen && 'open'"
    v-on:click.self="isOpen = false"
  >
    <Cart v-on:close="isOpen = false" :isOpen="isOpen" />
  </div>
</template>

<script>
import Cart from "@/components/Cart";

export default {
  name: "RightSide",
  components: { Cart },
  data: () => ({ isOpen: false }),
  created() {
    this.$nuxt.$on("rightSide", () => {
      this.isOpen = !this.isOpen;
    });
  },
};
</script>

<style scoped>
.menu {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0;
  background: rgba(0, 0, 0, 0.9);
  transition: all 1s ease-in-out;
}

.menu.open {
  z-index: 5;
  opacity: 1;
}
</style>