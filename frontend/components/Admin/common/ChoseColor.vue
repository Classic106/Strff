<template>
  <div>
    <label
      class="d-flex justify-content-between align-items-top"
      :class="boldTitle ? 'font-weight-bold' : ''"
      for="color"
    >
      Color
      <input
        id="color"
        class="form-control ml-2 w-50 align-self-end"
        required
        disabled
        v-model="currentColor"
        :style="{
          backgroundColor: currentColor,
          color: isDark ? '#ffffff' : '#000000',
        }"
      />
    </label>
    <div
      class="invalid-feedback mb-2 text-right"
      :class="currentColor ? '' : 'd-flex'"
    >
      Color isn't chesed
    </div>
    <div class="d-flex">
      <vue-color
        :value="colors"
        @input="updateColor"
        class="colorPicker w-100 mr-2"
      />
      <button class="btn btn-primary" v-on:click.prevent.stop="randomColor">
        Random color
      </button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import isDarkColor from "is-dark-color";

export default {
  name: "ChoseColor",
  props: {
    color: String,
    boldTitle: Boolean,
  },
  data: () => ({
    currentColor: "",
    isDark: false,
    colors: {
      hex: "#194d33",
      hex8: "#194D33A8",
      hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
      hsv: { h: 150, s: 0.66, v: 0.3, a: 1 },
      rgba: { r: 25, g: 77, b: 51, a: 1 },
      a: 1,
    },
  }),
  watch: {
    currentColor: function () {
      const { currentColor } = this;

      this.isDark = this.isDarkColor(currentColor);
      this.$emit("setColor", currentColor);
    },
  },
  methods: {
    isDarkColor,
    updateColor: function (val) {
      const { hex } = val;

      if (this.color !== hex) {
        this.color = hex;
      }
    },
    randomColor: function () {
      const THREEcolor = THREE.MathUtils.randInt(0, 0xffffff);
      const color = new THREE.Color().set(THREEcolor).getHexString();
      this.currentColor = `#${color}`;
    },
  },
  mounted() {
    if (this.color) {
      this.currentColor = this.color;
    }
  },
};
</script>

<style scoped>
</style>