<template>
  <div
    class="menu h-100 w-100 position-fixed d-flex justify-content-end"
    :class="isOpen && 'open'"
    v-on:click.self="$nuxt.$emit('rightSide')"
  >
    <div class="container d-flex col-12 col-lg-6 m-0 p-0">
      <div class="content d-flex flex-column" :class="isOpen && 'open'">
        <div class="close d-flex justify-content-end">
          <span
            class="p-4 text-center close-button"
            v-on:click.self="$nuxt.$emit('rightSide')"
            >+</span
          >
        </div>
        <Cart :isOpen="isOpen"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cart from "@/components/Cart";

export default {
  name: "RightSide",
  components: { Cart },
  data: () => ({ isOpen: false }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
  created() {
    this.$nuxt.$on("rightSide", () => (this.isOpen = !this.isOpen));
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
  transition: all 0.5s ease-in-out;
}

.menu.open {
  z-index: 5;
  opacity: 1;
}

.container {
  height: 100%;
}

.close > span {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}

.content {
  width: 100%;
  margin-left: 100%;
  height: 100%;
  color: #fff;
  background: #333333;
  transition: all 0.5s ease-in-out;
}

.content.open {
  margin-left: 0;
}
</style>