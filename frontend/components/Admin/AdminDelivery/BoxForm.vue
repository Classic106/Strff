<template>
  <form
    id="box_form"
    ref="form"
    v-on:submit.prevent="submit"
    class="d-flex flex-column"
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
    <div class="row mb-2">
      <div class="col-6">
        <label class="d-flex" for="weight"> Weight </label>
        <InputDecimal
          id="weight"
          class="form-control w-100"
          :value="form.weight"
          v-on:setDecimal="setWeight"
          required
        />
      </div>
      <div class="col-6">
        <label class="d-flex" for="weight_dimension"> Weight dimension </label>
        <select
          id="weight_dimension"
          v-model="form.weight_dimension"
          required
          class="form-control w-100"
        >
          <option value="kilo">kilo</option>
          <option value="lbs">lbs</option>
        </select>
      </div>
    </div>
    <ChoseColor class="mb-2" v-on:setColor="setColor" :color="form.color" />
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import InputDecimal from "~/components/Admin/common/InputDecimal.vue";
import ChoseColor from "~/components/Admin/common/ChoseColor.vue";

export default {
  name: "BoxForm",
  components: { InputDecimal, ChoseColor },
  data: () => ({
    form: {
      lengthy: 1,
      width: 1,
      height: 1,
      volume: 1,
      weight: 1.0,
      dimension: "cm",
      weight_dimension: "kilo",
      color: "",
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
        const { lengthy, width, height } = this.form;
        this.form.volume = lengthy * width * height;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      setBox: "admin_delivery/setBox",
      updateBox: "admin_delivery/updateBox",
    }),
    setWeight: function (val) {
      this.form.weight = val;
    },
    setColor: function (color) {
      this.form.color = color;
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
  beforeMount() {
    const { selectedBox } = this;

    if (selectedBox) {
      this.form = { ...selectedBox };
    }
  },
};
</script>

<style scoped>
</style>