<template>
  <div
    class="icon-bag-wrap position-relative"
    v-on:click="$nuxt.$emit('rightSide', 'cart')"
  >
    <span
      class="
        position-absolute
        w-100
        d-flex
        justify-content-center
        align-items-center
        gold
      "
      >{{ orderNoOfItems }}</span
    >
    <span class="icon icon-bag position-relative"></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      orderNoOfItems: "order/orderNoOfItems",
    }),
  },
};
</script>

<style scoped>
.container {
  top: 100%;
  height: 100vh;
  width: 100vw;
}

.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  filter: brightness(0) invert(1);
  background-size: cover;
}

.icon-bag-wrap {
  right: 0;
  width: 30px;
  height: 30px;
}

.icon-bag-wrap:hover > span {
  color: #d2a52c;
}

.icon-bag {
  right: 0;
  top: -1px;
  background-image: url("../../assets/icons/shopping-bag.svg");
}

.icon-bag > span {
  filter: invert(50%) sepia(56%) saturate(571%) hue-rotate(6deg) brightness(88%)
    contrast(86%);
}
</style>