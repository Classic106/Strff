<template>
  <form
    id="box_form"
    ref="form"
    v-on:submit.prevent="submit"
    class="was-validated d-flex flex-column"
  >
    <div class="row mb-2">
      <div class="col-6">
        <label class="d-flex" for="title"> Dimension </label>
        <select v-model="form.dimension" required class="form-control w-100">
          <option value="cm">cm</option>
          <option value="inch">inch</option>
        </select>
      </div>
      <div class="col-6">
        <label class="d-flex" for="volume"> Volume </label>
        <input
          id="volume"
          type="number"
          placeholder="Volume"
          v-model.trim="form.volume"
          disabled
          autofocus="false"
          class="form-control w-100"
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-4">
        <label class="d-flex" for="title"> Length </label>
        <input
          id="length"
          type="number"
          placeholder="Enter length"
          v-model.trim="form.lengthy"
          required
          min="1"
          max="100"
          autofocus="true"
          class="form-control w-100"
        />
      </div>
      <div class="col-4">
        <label class="d-flex" for="width"> Width </label>
        <input
          id="width"
          type="number"
          placeholder="Enter width"
          v-model.trim="form.width"
          required
          min="1"
          max="100"
          autofocus="true"
          class="form-control w-100"
        />
      </div>
      <div class="col-4">
        <label class="d-flex" for="height"> Height </label>
        <input
          id="height"
          type="number"
          placeholder="Enter height"
          v-model.trim="form.height"
          required
          min="1"
          max="100"
          autofocus="true"
          class="form-control w-100"
        />
      </div>
    </div>
    <div class="mb-2">
      <label class="d-flex" for="weight"> Weight </label>
      <input
        id="weight"
        type="number"
        placeholder="Weight"
        v-model.trim="form.weight"
        autofocus="false"
        class="form-control w-100"
      />
    </div>
    <div class="mb-2">
      <label class="d-flex justify-content-between align-items-top" for="color">
        Color
        <input
          id="color"
          class="form-control ml-2 w-50 align-self-end"
          required
          disabled
          v-model="form.color"
          :style="{
            backgroundColor: form.color,
            color: isDark ? '#ffffff' : '#000000',
          }"
        />
      </label>
      <div
        class="invalid-feedback mb-2 text-right"
        :class="form.color ? '' : 'd-flex'"
      >
        Color isn't chesed
      </div>
      <div class="d-flex">
        <vue-color
          @input="updateColor"
          :value="colors"
          class="colorPicker w-100 mr-2"
        />
        <button class="btn btn-primary" v-on:click.prevent.stop="randomColor">
          Random color
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import * as THREE from "three";
import { mapGetters, mapActions } from "vuex";

import isDarkColor from "is-dark-color";

export default {
  name: "BoxForm",
  data: () => ({
    form: {
      lengthy: 1,
      width: 1,
      height: 1,
      volume: 1,
      weight: 1,
      dimension: "cm",
      color: "",
    },
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
  computed: {
    ...mapGetters({
      selectedBox: "admin_delivery/selectedBox",
    }),
  },
  watch: {
    form: {
      handler: function () {
        const { lengthy, width, height, color } = this.form;
        this.form.volume = lengthy * width * height;

        this.isDark = this.isDarkColor(color);
      },
      deep: true,
    },
  },
  methods: {
    isDarkColor,
    ...mapActions({
      setBox: "admin_delivery/setBox",
      updateBox: "admin_delivery/updateBox",
    }),
    updateColor: function (val) {
      const { hex } = val;

      if (this.form.color !== hex) {
        this.form.color = hex;
      }
    },
    randomColor: function () {
      const THREEcolor = THREE.MathUtils.randInt(0, 0xffffff);
      const color = new THREE.Color().set(THREEcolor).getHexString();
      this.form.color = `#${color}`;
    },
    submit: function () {
      const { selectedBox, form } = this;

      if (form.color) {
        if (selectedBox) {
          this.updateBox(form);
        } else {
          this.setBox(form);
        }
      }
    },
  },
  mounted() {
    const { selectedBox } = this;

    if (selectedBox) {
      this.form = { ...selectedBox };
    }
  },
};
</script>

<style scoped>
</style>