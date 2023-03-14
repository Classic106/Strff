<template>
  <money
    v-model="currentDecimal"
    v-bind="decimal"
    pattern="^[+-]?[1-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$|0\.[0-9][1-9]$"
    maxlength="12"
  ></money>
</template>

<script>
export default {
  name: "InputDecimal",
  props: {
    value: Number,
  },
  data: () => ({
    currentDecimal: 0,
    decimal: {
      decimal: ".",
      thousands: ",",
      prefix: "",
      suffix: "",
      precision: 2,
    },
  }),
  watch: {
    currentDecimal: function () {
      this.$emit("setDecimal", this.currentDecimal);
    },
  },
  mounted() {
    this.currentDecimal = this.value;
  },
};
</script>

<style scoped>
</style>