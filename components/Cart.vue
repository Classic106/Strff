<template>
  <div class="d-flex flex-column"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  props: ["isOpen"],
  computed: {
    ...mapGetters({
      cart: "cart/cart",
    }),
  },
  mounted(){
    console.log(this.cart);
  }
};
</script>

<style scoped>
.close-button {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}
</style>