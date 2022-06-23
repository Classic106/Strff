<template>
  <div class="icon-bag-wrap position-relative" v-on:click="goToCheckout">
    <span
      class="
        position-absolute
        w-100
        d-flex
        justify-content-center
        align-items-center
        dark-orange
      "
      >{{ numberOfItems }}</span
    >
    <span
      class="icon icon-bag position-relative"
      :class="!isMobile && ' position-absolute'"
    ></span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  computed: {
    ...mapGetters({
      numberOfItems: "cart/numberOfItems",
      username: "auth/username",
    }),
  },
  methods: {
    goToCheckout() {
      const isConnected = this.$store.getters["auth/username"];
      if (!isConnected) {
        this.$router.push("/signin");
        return;
      }
      this.$router.push("/checkout");
    },
  },
};
</script>

<style scoped>
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

.icon-bag {
  right: 0;
  top: -1px;
  background-image: url("../assets/icons/shopping-bag.svg");
}

.icon-bag > span {
  filter: invert(50%) sepia(56%) saturate(571%) hue-rotate(6deg) brightness(88%)
    contrast(86%);
}
</style>