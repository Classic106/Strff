<template>
  <div
    class="menu h-100 w-100 position-fixed"
    :class="isOpen && 'open'"
    v-on:click.self="isOpen = false"
  >
    <div class="container w-50 position-absolute">
      <div class="content d-flex flex-column" :class="isOpen && 'open'">
        <div class="close d-flex justify-content-end pr-3">
          <span class="p-4 text-center" v-on:click.self="isOpen = false"
            >+</span
          >
        </div>
        <Sign
          v-if="username && link !== 'signin' && link !== 'signup'"
          :isMenu="true"
          :isUp="true"
        />
        <h3 v-else>custom header</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sign from "@/components/Sign";

export default {
  name: "RightSideMenu",
  components: { Sign },
  data: () => ({ isOpen: false, link: "" }),
  computed: {
    ...mapGetters({
      username: "auth/username",
    }),
  },
  mounted() {
    this.link = this.$route.name;
    console.log(this.link !== "signin" && this.link !== "signup");
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
  opacity: 0;
  background: rgba(0, 0, 0, 0.9);
  transition: all 0.5s ease-in-out;
}

.menu.open {
  z-index: 5;
  opacity: 1;
}

.container {
  left: 50%;
  height: 100%;
}

.close > span {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}

.content {
  width: 50vw;
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