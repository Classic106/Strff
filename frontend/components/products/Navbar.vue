<template>
  <div class="flex justify-between ml-6 mr-6 mt-4">
    <nuxt-link to="/">
      <span class="emoji"> STRFF </span>
    </nuxt-link>
    <div class="flex items-center">
      <nuxt-link to="/signin" v-if="!username">
        <span class="mx-3">Signin</span>
      </nuxt-link>
      <nuxt-link to="/signup" v-if="!username">
        <span class="mx-3 mr-6">Signup</span>
      </nuxt-link>
      <div v-if="username">
        <span>Hi {{ username }}</span>
        <a href="#" class="mx-3 mr-6" @click="logout"> Logout </a>
      </div>
      <button class="go-to-checkout flex items-center" @click="goToCheckout">
        <Cart />
        <span
          class="cart-total-price ml-3 font-semibold text-sm text-indigo-500"
          >${{ numberOfItems }}</span
        >
      </button>
    </div>
  </div>
</template>

<script>
import Cart from "@/components/icons/cart";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Cart,
  },
  computed: {
    ...mapGetters({
      numberOfItems: "cart/numberOfItems",
      username: "auth/username",
    }),
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
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

<style>
.emoji {
  font-size: 30px;
}
</style>
