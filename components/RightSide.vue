<template>
  <div
    class="menu h-100 w-100 position-fixed d-flex justify-content-end"
    :class="isOpen && 'open'"
    v-on:click.self="$nuxt.$emit('rightSide')"
  >
    <div class="container d-flex col-12 col-lg-6 m-0 p-0">
      <div class="content d-flex flex-column" :class="isOpen && 'open'">
        <div
          class="close d-flex align-items-center"
          :class="step > 1 ? 'justify-content-between' : 'justify-content-end'"
        >
          <span
            class="m-4 icon-share"
            v-if="step > 1"
            v-on:click="backStep"
          ></span>
          <span
            class="p-4 text-center close-button"
            v-on:click.self="$nuxt.$emit('rightSide')"
            >+</span
          >
        </div>
        <Cart :step="step" v-on:nextStep="nextStep" v-on:backStep="backStep" />
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/Cart";

export default {
  name: "RightSide",
  components: { Cart },
  data: () => ({ isOpen: false, step: 1 }),
  methods: {
    nextStep: function () {
      if (this.step < 2) {
        this.step = this.step + 1;
      }
    },
    backStep: function () {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
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
  transition: all 1s ease-in-out;
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
}

.content {
  min-width: 100%;
  margin-left: 100%;
  height: 100%;
  color: #fff;
  background: #333333;
  transition: all 1s ease-in-out;
}

.content.open {
  margin-left: 0;
}

.close-button {
  transform: rotate(45deg);
}

.icon-share {
  display: inline-block;
  width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
  transform: rotate(180deg);
  background-size: cover;
  background-image: url("../assets/icons/share-solid.svg");
}
</style>