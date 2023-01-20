<template>
  <money
    v-model="currentPrice"
    v-bind="money"
    pattern="^[+-]?[1-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$|0\.[0-9][1-9]$"
    maxlength="12"
  ></money>
</template>

<script>
export default {
  name: "InputMoney",
  props: {
    price: Number,
  },
  data: () => ({
    currentPrice: 0,
    money: {
      decimal: ".",
      thousands: ",",
      prefix: "",
      suffix: "",
      precision: 2,
    },
  }),
  watch: {
    currentPrice: function () {
      this.$emit("setPrice", this.currentPrice);
    },
  },
  mounted() {
    this.currentPrice = this.price;
  },
};
</script>

<style scoped>
</style>