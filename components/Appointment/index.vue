<template>
  <div class="d-flex flex-column">
    <div
      class="close d-flex pr-3 align-items-center"
      :class="
        step > 1 && step !== 4
          ? 'justify-content-between'
          : 'justify-content-end'
      "
    >
      <span
        v-if="step > 1 && step !== 4"
        class="m-4 icon icon-reply"
        v-on:click="backStep"
      ></span>
      <span class="p-4 text-center close-button" v-on:click.self="close"
        >+</span
      >
    </div>
    <FirstStep v-if="step === 1" v-on:nextStep="nextStep" />
    <SecondStep v-if="step === 2" v-on:nextStep="nextStep" />
    <ThirdStep v-if="step === 3" v-on:nextStep="nextStep" />
    <FourthStep v-if="step === 4" v-on:close="close" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import FirstStep from "./FirstStep.vue";
import SecondStep from "./SecondStep.vue";
import ThirdStep from "./ThirdStep.vue";
import FourthStep from "./FourtStep";

export default {
  components: { FirstStep, SecondStep, ThirdStep, FourthStep },
  props: ["isOpen"],
  data: () => ({ step: 1 }),
  watch: {
    isOpen: function () {
      if (!this.isOpen) {
        setTimeout(() => {
          this.step = 1;
          this.clearAll();
        }, 500);
      }
    },
  },
  methods: {
    ...mapMutations({
      clearAll: "appointment/clearAll",
    }),
    nextStep: function () {
      if (this.step < 5) {
        this.step = this.step + 1;
      }
    },
    backStep: function () {
      if (this.step > 1) {
        this.step = this.step - 1;
      }
    },
    close: function () {
      if (this.isOpen) {
        this.$emit("isRightSide");
      }
    },
  },
};
</script>

<style scoped>
.icon-reply {
  background-image: url("@/assets/icons/reply-solid.svg");
}

.close > .close-button {
  color: #fff;
  font-size: 3rem;
  transform: rotate(45deg);
}
</style>