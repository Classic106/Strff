<template>
  <div
    class="menu h-100 position-fixed w-100"
    :class="isOpen && 'open'"
    v-on:click="isOpen = false"
  >
    <div class="container w-50 position-absolute">
      <div class="content" :class="isOpen && 'open'">
        <h3>custom header</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "RightSideMenu",
  data: () => ({ isOpen: false }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
  created() {
    this.$nuxt.$on("rightSideMenu", () => (this.isOpen = !this.isOpen));
  },
};
</script>

<style scoped>
.menu {
  top: 0;
  bottom: 0;
  z-index: -1;
}

.menu.open {
  z-index: 5;
}

.container {
  left: 50%;
  height: 100%;
}

.content {
  width: 50vw;
  margin-left: 100%;
  transition: all 0.5s ease-in-out;
}

.content.open {
  margin-left: 0;
}
</style>